import React, { createContext, useState } from "react";
import classNames from "classnames";
import "./Menu.scss";
import { MenuItemProps } from "./MenuItem";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  children: React.ReactNode;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

const MenuContext = createContext<IMenuContext>({ index: '0' });
export { MenuContext };

const Menu: React.FC<MenuProps> = ({
  defaultIndex = '0',
  className,
  mode = "horizontal",
  children,
  style,
  onSelect,
  defaultOpenSubMenus=[],
}) => {
  const classes = classNames("menu", className, {
    "menu-horizontal": mode !== "vertical",
    "menu-vertical": mode === "vertical",
  });
  const [activeIndex, setActiveIndex] = useState<string>(defaultIndex);
  const handleOnClick = (index: string) => {
    setActiveIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: activeIndex,
    onSelect: handleOnClick,
    mode,
    defaultOpenSubMenus,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

export default Menu;

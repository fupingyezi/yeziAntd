import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import { MenuItemProps } from "./MenuItem";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  className,
  children,
}) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as string[];
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
  const [menuOpen, setMenuOpen] = useState(isOpened);

  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index && menuOpen,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (context.onSelect && typeof index === "string") {
      context.onSelect(index);
    }
    setMenuOpen(!menuOpen);
  };

  const renderChildren = () => {
    const subMenuClasses = classNames('submenu', {
        'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
      }
    });
    return (
      <ul
        className={subMenuClasses}
      >
        {childrenComponent}
      </ul>
    );
  };

  return (
    <li key={index} className={classes}>
      <div className="submenu-title" onClick={handleClick}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;

import React, { createContext, useState } from "react";
import classNames from "classnames";
import "./Tabs.scss";

type TabsPosition = "left" | "right" | "top" | "bottom";
type TabsMode = "horizontal" | "vertical";
type SelectCallback = (activeIndex: number) => void;

export interface TabsProps {
  defaultIndex: number;
  OnSelect?: SelectCallback;
  position?: TabsPosition;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  mode?: TabsMode;
}

export interface ITabsContext {
  activeIndex: number;
  OnSelect?: SelectCallback;
}

const TabsContext = createContext<ITabsContext>({ activeIndex: 0 });
export { TabsContext };

const Tabs: React.FC<TabsProps> = ({
  defaultIndex = 0,
  OnSelect,
  className,
  // position = 'bottom',
  mode = "horizontal",
  style,
  children,
}) => {
  const classes = classNames("tabs", className, {
    "tabs-vertical": mode === "vertical",
  });
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);
  const handleOnClick = (activeIndex: number) => {
    setActiveIndex(activeIndex);
    if (OnSelect) {
      OnSelect(activeIndex);
    }
  };

  const passedContext: ITabsContext = {
    activeIndex: activeIndex,
    OnSelect: handleOnClick,
  };
  return (
    <ul className={classes} style={style}>
      <TabsContext.Provider value={passedContext}>
        {children}
      </TabsContext.Provider>
    </ul>
  );
};

export default Tabs;

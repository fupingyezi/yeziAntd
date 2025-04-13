import React, { useContext } from "react";
import classNames from "classnames";
import { TabsContext } from "./Tabs";

export interface TabItemProps {
    index?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

const TabItem: React.FC<TabItemProps> = ({
    index,
    className,
    style,
    children,
}) => {
    const context = useContext(TabsContext);
    const classes = classNames('tabs-item', className, {
        'is-active': context.activeIndex === index,
    })

    const handleClick = () => {
        if (context.OnSelect && typeof index === 'number') {
            context.OnSelect(index);
        }
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

export default TabItem;
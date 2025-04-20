import React, { CSSProperties, useState } from "react";
import "./Select.scss";
import classNames from "classnames";
import Icon from "../Icon/Icon";

export type OptionProps = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectSize = "small" | "default" | "large";
type SelectMode = "multipy" | "tags";

export interface SelectProps {
  defaultValue?: string | string[];
  onChange?: (value: string) => void;
  option?: OptionProps[];
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  optionRender?: (item: OptionProps, index: number) => React.ReactNode;
  size?: SelectSize;
  mode?: SelectMode;
  open?: boolean;
}

const Select: React.FC<SelectProps> = ({
  defaultValue,
  onChange,
  option = [] as OptionProps[],
  disabled = false,
  style,
  className,
  optionRender,
  size = "default",
  mode = "tags",
  open = false,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const initialValue = (): string | string[] => {
    if (!defaultValue) return "Select a option";
    else if (mode === "tags") {
      if (Array.isArray(defaultValue))
        throw Error("defaultValue can't be an array when mode is tags");
      else return defaultValue;
    } else if (mode === "multipy") {
      if (!Array.isArray(defaultValue)) return [defaultValue];
      else return defaultValue;
    } else {
      return "Select a option";
    }
  };
  const [selectedValue, setSelectedValue] = useState<string | string[]>(
    initialValue
  );

  const handleOnSelect = (value: string) => {
    if (mode === "tags") {
      setSelectedValue(value);
      setIsOpen(false);
    } else {
      if (selectedValue.includes(value)) {
        const oldValue = selectedValue as string[];
        setSelectedValue(oldValue.filter(() => value !== selectedValue));
      } else {
        setSelectedValue([...selectedValue, value]);
      }
    }
    if (onChange) {
      onChange(value);
    }
  };

  const classes = classNames("select", className, {
    [`select-${size}`]: size !== "default",
    "is-active": isActive && !disabled,
    "is-disabled": disabled,
    "is-show-open": isOpen,
  });

  //选项列表
  const renderOptionList = () => {
    const tag = optionRender !== undefined;
    return (
      <>
        {option.map((item, index) => {
          const classesItem = classNames("select-list-item", {
            "is-selected":
              (mode === "tags" && item.value === selectedValue) ||
              (mode === "multipy" && selectedValue.includes(item.value)),
            "is-disabled": item.disabled,
          });
          return (
            <li
              className={classesItem}
              key={item.value}
              onClick={() => handleOnSelect(item.value)}
            >
              {tag && optionRender(item, index)}
              {item.label}
            </li>
          );
        })}
      </>
    );
  };

  //激活框
  const renderSelectionBox = () => {
    return (
      <div className="select-box">
        {mode === "tags" && (
          <p className={size !== "default" ? `p-${size}` : ""}>
            {selectedValue}
          </p>
        )}
        <Icon
          style={{ color: "#bebebe" }}
          icon="angle-down"
          className="arrow-icon"
          onClick={() => setIsOpen(!isOpen)}
        ></Icon>
      </div>
    );
  };

  return (
    <div
      className={classes}
      style={style}
      onClick={() =>
        !disabled && setIsActive(true) && !isOpen && setIsOpen(true)
      }
      onBlur={() => !disabled && setIsActive(false)}
    >
      {renderSelectionBox()}
      <ul className={classNames("select-list", { "is-open": isOpen })}>
        {renderOptionList()}
      </ul>
    </div>
  );
};

export default Select;

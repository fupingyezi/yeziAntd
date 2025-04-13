import React, { ReactElement, InputHTMLAttributes } from "react";
import classNames from "classnames";
import "./Input.scss";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";

type InputSize = "large" | "small" | "default";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  disabled?: boolean;
  size?: InputSize;
  //   icon?: IconProp;
  perfix?: string | ReactElement;
  suffix?: string | ReactElement;
  OnInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  disabled = false,
  size,
  //   icon,
  prefix,
  suffix,
  className,
  style,
  ...restProps
}) => {
  const classes = classNames("input", className, {
    "input-disabled": disabled,
    [`input-${size}-style`]: size,
  });
  const innerClasses = classNames("input-inner", {
    'fix-border-radius': prefix && suffix,
    'prefix-border-radius': prefix && !suffix,
    'suffix-border-radius': !prefix && suffix, 
  })
  return (
    <div className={classes} style={style}>
      {prefix && <div className="input-prefix">{prefix}</div>}
      <input className={innerClasses} disabled={disabled} {...restProps}></input>
      {suffix && <div className="input-suffix">{suffix}</div>}
    </div>
  );
};

export default Input;

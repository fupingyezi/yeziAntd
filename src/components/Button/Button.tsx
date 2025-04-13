import React from "react";
import classNames from "classnames";
import "./Button.scss";

export type ButtonSize = "small" | "middle" | "large";
export type ButtonType = "primary" | "default" | "dashed" | "text" | "link";

export interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  BaseButtonProps;
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  BaseButtonProps;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

export const Button: React.FC<ButtonProps> = ({
  className,
  disabled,
  size = "middle",
  btnType = "primary",
  children,
  href,
  ...restProps
}: ButtonProps) => {
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });

  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

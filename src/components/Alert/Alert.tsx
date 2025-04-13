import React, { useState } from "react";
import classNames from "classnames";
import "./Alert.scss";

type AlertType = "success" | "warning" | "info" | "error";

interface AlertProps {
  message: string;
  type?: AlertType;
  closeable?: boolean;
  onClose?: (isClose: boolean) => void;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
  chilren?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  message,
  type = "success",
  closeable = false,
  onClose,
  description,
  className,
  style,
}) => {
  const [isClose, setIsClose] = useState(false);

  const classes = classNames("alert", className, `alert-${type}`, {
    "alert-description": description !== undefined,
    isClose: isClose && closeable,
  });

  const isDescription = description !== undefined;
  console.log(isDescription);

  const handleOnClick = () => {
    if (closeable && onClose) {
      onClose(true);
      setIsClose(true);
    }
  };

  return (
    <div className={classes} style={style}>
      <div className="alert-item-text">{message}</div>
      {isDescription && (
        <div className="alert-item-description">{description}</div>
      )}
      {closeable && (
        <div className="alert-close" onClick={handleOnClick}>
          ×
        </div>
      )}
    </div>
  );
};

export default Alert;

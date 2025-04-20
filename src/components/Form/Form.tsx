import React, { CSSProperties, createContext } from "react";
import classNames from "classnames";

export type ValidateErrors = {
  type: "required" | "format" | "custom";
  message: string;
};

export interface FormProps {
  name?: string;
  onFinish?: (value: Record<string, any>) => void;
  onFinishFailed?: (
    value: Record<string, any>,
    errors: Record<string, ValidateErrors[]>
  ) => void;
  initialValues?: Record<string, any>;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface IFormContext {
  onFinish?: (value: Record<string, any>) => void;
  onFinishFailed?: (
    value: Record<string, any>,
    errors: Record<string, ValidateErrors[]>
  ) => void;
  initialValues?: Record<string, any>;
}

const FormContext = createContext<IFormContext>({});

const Form: React.FC<FormProps> = ({
  name,
  initialValues,
  onFinish,
  onFinishFailed,
  children,
  className,
  style,
}) => {
  const classes = classNames("form", className);
  const passesContext: IFormContext = {
    initialValues: initialValues,
    onFinish: onFinish,
    onFinishFailed: onFinishFailed,
  };
  return (
    <form name={name} className={classes} style={style}>
      <FormContext.Provider value={passesContext}>
        {children}
      </FormContext.Provider>
    </form>
  );
};

export default Form;

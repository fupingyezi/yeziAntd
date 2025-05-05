import React, { ChangeEvent } from "react";
import { useFormContext, Rule } from "./useForm";
import "./Form.scss";
import classNames from "classnames";

export interface FormItemProps {
  name: string;
  label?: string;
  required?: boolean;
  children: React.ReactNode;
  rule?: Rule;
}

const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  required = false,
  children,
  rule,
}) => {
  const {
    getFieldValue,
    setFieldsValue,
    setValidateFieldsRules,
    getFieldsError,
  } = useFormContext();

  const isRequired = required || rule?.required;
  const filedError = getFieldsError?.().find((error) => error.name === name);

  const getControlled = () => {
    return {
      value: getFieldValue?.(name),
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFieldsValue?.({ [name]: newValue });
        if (rule) {
          setValidateFieldsRules?.(name, rule);
        }
      },
    };
  };

  const isShowLabel = label !== undefined;

  return (
    <div className="form-item">
      <label className="form-item-label">
        {isRequired && <span className="required">*</span>}
        {`${isShowLabel ? label : ""}${isShowLabel ? ":" : ""}`}
      </label>
      {React.cloneElement(children as React.ReactElement, {
        ...getControlled(),
        className: classNames({ "error": filedError !== undefined }),
      })}
      {filedError && (
        <div className="form-item-error">{filedError?.message}</div>
      )}
    </div>
  );
};

export default FormItem;

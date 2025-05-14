import React, { ChangeEvent, useEffect } from "react";
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
    getFieldsValue,
    setFieldsValue,
    setValidateFieldsRules,
    getFieldsError,
  } = useFormContext();

  useEffect(() => {
    const currentStore = getFieldsValue?.() || {};
    if (!Object.prototype.hasOwnProperty.call(currentStore, name)) {
      setFieldsValue?.({ [name]: undefined }, "SETFVALUE");
      if (rule) {
        setValidateFieldsRules?.(name, rule);
      }
    }
  }, [name]);

  const isRequired = required || rule?.required;
  const filedError = getFieldsError?.().find((error) => error.name === name);

  const getControlled = () => {
    return {
      value: getFieldValue?.(name),
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFieldsValue?.({ [name]: newValue }, "SETFVALUE");
      },
      className: classNames({ error: filedError !== undefined }),
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
      })}
      {filedError && (
        <div className="form-item-error">{filedError?.message}</div>
      )}
    </div>
  );
};

export default FormItem;

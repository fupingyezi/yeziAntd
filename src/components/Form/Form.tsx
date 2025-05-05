import React from "react";
import { useForm, FormInstance } from "./useForm";
import { FormProvider } from "./FormProvider";

export interface FormProps<Values = any> {
  name?: string;
  initialValues?: Record<string, Values>;
  form?: FormInstance<Values>;
  onFinish?: (values: Values) => void;
  onFinishFailed?: (error: Values) => void;
  children?: React.ReactNode;
}

const Form: React.FC<FormProps> = ({
  name,
  initialValues,
  form,
  onFinish,
  children,
  onFinishFailed,
}) => {
  const [formInstance] = useForm(form);

  formInstance.setCallbacks({ onFinish, onFinishFailed });
  if (initialValues) {
    formInstance.setFieldsValue(initialValues);
  }
  return (
    <form
      className="form"
      name={name ?? ""}
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}
    >
      <FormProvider form={formInstance}>{children}</FormProvider>
    </form>
  );
};

export default Form;

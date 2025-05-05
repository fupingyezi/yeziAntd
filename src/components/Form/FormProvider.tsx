import { Store, FormContext, FormInstance, useForm } from "./useForm";

export const FormProvider = <T extends Store>({
  children,
  form,
}: {
  children: React.ReactNode;
  form?: FormInstance<T>;
}) => {
  const [formInstance] = useForm(form);
  return (
    <FormContext.Provider value={formInstance}>{children}</FormContext.Provider>
  );
};



import { useReducer, createContext, useContext, useRef, useState } from "react";

export type StoreValue = any;
export type Store = Record<string, StoreValue>;
export type NamePath = string | number;

//error测验
export type validateRules = Record<string, Rule>;

export interface ValidateError {
  name: string;
  message: string;
}

export interface Rule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  type?: "email" | "url";
  message?: string;
}

export interface Callbacks<Values = any> {
  onFinish?: (values: Values) => void;
  onFinishFailed?: (error: Values) => void;
}

export interface FormInstance<Values = any> {
  getFieldValue: (name: NamePath) => StoreValue;
  submit: () => void;
  getFieldsValue: () => Values;
  setFieldsValue: (newStore: Store) => void;
  setCallbacks: (callbacks: Callbacks) => void;
  validateFields: () => Promise<Values>;
  setValidateFieldsRules: (name: string, rules: Rule) => void;
  getFieldsError: () => ValidateError[];
}

type Action =
  | { type: "SETFVALUE"; payload: { name: NamePath; value: StoreValue } }
  | { type: "SETCALLBACKS"; payload: Callbacks }
  | { type: "SUBMIT" };

const formReducer = (state: Store, action: Action): Store => {
  switch (action.type) {
    case "SETFVALUE":
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};

const FormContext = createContext<FormInstance<any> | undefined>(undefined);

export { FormContext };

export const useForm = <Values = any>(
  form?: FormInstance<Values>
): [FormInstance<Values>] => {
  const [store, dispatch] = useReducer(formReducer, {});
  const callbacksRef = useRef<Callbacks>({});
  const [validateRules, setValidateRules] = useState<validateRules>({});
  const [errors, setErrors] = useState<ValidateError[]>([]);

  if (form) {
    return [form];
  }

  const getFieldsValue = () => store as Values;
  const getFieldValue = (name: NamePath) => store[name];
  const setFieldsValue = (newStore: Store) => {
    Object.entries(newStore).forEach(([name, value]) => {
      dispatch({
        type: "SETFVALUE",
        payload: {
          name: name,
          value: value,
        },
      });
    });
  };

  const setCallbacks = (callbacks: Callbacks) => {
    callbacksRef.current = callbacks;
  };

  const setValidateFieldsRules = (name: string, rules: Rule) => {
    setValidateRules({ ...validateRules, [name]: rules });
  };

  const validateFields = async () => {
    const values = getFieldsValue() as Store;
    const newErrors: ValidateError[] = [];

    Object.entries(validateRules).forEach(([name, rules]) => {
      const value = values[name];
      console.log(value);

      // 处理required规则
      if (rules.required && !value || value === undefined || value === null) {
        newErrors.push({
          name,
          message: rules.message || `${name} is required`,
        });
      }

      // 处理类型校验
      if (rules.type === "email" && !/\S+@\S+\.\S+/.test(value)) {
        newErrors.push({
          name,
          message: rules.message || "Invalid email format",
        });
      }

      // 处理长度校验
      if (rules.minLength && value?.length < rules.minLength) {
        newErrors.push({
          name,
          message:
            rules.message ||
            `${name} must be at least ${rules.minLength} characters`,
        });
      }

      // 处理正则表达式校验
      if (rules.pattern && !rules.pattern.test(value)) {
        newErrors.push({
          name,
          message: rules.message || `${name} format is invalid`,
        });
      }
    });

    setErrors(newErrors);
    console.log(newErrors);
    return newErrors.length === 0
      ? Promise.resolve(values as Values)
      : Promise.reject(newErrors);
  };

  const getFieldsError = () => {
    return errors;
  };

  const submit = () => {
    validateFields()
      .then(() => {
        console.log('Success:\n');
        callbacksRef.current.onFinish?.(getFieldsValue());
      })
      .catch((errors) => {
        // console.log(errors+':\n');
        // callbacksRef.current.onFinishFailed?.(getFieldsValue());
        callbacksRef.current.onFinishFailed?.(errors);
      });
  };

  const formInstance: FormInstance<Values> = {
    getFieldValue,
    submit,
    getFieldsValue,
    setCallbacks,
    setFieldsValue,
    setValidateFieldsRules,
    validateFields,
    getFieldsError,
  };
  // console.log(formInstance);

  return [formInstance];
};

export const useFormContext = <Values = any>(): FormInstance<Values> => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext should be used within a FormProvider");
  }
  return context as FormInstance<Values>;
};

import { useReducer, createContext, useContext, useRef, useState } from "react";

export type StoreValue = any;
export type Store = Record<string, StoreValue>;
export type NamePath = string | number;

//error测验规则
export type validateRules = Record<string, Rule>;

export interface ValidateError {
  name: string;
  message: string;
}

export interface Rule {
  required?: boolean; //是否必填
  minLength?: number; //最小长度
  maxLength?: number; //最大长度
  pattern?: RegExp; //正则表达式匹配
  type?: "email" | "url"; //类型校验
  message?: string; //自定义错误信息
}

export interface Callbacks<Values = any> {
  onFinish?: (values: Values) => void;
  onFinishFailed?: (error: Values) => void;
}

export interface FormInstance<Values = any> {
  getFieldValue: (name: NamePath) => StoreValue;
  submit: () => void;
  getFieldsValue: () => Values;
  setFieldsValue: (newStore: Store, type: "SETFVALUE" | "INITIALIZE") => void;
  setCallbacks: (callbacks: Callbacks) => void;
  validateFields: () => Promise<Values>;
  setValidateFieldsRules: (name: string, rules: Rule) => void;
  getFieldsError: () => ValidateError[];
}

type Action =
  | { type: "SETFVALUE"; payload: { name: NamePath; value: StoreValue } }
  | { type: "SETCALLBACKS"; payload: Callbacks }
  | { type: "SUBMIT" }
  | { type: "INITIALIZE"; payload: { initialValues: Store } };

/**
 * 表单状态管理器
 *
 * @param state 当前表单状态
 * @param action 需要执行的动作
 * @returns 更新后的表单状态
 */
const formReducer = (state: Store, action: Action): Store => {
  switch (action.type) {
    case "SETFVALUE":
      return { ...state, [action.payload.name]: action.payload.value };
    case "INITIALIZE":
      return action.payload.initialValues;
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

  const getFieldsValue = () => store as Values; // 获取所有表单值
  const getFieldValue = (name: NamePath) => store[name]; // 获取单个表单值

  /**
   * 设置字段值
   *
   * @param newStore 要设置的值，类型为 Store 类型
   * @param type 设置值的类型，可选值为 "SETFVALUE" 或 "INITIALIZE"
   */
  const setFieldsValue = (
    newStore: Store,
    type: Action["type"] = "SETFVALUE"
  ) => {
    if (type === "INITIALIZE") {
      dispatch({ type: "INITIALIZE", payload: { initialValues: newStore } });
      return;
    } else if (type === "SETFVALUE") {
      setErrors(() => errors.filter((error) => !Object.keys(newStore).includes(error.name)))
      Object.entries(newStore).forEach(([name, value]) => {
        dispatch({
          type: "SETFVALUE",
          payload: {
            name: name,
            value: value,
          },
        });
      });
    } else {
      throw new Error("Invalid type for setFieldsValue");
    }
  };

  const setCallbacks = (callbacks: Callbacks) => {
    callbacksRef.current = callbacks;
  };

  const setValidateFieldsRules = (name: string, rules: Rule) => {
    setValidateRules((preValidateRules) => {
      const newRules = Object.assign({}, preValidateRules);
      newRules[name] = rules;
      return newRules;
    });
  };

  const validateFields = async () => {
    const values = getFieldsValue() as Store;
    const newErrors: ValidateError[] = [];
    // console.log(validateRules);
    setErrors([]);

    Object.entries(validateRules).forEach(([name, rules]) => {
      const value = values[name];

      // 处理required规则
      if ((rules.required && !value) || value === undefined || value === null) {
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
        console.log("Success:\n");
        callbacksRef.current.onFinish?.(getFieldsValue());
      })
      .catch((errors) => {
        console.log("Failed:\n");
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

  return [formInstance];
};

export const useFormContext = <Values = any>(): FormInstance<Values> => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext should be used within a FormProvider");
  }
  return context as FormInstance<Values>;
};

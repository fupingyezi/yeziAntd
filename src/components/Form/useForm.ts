import { useReducer, createContext, useContext, useRef } from "react";

export type StoreValue = any;
export type Store = Record<string, StoreValue>;
export type NamePath = string | number;

export interface Callbacks<Values = any> {
    onFinish?: (values: Values) => void;
};

export interface FormInstance<Values = any> {
    getFieldValue: (name: NamePath) => StoreValue;
    submit: () => void;
    getFieldsValue: () => Values;
    setFieldsValue: (newStore: Store) => void;
    setCallbacks: (callbacks: Callbacks) => void;
};

type Action =
    | { type: "SETFVALUE"; payload: { name: NamePath; value: StoreValue } }
    | { type: "SETCALLBACKS"; payload: Callbacks }
    | { type: "SUBMIT" }
    
const formReducer = (state: Store, action: Action): Store => {
    switch (action.type) {
        case 'SETFVALUE':
            return { ...state, [action.payload.name]: action.payload.value };
        default:
            return state;
    }
}

const FormContext = createContext<FormInstance<any> | undefined>(undefined);

export const useForm = <Values = any>(): [FormInstance<Values>] => {
    const [store, dispatch] = useReducer(formReducer, {});
    const callbacksRef = useRef<Callbacks>({});

    const getFieldsValue = () => store;
    const getFieldValue = (name: NamePath) => store[name];
    const setFieldsValue = (newStore: Store) => {
        dispatch({ type: "SETFVALUE", payload: { name: 'all', value: newStore } });
    }

    const setCallbacks = (callbacks: Callbacks) => {
        callbacksRef.current = callbacks;
    }

    const submit = () => {
        const { onFinish } = callbacksRef.current;
        if (onFinish) {
            onFinish(getFieldsValue);
        }
    }

    const formInstance: FormInstance<Values> = {
        getFieldValue,
        submit,
        getFieldsValue,
        setCallbacks,
        setFieldsValue,
    };
    
    return [formInstance];
} 
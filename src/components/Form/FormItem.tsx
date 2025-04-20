import React, {useContext} from "react";
import './Form.scss';
import { ValidateErrors } from "./Form";

export interface FormItemProps {
    name: string;
    label?: string;
    valuePropName?: string;
    getValueFormEvent?: (e) => void;
    rules?: CustomRules[];
    required?: boolean;
}

const FormItem: React.FC<FormItemProps> = ({
    name,
    label,
    valuePropName,
    getValueFormEvent,
    rules,
    required,
}) => {
    return (
        
    )
}

export default FormItem;
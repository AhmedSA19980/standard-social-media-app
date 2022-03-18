/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React,{InputHTMLAttributes,HTMLInputTypeAttribute,ForwardRefRenderFunction,forwardRef} from "react"
import { useField } from "formik";


export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: string;
  label: string;
  htmlFor: string;
  //value: string;
 // onChange: ()=> void;
  ErrMsg: string;
}

//* i did use forwardREf cause i want to pass ref={} to child component


export const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  id,
  type,
  label,
  htmlFor,
  value,
  onChange,
  ErrMsg,
  ...props
}) => {
  //const [field,{error}] = useField(props)
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        //ref={ref}
        type={type}
        placeholder={label}
        // value={value}
        // onChange={onChange}
        
        {...props}
      />
      <p><small> {ErrMsg}</small></p>
    </div>
  );
};


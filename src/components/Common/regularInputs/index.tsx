import React from "react";

interface InputProps {
  type?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  onChange?: any,
  id?:any
  value?: any
  checked?:any
  className?:string;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, label, onChange, value, id,checked,className }): JSX.Element => {
  return (
      <div className="relative">
        <input
          type={type}
          name={name}
          id= {id ? id: "hs-floating-input-email"}
          className={`peer p-4 block w-full border-2 rounded-lg  border-gray-200  text-sm  ${className}`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          checked={checked}
        />
  
        <label className=" h-full text-base font-semibold " >
          {label}
        </label>
      </div>
  );
};

export default Input;

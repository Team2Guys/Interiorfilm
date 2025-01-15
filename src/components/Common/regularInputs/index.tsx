"use client"
import React, { useState } from "react";
import { FaRegEye,FaRegEyeSlash  } from "react-icons/fa6";


interface InputProps {
  type?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  onChange?: any;
  id?: any;
  value?: any;
  checked?: any;
  className?: string;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, label, onChange, value, id, checked, className }): JSX.Element => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <div className="relative">
      <input
        type={inputType}
        name={name}
        id={id ? id : "hs-floating-input-email"}
        className={`peer p-4 block w-full border-2 rounded-lg border-gray-200 text-sm ${className}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        checked={checked}
      />
      {type === 'password' && (
        <span
          className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {inputType === 'password' ? <FaRegEye  /> : <FaRegEyeSlash className="text-primary" />}
        </span>
      )}
      <label className="h-full text-base font-semibold">
        {label}
      </label>
    </div>
  );
};

export default Input;

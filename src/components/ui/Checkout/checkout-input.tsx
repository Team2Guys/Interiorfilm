import React from 'react';

interface InputProps {
    label: string;
  type: string;
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const CheckoutInput: React.FC<InputProps> = ({
  type,
  name,
  id,
  value,
  onChange,
  label,
  placeholder
}) => {
  return (
    <>
      <label className='text-lightdark whitespace-nowrap' htmlFor={id}>
        {label} <span className="text-red">*</span>
      </label>
      <input
        type={type}
        className="border-[#D2D2D2] border shadow-0 outline-0 p-2 mt-5"
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default CheckoutInput;

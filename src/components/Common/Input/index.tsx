
'use client'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import React, { useState } from "react";


interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  onChange: any,
  Icons?: any,
  iconClassName?:string
  id?:any
  value?: any
  checked?:any
  showPassword?: boolean
  togglePasswordVisibility? : any
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, onChange, value,Icons, }: InputProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (

  <div className="space-y-3 w-full">
    <div className="relative w-full">
      <input type={ type === "password" ? (showPassword ? 'text': type): type} name={name} onChange={onChange} value={value} className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-gray border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus-visible:outline-none focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none text-dark" style={{ fontFamily: 'none' }} placeholder={placeholder} />
      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
<Icons  width={24} height={24}
 className ='text-[#c62131]'/>

      </div>

      {type === "password" && (
          <div
            className="absolute inset-y-0 end-0 flex items-center cursor-pointer pe-2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <IoMdEyeOff size={24} className='text-[#c62131]' />
            ) : (
              <IoMdEye size={24} className='text-[#c62131]' />
            )}
          </div>
        )}
    </div>

  </div>

  );
};

export default Input;

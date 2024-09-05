"use client"

import { ButtonHTMLType } from "antd/es/button";
import React from "react";

interface ButtonProps {
  title?: any;
  className?: string; 
  onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void;
  value?: any;
  icon?:any;
type?:any
disable?:boolean | null | undefined

}

const Button: React.FC<ButtonProps> = ({
  title,
  className,
  onClick,
  value,
  icon,
  type,
  disable
}) => {
  return (
    <button  onClick={onClick} value={value} type={type} disabled={disable ? true : false} className={`${className}  p-2 px-20`}>
      {title}{icon}
    </button>
  );
};

export default Button;

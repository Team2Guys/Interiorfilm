import React from 'react';

// Define the props interface
interface ButtonProps {
  title: any;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Correct typing for onClick
  disabled?:boolean
}

// Properly type the Button component using the props interface
const Button: React.FC<ButtonProps> = ({ title, className, onClick,disabled }) => {
  return (
    <button className={`bg-primary text-white p-2 ${className}`} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;

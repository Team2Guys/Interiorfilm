import React from 'react';

// Define the props interface
interface ButtonProps {
  title: any;
  className?: string;
}

// Properly type the Button component using the props interface
const Button: React.FC<ButtonProps> = ({ title, className }) => {
  return (
    <button className={`bg-primary text-white p-2 ${className}`}>
      {title}
    </button>
  );
};

export default Button;

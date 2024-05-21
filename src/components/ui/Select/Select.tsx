"use client"
import React from 'react';
import { Select } from 'antd';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectListProps {
  options: Option[];
  className?: string;
  defaultValue: string;
}

const SelectList: React.FC<SelectListProps> = ({ options,className,defaultValue }) => {
  return (
    <Select
    className={`${className}`}
      defaultValue={defaultValue}
      onChange={handleChange}
      options={options}
    />
  );
};

export default SelectList;

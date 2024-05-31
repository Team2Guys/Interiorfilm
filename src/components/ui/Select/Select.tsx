'use client'
import React from 'react';
import { Select } from 'antd';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectListProps {
  options: Option[];
  className?: string;
  defaultValue: any;
  onChange: (value: string) => void;
}

const SelectList: React.FC<SelectListProps> = ({ options, className, defaultValue, onChange }) => {
  return (
    <Select
      className={className}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
    />
  );
};

export default SelectList;

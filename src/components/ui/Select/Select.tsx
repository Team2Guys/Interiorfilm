'use client'
import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd';

interface SelectListProps extends SelectProps {
  value?:string | any,
  label?:string |any
}

const onSearch = (value: string) => {
  console.log('search:', value);
};
const SelectList: React.FC<SelectListProps> = ({ options, className, defaultValue, onChange}) => {
  return (
    <Select
      showSearch
      onSearch={onSearch}
      className={className}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
    />
  );
};

export default SelectList;

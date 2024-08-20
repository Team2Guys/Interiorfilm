'use client';
import React from 'react';
import { message, Select } from 'antd';
import { SelectProps } from 'antd';

interface ProductSelectProps extends SelectProps {
  value?: string | any,
  label?: string | any,
  stockQuantity: number;  // Add this to pass total stock quantity
  options?:any
  length?: number;  
}

const ProductSelect: React.FC<ProductSelectProps> = ({ options, className, onChange, stockQuantity,length }) => {
  const handleChange = (value: any) => {
    const selectedValue = Number(value);
    if (selectedValue > stockQuantity) {
     return message.error(`Please select a value less than or equal to the total stock (${stockQuantity})`);
    } else {
      if (onChange) {
        onChange(value, options);
      }
    }
  };

  return (
    <Select
      // mode='tags'
      showSearch
      onSearch={(value) => console.log('search:', value)}
      className={className}
      placeholder="Please select size"
      onChange={handleChange}
      options={options}
      // value={length && length > 0 ?length : '' }
      maxCount={1}
    />
  );
};

export default ProductSelect;

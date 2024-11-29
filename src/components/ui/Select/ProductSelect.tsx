'use client';

import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd';

interface ProductSelectProps extends SelectProps {
  options: any;
  length?: number;
}



const ProductSelect: React.FC<ProductSelectProps> = ({
  options,
  className,
  onChange,
  length,
  ...props
}) => {
  return (
    <Select 
      showSearch
      className={className}
      placeholder="Select Size"
      onChange={onChange}
      options={options}
      value={length}  
      {...props}
    />
  );
};

export default ProductSelect;

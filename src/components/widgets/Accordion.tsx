
import ProductCollapse from 'components/ui/Collapse/productCollpase';
import React, { useState } from 'react'
import PRODUCTS_TYPES from 'types/interfaces';

interface accordionprop {
  detail: PRODUCTS_TYPES[] | any;
}

const Accordion: React.FC<accordionprop> = ({ detail }: any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      {detail?.map((item: any, index: any) => (
        <>
            <React.Fragment key={index}>
              <ProductCollapse isOpen={openIndex === index}
                onClick={() => handleToggle(index)} title={item.name} titleClass="text-[14px]"  className=" py-4 border-t border-stone-200">
                <p className="text-[14px]">{item.detail}</p>
              </ProductCollapse>
            </React.Fragment>
            
        </>
      ))}

    </>

  )
}

export default Accordion
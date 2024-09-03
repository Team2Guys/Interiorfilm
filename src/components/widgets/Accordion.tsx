
import ProductCollapse from 'components/ui/Collapse/productCollpase';
import React, { useState } from 'react'
import PRODUCTS_TYPES from 'types/interfaces';

interface accordionprop {
  detail?: PRODUCTS_TYPES[];
}

const Accordion:React.FC<accordionprop> = ({detail}:any)=> {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
   {detail?.map((item:any, index:any) => (
            <>
    <div className='px-4 md:px-0'>
        <React.Fragment key={index}>
          <ProductCollapse isOpen={openIndex === index}
          onClick={() => handleToggle(index)} title={item.name} titleClass="text-13" className=" py-4 border-t border-stone-200">
            <p className="text-13">{item.detail}</p>
          </ProductCollapse>
        </React.Fragment>
      <hr className=" h-1 border-stone-200" />
    </div>
            </>
      ))}

    </>

  )
}

export default Accordion
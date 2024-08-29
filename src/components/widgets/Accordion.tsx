
import ProductCollapse from 'components/ui/Collapse/productCollpase';
import React, { useState } from 'react'
import PRODUCTS_TYPES from 'types/interfaces';

interface accordionprop {
  detail?: PRODUCTS_TYPES[];
}

const Accordion:React.FC<accordionprop> = ({detail})=> {

  console.log(detail,"detaildetaildetail")
      // Track the index of the currently open Collapse item
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    // If the clicked item is already open, close it. Otherwise, open it.
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className='px-4 md:px-0'>
          {detail?.map((item:any, index:any) => (
        <React.Fragment key={index}>
          <ProductCollapse isOpen={openIndex === index}
          onClick={() => handleToggle(index)} title={item.name} titleClass="text-13" className="border-t py-4 border-stone-200">
            <p className="text-13">{item.detail}</p>
          </ProductCollapse>
        </React.Fragment>
      ))}
      <hr className=" h-1 border-stone-200" />
    </div>
  )
}

export default Accordion
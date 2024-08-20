
import Collapse from 'components/ui/Collapse/Collapse'
import ProductCollapse from 'components/ui/Collapse/productCollpase';
import { collapseData } from 'data/Data'
import React, { useState } from 'react'

const Accordion = () => {
      // Track the index of the currently open Collapse item
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    // If the clicked item is already open, close it. Otherwise, open it.
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div>
          {collapseData.map((item, index) => (
        <React.Fragment key={index}>
          <ProductCollapse isOpen={openIndex === index}
          onClick={() => handleToggle(index)} title={item.title} titleClass="text-13" className="border-t py-4 border-stone-200">
            <p className="text-13">{item.content}</p>
          </ProductCollapse>
        </React.Fragment>
      ))}
      <hr className=" h-1 border-stone-200" />
    </div>
  )
}

export default Accordion
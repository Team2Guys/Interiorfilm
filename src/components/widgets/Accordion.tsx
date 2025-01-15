import ProductCollapse from "components/ui/Collapse/productCollpase";
import { productAccordion } from "data/ProductAccordion";
import React, { useState } from "react";



const Accordion = () =>
  {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };
    return (
      <>
        {productAccordion.map((item: any, index: any) => (
          <>
            <React.Fragment key={index}>
              <ProductCollapse
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
                title={item.name}
                titleClass="font-semibold text-[18px] capitalize"
                className=" py-4 border-t border-stone-200 "
              >
                <p className="text-[15px]">{item.title}</p>
                {
                  item.details.map((detail: any, index: any) => (
                <div className="border-b-2 py-5 border-[#F9F9F8]" key={index}>
                    <p className="text-[15px]">
                      {detail}
                    </p>
                    </div>
                  ))
                }
              </ProductCollapse>
            </React.Fragment>
          </>
        ))}
      </>
    );
  };

export default Accordion;

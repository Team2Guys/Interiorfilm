"use client";
import { useState } from "react";
import Accordion from "components/widgets/Accordion";
import ProductCollapse from "components/ui/Collapse/productCollpase";
import Container from "components/Layout/Container/Container";
import Image from "next/image";
import { AccordionsArray } from "data/sideMenuData";




function HomeAccordian() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <Container>
      <div className="grid grid-cols-1 gap-10 mt-10 md:grid-cols-2">
        <div>
          <Image
            src="/images/AcccodianImage.png"
            alt="Accordian Image"
            className="object-cover w-full h-full"
            height={1000}
            width={1000}
          />
        </div>

        <div className="">
          <h3 className="font-futura font-bold text-3xl mb-8 text-center  md:text-start" >
            Lorem Ipsum Dolor
          </h3>
          {AccordionsArray.map((item, index) => {
            return (
           <div className="cursor-pointer group" onClick={() => handleToggle(index)}  key={index}>
               <ProductCollapse
               
                isOpen={openIndex === index}
                isHome={true}
                onClick={() => handleToggle(index)}
                title={item.Title}
                titleClass={`font-futura group-hover:text-primary ${
                  openIndex === index ? "font-bold text-primary" : "font-normal"
                }`}
                className="flex flex-col sm:flex-row gap-2 items-start sm:items-center my-3"
                Icon={item.Icon}
              >
                <p className="text-[14px] text-para">{item.Description}</p>
              </ProductCollapse>
           </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default HomeAccordian;

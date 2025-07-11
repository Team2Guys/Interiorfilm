"use client";
import { useState } from "react";
import ProductCollapse from "components/ui/Collapse/productCollpase";
import Container from "components/Layout/Container/Container";
import Image from "next/image";
import { AccordionsArray } from "data/sideMenuData";
import Kitchen from "../../../public/images/testimonial/Kitchen.jpg"
import Hotel from "../../../public/images/testimonial/Hotel.jpg"
import Office from "../../../public/images/testimonial/Office.jpg"
import Restaurant from "../../../public/images/testimonial/Restaurant.jpg"
import Furniture from "../../../public/images/testimonial/Furniture.jpg"
const accordionImages = [
  Kitchen,
  "/images/testimonial/bath.jpg",
  Hotel,
  Office,
  Restaurant,
  Furniture,
];


function HomeAccordian() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <Container>
      <div className="grid grid-cols-1 gap-10 mt-10 md:grid-cols-2">
        <div className="h-[300px] md:h-[600px]">
          <Image
            src={accordionImages[openIndex || 0]}
            alt="Accordian Image"
            className="object-cover !relative"
            loading="lazy"
            fill
          />
        </div>

        <div className="">
          <h2 className="font-futura font-bold text-3xl mb-8 text-center  md:text-start" >
          Wrap Any Of These Areas ?
          </h2>
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

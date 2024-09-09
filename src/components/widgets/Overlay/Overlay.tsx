import { Breadcrumb } from "antd";

import Image from "next/image";
import Link from "next/link";
import React from "react";


interface OverlayProps {
  title: string;
  bodyText?: string
}

const data = [
  {
    name: "SHIPPING ADDRESS",
    src: '/images/shiping.png'
  },
  {
    name: "PAYMENT INFORMATION",
    src: '/images/payement.png'
  },
  {
    name: "THANK YOU",

    src: '/images/thankyou.png'
  },

]


const Overlay: React.FC<OverlayProps> = ({ title, bodyText }) => {
  let overLay = ['cart', "shop"]
  let uiFlag = overLay.includes(title.toLowerCase());




  return (
    <div className={`${uiFlag ? "bg-white" : "bg-black"} w-full h-auto bg-no-repeat py-5  text-center`}>

      {
        title == "show_details" ?
          <div className="bg-black py-5 gap-5 flex justify-center items-center">
            {data.map((item, index) => {
              return (
                <div key={index} className="flex items-center gap-4">
                  <Image src={item.src} alt="shipping image" height="20" width="20" />
                  <p className="text-white">{item.name}</p>
                  {index !== data.length - 1 && (
                    <div className="w-10 h-px bg-white"></div>
                  )}
                </div>
              );
            })}
          </div> :
          
          <h1 className={`text-3xl font-medium ${uiFlag ? "text-black" : "text-white"} flex justify-center items-center gap-3 leading-loose uppercase`}>
            <Link href='/'>
 
            <span className="cursor-pointer">
                <svg className={`${uiFlag ? "fill-black" : "fill-white"}`} width="55" height="31" viewBox="0 0 55 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M54.6404 14.3224H4.87739L17.3712 1.82617L15.7027 0.157654L0.360352 15.5024L15.7004 30.8424L17.3689 29.1739L4.87739 16.6824H54.6404V14.3224Z" />
</svg>


              </span>
            </Link>

            {title}</h1>
      }







      <Breadcrumb
        className="flex justify-center"
        items={[

          {
            title: <p className="text-white uppercase">{bodyText}</p>,
          },
        ]}
      />
    </div>
  );
};

export default Overlay;

import { Breadcrumb } from "antd";
import Link from "next/link";
import React from "react";

interface OverlayProps {
  title?: string;
  bodyText?: string
}

const Overlay: React.FC<OverlayProps> = ({ title, bodyText }) => {
  return (
    <div className=" bg-black w-full h-auto bg-no-repeat py-5  text-center">
      <h1 className="text-3xl font-medium text-white flex justify-center items-center gap-3 leading-loose uppercase">
        <Link href='/'>

          <span className="cursor-pointer">   <svg width="55" height="31" viewBox="0 0 55 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M54.6394 14.3224H4.87641L17.3703 1.82617L15.7017 0.157654L0.359375 15.5024L15.6994 30.8424L17.3679 29.1739L4.87641 16.6824H54.6394V14.3224Z" fill="white" />
          </svg></span>


        </Link>

        {title}</h1>
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

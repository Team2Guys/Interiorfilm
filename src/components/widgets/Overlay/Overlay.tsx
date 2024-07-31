import { Breadcrumb } from "antd";
import Link from "next/link";
import React from "react";

interface OverlayProps {
  title: string;
}

const Overlay: React.FC<OverlayProps> = ({ title }) => {
  return (
    <div className=" bg-[#EFEFEF] w-full h-auto bg-no-repeat py-5  text-center">
      <h1 className="text-3xl font-medium text-[#535353] leading-loose uppercase">{title}</h1>
      <Breadcrumb
        className="flex justify-center"
        items={[
          {
            title: <Link href="/">Home</Link>,
          },
          {
            title: <p className="text-primary">{title}</p>,
          },
        ]}
      />
    </div>
  );
};

export default Overlay;

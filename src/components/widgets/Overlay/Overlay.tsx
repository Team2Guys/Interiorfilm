import { Breadcrumb } from "antd";
import Link from "next/link";
import React from "react";

const Overlay = () => {
  return (
    <div className="bg-overlay object-contain bg-cover w-full h-auto bg-no-repeat pt-20 text-center">
      <h1 className="text-3xl font-medium leading-loose uppercase">Product</h1>
      <Breadcrumb
      className="flex justify-center pb-20"
        items={[
          {
            title: <Link href="/">Home</Link>,
          },
          {
            title: "Product",
          },
        ]}
      />
    </div>
  );
};

export default Overlay;

import Container from "components/Layout/Container/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import img from "../../../public/images/CA107.png";
interface OrderDetail {
  shippingAddress: string;
  billingAddress: string;
  shippingMethod: string;
  paymentMethod: string;
}

const orderDetails: OrderDetail[] = [
  {
    shippingAddress: "123 Dummy St, City, Country",
    billingAddress: "456 Fake Rd, City, Country",
    shippingMethod: "Standard Shipping",
    paymentMethod: "Credit Card",
  },
];
const ViewOrder = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10 max-w-screen-lg mx-auto">
      <div className="">
        <div className=" max-w-screen-sm mx-auto">
          <div className="space-y-3">
            <div>
              <p className="font-medium text-23">Login To View</p>
              <p className="text-14">
                Login To View Login To ViewLogin To View
              </p>
            </div>
            <div className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-5 w-full">
                <input
                  className="w-full rounded-md p-2 border border-gray"
                  name="email"
                  placeholder="Email"
                  type="email"
                  id={"email"}
                />
              </div>
              <div className="col-span-5">
                <input
                  className="w-full rounded-md p-2 border border-gray"
                  name="ordernumber"
                  placeholder="Order Number"
                  type="ordernumber"
                  id={"ordernumber"}
                />
              </div>
              <div className="col-span-2">
                <button className="bg-black text-white px-4 py-2 rounded-md w-full">
                  Login
                </button>
              </div>
            </div>
          </div>

          <div className="border border-gray p-2 rounded-md mt-10">
            <p className="font-medium text-23">
              Lorem Ipsum is simply dummy te
            </p>
            <p className="text-14">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="border border-gray p-2 rounded-md mt-10">
            <p className="font-medium text-23">Order Detail</p>
            <div className="grid grid-cols-6 gap-4">
              {orderDetails.map((detail, index) => (
                <React.Fragment key={index}>
                  <div className="col-span-6 ">
                    <p className="text-18 font-medium">Shipping Address</p>
                    <p className="text-14">{detail.shippingAddress}</p>
                  </div>
                  <div className="col-span-3 ">
                    <p className="text-18 font-medium">Shipping Method</p>
                    <p className="text-14">{detail.shippingMethod}</p>
                  </div>
                  <div className="col-span-3 ">
                    <p className="text-18 font-medium">Payment Method</p>
                    <p className="text-14">{detail.paymentMethod}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-center mt-5">
            <p className="text-light font-semibold">
              Need help?{" "}
              <Link className="text-black" href="/contact">
                Contact Us
              </Link>
            </p>
            <Link className="bg-black text-white px-4 py-2" href="/">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <div className=" space-y-3">
        <div className="flex gap-2 mt-1">
          <Image
            className="w-[80px] h-[80px] object-cover rounded-md"
            width={200}
            height={200}
            src={img}
            alt="img"
          />
          <div>
            <p>Lorem Ipsum is simply dummy text of the printing and dummy </p>
            <div className="flex justify-between">
              <p className="font-medium text-lightdark">Category Name</p>
              <p>
                AED<span>200</span>
              </p>
            </div>
            <p className="font-medium">
              Quantity: <span>2</span>
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <p className="text-18 font-semibold">Subtotal</p>
            <p>
              AED<span>200</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-18 font-semibold">Shipping Fee</p>
            <p>
              AED<span>200</span>
            </p> 
          </div>
        </div>
        <hr />
        <div className="flex justify-between">
          <p className="text-18 font-semibold">Total</p>
          <p>
            AED<span>4500</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;

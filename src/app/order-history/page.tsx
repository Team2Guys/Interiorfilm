import Container from "components/Layout/Container/Container";
import Overlay from "components/widgets/Overlay/Overlay";
import React from "react";
import order from "../../../public/images/KW124.png";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import Link from "next/link";

const OrderHistory = () => {
  return (
    <>
      <Overlay title="Order History" />
      <Container className="my-10">
        <div className="border border-gray shadow rounded-md p-2 md:p-4">
          <div className="flex gap-10 items-center border-b-2 border-gray">
            <div>
              <p className="font-semibold ">Date placed</p>
              <p className="font-medium ">Jul 6, 2021</p>
            </div>
            <div>
              <p className="font-semibold ">Total amount</p>
              <p className="font-medium ">
                <span>AED</span>200
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 my-2 gap-4 items-center">
            <div className="col-span-12 md:col-span-2">
              <Image
                className="rounded-lg w-[120px] h-[120px] md:w-full md:h-full"
                width={300}
                height={300}
                src={order}
                alt="order"
              />
            </div>
            <div className="col-span-12  md:col-span-10 2xl:space-y-2">
              <p className="font-bold">Micro Backpack</p>
              <p className="font-medium">
                <span>AED</span>70
              </p>
              <p className="text-12">
                Are you a minimalist looking for a compact carry option The
                Micro Backpack is the perfect size for your essential everyday
                carry items. Wear it like a backpack or carry it like a satchel
                for all-day use.
              </p>
              <div className="flex gap-2 items-center text-12 sm:text-base">
                <div className="w-4 h-4 rounded-full bg-[#22C55E]">
                  <TiTick className="text-white" />
                </div>
                  <p>Delivered on</p>
                  <p>July 12, 2021</p>
              </div>
              <div className="">
              <Link  className="text-primary" href={"/"}>View product</Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OrderHistory;

import Image from 'next/image';
import React from 'react';

const OrderCompleted = () => {
  return (
    <div className=" py-20 flex flex-col items-center justify-center">
      <Image src="/images/tick.png" alt="Order Completed" width={128} height={128} className=" lg:w-32 w-28 mb-4" />
      <h1 className="lg:text-2xl text-1xl font-bold mt-4">Your Order Is Completed!</h1>
      <p className="text-gray-600 mt-2 lg:w-1/2 lg:px-0 px-9 mx-auto text-center leading-6">Thank you for your order! Your order is being processed and will be completed within 3-6 hours. You will receive an email confirmation when your order is completed.</p>
    </div>
  );
};

export default OrderCompleted;

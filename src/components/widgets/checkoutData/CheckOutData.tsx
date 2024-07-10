import Image from 'next/image';
import checkoutimg from '../../../../public/images/img-1.png';
import React from 'react';
import Link from 'next/link';

interface Item {
  name: string;
  price: string;
  color: string;
  size: string;
}

export const items: Item[] = [
  { name: "Basic Korean-style Bag", price: "£219.00", color: "Brown", size: "XL" },
  { name: "Gray Italian Raincoat", price: "£321.00", color: "Brown", size: "XL" },
  { name: "T-shirt & White Pant", price: "£119.00", color: "Brown", size: "XL" },
  { name: "Italian Hanging Clock", price: "£213.00", color: "Brown", size: "XL" },
  { name: "Bata Leather black Shoe", price: "£354.00", color: "Brown", size: "XL" },
];

const CheckoutData: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-top border-b border-gray pb-2">
            <div className="flex gap-2">
              <Image width={10} height={10} src={checkoutimg} alt="Interior Film" className="w-14" />
              <div>
                <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                <p className="text-sm text-gray-600 text-[12px]">Color: {item.color}</p>
                <p className="text-sm text-gray-600 text-[12px]">Size: {item.size}</p>
              </div>
            </div>
            <p className="font-medium text-gray-900 text-sm">{item.price}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-gray pt-4">
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">Subtotal:</p>
          <p className="font-medium text-gray-900">£381.00</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">Shipping:</p>
          <p className="font-medium text-gray-900">Calculated at checkout</p>
        </div>
        <div className="flex justify-between font-bold">
          <p className="text-gray-900">Total:</p>
          <p className="text-gray-900">£381.00</p>
        </div>
      </div>
      <Link href="/checkout"className="w-full bg-red-600 text-white py-3 mt-6 rounded-md text-center block">
        Proceed To Checkout
      </Link>
    </div>
  );
};

export default CheckoutData;

"use client"
import CheckoutData from 'components/widgets/checkoutData/CheckOutData';
import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

const onChangeCheck: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
const CheckOut: React.FC = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [total, setTotal] = useState(0);

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(existingCart);
    calculateTotals(existingCart);
  }, []);

  const calculateTotals = (items:any) => {
    const sub = items.reduce((acc:any, item:any) => {
      const price = item.discountPrice ? item.discountPrice : item.price;
      return acc + (price * item.count * item.length); // Adjusted to calculate total price considering item count and length
    }, 0);
    setSubtotal(sub);
    const shipping = sub < 100 ? 30 : 0;
    setShippingCharges(shipping);
    setTotal(sub + shipping);
  };

  const handleCartChange = (updatedCart:any) => {
    setCartItems(updatedCart);
    calculateTotals(updatedCart);
  };
  return (
    <div className="lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div className="md:col-span-2 bg-white p-6 shadow-2 border border-shade rounded-md space-y-10 px-8 ">
            <div className="flex justify-between flex-wrap">
              <h2 className="lg:text-[25px] text-base font-medium text-[#3A393C] lg:mb-4">Contact Information</h2>
            </div>
              <input
                type="text"
                placeholder="Email or mobile phone number"
                className="w-full border border-gray border-t-0 border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2"
              />
             <Checkbox onChange={onChangeCheck}>Keep me up to date on news and exclusive offers</Checkbox>

            <h2 className="text-[25px] font-medium text-[#3A393C] mb-4 pt-5 lg:pt-20">Shipping address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name (optional)"
                className="border border-t-0 border-gray border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2"
              />
              <input
                type="text"
                placeholder="Last name"
                className="border border-t-0 border-gray border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2"
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              className="w-full border border-t-0 border-gray border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2 mt-6"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc (optional)"
              className="w-full border border-t-0 border-gray border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2 mt-6"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full border border-t-0 border-gray border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2 mt-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <input
                type="text"
                placeholder="Bangladesh"
                className="border border-t-0 border-gray border-l-0 border-r-0 shadow-0 outline-0 border-b border-gray-300 p-2"
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="border-t-0 border-gray border-l-0 border-r-0 border-b border-gray-300 shadow-0 outline-0 p-2"
              />
            </div>
          </div>
          <div>

          <CheckoutData cartdata={cartItems} onCartChange={handleCartChange}/>
        </div>
          
        </div>
    </div>
  );
};

export default CheckOut;

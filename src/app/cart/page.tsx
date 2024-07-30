//@ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import Button from 'components/Common/Button';
import Container from 'components/Layout/Container/Container';
import Table from 'components/ui/Table/Table'; // Update with correct path to your Table component
import Overlay from 'components/widgets/Overlay/Overlay';
import Link from 'next/link';
import SelectList from 'components/ui/Select/Select';
import { options } from 'data/Data';

const Cart = () => {
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

  const calculateTotals = (items) => {
    const sub = items.reduce((acc, item) => {
      const price = item.discountPrice ? item.discountPrice : item.price;
      return acc + (price * item.count * item.length); // Adjusted to calculate total price considering item count and length
    }, 0);
    setSubtotal(sub);
    const shipping = sub < 100 ? 30 : 0;
    setShippingCharges(shipping);
    setTotal(sub + shipping);
  };

  const handleCartChange = (updatedCart) => {
    setCartItems(updatedCart);
    calculateTotals(updatedCart);
  };

  return (
    <>
      <Overlay title="Shopping Cart" />
      <div className="mt-10 max-w-screen-3xl mx-auto px-2 md:px-8 mb-20">
        {cartItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center space-y-3">
            <p className='text-2xl'>Your cart is empty.</p>
            <div>
              <Link className='underline' href={"/product"}>Continue Shopping</Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap md:flex-nowrap md:gap-10">
            <div className="w-full md:w-9/12">
              <Table cartdata={cartItems} onCartChange={handleCartChange} />
              <div className='mt-4'><Link className='bg-dark p-3 text-white' href={"/"}>Continue Shopping</Link></div>
            </div>
            <div className="w-full md:w-3/12 mt-3">
            <p className='text-center text-[30px]'>Cart Totals</p>
              <div className="w-full bg-[#EFEFEF] px-8 py-14 space-y-3 rounded-sm  mt-10">
                <div className="flex justify-between items-center">
                  <h1 className="text-[27px] ">Subtotals:</h1>
                  <h1 className="text-[24px]  ">
                    AED <span>{subtotal}</span>.00
                  </h1>
                </div>
                {/* <hr className="w-full mx-auto border-gray" />
                <div className="flex justify-between items-center">
                  <h1 className="text-[27px] ">Shipping Charges:</h1>
                  <h1 className="text-[24px]  ">
                    AED <span>{shippingCharges}</span>.00
                  </h1>
                </div> */}
                <hr className="w-full mx-auto border-gray" />
                <div className="flex justify-between items-center">
                  <h1 className="text-[27px] ">Total:</h1>
                  <h1 className="text-[24px] ">
                    AED <span>{total}</span>.00
                  </h1>
                </div>
                <hr className="w-full mx-auto border-gray" />
                <div className="flex justify-center items-center">
                  <button className="w-full bg-dark text-white py-3">Proceed To Checkout</button>
                </div>
              </div>
              <p className='text-center text-[30px] mt-10'>Calculate Shipping</p>
              <div className="w-full bg-[#EFEFEF] px-8 py-14 space-y-8 rounded-sm  mt-10">
                <SelectList
                className='w-full h-10 border-b outline-none shipment text-20'
                onChange={onChange}
                options={options}
                  defaultValue={"Enter Country"}
                />
                 <SelectList
                className='w-full h-10 border-b outline-none shipment text-20'
                onChange={onChange}
                options={options}
                  defaultValue={"Enter Country"}
                />
                <input type='text' className='w-full border-b h-10 outline-none px-3  bg-transparent' placeholder='Postalcode/zip' />
              <Button className='py-3 bg-black hover:bg-dark' title={"Calculate Shiping"}/>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

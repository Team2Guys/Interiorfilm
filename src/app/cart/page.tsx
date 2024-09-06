"use client";
import React, { useState, useEffect } from 'react';
import Table from 'components/ui/Table/Table'; // Update with correct path to your Table component
import Overlay from 'components/widgets/Overlay/Overlay';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Container from 'components/Layout/Container/Container';
import { FiTag } from 'react-icons/fi';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const calculateTotals = (items:any) => {
    const sub = items.reduce((acc:string, item:any) => {
      const price = item.discountPrice ? item.discountPrice : item.price;
      return acc + (price * item.count * item.length); 
    }, 0);
    setTotal(sub);
  };
  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(existingCart);
    calculateTotals(existingCart);
  }, []);

  // Handle cart changes from the Table component
  const handleCartChange = (updatedCart:any) => {
    setCartItems(updatedCart);
    calculateTotals(updatedCart);
  };
  return (
    <>
      <Overlay title="Shopping Cart" />
      <Container className="mt-10  mb-20">
        {cartItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center space-y-3">
            <p className='text-2xl'>Your cart is empty.</p>
            <div>
              <Link className='underline' href={"/products"}>Continue Shopping</Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap lg:flex-nowrap md:gap-10 ">
            <div className="w-full lg:w-9/12 xl:w-7/12">
              <Table cartdata={cartItems} onCartChange={handleCartChange} />
            </div>
            <div className="w-full lg:w-5/12 xl:w-5/12 mt-3 md:mt-0 border border-gray">
              <div className='p-2 md:p-4 space-y-4'>
                <p className='text-20 md:text-23'>Order Summary</p>
                <div className='space-y-3'>
                  <p className='text-16 md:text-20'>Delivery Calculate at Checkout</p>
                  <hr/>
                  <div className="flex justify-between items-center">
                  <h1 className="text-20 ">Total:</h1>
                  <h1 className="text-20 ">
                    AED <span>{total}</span>
                  </h1>
                </div>
                </div>
                <div className="">
                <div className="flex gap-4 items-center rounded-md w-full">
                  <div className='flex items-center w-full  h-10 px-4 bg-[#F0F0F0]'>
                  <FiTag className="text-gray-500 mr-2" size={20} />
                    <input
                      type="text"
                      placeholder="Add promo code"
                      className="flex-grow bg-transparent outline-none"
                    />
                  </div>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-md">
                      Apply
                    </button>
                  </div>
                  <button className="w-full bg-dark text-white py-3" onClick={()=>router.push("/checkout")}>Proceed To Checkout</button>
                </div>
              </div>
        
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default Cart;

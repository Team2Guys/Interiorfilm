"use client";
import React, { useState, useEffect } from 'react';
import Table from 'components/ui/Table/Table'; // Update with correct path to your Table component
import Overlay from 'components/widgets/Overlay/Overlay';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  // Function to calculate the total price
  const calculateTotals = (items:any) => {
    const sub = items.reduce((acc:string, item:any) => {
      const price = item.discountPrice ? item.discountPrice : item.price;
      return acc + (price * item.count * item.length); 
    }, 0);
    setTotal(sub);
  };

  // Fetch cart items and calculate total when component mounts
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
      <div className="mt-10 max-w-screen-3xl mx-auto px-2 md:px-8 mb-20">
        {cartItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center space-y-3">
            <p className='text-2xl'>Your cart is empty.</p>
            <div>
              <Link className='underline' href={"/products"}>Continue Shopping</Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap md:flex-nowrap md:gap-10">
            <div className="w-full md:w-9/12">
              <Table cartdata={cartItems} onCartChange={handleCartChange} />

              <div className='mt-4'><Link className='bg-dark p-3 text-white' href={"/"}>Continue Shopping</Link></div>
            </div>
            <div className="w-full md:w-3/12 mt-3">
            <p className='text-center text-[25px]'>Cart Totals</p>
              <div className="w-full bg-[#EFEFEF] px-4 py-4 space-y-3 rounded-sm">

    
                <hr className="w-full mx-auto border-gray" />
                <div className="flex justify-between items-center">
                  <h1 className="text-[27px] ">Total:</h1>
                  <h1 className="text-[24px] ">
                    AED <span>{total}</span>.00
                  </h1>
                </div>
                <p className='text-[#8A91AB] text-[12px]'> Shipping calculated at checkout</p>

                <hr className="w-full mx-auto border-gray" />
                <div className="flex justify-center items-center">
                  <button className="w-full bg-dark text-white py-3" onClick={()=>router.push("/checkout")}>Proceed To Checkout</button>
                </div>
              </div>
      
        
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

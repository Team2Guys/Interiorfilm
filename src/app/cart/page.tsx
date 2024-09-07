"use client";
import React, { useState, useEffect } from 'react';
import Table from 'components/ui/Table/Table'; // Update with correct path to your Table component
import Overlay from 'components/widgets/Overlay/Overlay';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Container from 'components/Layout/Container/Container';
import { FiTag } from 'react-icons/fi';
import ProductSlider from 'components/Carousel/ProductSlider/ProductSlider';
import axios from 'axios';
import PRODUCTS_TYPES from 'types/interfaces';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const router = useRouter();

  const productHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`
      );
      if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        console.error('Product data is not an array', response.data.products);
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

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
            <div className="w-full lg:w-9/12 xl:w-9/12 2xl:w-7/12">
              <Table cartdata={cartItems} onCartChange={handleCartChange} />
            </div>
            <div className="w-full lg:w-5/12 xl:w-3/12  2xl:w-5/12 mt-3 md:mt-0 border border-gray">
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

                <div className="space-y-3 pt-20 relative lg:top-20 mt-10">
                <div className=" w-full">
                  <div className="absolute left-0 top-0 py-2 px-4 bg-[#F0F0F0] w-3/4">
                    <div className="flex items-center">
                      <FiTag className="text-black/40 mr-2" size={20} />
                      <input
                        type="text"
                        placeholder="Add promo code"
                        className="w-full bg-transparent outline-none py-2"
                      />
                    </div>
                  </div>
                  <button className="absolute right-0 top-0 bg-primary text-white px-8 py-4">
                    Apply
                  </button>
                </div>
                <button
                  className="w-full bg-black text-white py-3"
                  onClick={() => router.push("/checkout")}
                >
                  Proceed To Checkout
                </button>
              </div>

              </div>
        
            </div>
          </div>
        )}


      <div className='mt-20'>
        <div className='flex justify-center items-center'>
          <h1 className='w-fit text-center text-lg border-b-2 border-[#FF914E] md:text-3xl mb-5  uppercase'>Similar Products</h1>
        </div>
        <ProductSlider products={products} />
      </div>
      </Container>
    </>
  );
};

export default Cart;


"use client";
import Container from 'components/Layout/Container/Container';
import Table from 'components/ui/Table/Table';
import Overlay from 'components/widgets/Overlay/Overlay';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PRODUCTS_TYPES from 'types/interfaces';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

const Wishlist = () => {
  const [WishlistItems, setWishlistItems] = useState([]);
  const token = Cookies.get("user_token");
  const router = useRouter()
  
  useEffect(()=>{
    if(!token)
    {
      router.push('/login')
    }
  },[token])
  
  useEffect(() => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistItems(existingWishlist);
  }, []);

  const handleCartChange = (updatedCart: PRODUCTS_TYPES[]) => {
    // Handle the cart change, e.g., updating the state, local storage, etc.
    console.log('Cart updated:', updatedCart);
  };

  return (
    <>
      <Overlay title='Wishlist' />
      <Container className='mt-20 mb-10'>
        <div className='flex justify-between mb-10'>
          <Link className='underline' href={"/"}>Continue Shopping</Link>
          <Link className='underline' href={"/cart"}>Go to Cart</Link>
        </div>
        { WishlistItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center space-y-3">
            <p className='text-2xl'>Your Wishlist is empty.</p>
          </div>
        ) : (
          <Table wishlistdata={WishlistItems} cartdata={[]} onCartChange={handleCartChange} />
        )}
      </Container>
    </>
  );
};

export default Wishlist;
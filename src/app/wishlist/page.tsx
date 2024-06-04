//@ts-nocheck
"use client"
import Container from 'components/Layout/Container/Container'
import Table from 'components/ui/Table/Table'
import Overlay from 'components/widgets/Overlay/Overlay'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Wishlist = () => {

  const [WishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistItems(existingWishlist);
  }, []);
  return (
    <>
        <Overlay title='Wishlist'/>
        <Container className='mt-20'>
            <div className='flex justify-between mb-10'>
                <Link className='underline' href={"/"}>Continue Shopping</Link>
                <Link className='underline' href={"/cart"}>Go to Cart</Link>
            </div>
            <Table wishlistdata={WishlistItems}/>
        </Container>
    </>
  )
}

export default Wishlist
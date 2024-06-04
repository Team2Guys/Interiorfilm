"use client"
import Button from 'components/Common/Button'
import Container from 'components/Layout/Container/Container'
import Table from 'components/ui/Table/Table'
import Overlay from 'components/widgets/Overlay/Overlay'
import React, { useState, useEffect } from 'react'

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(existingCart);
  }, []);

  return (
    <>
      <Overlay title='Shopping Cart'/>
      <Container className='mt-10'>
        <div className='flex flex-wrap md:flex-nowrap md:gap-5'>
          <div className='w-full md:w-8/12'>
            <Table data={cartItems}/>
          </div>
          <div className='w-full md:w-4/12 mt-3'>
            <div className='w-full bg-secondary p-2 space-y-3 rounded-sm pb-5'>
              <div className='flex justify-between items-center'>
                <h1 className='text-lg font-medium'>Subtotals:</h1>
                <h1 className='text-lg font-medium text-primary'>AED <span>100</span>.00</h1>
              </div>
              <hr className='w-96 mx-auto border-gray' />
              <div className='flex justify-between items-center'>
                <h1 className='text-lg font-medium'>Total:</h1>
                <h1 className='text-lg font-medium text-primary'>AED <span>120</span>.00</h1>
              </div>
              <hr className='w-96 mx-auto border-gray' />
              <div className='flex justify-center items-center'>
                <Button className='w-full bg-dark text-white' title={"Proceed To Checkout"}/>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Cart

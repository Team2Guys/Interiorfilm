//@ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import Button from 'components/Common/Button';
import Container from 'components/Layout/Container/Container';
import Table from 'components/ui/Table/Table';
import Overlay from 'components/widgets/Overlay/Overlay';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(existingCart);
    calculateTotals(existingCart);
  }, []);

  const calculateTotals = (items) => {
    const sub = items.reduce((acc, item) => {
      const price = item.discountPrice ? item.discountPrice : item.price;
      return acc + (price * item.count);
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
      <Container className="mt-10">
        <div className="flex flex-wrap md:flex-nowrap md:gap-5">
          <div className="w-full md:w-8/12">
            <Table cartdata={cartItems} onCartChange={handleCartChange} />
          </div>
          <div className="w-full md:w-4/12 mt-3">
            <div className="w-full bg-secondary p-2 space-y-3 rounded-sm pb-5">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium">Subtotals:</h1>
                <h1 className="text-lg font-medium text-primary">
                  AED <span>{subtotal}</span>.00
                </h1>
              </div>
              <hr className="w-full mx-auto border-gray" />
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium">Shipping Charges:</h1>
                <h1 className="text-lg font-medium text-primary">
                  AED <span>{shippingCharges}</span>.00
                </h1>
              </div>
              <hr className="w-full mx-auto border-gray" />
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium">Total:</h1>
                <h1 className="text-lg font-medium text-primary">
                  AED <span>{total}</span>.00
                </h1>
              </div>
              <hr className="w-full mx-auto border-gray" />
              <div className="flex justify-center items-center">
                <Button className="w-full bg-dark text-white" title={"Proceed To Checkout"} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;

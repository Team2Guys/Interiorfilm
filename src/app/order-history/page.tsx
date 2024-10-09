'use client'
import Container from "components/Layout/Container/Container";
import Overlay from "components/widgets/Overlay/Overlay";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TiShoppingCart, TiTick } from "react-icons/ti";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from 'axios'
import { generateSlug } from "data/Data";

interface Product {
  _id: string;
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  count: number;
  totalPrice: number;
  purchasePrice: number;
  date: string;
  imageUrl: string;
  shippment_Fee: string;
  order_id: string;
  checkout: boolean;
  paymentStatus: boolean;
  is_refund: boolean;
  success: boolean;
  pending: boolean;
  length: number;
  createdAt: string;
  amount_cents: string;
  currency: string;
  integration_id: string;
  is_3d_secure: boolean;
  transactionId: string;
}

interface Order {
  _id: string;
  usermail: string;
  first_name: string;
  last_name: string;
  userAddress: string;
  country: string;
  city: string;
  phone_number: string;
  products: Product[];
  date: string;
  __v: number;
}

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const token = Cookies.get("user_token");

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const res = await axios.get<{ products: Order[] }>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order-history`, {
          headers: {
            token: token || '',
          }
        });
        setOrderHistory(res.data.products);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, [token]);

  return (
    <>
      <Overlay title="Order History" />
      <Container className="my-10">
        {orderHistory.length > 0 ? (
          orderHistory.map((order, index) => (
            <div key={index} className="border border-gray shadow rounded-md p-2 md:p-4 my-4">
              {/* <div className="flex gap-10 items-center border-b-2 border-gray">
                <div>
                  <p className="font-semibold">Date placed</p>
                  <p className="font-medium">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Total amount</p>
                  <p className="font-medium">
                    <span>{order.country === 'United Arab Emirates' ? 'AED' : order.products[0]?.currency}</span>{' '}
                    {order.products.reduce((acc, product) => acc + product.totalPrice, 0)}
                  </p>
                </div>
              </div> */}
              {order.products.map((product) => (
                <div key={product._id} className="grid grid-cols-12 my-2 gap-4 items-center">
                  <div className="col-span-12 md:col-span-2">
                    <Image
                      className="rounded-lg w-[120px] h-[120px] md:w-full md:h-full"
                      width={300}
                      height={300}
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-10 2xl:space-y-2">
                    <p className="font-bold">{product.name}</p>
                    <p className="font-medium">
                      <span>{order.country === 'United Arab Emirates' ? 'AED' : product.currency}</span> {product.totalPrice}
                    </p>
                    <p className="text-12">
                      {product.checkout ? "This product has been checked out." : "Pending checkout."}
                    </p>
                    <div className="flex gap-2 items-center text-12 sm:text-base">
                      <div className="w-4 h-4 rounded-full bg-[#22C55E]">
                        <TiTick className="text-white" />
                      </div>
                      <p>Purchased At</p>
                      <p>{new Date(product.date).toLocaleDateString()}</p>
                    </div>
                   
                    <div>
                      <Link className="text-primary" href={`/product/${generateSlug(product.name)}`}>View product</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No order history available</p>
        )}
      </Container>
    </>
  );
};

export default OrderHistory;

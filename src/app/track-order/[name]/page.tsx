'use client'
import Container from "components/Layout/Container/Container";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Product } from "types/product"; // Make sure the Product type is correctly defined
import Overlay from "components/widgets/Overlay/Overlay";

interface OrderDetail {
  shippingAddress: string;
  billingAddress: string;
  shippingMethod: string;
  paymentMethod: string;
}

const orderDetails: OrderDetail[] = [
  {
    shippingAddress: "123 Dummy St, City, Country",
    billingAddress: "456 Fake Rd, City, Country",
    shippingMethod: "Standard Shipping",
    paymentMethod: "Credit Card",
  },
];

const ViewOrder = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [userDetail, setUserDetail] = useState<any>(null);
  const [total, setTotal] = useState<number>(0);
  const [shippingFee, setShippingFee] = useState<number>(0);
  const { name } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/track-order/${name}`);
        if (res.data && res.data.products) {
          const fetchedProducts = res.data.products;
          const userDetails = res.data.userDetails;
          setProducts(fetchedProducts);
          setUserDetail(userDetails);
          const totalAmount = fetchedProducts.reduce(
            (sum: number, product: Product) => sum + parseFloat(product.totalPrice.toString()),
            0
          );
          const totalShipping = fetchedProducts.reduce(
            (sum: number, product: Product) => {
              const fee = parseFloat(product.shippment_Fee) || 0;
              return sum + fee;
            },
            0
          );

          setTotal(totalAmount);
          setShippingFee(totalShipping);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrders();
  }, [name]);
 console.log(userDetail,"userDetailuserDetail")
  return (
    <>
      <Overlay title="Track Order" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10 max-w-screen-lg mx-auto">
      <div>
      {userDetail && (
        <div className="max-w-screen-sm mx-auto">
          {/* <div className="space-y-3">
            <div>
              <p className="font-medium text-23">Login To View</p>
            </div>
            <div className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-5 w-full">
                <input
                  className="w-full rounded-md p-2 border border-gray"
                  name="email"
                  placeholder="Email"
                  type="email"
                  id={"email"}
                />
              </div>
              <div className="col-span-5">
                <input
                  className="w-full rounded-md p-2 border border-gray"
                  name="ordernumber"
                  placeholder="Order Number"
                  type="ordernumber"
                  id={"ordernumber"}
                />
              </div>
              <div className="col-span-2">
                <button className="bg-black text-white px-4 py-2 rounded-md w-full">
                  Login
                </button>
              </div>
            </div>
          </div> */}
      
        
          <div className="border border-gray p-2 rounded-md">
            <p className="font-medium text-23">
             {userDetail.first_name} {userDetail.last_name} 
            </p>
            <p className="text-14">
            {userDetail.usermail}
            </p>
          </div>

          <div className="border border-gray p-2 rounded-md mt-10">
            <p className="font-medium text-23">Order Detail</p>
            <div className="grid grid-cols-6 gap-4">
             
                  <div className="col-span-6">
                    <p className="text-18 font-medium">Shipping Address</p>
                    <p className="text-14">{userDetail.userAddress}</p>
                    <p className="text-14"> {userDetail.city}, {userDetail.country}</p>
                  </div>
               
              
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center mt-5">
            <p className="text-light font-semibold">
              Need help?{" "}
              <Link className="text-black" href="/contact">
                Contact Us
              </Link>
            </p>
            <Link className="bg-black text-white px-4 py-2" href="/">
              Continue Shopping
            </Link>
          </div>
        </div>
)}
      </div>

      {/* Product Details Section */}
      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.id}>
            <div className="flex gap-2 mt-1">
              <Image
                className="w-[80px] h-[80px] object-cover rounded-md"
                width={200}
                height={200}
                src={product.imageUrl} // Dynamic image URL
                alt={product.name} // Dynamic product name as alt text
              />
              <div>
                <p>{product.name}</p> 
                <div className="flex justify-between">
                  <p>
                    AED<span>{product.price}</span>
                  </p>
                </div>
                <p className="font-medium">
                  Quantity: <span>{product.count}</span>
                </p>
              </div>
            </div>

           
          </div>
        ))}
        {/* 
        <div className="flex justify-between mt-5">
          <p className="text-18 font-semibold">Subtotal</p>
          <p>
            AED <span>{total}</span> 
          </p>
        </div>
        <div className="flex justify-between mt-5">
          <p className="text-18 font-semibold">Shipping Fee</p>
          <p>
            AED <span>{shippingFee}</span> 
          </p>
        </div>
       */}
        <hr />
        <div className="flex justify-between">
          <p className="text-18 font-semibold">Total</p>
          <p>
            AED <span>{total+shippingFee}</span>
          </p>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default ViewOrder;

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
import { useRouter } from "next/navigation";
import { Order , Product} from "types/types";
import OrderSkeleton from "components/Skeleton-loading/OrderSkeleton";


const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const token = Cookies.get("user_token");
  const router = useRouter()
  
  useEffect(()=>{
    if(!token)
    {
      router.push('/login')
    }
  },[token])


  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        
        
        setLoading(true)
        const res = await axios.get<{ products: Order[] }>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order-history`, {
          headers: {
            token: token || '',
          }
        });
        setOrderHistory(res.data.products);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }finally{
        setLoading(false)

      }
    };

    fetchOrderHistory();
  }, [token]);

  const logoutHhandler = () => {
    try {
      Cookies.remove('user_token');
      router.push('/login')

    } catch (err) {
      console.log(err)
    }

  }

  return (
    <>
      <Overlay title="Order History" />
      <Container className='my-10'>
        <div className='flex flex-wrap md:flex-nowrap md:gap-4'>
          <div className='p-2 rounded-md shadow w-full md:w-4/12 hidden md:block'>
            <div className='space-y-2 flex flex-col w'>
              <Link className='border border-gray p-2 w-full rounded-md hover:bg-primary hover:text-white md:text-lg font-medium md:font-semibold' href={"/wishlist"}>Wishlist</Link>
              <Link className='border border-gray p-2 w-full rounded-md bg-primary text-white md:text-lg font-medium md:font-semibold' href={"/order-history"}>Order History</Link>
              <Link className='border border-gray p-2 w-full rounded-md hover:bg-primary hover:text-white md:text-lg font-medium md:font-semibold' href={"/about"}>About Us</Link>
              <p className='border border-gray p-2 w-full rounded-md hover:bg-primary hover:text-white md:text-lg font-medium md:font-semibold cursor-pointer' onClick={logoutHhandler}>Log Out</p>
            </div>
          </div>
          <div className='p-2 rounded-md shadow w-full md:w-8/12'>
          {(orderHistory.length > 0 && !loading) ? (
          orderHistory.map((order, index) => (
            <div key={index} className="max-h-[500px] overflow-y-scroll custom-scrollbar1 px-2">
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
                <div key={product._id} className="grid grid-cols-12 my-2 gap-4 items-center border border-gray shadow rounded-md p-2">
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
                      {product.checkout  ? "This product has been checked out." :  !product.paymentStatus  ? "Pending checkout.": "Paid"}
                    </p>
                    <div className="flex gap-2 items-center text-12 sm:text-base">
                      <div className="w-4 h-4 rounded-full bg-[#22C55E]">
                        <TiTick className="text-white" />
                      </div>
                      <p>Purchased At</p>
                      <p>{new Date(product.date).toLocaleDateString()}</p>
                    </div>
                   
                    <div className="flex gap-4 flex-wrap">
                      <Link className="text-primary" href={`/product/${generateSlug(product.name)}`}>View product</Link>
                      <Link className="text-primary" href={`/track-order/${generateSlug(product.order_id)}`}>Track Order</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (!loading && !(orderHistory.length > 0)) ? <div className="flex items-center justify-center text-3xl h-full">Order Not Found</div> : (
          <OrderSkeleton/>
        )}

          </div>
        </div>
      </Container>
    
    </>
  );
};

export default OrderHistory;
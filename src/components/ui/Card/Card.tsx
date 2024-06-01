"use client";
import React, { useState, useLayoutEffect } from 'react'

import Image from "next/image";
import { Rate } from "antd";
import { LuShoppingCart } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import PRODUCTS_TYPES from 'types/interfaces'
import axios from 'axios';



interface CardProps {
  ProductCard?: PRODUCTS_TYPES[] | any;
  slider?:boolean
}

const Card: React.FC<CardProps> = ({ ProductCard }) => {
  const router = useRouter();
  const [totalProducts, setTotalProducts] = useState<PRODUCTS_TYPES[] | undefined>(ProductCard && ProductCard || [])
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const pathname = usePathname()

  const getallProducts = async () => {

    try {
      if (pathname.startsWith("/product")) return
      setLoading(true)

      let response: any = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`)
      let products = response.data.products
      setTotalProducts(products)

    } catch (err: any) {
      console.log(err, "err")
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(true)

    }

  }
  useLayoutEffect(() => {
    getallProducts()
  }, [])
  console.log(totalProducts, "totalProducts")
// let Homepage =false
let Homepage = pathname.startsWith('/')

  return (
    <>

      {

        totalProducts ? ( Homepage ? totalProducts.slice(0, 1) : totalProducts).map((product: any, index: any) => (
          <div
            className="cursor-pointer group custom-shadow transition-all my-3"
            onClick={() => router.push("/detail")}
            key={index}
          >

          <div className="relative">
            {
              product.posterImageUrl && product.posterImageUrl.imageUrl  ? 
              <Image
                className="bg-contain h-full md:h-72"
                width={300}
                height={300}
                src={product.posterImageUrl.imageUrl}
                alt="Image"
              /> : null
            }
            <div className="space-y-3 absolute top-4 right-4 overflow-hidden translate-x-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition ease-in-out duration-400 hidden md:block ">
              <Link
                href={"/"}
                className="flex justify-center items-center "
              >
                <LuShoppingCart
                  className="bg-white p-2 rounded-full  hover:bg-primary hover:text-white"
                  size={40}
                />
              </Link>

              <Link
                href={"/"}
                className=" flex justify-center items-center "
              >
                <GoHeart className="bg-white p-2 rounded-full  hover:bg-primary hover:text-white" size={40} />
              </Link>
            </div>
          </div>

            <div className="mt-2 text-center space-y-1 pt-3 pb-5">
              <h1 className="lg:text-lg text-sm text-center text-dark group-hover:text-primary transition-all font-semibold">
                Code : <span>{product.name}</span>
              </h1>
              {(
                <div className="flex gap-2 justify-center text-sm py-1 mt-0">
                  <p className="text-primary group-hover:text-dark transition-all font-bold">
                    Dhs. <span>{product.discountPrice ? product.discountPrice : product.salePrice}</span>.00
                  </p>



                  {product.discountPrice ?
                    <p className="line-through text-light">
                      Dhs. <span>{product.salePrice}</span>.00
                    </p>
                    : null
                  }

                </div>
              )}
              {product.starRating !== undefined && (
                <div className="flex gap-1 justify-center">
                  <Rate className="text-sm gap-0" disabled allowHalf defaultValue={(Number(product.starRating))} />
                  <p>{product.reviews}</p>
                </div>
              )}

            </div>

          </div>
        )): null}
    </>
  );
};

export default Card;

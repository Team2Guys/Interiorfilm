"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Modal, Rate, message } from "antd";
import { LuShoppingCart } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { usePathname, useRouter } from "next/navigation";
import PRODUCTS_TYPES from 'types/interfaces';
import axios from 'axios';
import { generateSlug } from 'data/Data';
import Loader from 'components/Loader/Loader';
import SkeletonLoading from 'components/Skeleton-loading/SkeletonLoading';
import { FiZoomIn } from 'react-icons/fi';

interface CardProps {
  ProductCard?: PRODUCTS_TYPES[];
  slider?: boolean;
  categoryId?: string;
  carDetail?: string;
  cardClass?: string;
  onClick?: ()=>void;
}

const Menucard: React.FC<CardProps> = ({ ProductCard, cardClass ,onClick }) => {
  const router = useRouter();
  const [totalProducts, setTotalProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const pathname = usePathname();


  const handleAddToCart = (product: any) => {

    const newCartItem = {
      id: product._id,
      name: product.name,
      price: product.salePrice,
      imageUrl: product.posterImageUrl?.imageUrl,
      totalStockQuantity: product.totalStockQuantity, 
      discountPrice: product.discountPrice,
      color: selectedValue,
      length: 1,
      count: 1,
      totalPrice: product.discountPrice ? product.discountPrice : product.salePrice,
      purchasePrice: product.purchasePrice,
      sizes: product.sizes,
      product_code : product.code
    };

    let existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product._id);


    if (existingItemIndex !== -1) {
      const updatedCart = existingCart.map((item: any, index: number) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            count: item.count + 1,
            totalPrice: (item.count + 1) * (item.discountPrice ? item.discountPrice : item.price),
          };
        }
        return item;
      });
      console.log(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart));

    } else {
      existingCart.push(newCartItem);
      localStorage.setItem("cart", JSON.stringify(existingCart));
    }

    message.success('Product added to cart successfully!');
    window.dispatchEvent(new Event("cartChanged"));
    console.log(existingCart, "existingCart")
  };


  const handleAddToWishlist = (product: any) => {


    const newWishlistItem = {
      id: product._id,
      name: product.name,
      price: product.salePrice,
      imageUrl: product.posterImageUrl?.imageUrl,
      discountPrice: product.discountPrice,
      totalStockQuantity: product.totalStockQuantity, 
      color: selectedValue,
      count: 1,
      length: 1,
      totalPrice: product.discountPrice ? product.discountPrice : product.salePrice,
    };

    let existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const existingItemIndex = existingWishlist.findIndex((item: any) => item.id === product._id);


    if (existingItemIndex !== -1) {
      const updatedWishlist = existingWishlist.map((item: any, index: number) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            count: item.count + 1,
            totalPrice: (item.count + 1) * (item.discountPrice ? item.discountPrice : item.price),
          };
        }
        return item;
      });
      console.log(updatedWishlist)
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    } else {
      existingWishlist.push(newWishlistItem);
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
    }

    message.success('Product added to Wishlist successfully!');
    window.dispatchEvent(new Event("WishlistChanged"));
    console.log(existingWishlist, "existingWishlist")
  };
  const Homepage = pathname.startsWith('/');
  const slicedArray = Homepage && totalProducts ? totalProducts.slice(0, 6) : [];
  const productsToRender = slicedArray.length > 0 ? slicedArray : totalProducts;

  const renderProduct = (product: PRODUCTS_TYPES, index: number) => {
    return (
      <div className={`relative group ${cardClass}`} key={index} onClick={onClick}>
      <div className="space-y-3 absolute top-6 right-4 translate-x-20 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 overflow-hidden transition ease-in-out duration-400 hidden md:block">
        <button onClick={() => handleAddToCart(product)} className="flex justify-center items-center z-10">
          <LuShoppingCart className="p-2 rounded-full bg-white hover:bg-primary text-heading hover:text-white" size={40} />
        </button>
        <button onClick={() => handleAddToWishlist(product)} className="flex justify-center items-center z-10">
          <GoHeart className="p-2 rounded-full bg-white hover:bg-primary text-heading hover:text-white" size={40} />
        </button>

      </div>
      
      <div className="cursor-pointer  transition-all m-1 " onClick={() => router.push(`/product/${generateSlug(product.name)}`)}>
        <div className="text-center">
          {/* <div className='absolute top-50 hidden  translate-y-20 z-10 w-full md:flex justify-center opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition ease-in-out duration-400'>
            <button className='bg-white z-10 px-4 py-1'>Order Now</button>
          </div> */}
          {product.posterImageUrl && product.posterImageUrl.imageUrl && (
            <Image className="bg-contain h-32 w-full md:h-60 rounded-lg" width={300} height={300} src={product.posterImageUrl.imageUrl} alt="Image" />
          )}
        </div>
        <div className=" space-y-1 pt-3 pb-5 p-1 ">
          <h1 className="lg:text-lg text-sm text-dark  font-semibold">
            Code :<span>{product.name}</span>
          </h1>
        </div>
      </div>
    </div>
    );
  };

  return (
    <>
      {ProductCard && (ProductCard.length > 0 && !loading) ? (
        ProductCard.map(renderProduct)
      ) : (

        (productsToRender.length > 0) ? productsToRender.map(renderProduct) : !loading ? <div className='flex justify-center'>No Product Found</div> : <>  
      
        {Array.from({ length: 3 }).map((_, index) => (
      
              <div key={index} className='gap-10 flex flex-col'>
                <SkeletonLoading 
                  avatar={{ shape: 'square', size:280, className: "w-full flex flex-col" }} 
                  title={false} 
                  style={{flexDirection: 'column'}}
                  paragraph={{ rows: 3}}  
                  className='gap-10 flex'
                  active={true}
                />
              </div>
          ))}


      </>
  
      )}
    </>
  );
};

export default Menucard;

'use client';
import TextwithIcon from 'components/TextwithIcon';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { TextWithIconData } from 'data/sideMenuData';
import showToast from 'components/Toaster/Toaster';
import axios from 'axios';

export interface Product {
  posterImageUrl: {
    public_id: string;
    imageUrl: string;
    altText?: string;
  };
  _id: string;
  name: string;
  description: string;
  salePrice: number;
  purchasePrice: number;
  category: string;
  imageUrl: Array<{
    imageIndex: number;
    public_id: string;
    imageUrl: string;
    altText?: string;
    _id: string;
  }>;
  discountPrice: number;
  starRating: string;
  reviews: string;
  code: string;
  totalStockQuantity: number;
  variantStockQuantities: Array<any>;
  length:number
}
interface SideMenuProps {
  setAdsonProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}
const SideMenu: React.FC<SideMenuProps> = ({ setAdsonProducts }) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    
   const fetch=async()=>{
    const fetchedProducts=await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addsOn_product/getAllproducts`)
    console.log("fetch product")
    console.log(fetchedProducts)
    const defaultProducts = fetchedProducts.data.products.slice(0, 3);
    setSelectedProducts(defaultProducts);
    setProducts(defaultProducts);
    setAdsonProducts(defaultProducts);
   }
   fetch();
  }, []);

  const handleCheckboxChange = (product: Product) => {
    setSelectedProducts((prevSelectedProducts) => {
      let updatedSelectedProducts;
      if (prevSelectedProducts.some((p) => p._id === product._id)) {
        // If product is already selected, remove it from the array
        updatedSelectedProducts = prevSelectedProducts.filter((p) => p._id !== product._id);
      } else {
        // Otherwise, add it to the array
        updatedSelectedProducts = [...prevSelectedProducts, product];
      }

      // Update the parent state as well
      setAdsonProducts(updatedSelectedProducts);
      return updatedSelectedProducts;
    });
  };

  const handleAddToCart = () => {
    selectedProducts.forEach((product) => {
      const newCartItem = {
        id: product._id,
        name: product.name,
        price: product.salePrice,
        imageUrl: product.posterImageUrl?.imageUrl,
        discountPrice: product.discountPrice,
        totalStockQuantity: product.totalStockQuantity,
        count: 1,
        length:product.length,
        totalPrice: Number((product.discountPrice || product.salePrice)),
        purchasePrice: product.purchasePrice,
        //@ts-expect-error
        sizes: product.sizes || [], 
        code: product.code,
      };

      let existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = existingCart.findIndex(
        (item: any) => item.id === product._id 
        // && item.length === length
      );

      console.log(existingItemIndex, "existingItemIndex")
      if (existingItemIndex !== -1) {
        const existingItem = existingCart[existingItemIndex];
        // existingItem.count += quantity;

        existingItem.count += 0;
        existingItem.totalPrice = (product.discountPrice || product.salePrice) * existingItem.count * length;
        existingCart[existingItemIndex] = existingItem;
      } else {
        existingCart.push(newCartItem);
      }
      localStorage.setItem('cart', JSON.stringify(existingCart));
    });

    console.log('Products added to cart:', selectedProducts);
    showToast("success",'Products added to cart successfully!');
    window.dispatchEvent(new Event('cartChanged'));
  };

  const totalPrice = selectedProducts.reduce((total, product) => total + (product.discountPrice || product.salePrice), 0);

  return (
    <div className='flex flex-wrap lg:flex-nowrap lg:flex-col gap-2'>
      <div className='divide-y-2 p-2 divide-[#E4E4E4] border-2 border-[#E4E4E4] hidden lg:block'>
        {TextWithIconData.map((item, index) => (
          <TextwithIcon
            key={index}
            Icon={item.icon}
            title={item.title}
            titleCSS='!text-[12.96px] !font-bold'
            SubtitleCSS='text-[10px] text-[#726C6C]'
            subTitle={item.subTitle}
          />
        ))}
      </div>

      <div className="w-full">
        <div className="text-start mb-4">
          <h2 className="font-semibold text-sm"><span className="font-bold">You May Also Need</span></h2>
        </div>
        <div className="space-y-4">
        {products.slice(0, 3).map((product) => (
            <div className='relative' key={product._id}>
              <input
                type="checkbox"
                checked={selectedProducts.includes(product)}
                onChange={() => handleCheckboxChange(product)}
                className="w-4 h-4 accent-orange-600 absolute top-2 left-2 !text-white z-10"
              />
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Price:</span>
            <span><span className="font-currency text-20"></span> {totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="mt-4 w-full bg-black text-white py-2 rounded-sm flex items-center justify-center cursor-pointer"
            onClick={handleAddToCart}
          >
            🛒 Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <div className="flex items-center relative">
        <Image
          src={product.posterImageUrl.imageUrl}
          alt={product.posterImageUrl.altText || ''}
          width={100}
          height={100}
          className="w-25 h-20 object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-[12px] font-[#111111] font-semibold">{product.name}</h3>
        <p className="text-xs">{product.code}</p>
        {/* <div className="flex items-center gap-1">
          <div className="flex text-yellow-500 text-xs">
            <FaStar className='text-[10px]' />
            <FaStar className='text-[10px]' />
            <FaStar className='text-[10px]' />
          </div>
        </div> */}
        <div className="text-[14.92px] font-bold"><span className="font-currency font-bold text-17"></span> {product.discountPrice ? product.discountPrice : product.salePrice }</div>
      </div>
    </div>
  );
};

export default SideMenu;

"use client";
import React, { useEffect, useRef, useState } from "react";
import search1 from "../../../../public/images/Searchimage/1.png";
import search2 from "../../../../public/images/Searchimage/2.png";
import search3 from "../../../../public/images/Searchimage/3.png";
import search4 from "../../../../public/images/Searchimage/4.png";
import search5 from "../../../../public/images/Searchimage/5.png";
import search6 from "../../../../public/images/Searchimage/6.png";
import search7 from "../../../../public/images/Searchimage/7.png";
import search8 from "../../../../public/images/Searchimage/8.png";
import search9 from "../../../../public/images/Searchimage/9.png";
import search10 from "../../../../public/images/Searchimage/10.png";
import search11 from "../../../../public/images/Searchimage/11.png";
import search12 from "../../../../public/images/Searchimage/12.png";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import Button from "../Button";
import PRODUCTS_TYPES from "types/interfaces";
import { generateSlug } from "data/Data";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SearchProduct = ({products}: {products: PRODUCTS_TYPES[]}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const route = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
 console.log(products,"productsproducts")
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsFocused(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const search = searchTerm.toLowerCase();
        return (
          product.name.toLowerCase().includes(search) ||
          (product.description &&
            product.description.toLowerCase().includes(search)) ||
          (product.salePrice &&
            product.salePrice.toString().toLowerCase().includes(search)) ||
          (product.purchasePrice &&
            product.purchasePrice.toString().toLowerCase().includes(search)) ||
          (product.category &&
            product.category.toString().toLowerCase().includes(search)) ||
          product.discountPrice?.toString().toLowerCase().includes(search) ||
          product.modelDetails.some(
            (model) =>
              model.name.toLowerCase().includes(search) ||
              model.detail.toLowerCase().includes(search)
          ) ||
          product.starRating?.toString().toLowerCase().includes(search) ||
          product.reviews?.toLowerCase().includes(search) ||
          product.code.toLowerCase().includes(search) ||
          product.totalStockQuantity?.toString().toLowerCase().includes(search)
      
        );
      })
    : [];


 
  return (
    <>
      {/* <PreFooter /> */}
      <div className="px-2 md:px-6 mt-10">
        <div className="flex flex-wrap md:flex-nowrap gap-1 sm:gap-2">
          <div className="w-full md:w-3/12">
            <div className="grid grid-cols-3 gap-1 sm:gap-2 ">
              <div className="col-span-3">
                <Image
                  className="w-full h-[100px] sm:h-[167px]"
                  width={400}
                  height={400}
                  src={search1}
                  alt="search1"
                  loading="lazy"
                />
              </div>
              <div className="space-y-2">
                <Image
                  className="h-[80px] sm:h-[174px]"
                  width={400}
                  height={400}
                  src={search2}
                  alt="search2"
                  loading="lazy"
                />
                <Image
                  className="h-[80px] sm:h-[174px]"
                  width={400}
                  height={400}
                  src={search3}
                  alt="search3"
                  loading="lazy"
                />
              </div>
              <div>
                <Image
                  className="h-[170px] sm:h-[354px]"
                  width={400}
                  height={400}
                  src={search4}
                  alt="search4"
                  loading="lazy"
                />
              </div>
              <div>
                <Image
                  className="h-[170px] sm:h-[354px]"
                  width={400}
                  height={400}
                  src={search5}
                  alt="search5"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-6/12">
            <div className="grid grid-cols-12 gap-1 sm:gap-2">
              <div className="col-span-12">
                <div className="bg-search bg-cover bg-no-repeat w-full md:h-[289px] py-4 sm:py-8 ">
                  <div className=" md:max-w-screen-md md:mx-auto  text-center w-full space-y-6 relative">
                    <h2 className="text-white text-16 sm:text-23 md:text-[26px] lg:text-[37px]">
                     Products For Every Surface
                    </h2>
                    <div className="flex items-center  w-full mx-auto md:max-w-screen-2xl  mt-10  shadow shadow-boxdark ">
                      <input
                        type="text"
                        ref={searchInputRef}
                        placeholder="Product Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        className="w-full h-[51px] px-4 py-2 text-gray-700 bg-white border-0   focus:outline-none"
                      />
                      <button className="h-[51px] px-4 py-3 bg-white text-gray-600  hover:text-gray-800 cursor-pointer">
                        <IoSearch size={25} />
                      </button>
                    </div>
                    {searchTerm && isFocused && (
                      <div className="px-4">
                        <div
                          className="absolute left-0  top-25 md:top-28 lg:top-32  w-full max-h-[300px] bg-white  shadow-lg  overflow-y-auto z-10 custom-scrollbar"
                          onBlur={() => setIsFocused(false)}
                          ref={dropdownRef}
                        >
                          {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                              <div
                                className=" flex items-center mt-1 px-2"
                                key={index}
                              >
                                {product.posterImageUrl && (
                                  <Image
                                    className="rounded-md"
                                    width={50}
                                    height={50}
                                    src={product.posterImageUrl.imageUrl}
                                    alt="image"
                                    loading="lazy"
                                  />
                                )}
                                <Link
                                  href={`/${product.category.custom_url?? generateSlug(product.category.name) ?? 'accessories'}/${product.custom_url ?? generateSlug(product.name)}`}
                                  onClick={() => setIsFocused(false)}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  {product.name}
                                </Link>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-gray-600">
                              No products found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <Button
                      onClick={() => route.push("/categories")}
                      className="upercase bg-primary text-white py-5"
                      title={"View All"}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-4">
                <Image
                  className="w-full h-[120px] sm:h-[232px]"
                  width={400}
                  height={226}
                  src={search6}
                  alt="search6"
                  loading="lazy"
                />
              </div>
              <div className="col-span-1">
                <Image
                  className="w-full h-[120px] sm:h-[232px]"
                  width={400}
                  height={226}
                  src={search7}
                  alt="search7"
                  loading="lazy"
                />
              </div>
              <div className="col-span-1">
                <Image
                  className="w-full h-[120px] sm:h-[232px]"
                  width={400}
                  height={226}
                  src={search8}
                  alt="search8"
                  loading="lazy"
                />
              </div>
              <div className="col-span-6">
                <Image
                  className="w-full h-[120px] sm:h-[232px]"
                  width={400}
                  height={226}
                  src={search9}
                  alt="search9"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/12">
            <div className="grid grid-cols-3 gap-1 sm:gap-2 ">
              <div className="col-span-3">
                <Image
                  className="w-full h-[120px] sm:h-[289px]"
                  width={400}
                  height={400}
                  src={search10}
                  alt="search10"
                  loading="lazy"
                />
              </div>
              <div className="col-span-2">
                <Image
                  className="w-full h-[100px] sm:h-[232px]"
                  width={400}
                  height={400}
                  src={search11}
                  alt="search11"
                  loading="lazy"
                />
              </div>
              <div className="col-span-1">
                <Image
                  className="w-full h-[100px] sm:h-[232px]"
                  width={400}
                  height={400}
                  src={search12}
                  alt="search12"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default SearchProduct;

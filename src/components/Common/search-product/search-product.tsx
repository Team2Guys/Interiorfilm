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
import axios from "axios";
import PRODUCTS_TYPES from "types/interfaces";
import { generateSlug } from "data/Data";
import Link from "next/link";
import { Modal } from "antd";
import { useRouter } from "next/navigation";

const SearchProduct = () => {
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const route = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // Check if click is outside both the search input and dropdown
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

  const showModal = () => {
    if (searchTerm.trim() !== "") {
      // Only show modal if searchTerm is not empty
      setIsModalOpen(true);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const productHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`
      );

      // Ensure products are an array
      if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        console.error("Product data is not an array", response.data.products);
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        let Search = searchTerm.toLowerCase();
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

        return (
          product.name.toLowerCase().includes(Search) ||
          (product.description &&
            product.description.toLowerCase().includes(Search)) ||
          (product.salePrice &&
            product.salePrice.toString().toLowerCase().includes(Search)) ||
          (product.purchasePrice &&
            product.purchasePrice.toString().toLowerCase().includes(Search)) ||
          (product.category &&
            product.category.toString().toLowerCase().includes(Search)) ||
          product.discountPrice?.toString().toLowerCase().includes(Search) ||
          (product.colors &&
            product.colors.some((color: any) =>
              color.colorName.toLowerCase().includes(Search)
            )) ||
          product.modelDetails.some(
            (model: any) =>
              model.name.toLowerCase().includes(Search) ||
              model.detail.toLowerCase().includes(Search)
          ) ||
          (product.spacification &&
            product.spacification.some((spec: any) =>
              spec.specsDetails.toLowerCase().includes(Search)
            )) ||
          product.starRating?.toString().toLowerCase().includes(Search) ||
          product.reviews?.toLowerCase().includes(Search) ||
          product.code.toLowerCase().includes(Search) ||
          product.totalStockQuantity
            ?.toString()
            .toLowerCase()
            .includes(Search) ||
          (product.sizes &&
            product.sizes.some((size: any) =>
              size.sizesDetails.toLowerCase().includes(Search)
            ))
        );
      })
    : [];

  useEffect(() => {
    if (isModalOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isModalOpen]);

  const truncateText = (text: any, maxLength: any) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Function to handle "Enter" key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      showModal();
    }
  };

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
                />
              </div>
              <div className="space-y-2">
                <Image
                  className="h-[80px] sm:h-[174px]"
                  width={400}
                  height={400}
                  src={search2}
                  alt="search2"
                />
                <Image
                  className="h-[80px] sm:h-[174px]"
                  width={400}
                  height={400}
                  src={search3}
                  alt="search3"
                />
              </div>
              <div>
                <Image
                  className="h-[170px] sm:h-[354px]"
                  width={400}
                  height={400}
                  src={search4}
                  alt="search4"
                />
              </div>
              <div>
                <Image
                  className="h-[170px] sm:h-[354px]"
                  width={400}
                  height={400}
                  src={search5}
                  alt="search5"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-6/12">
            <div className="grid grid-cols-12 gap-1 sm:gap-2">
              <div className="col-span-12">
                <div className="bg-search bg-cover bg-no-repeat w-full md:h-[289px] py-4 sm:py-8 ">
                  <div className=" md:max-w-screen-md md:mx-auto  text-center w-full space-y-6 relative">
                    <p className="text-white text-16 sm:text-23 md:text-[26px] lg:text-[37px]">
                      Products for every eventuality
                    </p>
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
                          className="absolute left-0 top-28 lg:top-32  w-full max-h-[300px] bg-white  shadow-lg  overflow-y-auto z-10 custom-scrollbar x-3"
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
                                  />
                                )}
                                <Link
                                  href={{
                                    pathname: `/product/${generateSlug(
                                      product.name
                                    )}`,
                                  }}
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
                      onClick={() => route.push("/products?category=view-all")}
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
                />
              </div>
              <div className="col-span-1">
                <Image
                  className="w-full h-[120px] sm:h-[232px]"
                  width={400}
                  height={226}
                  src={search7}
                  alt="search7"
                />
              </div>
              <div className="col-span-1">
                <Image
                  className="w-full h-[120px] sm:h-[232px]"
                  width={400}
                  height={226}
                  src={search8}
                  alt="search8"
                />
              </div>
              <div className="col-span-6">
                <Image
                  className="w-full h-[120px] sm:h-[232px]"
                  width={400}
                  height={226}
                  src={search9}
                  alt="search9"
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
                />
              </div>
              <div className="col-span-2">
                <Image
                  className="w-full h-[100px] sm:h-[232px]"
                  width={400}
                  height={400}
                  src={search11}
                  alt="search11"
                />
              </div>
              <div className="col-span-1">
                <Image
                  className="w-full h-[100px] sm:h-[232px]"
                  width={400}
                  height={400}
                  src={search12}
                  alt="search12"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
        width={800}
      >
        <>
          <div className="flex items-center  w-full max-w-md mx-auto md:max-w-screen-2xl  mt-10  shadow shadow-boxdark  mb-3">
            <input
              type="text"
              ref={searchInputRef} // Assign the ref here
              placeholder="Product Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[51px] px-4 py-2 text-gray-700 bg-white border-none   focus:outline-none"
            />
            <button className="h-[51px] px-4 py-3 bg-white text-gray-600  hover:text-gray-800">
              <IoSearch size={25} />
            </button>
          </div>

          {searchTerm && ( // Render products only when there is a search term
            <div className="max-h-[400px] overflow-y-scroll  pr-2 bg-white rounded-md p-2">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <Link
                    key={index}
                    href={{
                      pathname: `/product/${generateSlug(product.name)}`,
                    }}
                    onClick={() => setIsModalOpen(false)}
                    className="shadow p-2 flex gap-2 mt-2 rounded-md border text-black hover:text-black border-gray hover:border-primary"
                  >
                    {product.posterImageUrl && (
                      <Image
                        className="rounded-md"
                        width={100}
                        height={100}
                        src={product.posterImageUrl.imageUrl}
                        alt="image"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-lg md:text-xl">
                        {product.name}
                      </p>
                      <p>{truncateText(product.description, 160)}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-dark dark:text-white">No products found</p>
              )}
            </div>
          )}
        </>
      </Modal>
    </>
  );
};

export default SearchProduct;

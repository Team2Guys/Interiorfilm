"use client";
import Container from "components/Layout/Container/Container";
import Overlay from "components/widgets/Overlay/Overlay";
import React, { useState, useEffect, useRef } from "react";
import Card from "components/ui/Card/Card";
import Collapse from "components/ui/Collapse/Collapse";
import { Select, Space } from "antd";
import DrawerMenu from "components/ui/DrawerMenu/DrawerMenu";
import { IoFunnelOutline } from "react-icons/io5";
import PRODUCTS_TYPES, { product } from "types/interfaces";
import Loader from "components/Loader/Loader";
import type { CheckboxProps, RadioChangeEvent } from "antd";
import { Radio } from "antd";
import Input from "components/Common/regularInputs";
import axios from "axios";
import SkeletonLoading from "components/Skeleton-loading/SkeletonLoading";
import { Checkbox } from "antd";
import { IoIosSearch } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { generateSlug, productimage } from "data/Data";
import { Suspense } from "react";
import Image from "next/image";
import product1 from "../../../public/images/ProductsPage/product1.png";
interface category {
  posterImageUrl: {
    public_id: string;
    imageUrl: string;
  };
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: any;
}

const StaticCategory = {
  posterImageUrl: {
    public_id: "string",
    imageUrl: "string",
  },
  _id: "all",
  name: "View All",
  createdAt: "string",
  updatedAt: "string",
  __v: "any",
};

const ProductPage = () => {
  const [totalProducts, setTotalProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [filteredProductsByCategory, setfilteredProductsByCategory] = useState<PRODUCTS_TYPES[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showColors, setShowColors] = useState<boolean>(false);
  const [colorName, setColorName] = useState<string>();
  const [availableColors, setAvailableColors] = useState<{ value: string; label: string }[] | string[] >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("Default");
  const [category, setCategory] = useState<category[]>([]);
  const [activeLink, setActiveLink] = useState<category | undefined>();
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category");
  const dropdown = useRef<any>(null);
  const trigger = useRef<any>(null);

  useEffect(() => {
    get_recordHandler();
  }, []);

  useEffect(() => {
    productHandler(categoryName);
  }, [categoryName]);

  const Get_colors_handler = (products: any) => {
    let uniqcolorArray: string[] = [];

    products.forEach((element: any) => {
      if (element.colors && element.colors.length > 0) {
        element.colors.forEach((color: { colorName: string; _id: string }) =>
          uniqcolorArray.push(color.colorName)
        );
      }
    });
    if (uniqcolorArray.length > 0) {
      let colorsArray = [...new Set<string>(uniqcolorArray)].map((item) => {
        return { value: item, label: item };
      });
      setAvailableColors(colorsArray);
    } else {
      setAvailableColors(uniqcolorArray);
    }
  };

  const get_recordHandler = async () => {
    try {
      setLoading(true);
      const [categoryResponse, productResponse] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`),
      ]);
      let products = productResponse.data.products;
      const categories = [StaticCategory, ...categoryResponse.data];
      setCategory(categories);
      setTotalProducts(products);
      productHandler(categoryName, categories, products);
      // if (!categoryName) {
      //   setActiveLink(StaticCategory);
      // } else {
      //   const activeCategory = categories.find((cat) => {
      //     return generateSlug(cat.name) === categoryName
      //   }
      //   );
      //   setActiveLink(activeCategory);
      // }
    } catch (err) {
      console.error("Error loading products or categories", err);
    } finally {
      setLoading(false);
    }
  };

  const productHandler = async (
    categoryName: string | null,
    newcategories?: category[],
    newProducts?: any
  ) => {
    try {
      const activeCategory: any = (
        newcategories ? newcategories : category
      ).find((cat) => generateSlug(cat.name) === categoryName);
      if (!activeCategory || activeCategory._id === "all") {
        setfilteredProductsByCategory(newProducts ? newProducts : totalProducts);
        setActiveLink(StaticCategory);
        Get_colors_handler(newProducts ? newProducts : totalProducts);
        return;
      }
      const filteredProductsByCategory = (
        newProducts ? newProducts : totalProducts
      ).filter((product: PRODUCTS_TYPES) => {
        return product.category === activeCategory._id;
      });
  
      setfilteredProductsByCategory(filteredProductsByCategory);
      setActiveLink(activeCategory);
      Get_colors_handler(filteredProductsByCategory);
    } catch (err) {
      console.error("Error loading products or categories", err);
    }
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleColorChange = (value: string) => {
    setSortOption(value);
    setColorName(colorName == value ? "" : value);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    colorName == value;
  };

  const filteredProducts = filteredProductsByCategory.filter(
    (product: PRODUCTS_TYPES) => {
      if (!product) return true;
      const nameMatch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const colorMatch =
        !colorName ||
        (product.colors &&
          product.colors.some((color) => color.colorName === colorName));
      console.log(colorMatch, "colormatch");
      return nameMatch && colorMatch;
    }
  );

  const sortProducts = (products: PRODUCTS_TYPES[]) => {
    if (!products || products.length === 0) return [];

    const getPrice = (product: PRODUCTS_TYPES) => {
      if (!product.salePrice) return 0; 
      return product.salePrice;
    };

    if (sortOption === "Default") {
      return products.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        return nameA.localeCompare(nameB, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      });
    } else if (sortOption === "Low to High") {
      return products.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sortOption === "High to Low") {
      return products.sort((a, b) => getPrice(b) - getPrice(a));
    } else {
      return products; // Return unmodified products if no sortOption is selected
    }
  };

  const sortedProducts = sortProducts(filteredProducts);

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      let id = ["ColorDropdown"];
      console.log(target.id, "target");
      if (!id.includes(target.id)) {
        console.log(target.id);
        setShowColors(false);
        return;
      }

      // setShowColors(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ code }: KeyboardEvent) => {
      if (!showColors || code !== "Escape") return;
      console.log(code, "code");
      setShowColors(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleColorReset = () => {
    setColorName(""); // Clear the selected color
  };

  return (
    <>
      <Overlay
        title={activeLink?.name || "Products"}
        bodyText="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
      />
      <div className="hidde md:grid grid-cols-3 mt-2 gap-6">
        {productimage.map((array: { img: string }, index: number) => (
          <div className="w-full" key={index}>
            <Image
              className={`object-cover w-full ${
                index > 0 ? "hidden sm:block" : ""
              }`}
              width={500}
              height={500}
              src={array.img}
              alt="product1"
            />
          </div>
        ))}
      </div>
      <Container className="mt-20 md:overflow-hidden">
        <div className="flex flex-wrap lg:flex-nowrap justify-between  gap-3">
          <div>
            <p className="uppercase text-[24px] text-lightdark">
              Home
              <span className="capitalize text-black">/{activeLink?.name}</span>
            </p>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap justify-between  w-full md:w-auto sm:space-x-4 ">
            <div className="flex flex-wrap md:flex-nowrap gap-2 items-center mt-2 ">
              <h1>Sort By: </h1>
              <Select
                defaultValue="Price"
                className="w-32 md:w-40 h-10 rounded-none"
                onChange={handleSortChange}
                options={[
                  { value: "Default", label: "Default" },
                  { value: "Low to High", label: "Low to High" },
                  { value: "High to Low", label: "High to Low" },
                ]}
              />
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-2 items-center mt-2 ">
              <h1>Sort By: </h1>
              <div
                className="w-32 md:w-40 h-10 flex items-center border relative"
                id="DropdownContainer"
              >
                <div ref={trigger} className="w-full">
                  <div
                    className="w-full px-3 flex justify-between items-center text-[#3A393C] cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowColors(!showColors);
                    }}
                  >
                    <p className="cursor-pointer">Colours</p>
                    <svg
                      width="15"
                      height="8"
                      viewBox="0 0 15 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1.44421L7.15424 7.00429L13.7221 1.00497"
                        stroke="#3A393C"
                      />
                    </svg>
                  </div>

                  {showColors ? (
                    <div
                      ref={dropdown}
                      className="border shadow-sm flex flex-wrap gap-3 m-auto z-30 p-3 right-0 top-10 border-gray rounded-sm absolute w-full bg-white"
                      id="ColorDropdown"
                    >
                      {!(availableColors.length > 0)
                        ? "Colors not found"
                        : availableColors.map((item: any) => (
                            <p
                              id="ColorDropdown"
                              className={`w-5 h-5 border ${
                                colorName === item.label
                                  ? "border-primary"
                                  : "border-gray"
                              } cursor-pointer`}
                              onClick={() => handleColorChange(item.label)}
                              style={{ backgroundColor: `#${item.value}` }}
                              key={item.label}
                            />
                          ))}
                      {colorName && (
                        <button
                          className="bg-red-500 text-black rounded-md "
                          onClick={() => handleColorReset()}
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="relative  flex items-center border border-secondary w-full sm:w-auto mt-2">
              <input
                className="px-2 py-1 rounded-none outline-none  w-32 md:w-[90%] border-sky-900"
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <IoIosSearch className="inline-block absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="w-full">
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-2 mt-10">
              {loading ? (
                Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="gap-10 flex flex-col mt-3">
                    <SkeletonLoading
                      avatar={{
                        shape: "square",
                        size: 150,
                        className: "w-full flex flex-col",
                      }}
                      title={false}
                      style={{ flexDirection: "column" }}
                      paragraph={{ rows: 3 }}
                      className="gap-10 flex"
                      active={true}
                    />
                  </div>
                ))
              ) : (
                <Card quickClass="right-8" ProductCard={sortedProducts} />
              )}
            </div>
          </>

          {/* {productsToShow < sortedProducts.length && (
              <button
                className='px-5 py-2 bg-primary text-white rounded-md flex items-center mx-auto'
                onClick={loadMoreProducts}
              >
                Load More
              </button>
            )} */}
        </div>
      </Container>
    </>
  );
};

export default ProductPage;

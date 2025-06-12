"use client";
import Container from "components/Layout/Container/Container";
import Overlay from "components/widgets/Overlay/Overlay";
import React, { useState, useEffect, useRef } from "react";
import Card from "components/ui/Card/Card";
import { Select } from "antd";
import PRODUCTS_TYPES from "types/interfaces";
import axios from "axios";
import SkeletonLoading from "components/Skeleton-loading/SkeletonLoading";
import { IoIosSearch } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import { generateSlug, sortProductsByCode, specificImageIndexByCode, specificProductCodesByCategory } from "data/Data";
import Image from "next/image";
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
  const [adsontotalProducts, setTotaladsonProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [filteredProductsByCategory, setfilteredProductsByCategory] = useState<PRODUCTS_TYPES[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showColors, setShowColors] = useState<boolean>(false);
  const [colorName, setColorName] = useState<string>();
  const [availableColors, setAvailableColors] = useState<{ value: string; label: string }[] | string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("Default");
  const [category, setCategory] = useState<category[]>([]);
  const [activeLink, setActiveLink] = useState<category | undefined>();
  const searchParams = useSearchParams();
  const categoryName: string | null = searchParams.get("category");
  const dropdown = useRef<any>(null);
  const trigger = useRef<any>(null);
  const route = useRouter()

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
      const [categoryResponse, productResponse, addsOnproductResponse] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addsOn_product/getAllproducts`),
      ]);
      let products = productResponse.data.products;
      console.log("===============================");
      console.log(products)
      const categories = [StaticCategory, ...categoryResponse.data];
      setCategory(categories);
      setTotalProducts(products);
      setTotaladsonProducts(addsOnproductResponse.data.products)
      productHandler(categoryName, categories, products);
    } catch (err) {
      console.error("Error loading products or categories", err);
    } finally {
      setLoading(false);
    }
  };

  const productHandler = async (categoryName: string | null, newcategories?: category[], newProducts?: any) => {
    try {
      const activeCategory: any = (newcategories ? newcategories : category).find((cat) => generateSlug(cat.name) === categoryName);

      if (categoryName === 'accessories') {
        setfilteredProductsByCategory(adsontotalProducts);
        setActiveLink({
          ...StaticCategory,  // Update the activeLink to use the static "accessories" link
          name: "accessories"  // Manually set name to "accessories"
        });
        Get_colors_handler(adsontotalProducts); // Ensure colors are handled correctly for "accessories"
        return;
      }

      // Fallback for other categories
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

  let filteredProducts = Array.isArray(filteredProductsByCategory)
    ? filteredProductsByCategory.filter((product: PRODUCTS_TYPES) => {
      let Search = searchTerm.toLowerCase();

      const nameMatch =
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
          ));
      const colorMatch =
        !colorName ||
        (product.colors &&
          product.colors.some((color: any) =>
            color.colorName.toLowerCase() === colorName.toLowerCase()
          ));
      return nameMatch && colorMatch;
    })
    : [];

    const sortProducts = (products: PRODUCTS_TYPES[]) => {
      if (!products || products.length === 0) return [];
      const getPrice = (product: PRODUCTS_TYPES) => product.salePrice ?? 0;
    
      if (sortOption === "Low to High") {
        return products.sort((a, b) => getPrice(a) - getPrice(b));
      } else if (sortOption === "High to Low") {
        return products.sort((a, b) => getPrice(b) - getPrice(a));
      } else {
        return sortProductsByCode(
          products.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            return nameA.localeCompare(nameB, undefined, {
              numeric: true,
              sensitivity: "base",
            });
          })
        );
      }
    };
    


  if (categoryName === 'accessories') {
    filteredProducts = adsontotalProducts;
  }

  // Continue with sorting
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
    setColorName("");
  };


  const categoryNameNormalized: any = categoryName?.trim();


  const specificProductCodes = specificProductCodesByCategory[categoryNameNormalized] || [];
  console.log('+++++++++++++++++++++++')
  console.log(specificProductCodes)
  const getSpecificProductImages = (products: PRODUCTS_TYPES[], codes: string[]) => {
    const productImages: PRODUCTS_TYPES[] = [];
    codes.forEach(code => {
      const matchedProducts = products.filter(product => product.code.trim() === code.trim());
      matchedProducts.forEach(product => {
        productImages.push(product);
      });
    });
    return productImages;
  };
  const specificProductImages = getSpecificProductImages(filteredProductsByCategory, specificProductCodes);
  const getRandomProducts = (products: PRODUCTS_TYPES[]) => {
    if (products.length <= 3) return products;
    return products.slice(0, 3);
  };
  const selectedProductImages = specificProductImages.length
    ? specificProductImages
    : getRandomProducts(filteredProductsByCategory);


  return (
    <>
      <Overlay
        title={activeLink?.name || "Products"}
      />
      {categoryName != "accessories" && (<div className="hidden md:grid grid-cols-3 mt-2 gap-6">
        {selectedProductImages.map((product, index: number) => {
          const imageIndex = specificImageIndexByCode[product.code] || 0;
          const selectedImage = product.imageUrl?.[imageIndex]?.imageUrl || product.posterImageUrl?.imageUrl;

          return (
            <div className="w-full cursor-pointer" key={index} onClick={() => route.push(`/product/${generateSlug(product.name)}`)}>
              <Image
                className={`object-cover w-full h-[450px] object-center ${index > 0 ? "hidden sm:block" : ""}`}
                width={500}
                height={500}
                src={selectedImage}
                alt={`product-image-${product.name}`}
              />
            </div>
          );
        })}
      </div>)}
      <Container className="mt-20 md:overflow-hidden">
        <div className="flex flex-wrap lg:flex-nowrap justify-between  gap-3">
          <div>
            <h1 className="uppercase lg:text-[24px] text-16 text-lightdark">
              Home
              <span className="capitalize text-black">/{activeLink?.name}</span>
            </h1>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap justify-between  w-full md:w-auto sm:space-x-4 " >
            <div className="flex flex-wrap md:flex-nowrap gap-2 items-center mt-2 ">
              <p>Sort By: </p>
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
              <p>Sort By: </p>
              <div
                className="w-32 md:w-40 h-10 flex items-center border relative"
                id="DropdownContainer"
              >
                <div ref={trigger} className="w-full">
                  <div
                    className="w-full px-3 flex justify-between items-center text-[#3A393C] cursor-pointer lg:text-16 text-12"
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
                      className="border shadow-sm flex flex-wrap gap-3 m-auto z-30 p-3 right-0 top-10 border-gray rounded-sm absolute w-full bg-white lg:text-16 text-12"
                      id="ColorDropdown"
                    >
                      {!(availableColors.length > 0)
                        ? "Colors not found"
                        : availableColors.map((item: any) => (
                          <p
                            id="ColorDropdown"
                            className={`w-5 h-5 border ${colorName === item.label
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
                className="px-2 py-1 rounded-none outline-none  w-full md:w-[90%] border-sky-900"
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
                <Card quickClass="right-8" ProductCard={sortedProducts} categoryName={categoryName} slider={true} />
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

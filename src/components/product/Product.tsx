"use client";
import Container from "components/Layout/Container/Container";
import Overlay from "components/widgets/Overlay/Overlay";
import React, { useState, useEffect, useRef } from "react";
import Card from "components/ui/Card/Card";
import { Select } from "antd";
import PRODUCTS_TYPES from "types/interfaces";
import { IoIosSearch } from "react-icons/io";
import { generateSlug, sortProductsByCode, specificImageIndexByCode, specificProductCodesByCategory } from "data/Data";
import Image from "next/image";
import Link from "next/link";
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

const ProductPage = ({ initialCategory, category, totalProducts }: { initialCategory: string, category: category, totalProducts: PRODUCTS_TYPES[] }) => {
  const [filteredProductsByCategory, setfilteredProductsByCategory] = useState<PRODUCTS_TYPES[]>(totalProducts ? totalProducts : []);
  const [selectedProductImages, seselectedProductImages] = useState<PRODUCTS_TYPES[]>([]);
  const [showColors, setShowColors] = useState<boolean>(false);
  const [colorName, setColorName] = useState<string>();
  const [availableColors, setAvailableColors] = useState<{ value: string; label: string }[] | string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("Default");
  const [activeLink, setActiveLink] = useState<category | undefined>(category)
  let categoryName = initialCategory || null;
  const dropdown = useRef<any>(null);
  const trigger = useRef<any>(null);

  console.log(initialCategory, "categoryData", totalProducts)

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

  const productHandler = async () => {

    setfilteredProductsByCategory(totalProducts);
    setActiveLink(category);
    Get_colors_handler(totalProducts);

    const categoryNameNormalized: any = categoryName?.trim();
    const specificProductImages = getSpecificProductImages(
      totalProducts,
      specificProductCodesByCategory[categoryNameNormalized] || []
    );


    const getRandomProducts = (products: PRODUCTS_TYPES[]) => {
      if (products.length <= 3) return products;
      return products.slice(0, 3);
    };
    const selectedProductImages = specificProductImages.length ? specificProductImages : getRandomProducts(totalProducts);

    console.log(selectedProductImages, "categoryNameNormalized", specificProductCodesByCategory[categoryNameNormalized] )
    seselectedProductImages(selectedProductImages)
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

  useEffect(() => {

    let filteredprod = filteredProductsByCategory.filter((product: PRODUCTS_TYPES) => {
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
    setfilteredProductsByCategory(filteredprod)

  }, [searchTerm])


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

  useEffect(() => {
    const sortedProducts = sortProducts(filteredProductsByCategory);

    setfilteredProductsByCategory(sortedProducts)
  }, [sortOption])

  useEffect(() => {
    productHandler();
  }, [categoryName]);


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
  },);

  useEffect(() => {
    const keyHandler = ({ code }: KeyboardEvent) => {
      if (!showColors || code !== "Escape") return;
      console.log(code, "code");
      setShowColors(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  },);

  const handleColorReset = () => {
    setColorName("");
  };


const getSpecificProductImages = (
  products: PRODUCTS_TYPES[],
  colorNames: string[]
): PRODUCTS_TYPES[] => {
  const colorSet = new Set(colorNames.map(c => c.trim().toLowerCase()));
  
  return products.filter(product =>
    product.colors?.some((color) =>
      colorSet.has(color.colorName?.trim().toLowerCase() ?? "")
    )
  );
};



  return (
    <>
    <button onClick={productHandler}>productHandler</button>
      <Overlay
        title={activeLink?.name || "Products"} 
      />
      {categoryName != "accessories" && (<div className="hidden md:grid grid-cols-3 mt-2 gap-6">
        {selectedProductImages.map((product, index: number) => {
          const imageIndex = specificImageIndexByCode[product.code] || 0;
          const selectedImage = product.imageUrl?.[imageIndex]?.imageUrl || product.posterImageUrl?.imageUrl;

          return (
            <Link href={`/product/${generateSlug(product.name)}`} className="w-full cursor-pointer" key={index}>
              <Image
                className={`object-cover w-full h-[450px] object-center ${index > 0 ? "hidden sm:block" : ""}`}
                width={500}
                height={500}
                src={selectedImage}
                alt={`product-image-${product.name}`}
              />
            </Link>
          );
        })}
      </div>)}
      <Container className="mt-20 md:overflow-hidden">
        <div className="flex flex-wrap lg:flex-nowrap justify-between  gap-3">
          <div>
            <h2 className="uppercase lg:text-[24px] text-16 text-lightdark">
              Home
              <span className="capitalize text-black">/{activeLink?.name}</span>
            </h2>
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
              <Card quickClass="right-8" ProductCard={filteredProductsByCategory} categoryName={categoryName ?? ''} slider={true} />

            </div>
          </>
        </div>
      </Container>
    </>
  );
};

export default ProductPage;

"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Modal, Rate, Spin, message } from "antd";
import { LuShoppingCart } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { usePathname, useRouter } from "next/navigation";
import PRODUCTS_TYPES from "types/interfaces";
import { generateSlug } from "data/Data";
import { FiZoomIn } from "react-icons/fi";
import Model from "components/ui/Modal/Model";
import ProductDetails from "components/product_detail/ProductDetails";
import Link from "next/link";
import { formatCategoryName } from "utils/helperFunctions";

interface CardProps {
  ProductCard?: PRODUCTS_TYPES[];
  slider?: boolean;
  categoryId?: string;
  carDetail?: string;
  cardClass?: string;
  quickClass?: string;
  categoryName?: string;
}

const Card: React.FC<CardProps> = ({
  ProductCard,
  slider,
  cardClass,
  quickClass,
  categoryName,
}) => {
  const router = useRouter();
  const [productDetails, setproductDetails] = useState<PRODUCTS_TYPES | any>({});
  const [productDetailModel, setProductDetailModel] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<PRODUCTS_TYPES | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const pathname = usePathname();
const isHomePage = pathname === "/";
  const handleProductClick = (product: PRODUCTS_TYPES) => {
    setIsLoading(true);
    setSelectedProduct(product);
    setIsModalOpen(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

const displayCategoryName = useMemo(() => formatCategoryName(categoryName), [categoryName]);
  const getallProducts = async () => {
      if (pathname.startsWith("/products") || slider) return;

      ProductCard?.sort((a: PRODUCTS_TYPES, b: PRODUCTS_TYPES) => {
        const nameA = a.name.match(/\d+/);
        const nameB = b.name.match(/\d+/);
        const numA = nameA ? parseInt(nameA[0], 10) : 0;
        const numB = nameB ? parseInt(nameB[0], 10) : 0;

        return numA - numB;
      });
   
  };
  useEffect(() => {
    getallProducts();
  }, []);

  const handleAddToCart = (product: any) => {
    let existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
      ;

    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.id === product._id
    );

    const Total_length = existingCart.reduce((accum: any, value: any) => {
      if (value.id == product.id) {
        return (accum += value.length)
      }
    }, 0)
    if (Total_length >= product.totalStockQuantity) {
      message.error("Cannot add to cart. Exceeds available stock!");
      return;
    }

    if (existingItemIndex !== -1) {

      const existingItem = existingCart[existingItemIndex];

      if (existingItem.length >= 100) {
        message.error("Cannot add more than 100 units of this product to the cart!");
        return; // Prevent adding
      }
      if (existingItem.length + 1 > product.totalStockQuantity) {
        message.error("Cannot add to cart. Exceeds available stock!");
        return; // Prevent adding
      }


      const updatedCart = existingCart.map((item: any, index: number) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            length: item.length + 1,
            totalPrice:
              (item.length + 1) *
              (item.discountPrice ? item.discountPrice : item.price),
          };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      if (product.totalStockQuantity < 1) {
        message.error("Product is out of stock!");
        return; // Prevent adding if stock is zero
      }

      const newCartItem = {
        id: product._id,
        name: product.name,
        price: product.salePrice,
        imageUrl: product.posterImageUrl?.imageUrl,
        totalStockQuantity: product.totalStockQuantity,
        discountPrice: product.discountPrice,
        length: 1,
        count: 1,
        totalPrice: product.discountPrice
          ? product.discountPrice
          : product.salePrice,
        purchasePrice: product.purchasePrice,
        sizes: product.sizes,
        code: product.code,
        categoryName: categoryName,
      };

      existingCart.push(newCartItem);
      localStorage.setItem("cart", JSON.stringify(existingCart));
    }

    message.success("Product added to cart successfully!");
    window.dispatchEvent(new Event("cartChanged"));
  };

  const handleAddToWishlist = (product: any) => {
    let existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const existingItemIndex = existingWishlist.findIndex(
      (item: any) => item.id === product._id
    );

    if (existingItemIndex !== -1) {

      const existingItem = existingWishlist[existingItemIndex];

      if (existingItem.length >= 100) {

        message.error("Cannot add more than 100 units of this product to the wishlist!");
        return; // Prevent adding
      }

      const updatedWishlist = existingWishlist.map(
        (item: any, index: number) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              length: item.length + 1,
              totalPrice:
                (item.length + 1) *
                (item.discountPrice ? item.discountPrice : item.price),
            };
          }
          return item;
        }
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      if (product.totalStockQuantity < 1) {
        message.error("Product is out of stock!");
        return; // Prevent adding if stock is zero
      }

      const newWishlistItem = {
        id: product._id,
        name: product.name,
        price: product.salePrice,
        imageUrl: product.posterImageUrl?.imageUrl,
        totalStockQuantity: product.totalStockQuantity,
        discountPrice: product.discountPrice,
        count: 1,
        length: 1,
        categoryName: categoryName,
        totalPrice: product.discountPrice
          ? product.discountPrice
          : product.salePrice,
      };

      existingWishlist.push(newWishlistItem);
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
    }

    message.success("Product added to wishlist successfully!");
    window.dispatchEvent(new Event("WishlistChanged"));
  };



  const renderProduct = (product: PRODUCTS_TYPES, index: number) => {
    return (
      <div className={`group mb-5 flex flex-col justify-between  ${cardClass}`} key={index}>
        <div
          className="cursor-pointer  transition-all space-y-1"
        >
          <div className="text-center relative h-[150px] sm:h-[320px] xl:h-[370px] 2xl:h-[400px]">
            <div
              className={`space-y-3 absolute top-6 right-6 opacity-0 group-hover:opacity-100  overflow-hidden transition ease-in-out duration-400 hidden md:block ${quickClass}`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product)
                }}
                className="flex justify-center items-center z-20"
              >
                <LuShoppingCart className=" p-[0.50rem] lg:p-[0.60rem] rounded-full bg-white hover:bg-primary text-slate-500 hover:text-white text-[30px] lg:text-[40px]" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWishlist(product)
                }}
                className="flex justify-center items-center z-20"
              >
                <GoHeart className=" p-[0.50rem] lg:p-[0.60rem] rounded-full bg-white hover:bg-primary text-slate-500 hover:text-white text-[30px] lg:text-[40px]" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleProductClick(product)
                }}
                className="flex justify-center items-center z-20"
              >
                <FiZoomIn className=" p-[0.50rem] lg:p-[0.60rem] rounded-full bg-white hover:bg-primary text-slate-500 hover:text-white text-[30px] lg:text-[40px]" />
              </button>
            </div>
            <div
              id="ORDER-ID"
              className="absolute bottom-3 xsm:bottom-5 z-20 w-full flex gap-1 2xsm:gap-2 md:gap-5 justify-center opacity-0 group-hover:opacity-100 transition ease-in-out duration-400">
              <button
                id="ORDER-ID"
                className="bg-white w-16 xsm:w-20 md:w-[90px] h-7 xsm:h-[36.29px] xl:w-[114.45px] xl:h-[36.29px] text-9 md:text-11 py-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                  router.push("/checkout");
                }}
              >
                Order Now
              </button>
              <button
                className="bg-black w-16 xsm:w-20 md:w-[90px] h-7 xsm:h-[36.29px] xl:w-[114.45px] xl:h-[36.29px] text-9 md:text-11 py-1 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setproductDetails(product);
                  setProductDetailModel(true);
                }}
              >
                Quick View
              </button>
            </div>
            <Link href={`/product/${generateSlug(product.name)}`} className="testingClass">
            {product.posterImageUrl && product.posterImageUrl.imageUrl && (
              <>
                <Image
                  className="bg-contain  w-full "
                  fill
                  fetchPriority="high"
                  loading="lazy"
                  src={product.posterImageUrl.imageUrl}
                  alt={product.posterImageUrl.altText || product.name}
                />
                <p className="absolute top-0 left-1 text-sm px-1 text-center text-black bg-[#fb701d]">
                  {product.totalStockQuantity === 0 && "Limited Stock"}
                </p>
              </>
            )}
            </Link>
          </div>
          <h3 className="md:text-base lg:text-lg text-sm text-center text-black ">
            {product.name}
          </h3>
        </div>
        <div className="text-center space-y-1 px-1">
          <p className="lg:text-lg text-sm text-center text-dark ">
            {product.code}
          </p>
          <div className="flex gap-2 justify-center items-center text-sm py-1 mt-0">
            <p className="text-black font-bold text-18 flex gap-1">
              <span className="font-currency font-bold text-[24px]"></span>{" "}
              <span
                className={` text-20 ${product.discountPrice ? "text-red" : "text-black"
                  }`}
              >
                {product.salePrice}
              </span>
            </p>

            {product.discountPrice > 0 && (
              <p className="line-through text-para text-xs font-medium">
                <span className="font-currency font-medium text-15"></span> <span className="">{product.discountPrice}</span>
              </p>
            )}
          </div>
          {product.starRating && (
            <div className="flex gap-1 justify-center">
              <Rate
                className="text-sm gap-0"
                disabled
                allowHalf
                defaultValue={Number(product.starRating)}
              />
              <p className="text-sm group-hover:text-white">
                ( ({product.reviews}) )
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Modal
        title={
          <h1 className="lg:text-xl text-sm text-dark font-bold">
            Code: <span>{selectedProduct?.name}</span>
          </h1>
        }
        open={isModalOpen}
        width={700}
        onCancel={handleCancel}
        footer={null}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : selectedProduct?.posterImageUrl?.imageUrl ? (
          <Image
            className="mt-5 object-contain w-full h-full"
            width={1000}
            height={1000}
            src={selectedProduct.posterImageUrl.imageUrl}
            alt="Product Image"
          />
        ) : (
          <p>No image available</p>
        )}
      </Modal>
      <Model
        setproductDetailModel={setProductDetailModel}
        productDetailModel={productDetailModel}
        centered={true}
        footer={null}
      >
        <ProductDetails
          firstFlex="xl:w-9/12 2xl:w-8/12"
          isQuickView={true}
          categoryName={displayCategoryName}
          productDetail={productDetails}
        />
      </Model>

      {ProductCard && 
      (isHomePage 
        ? ProductCard && ProductCard.slice(0, 6).map((product, index) => renderProduct(product, index))
        : ProductCard && ProductCard.map((product, index) => renderProduct(product, index))
      )}
    </>
  );
};

export default Card;
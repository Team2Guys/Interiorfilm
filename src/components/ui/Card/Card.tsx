"use client";
import React, { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { Modal, Rate, Spin, message } from "antd";
import { LuShoppingCart } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { usePathname, useRouter } from "next/navigation";
import PRODUCTS_TYPES from "types/interfaces";
import axios from "axios";
import { generateSlug } from "data/Data";
import SkeletonLoading from "components/Skeleton-loading/SkeletonLoading";
import { FiZoomIn } from "react-icons/fi";
import Model from "components/ui/Modal/Model";
import ProductDetails from "components/product_detail/ProductDetails";
import Link from "next/link";

interface CardProps {
  ProductCard?: PRODUCTS_TYPES[];
  slider?: boolean;
  categoryId?: string;
  carDetail?: string;
  cardClass?: string;
  quickClass?: string;
  categoryName?: any;
}

const Card: React.FC<CardProps> = ({
  ProductCard,
  slider,
  categoryId,
  carDetail,
  cardClass,
  quickClass,
  categoryName,
}) => {
  const router = useRouter();
  const [totalProducts, setTotalProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [productDetails, setproductDetails] = useState<PRODUCTS_TYPES | any>(
    {}
  );
  const [productDetailModel, setProductDetailModel] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [populated_categoryName, setCategoryName] = useState<string | any>(null);
  const [selectedProduct, setSelectedProduct] = useState<PRODUCTS_TYPES | null>(null);
  const [isLoading, setIsLoading] = useState(false);
console.log(error,selectedValue,"error")
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

  const pathname = usePathname();

  let CategoryId = categoryId ? categoryId : "demo";

  const getallProducts = async () => {
    try {
      if (pathname.startsWith("/products") || slider) return;
      console.log("slider false");

      setLoading(true);
      let response: any = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`
      );
      let products = response.data.products;
      products.sort((a: PRODUCTS_TYPES, b: PRODUCTS_TYPES) => {
        // Extract numeric part of product names
        const nameA = a.name.match(/\d+/);
        const nameB = b.name.match(/\d+/);
        const numA = nameA ? parseInt(nameA[0], 10) : 0;
        const numB = nameB ? parseInt(nameB[0], 10) : 0;

        return numA - numB;
      });
      if (CategoryId !== "demo" && CategoryId) {
        let filtered = products.filter((item: any) => {
          return item.category === CategoryId;
        });
        setTotalProducts(filtered);
      } else {
        setTotalProducts(products);
      }

      if (
        products.length > 0 &&
        products[0].colors &&
        products[0].colors.length > 0
      ) {
        setSelectedValue(products[0].colors[0]);
      }
    } catch (err: any) {
      console.log(err, "err");
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const ProductFilterHandler = () => {
    if (CategoryId != "demo" && CategoryId) {
      console.log("condition is working ", CategoryId);
      let products = totalProducts;
      let filtered = products.filter((item) => {
        return item.category === CategoryId;
      });

      setTotalProducts(filtered);
    }
  };

  useEffect(() => {
    getallProducts();
  }, []);

  useEffect(() => {
    ProductFilterHandler();
  }, [carDetail]);



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
      
      // if (existingItem.length + 1 > product.totalStockQuantity) {
      //   message.error("Cannot add to wishlist. Exceeds available stock!");

      //   return; // Prevent adding
      // }


  
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

  const Homepage = pathname.startsWith("/");
  const slicedArray =
    Homepage && totalProducts ? totalProducts.slice(0, 6) : [];
  const productsToRender = slicedArray.length > 0 ? slicedArray : totalProducts;

  const productHandler = async () => {
    try {
      const categoryRequest = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
      );
      const [categoryResponse] = await Promise.all([categoryRequest]);
      if (categoryRequest && ProductCard && categoryResponse.data.length > 0) {
        const foundCategory = categoryResponse.data.find(
          (cat: any) => cat._id === productDetails.category
        );
        setCategoryName(foundCategory ? foundCategory.name : null);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    productHandler();
  }, [productDetails]);

  const renderProduct = (product: PRODUCTS_TYPES, index: number) => {
    return (
      <div className={`group mb-5 ${cardClass}`} key={index}>
        <div
          className="cursor-pointer  transition-all m-1 "
        >
          <div className="text-center relative">
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
            <div className="absolute bottom-3 xsm:bottom-5 z-20 w-full flex gap-1 2xsm:gap-2 md:gap-5 justify-center opacity-0 group-hover:opacity-100 transition ease-in-out duration-400">
              <button
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
            {product.posterImageUrl && product.posterImageUrl.imageUrl && (
              <Link href={`/product/${generateSlug(product.name)}`} className="">
                <Image
                  className="bg-contain  w-full "
                  width={500}
                  height={500}
                  src={product.posterImageUrl.imageUrl}
                  alt={product.posterImageUrl.altText || ''}
                />
                <p className="absolute top-0 left-1 text-sm px-1 text-center text-black bg-[#fb701d]">
                  {product.totalStockQuantity === 0 && "Limited Stock"}
                </p>
              </Link>
            )}
          </div>
        </div>
        <div className="text-center space-y-1 pt-3 pb-5 p-1 ">
          <h3 className="lg:text-lg text-sm text-center text-black ">
            {product.name}
          </h3>
          <p className="lg:text-lg text-sm text-center text-dark ">
            {product.code}
          </p>
          <div className="flex gap-2 justify-center items-center text-sm py-1 mt-0">
            {/* <p className="lg:text-lg text-md text-center text-[#fb701d]">
              {product.totalStockQuantity > 0 && (
                'In Stock'
              )}
            </p> */}

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
          categoryName={populated_categoryName}
          productDetail={productDetails}
        />
      </Model>

      {ProductCard && ProductCard.length > 0 && !loading ? (
        ProductCard.map((product, index) => renderProduct(product, index))
      ) : productsToRender.length > 0 ? (
        productsToRender.map(renderProduct)
      ) : !loading ? (
        <div className="flex justify-center">No Product Found</div>
      ) : (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="gap-10 flex flex-col">
              <SkeletonLoading
                avatar={{
                  shape: "square",
                  size: 280,
                  className: "w-full flex flex-col",
                }}
                title={false}
                style={{ flexDirection: "column" }}
                paragraph={{ rows: 2 }}
                className="gap-10 flex"
                active={true}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Card;

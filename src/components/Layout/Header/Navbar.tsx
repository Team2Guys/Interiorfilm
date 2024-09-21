"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import blacklogo from "../../../../public/images/logoblack.png";
import { IoIosSearch, IoMdHeartEmpty } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import DrawerMenu from "components/ui/DrawerMenu/DrawerMenu";
import { Modal } from "antd";
import { generateSlug, navarlink } from "data/Data";
import axios from "axios";
import { useAppSelector } from "components/Others/HelperRedux";
import Cookies from "js-cookie";
import { useAppDispatch } from "components/Others/HelperRedux";
import Profile from "components/user_profile/Profile";
import { usePathname, useSearchParams } from "next/navigation";
import PRODUCTS_TYPES, { Category } from "types/interfaces";
import { SlHandbag } from "react-icons/sl";
import CartDrawer from "components/cart-drawer/cart-drawer";
import TopNav from "./TopNav";
import { IoSearch } from "react-icons/io5";
import Container from "../Container/Container";
const Navbar = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [WishlistItems, setWishlistItems] = useState([]);
  const pathname = usePathname(); // Get the current path
  const { loggedInUser }: any = useAppSelector((state) => state.userSlice);
  const isHomePage = pathname === "/";
  const [activeLink, setActiveLink] = useState<string>("/");
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
   
  const category = searchParams.get("category");

  // Handle setting the active link based on the current category or pathname
  useEffect(() => {
    if (category) {
      setActiveLink(`/products?category=${category}`);
    } else if (pathname) {
      const activeNavLink = navarlink.find((nav) =>
        pathname.includes(nav.ref)
      );
      setActiveLink(activeNavLink?.ref || "");
    }
  }, [category, pathname]);

  const showModal = () => {
    // if (searchTerm.trim() !== "") {
    setIsModalOpen(true);
    // }
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
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

        return (
          product.name.toLowerCase().includes(searchTerm) ||
          (product.description &&
            product.description.toLowerCase().includes(searchTerm)) ||
          (product.salePrice &&
            product.salePrice.toString().toLowerCase().includes(searchTerm)) ||
          (product.purchasePrice &&
            product.purchasePrice
              .toString()
              .toLowerCase()
              .includes(searchTerm)) ||
          (product.category &&
            product.category.toString().toLowerCase().includes(searchTerm)) ||
          product.discountPrice
            ?.toString()
            .toLowerCase()
            .includes(searchTerm) ||
          (product.colors &&
            product.colors.some((color: any) =>
              color.colorName.toLowerCase().includes(searchTerm)
            )) ||
          product.modelDetails.some(
            (model: any) =>
              model.name.toLowerCase().includes(searchTerm) ||
              model.detail.toLowerCase().includes(searchTerm)
          ) ||
          (product.spacification &&
            product.spacification.some((spec: any) =>
              spec.specsDetails.toLowerCase().includes(searchTerm)
            )) ||
          product.starRating?.toString().toLowerCase().includes(searchTerm) ||
          product.reviews?.toLowerCase().includes(searchTerm) ||
          product.code.toLowerCase().includes(searchTerm) ||
          product.totalStockQuantity
            ?.toString()
            .toLowerCase()
            .includes(searchTerm) ||
          (product.sizes &&
            product.sizes.some((size: any) =>
              size.sizesDetails.toLowerCase().includes(searchTerm)
            ))
        );
      })
    : [];

  useEffect(() => {
    if (isModalOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isModalOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      showModal();
    }
  };

  useEffect(() => {
    if (pathname === "/") {
      setActiveLink("/");
    } else {
      const navItem = navarlink.find(
        (item: { ref: string; title: string }) =>
          pathname === `/${item.ref}` ||
          pathname === `products?category=${item.ref}`
      );
      if (navItem) {
        const slug = navItem.title.includes("Series")
          ? `products?category=${navItem.ref}`
          : `/${navItem.ref}`;
        setActiveLink(slug);
      }
    }
  }, [pathname]);

  useEffect(() => {
    productHandler();
  }, []);

  const handleCloseDrawer = () => setDrawerOpen(false);

  useEffect(() => {
    const existingWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );
    setWishlistItems(existingWishlist);
  }, []);

  useEffect(() => {
    const handleWishlistChange = () => {
      const updatedWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      console.log(updatedWishlist, "WishlistChanged");
      setWishlistItems(updatedWishlist);
    };

    window.addEventListener("WishlistChanged", handleWishlistChange);

    return () => {
      window.removeEventListener("WishlistChanged", handleWishlistChange);
    };
  }, []);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(existingCart);
  }, []);

  useEffect(() => {
    const handleCartChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(updatedCart);
    };

    window.addEventListener("cartChanged", handleCartChange);

    return () => {
      window.removeEventListener("cartChanged", handleCartChange);
    };
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleCartChange = () => {
      setOpen(false);
    };

    window.addEventListener("cartChanged", handleCartChange);

    return () => {
      window.removeEventListener("cartChanged", handleCartChange);
    };
  }, []);

  const truncateText = (text: any, maxLength: any) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let previousCartItemCount = cartItems.reduce(
      (count, item: any) => count + item.count,
      0
    );

    const handleCartChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCartItemCount = updatedCart.reduce(
        (count: number, item: any) => count + item.count,
        0
      );
      if (updatedCartItemCount > previousCartItemCount) {
        setCartItems(updatedCart);
        setDrawerOpen(true);
        setTimeout(() => {
          setDrawerOpen(false);
        }, 8000);
      }
      previousCartItemCount = updatedCartItemCount;
    };

    window.addEventListener("cartChanged", handleCartChange);

    return () => {
      window.removeEventListener("cartChanged", handleCartChange);
    };
  }, [cartItems]);

  return (
    <>
      <TopNav />
      <nav
        className={`z-99 w-full p-2 pr-0 sm:px-4 lg:px-8 xl:px-12 border-b-2 border-gray shadow-md  ${
          isHomePage
            ? isScrolled
              ? "bg-white text-black top-0 fixed"
              : "bg-white text-black sticky top-0"
            : "bg-white text-black sticky top-0 "
        }`}
      >
        <div className="grid grid-cols-12 items-center mt-2">
          <div className="sm:flex items-center  w-full rounded-3xl  shadow border border-gray-2  col-span-2 md:col-span-4 hidden ">
            <input
              type="text"
              ref={searchInputRef}
              placeholder="Product Search..."
              value={searchTerm}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[40px] rounded-3xl px-4 py-2 text-gray-700 bg-white border-none   focus:outline-none"
            />
            <button
              className="h-[51px] px-4 py-3 rounded-3xl bg-white text-gray-600  hover:text-gray-800 cursor-pointer"
              onClick={showModal}
            >
              <IoSearch size={25} />
            </button>
          </div>
          <div
            className=" cursor-pointer text-22 sm:text-20 md:text-2xl w-fit col-span-2 md:col-span-4 block sm:hidden"
            onClick={showModal}
          >
            <IoIosSearch className="text-2xl sm:text-20" />
          </div>

          <div className="mx-auto col-span-5 md:col-span-4">
            <Link href="/">
              <Image
                src={
                  isHomePage ? (isScrolled ? blacklogo : blacklogo) : blacklogo
                }
                alt="logo"
                width={207}
                height={39}
              />
            </Link>
          </div>

          <div className="flex items-center justify-end gap-2 md:gap-4 col-span-5 md:col-span-4">
            {loggedInUser ? (
              <Profile />
            ) : (
              <Link className="text-22 sm:text-16 md:text-2xl" href="/login">
                <FaRegUser className=" cursor-pointer" />
              </Link>
            )}

            <Link
              href={"/wishlist"}
              className="relative text-22 sm:text-16 md:text-2xl"
            >
              <IoMdHeartEmpty
                className={`cursor-pointer ${
                  WishlistItems.length > 0 ? "text-primary" : "text-black"
                }`}
              />
              {WishlistItems.length > 0 ? (
                <div className="md:w-5 md:h-5 w-3 h-3 rounded-full z-50 flex justify-center items-center shadow-2xl bg-white text-black absolute left-2 top-2 md:left-3 md:top-3">
                  <span className="font-medium text-11 md:text-18">
                    {WishlistItems.length}
                  </span>
                </div>
              ) : (
                <></>
              )}
            </Link>
            <Link
              href={"/cart"}
              className="relative text-22 sm:text-16 md:text-2xl"
            >
              <SlHandbag
                className={`cursor-pointer ${
                  cartItems.length > 0 ? "text-primary" : "text-black"
                }`}
              />
              {cartItems.length > 0 ? (
                <>
                  <div className="md:w-5 md:h-5 w-3 h-3 rounded-full z-50 flex justify-center items-center bg-white  text-black absolute left-2 top-2 md:left-3 md:top-3">
                    <span className="font-medium text-11 md:text-18">
                      {cartItems.reduce(
                        (count: any, item: any) => count + item.count,
                        0
                      )}
                    </span>
                  </div>
                </>
              ) : null}
            </Link>

            <div className=" block lg:hidden">
              <DrawerMenu
                showDrawer={showDrawer}
                onClose={onClose}
                open={open}
                width={250}
                title={
                  <>
                    <div className="text-22 sm:text-16 md:text-2xl">
                      <FaBars />
                    </div>
                  </>
                }
                content={
                  <>
                    <ul className="space-y-2">
                      {navarlink.map(
                        (
                          navItem: { ref: string; title: string },
                          index: number
                        ) => {
                          const slug = navItem.title.includes("Series")
                            ? `products?category=${navItem.ref}`
                            : `/${navItem.ref}`;

                          return (
                            <li onClick={onClose} key={index}>
                              <Link
                                className="text-14 font-medium text-black hover:text-black"
                                key={index}
                                href={slug}
                              >
                                {navItem.title}
                              </Link>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </>
                }
              />
            </div>
          </div>
        </div>

        <div>
          <Container
            className={`hidden lg:flex  lg:justify-between uppercase text-11 xl:text-13 py-3  ${
              isHomePage
                ? isScrolled
                  ? "bg-white text-black"
                  : "bg-white text-black"
                : "bg-white text-black"
            }`}
          >
           {navarlink.map((navItem, index) => {
        // Build slug depending on whether the item is a series or not
        const slug = navItem.title.includes("Series")
          ? `/products?category=${navItem.ref}`
          : `/${navItem.ref}`;

        const isActive = activeLink === slug; // Check if the link is active

        return (
          <Link
            className={`2xl:leading-7 2xl:tracking-[20%] ${
              isActive ? "link-active" : "link-underline"
            }`}
            key={index}
            href={slug}
            onClick={() => setActiveLink(slug)} // Update the active link on click
          >
            {navItem.title}
          </Link>
        );
      })}
          </Container>
        </div>
      </nav>

      <div className="fixed top-auto bottom-12 sm:bottom-12 right-7 z-999 h-[9rem] ">
        <Link
          target="_blank"
          href={"https://wa.link/mb359y"}
          className="sticky top-1 "
        >
          <svg
            width="54"
            height="54"
            viewBox="0 0 54 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_648_1287)">
              <path
                d="M44.3411 53.0794C32.8169 54.3089 21.1947 54.3089 9.67061 53.0794C7.43273 52.8431 5.34347 51.8469 3.75114 50.2568C2.15881 48.6667 1.15962 46.5788 0.920156 44.3413C-0.309323 32.8171 -0.309323 21.1949 0.920156 9.67079C1.15648 7.43292 2.15273 5.34366 3.74283 3.75132C5.33294 2.15899 7.42079 1.1598 9.65834 0.920339C21.1825 -0.30914 32.8047 -0.30914 44.3288 0.920339C46.5667 1.15666 48.6559 2.15292 50.2483 3.74302C51.8406 5.33312 52.8398 7.42098 53.0793 9.65852C54.3087 21.1826 54.3087 32.8049 53.0793 44.329C52.8429 46.5669 51.8467 48.6561 50.2566 50.2484C48.6665 51.8408 46.5786 52.84 44.3411 53.0794Z"
                fill="#29A71A"
              />
              <path
                d="M38.9045 15.0954C36.0954 12.2583 32.3649 10.5184 28.3859 10.1895C24.4069 9.86062 20.4413 10.9645 17.2045 13.3019C13.9677 15.6394 11.6727 19.0565 10.7335 22.9371C9.79434 26.8176 10.2728 30.906 12.0825 34.4649L10.306 43.0895C10.2876 43.1754 10.287 43.2641 10.3045 43.3501C10.3219 43.4362 10.3569 43.5177 10.4073 43.5896C10.481 43.6988 10.5864 43.7828 10.7092 43.8305C10.832 43.8782 10.9664 43.8873 11.0945 43.8566L19.5474 41.8531C23.0962 43.617 27.1558 44.0646 31.0037 43.1163C34.8516 42.1681 38.2383 39.8854 40.5612 36.6745C42.8841 33.4635 43.9924 29.5326 43.6891 25.5812C43.3857 21.6298 41.6903 17.9142 38.9045 15.0954ZM36.269 36.1309C34.3253 38.0691 31.8225 39.3485 29.1132 39.7888C26.4039 40.2292 23.6248 39.8083 21.1674 38.5854L19.9892 38.0025L14.807 39.2298L14.8224 39.1653L15.8962 33.9494L15.3194 32.8111C14.0638 30.3451 13.6209 27.545 14.0541 24.8119C14.4873 22.0788 15.7744 19.5529 17.731 17.596C20.1896 15.1382 23.5236 13.7575 27 13.7575C30.4764 13.7575 33.8104 15.1382 36.269 17.596C36.2899 17.62 36.3124 17.6426 36.3365 17.6635C38.7645 20.1276 40.12 23.4517 40.1074 26.9111C40.0947 30.3705 38.715 33.6846 36.269 36.1309Z"
                fill="white"
              />
              <path
                d="M35.8086 32.3049C35.1735 33.3051 34.1702 34.5293 32.9092 34.8331C30.7001 35.3669 27.3097 34.8515 23.091 30.9181L23.0388 30.8721C19.3294 27.4326 18.366 24.57 18.5992 22.2996C18.728 21.0109 19.8019 19.845 20.707 19.0841C20.8501 18.962 21.0198 18.875 21.2025 18.8302C21.3852 18.7854 21.5759 18.7839 21.7593 18.826C21.9426 18.868 22.1136 18.9524 22.2586 19.0723C22.4035 19.1923 22.5183 19.3444 22.5939 19.5167L23.9593 22.5849C24.048 22.7838 24.0809 23.0032 24.0544 23.2194C24.0279 23.4356 23.9431 23.6405 23.8089 23.8122L23.1186 24.7081C22.9705 24.8931 22.8811 25.1181 22.862 25.3544C22.8428 25.5906 22.8948 25.8271 23.0112 26.0335C23.3978 26.7116 24.3244 27.7088 25.3522 28.6323C26.5059 29.6755 27.7853 30.6297 28.5953 30.9549C28.8121 31.0434 29.0503 31.065 29.2795 31.0169C29.5086 30.9688 29.7181 30.8532 29.8809 30.6849L30.6817 29.878C30.8362 29.7256 31.0283 29.6169 31.2386 29.563C31.4488 29.5091 31.6695 29.5119 31.8783 29.5711L35.1213 30.4916C35.3002 30.5465 35.4642 30.6415 35.6007 30.7695C35.7373 30.8975 35.8427 31.055 35.909 31.2299C35.9753 31.4049 36.0008 31.5927 35.9834 31.7791C35.966 31.9654 35.9062 32.1452 35.8086 32.3049Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_648_1287">
                <rect width="54" height="54" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
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

          {searchTerm && (
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
      <CartDrawer open={drawerOpen} onClose={handleCloseDrawer} />
    </>
  );
};

export default Navbar;

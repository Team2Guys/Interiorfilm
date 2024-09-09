"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import blacklogo from "../../../../public/images/logoblack.png";
import { IoIosSearch, IoMdHeartEmpty } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import DrawerMenu from "components/ui/DrawerMenu/DrawerMenu";
import { useRouter } from "next/navigation";
import { Modal, Popover } from "antd";
import Megamanu from "./Megamanu/Megamanu";
import { generateSlug, navarlink } from "data/Data";
import axios from "axios";
import { useAppSelector } from "components/Others/HelperRedux";
import Cookies from "js-cookie";
import { loggedInUserAction } from "../../../redux/slices/userSlice";
import { useAppDispatch } from "components/Others/HelperRedux";
import Profile from "components/user_profile/Profile";
import { Categories_Types } from "types/interfaces";
import { usePathname } from "next/navigation";
import PRODUCTS_TYPES, { Category } from "types/interfaces";
import whatsapp from "../../../../public/images/whatsapp.png";
import { SlHandbag } from "react-icons/sl";
import CartDrawer from "components/cart-drawer/cart-drawer";
import TopNav from "./TopNav";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [WishlistItems, setWishlistItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const pathname = usePathname(); // Get the current path
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { loggedInUser }: any = useAppSelector((state) => state.userSlice);
  const isHomePage = pathname === "/";
  const [activeLink, setActiveLink] = useState<string>("");

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


  const productHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`
      );
      if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        console.error('Product data is not an array', response.data.products);
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  const handleCloseDrawer = () => setDrawerOpen(false);

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };



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

  const router = useRouter();

  useEffect(() => {
    const handleCartChange = () => {
      setOpen(false);
    };

    window.addEventListener("cartChanged", handleCartChange);

    return () => {
      window.removeEventListener("cartChanged", handleCartChange);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setSearchTerm('')
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isModalOpen]);



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
        }, 2000);
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
        className={`z-99 w-full p-2 pr-0 sm:px-4 lg:px-8 xl:px-12   ${isHomePage
          ? isScrolled
            ? "bg-white text-black top-0 fixed"
            : "bg-white text-black sticky top-0"
          : "bg-white text-black sticky top-0 "
          }`}
      >
        <div className="grid grid-cols-12 items-center mt-2">

          <div
            className=" cursor-pointer text-22 sm:text-20 md:text-2xl w-fit col-span-2 md:col-span-4"
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

            <Link href={"/wishlist"} className="relative text-22 sm:text-16 md:text-2xl">
              <IoMdHeartEmpty className=" cursor-pointer" />
              {cartItems.length > 0 ? (
                <div className="md:w-5 md:h-5 w-3 h-3 rounded-full z-50 flex justify-center items-center shadow-2xl bg-white text-black absolute left-2 top-2 md:left-3 md:top-3">
                  <span className="font-medium text-11 md:text-18">
                    {WishlistItems.reduce(
                      (count: any, item: any) => count + item.count,
                      0
                    )}
                  </span>
                </div>
              ) : (
                <></>
              )}
            </Link>
            <Link href={"/cart"} className="relative text-22 sm:text-16 md:text-2xl">
              <SlHandbag className=" cursor-pointer" />
              {cartItems.length > 0 ? (
                <>
                  <div className="md:w-5 md:h-5 w-3 h-3 rounded-full z-50 flex justify-center items-center bg-white text-black absolute left-2 top-2 md:left-3 md:top-3">
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
          <ul
            className={`hidden lg:flex lg:justify-between lg:space-x-4 uppercase xl:space-x-5 2xl:space-x-16 text-11 xl:text-13 py-3 2xl:px-6 whitespace-nowrap overflow-x-auto ${isHomePage
              ? isScrolled
                ? "bg-white text-black"
                : "bg-white text-black"
              : "bg-white text-black"
              }`}
          >
            {navarlink.map(
              (navItem: { ref: string; title: string }, index: number) => {
                const slug = navItem.title.includes("Series")
                  ? `products?category=${navItem.ref}`
                  : `/${navItem.ref}`;
                const isActive = activeLink === slug;
                return (
                  <Link
                    className={` 2xl:leading-7 2xl:tracking-[20%] ${isActive ? "link-active" : "link-underline"}`}
                    key={index}
                    href={slug}
                    onClick={() => setActiveLink(slug)}
                  >
                    {navItem.title}
                  </Link>
                );
              }
            )}
          </ul>
        </div>
      </nav>

      <div className="fixed top-auto bottom-60 md:top-[150px] right-0 z-999 h-[9rem] ">
        <Link
          target="_blank"
          href={"https://wa.link/mb359y"}
          className="sticky top-1 "
        >
          <Image
            width={200}
            height={50}
            src={whatsapp}
            alt="whatsappo"
            className="w-30 md:w-50"
          />
        </Link>
      </div>

      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleOk}
        footer=""
        width={800}
      >
        <>
          <div className="flex items-center  w-full max-w-md mx-auto md:max-w-screen-2xl  mt-10  shadow shadow-boxdark  mb-3">
            <input
              type="text"
              ref={searchInputRef}
              placeholder="Product Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[51px] px-4 py-2 text-gray-700 bg-white border-none   focus:outline-none"
              autoFocus

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

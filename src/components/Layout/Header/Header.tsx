import React, { useState, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import {IoSearch } from "react-icons/io5";
import Image from "next/image";
import whitelogo from "../../../../public/images/logowhite.png";
import blacklogo from "../../../../public/images/logoblack.png";
import { IoIosSearch, IoMdHeartEmpty } from "react-icons/io";
import { FaBars,} from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";

import { RiShoppingBag2Line } from "react-icons/ri";
import DrawerMenu from "components/ui/DrawerMenu/DrawerMenu";
import { useRouter } from "next/navigation";
import { Modal, Popover } from "antd";
import Megamanu from "./Megamanu/Megamanu";
import { generateSlug } from "data/Data";
import axios from "axios";
import { useAppSelector } from "components/Others/HelperRedux";
import Cookies from "js-cookie";
import { loggedInUserAction } from "../../../redux/slices/userSlice";
import { useAppDispatch } from "components/Others/HelperRedux";
import Profile from "components/user_profile/Profile";
import { Categories_Types } from "types/interfaces";
import { usePathname } from "next/navigation";
import PRODUCTS_TYPES, { Category } from "types/interfaces";
import MobileMenu from "./Megamanu/mobile-menu";
import whatsapp from "../../../../public/images/whatsapp.png"
import { SlHandbag } from "react-icons/sl";


const Header = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [category, setcategory] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [WishlistItems, setWishlistItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const pathname = usePathname(); // Get the current path
  const { loggedInUser }: any = useAppSelector((state) => state.userSlice);
  const isHomePage = pathname === "/";
  const AddminProfileTriggerHandler = async (token: string) => {
    try {
      if (!token) return null;
      let user: any = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getuserHandler`,
        {
          headers: {
            token: token,
          },
        }
      );
      dispatch(loggedInUserAction(user.data.user));
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalProducts, setTotalProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [activeLink, setActiveLink] = useState<Category | undefined>();
  const [Categories, setCategories] = useState<Categories_Types[]>([]);

  const productHandler = async () => {
    try {
      setLoading(true);
      const categoryRequest = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
      );
      const productRequest = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`
      );
      const [categoryResponse, products] = await Promise.all([
        categoryRequest,
        productRequest,
      ]);

      setTotalProducts(products.data.products);
      setActiveLink(categoryResponse.data[0]);
      setCategories(categoryResponse.data);
    } catch (err) {
      console.log(err, "err");
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    productHandler();
  }, []);

  const handleCategoryClick = (category: Category) => {
    setActiveLink(category);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
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

  const CategoryHandler = () => {
    setcategory(true);
  };

  const CategoryHandlerclose = () => {
    setcategory(false);
    setOpen(false);
  };

  const router = useRouter();

  useEffect(() => {
    const handleCartChange = () => {
      setcategory(false);
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

  return (
    <>
      <div className="bg-black  border-b py-2 border-black  w-full z-99 relative">
        <p className="uppercase text-white text-center text-xs md:text-14">
          Free Shipping on orders over 10 meters
        </p>
      </div>
      <nav
        className={` text-white  sticky top-0  mx-auto flex justify-between items-center z-9999 w-full p-2 md:px-10   ${
          isHomePage
            ? isScrolled
              ? "bg-white text-black"
              : "bg-transparent text-white"
            : "bg-white text-black"
        }`}
      >
        <div className="flex justify-between md:items-center space-x-4">
        <Link href="/">
      <Image
        className="w-24 h-14 md:w-50 md:h-10 "
        src={isHomePage ? (isScrolled ? blacklogo : whitelogo) : blacklogo}
        alt="logo"
        width={500}
        height={500}
      />
    </Link>
        </div>
        <ul
          className={`hidden md:flex md:flex-1 space-x-10 text-18 py-4 px-6  ${
            isHomePage
              ? isScrolled
                ? "bg-white text-black"
                : "bg-transparent text-white"
              : "bg-white text-black"
          }`}
        >
          <Link className="link-underline" href="/">
            Home
          </Link>
          <Popover
            className="cursor-pointer link-underline"
            placement="bottom"
            trigger="click"
            content={<Megamanu Categories={Categories} products={products} />}
            title=""
          >
            Category
          </Popover>
          <Link className="link-underline" href="/about">
            About
          </Link>
          <Link className="link-underline" href="/contact">
            Contact
          </Link>
        </ul>
        <div
          className={`flex space-x-3 md:space-x-6 items-center ${
            isHomePage
              ? isScrolled
                ? "bg-white text-black"
                : "bg-transparent text-white"
              : "bg-white text-black"
          }`}
        >
          {loggedInUser ? (
            <Profile />
          ) : (
            <Link className=" text-20 md:text-2xl" href="/profile">
              <FaRegUser  className=" cursor-pointer" />
            </Link>
          )}
          <div className=" cursor-pointer text-20 md:text-2xl" onClick={showModal}>
            <IoIosSearch />
          </div>
        
          <Link href={"/wishlist"} className="relative text-20 md:text-2xl">
            <IoMdHeartEmpty  className=" cursor-pointer" />
            {cartItems.length > 0 ? (
              <div className="md:w-5 md:h-5 w-3 h-3 rounded-full z-50 flex justify-center items-center bg-white text-black absolute left-3 top-3">
                <span className="font-medium text-12 md:text-18">
                {WishlistItems.reduce((count: any, item: any) => count + item.count, 0)}
                </span>
              </div>
            ) : (
              <></>
            )}
          </Link>
          <Link href={"/cart"} className="relative  text-20 md:text-2xl">
            <SlHandbag  className=" cursor-pointer" />
            {cartItems.length > 0 ? (
              <div className="md:w-5 md:h-5 w-3 h-3 z-50 rounded-full flex justify-center items-center bg-white text-black absolute left-3 top-3">
                <span className="font-medium text-12 md:text-18 z-50">
                  {" "}
                  {cartItems.reduce(
                    (count: any, item: any) => count + item.count,
                    0
                  )}
                </span>
              </div>
            ) : (
              <></>
            )}
          </Link>
          <div className="px-3 block md:hidden">
            <DrawerMenu
              showDrawer={showDrawer}
              onClose={onClose}
              open={open}
              width={250}
              title={
                <>
                  <div className="text-20 md:text-2xl ">
                    <FaBars />
                  </div> </>
              }
              content={
                <>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        className="text-base font-semibold text-black hover:text-black"
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <DrawerMenu
                        classDrawer=" "
                        className="text-base font-semibold text-black hover:text-black cursor-pointer"
                        headtitle={
                          <div className="float-end ">
                            <Link
                              className="hover:text-black hover:underline"
                              href={"/products"}
                            >
                              View All
                            </Link>
                          </div>
                        }
                        width={500}
                        showDrawer={CategoryHandler}
                        onClose={CategoryHandlerclose}
                        open={category}
                        title={"product"}
                        content={
                          <>
                            <MobileMenu
                              onClick={CategoryHandlerclose}
                              Categories={Categories}
                              products={products}
                            />
                          </>
                        }
                      />
                    </li>
                    <li>
                      <Link
                        className="text-base font-semibold text-black hover:text-black "
                        onClick={onClose}
                        href="/about"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-base font-semibold text-black hover:text-black"
                        onClick={onClose}
                        href="/contact"
                      >
                        Contact Us
                      </Link>
                    </li>
               
                  </ul>

                </>
              }
            />
          </div>
        </div>
      </nav>
      <div className="fixed top-[100px] right-0 z-999 ">
      <Link target="_blank" href={"https://wa.link/mb359y"} className="sticky top-1 ">
          <Image width={200} height={200} src={whatsapp} alt="whatsappo"/>
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
          <div className="mt-8 space-y-3 mb-3">
            <input
              className="w-full px-4 border h-14 rounded-md outline-none"
              type="text"
              placeholder="Search Product Here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {searchTerm && ( // Render products only when there is a search term
            <div className="max-h-[400px] overflow-y-scroll  pr-2 bg-white rounded-md p-2">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <Link
                    key={index}
                    href={{ pathname: `/product/${generateSlug(product.name)}` }}
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

export default Header;

"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
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
import Profile from "components/user_profile/Profile";
import { usePathname } from "next/navigation";
import PRODUCTS_TYPES from "types/interfaces";
import { SlHandbag } from "react-icons/sl";
import CartDrawer from "components/cart-drawer/cart-drawer";
import TopNav from "./TopNav";
import { IoSearch } from "react-icons/io5";
import Container from "../Container/Container";
type Timer = ReturnType<typeof setTimeout>;
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
 const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { loggedInUser }: any = useAppSelector((state) => state.userSlice);
  const isHomePage = pathname === "/";

  const drawerTimerRef = useRef<Timer | null>(null);
  const startAutoCloseTimer = () => {
    if (drawerTimerRef.current) clearTimeout(drawerTimerRef.current);
    drawerTimerRef.current = setTimeout(() => setDrawerOpen(false), 5000);
  };

  const stopAutoCloseTimer = () => {
    if (drawerTimerRef.current) clearTimeout(drawerTimerRef.current);
  };
  
 const getUrlParams = () => {
    if (typeof window === 'undefined') return {};
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return {
      category: params.get('category')
    };
  };

  // Update active link when URL changes
  useEffect(() => {
    const { category } = getUrlParams();
    setCurrentCategory(category ?? null);

    if (pathname === "/") {
      setActiveLink("/");
    } else if (pathname === "/products") {
      setActiveLink(category ? `/products?category=${category}` : "/products");
    } else {
      setActiveLink(pathname);
    }
  }, [pathname]);

  // Handle link clicks to force update active state
  const handleLinkClick = (slug: string, ref: string) => {
    setActiveLink(slug);
    // For series links, also update current category
    if (slug.startsWith('/products?category=')) {
      setCurrentCategory(ref);
    }
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleCloseDrawer = () => setDrawerOpen(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [mainResponse, addOnResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`),
          axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addsOn_product/getAllproducts`)
        ]);

        setProducts([
          ...(mainResponse.data.products || []),
          ...(addOnResponse.data.products || [])
        ]);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

useEffect(() => {
  const handleCartChange = () => {
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(updatedCart);
    if (pathname !== '/cart' && updatedCart.length > 0) {
      setDrawerOpen(true);
      startAutoCloseTimer();
    }
  };

  window.addEventListener("cartChanged", handleCartChange);
  const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  setCartItems(updatedCart);

  return () => {
    window.removeEventListener("cartChanged", handleCartChange);
  };
}, [pathname]);

useEffect(() => {
  const handleWishlistChange = () => {
    const updatedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]" );
    setWishlistItems(updatedWishlist);
  };

  window.addEventListener("WishlistChanged", handleWishlistChange);
  const updatedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]" );
  setWishlistItems(updatedWishlist);

  return () => {
    window.removeEventListener("WishlistChanged", handleWishlistChange);
  };
}, []);


  useEffect(() => {
    if (!drawerOpen) stopAutoCloseTimer();
  }, [drawerOpen]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const search = searchTerm.toLowerCase();
    return products.filter((product) => {
      return (
        product.name?.toLowerCase().includes(search) ||
        product.description?.toLowerCase().includes(search) ||
        product.salePrice?.toString().toLowerCase().includes(search) ||
        product.purchasePrice?.toString().toLowerCase().includes(search) ||
        product.category?.toString().toLowerCase().includes(search) ||
        product.discountPrice?.toString().toLowerCase().includes(search) ||
        product.modelDetails?.some(model =>
          model.name?.toLowerCase().includes(search) ||
          model.detail?.toLowerCase().includes(search)
        ) ||
        product.starRating?.toString().toLowerCase().includes(search) ||
        product.reviews?.toLowerCase().includes(search) ||
        product.code?.toLowerCase().includes(search) ||
        product.totalStockQuantity?.toString().toLowerCase().includes(search)
      );
    });
  }, [products, searchTerm]);

  const cartItemCount = useMemo(() =>
  cartItems.reduce((count, item) => count + (item.length || 0), 0),
  [cartItems]
);

  return (
    <>
      <TopNav />
      <nav
        className={`z-99 w-full py-2 px-4 sm:px-0 border-b-2 border-gray shadow-md  ${isHomePage
          ? isScrolled
            ? "bg-white text-black top-0 fixed"
            : "bg-white text-black sticky top-0"
          : "bg-white text-black sticky top-0 "
          }`}
      >
        <Container className="grid grid-cols-12 items-center mt-2">
          <div className="md:flex items-center  w-full rounded-3xl  shadow border border-gray-2  col-span-2 md:col-span-4 hidden relative ">
            <input
              type="text"
              ref={searchInputRef}
              placeholder="Product Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="w-full h-[40px] rounded-3xl px-4 py-2 text-gray-700 bg-white border-none   focus:outline-none"
            />
            <button
              className="h-[51px] px-4 py-3 rounded-3xl text-gray-600  hover:text-gray-800 cursor-pointer absolute right-0"
            >
              <IoSearch size={25} />
            </button>
            {searchTerm && isFocused && (
              <div className="px-4">
                <div
                  className="absolute left-0 top-14  w-full max-h-[300px] bg-white  shadow-lg  overflow-y-auto z-10 custom-scrollbar x-3"
                  onBlur={() => setIsFocused(false)}
                  ref={dropdownRef}
                >
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <div className=" flex items-center mt-1 px-2" key={index}>
                        {product.posterImageUrl && (
                          <Image
                            className="rounded-md"
                            width={50}
                            height={50}
                            src={product.posterImageUrl.imageUrl}
                            alt={product.posterImageUrl.altText || product.name}
                            loading="lazy"
                          />
                        )}
                        <Link
                          href={{
                            pathname: `/product/${generateSlug(product.name)}`,
                          }}
                          onClick={() => setIsFocused(false)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {product.name}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-600">No products found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div
            className=" cursor-pointer text-22 sm:text-20 md:text-2xl w-fit col-span-1 sm:col-span-4 md:col-span-4 block md:hidden"
            onClick={showModal}
          >
            <IoIosSearch className="text-2xl sm:text-20" />
          </div>

          <div className="text-center   flex justify-center col-span-5 sm:col-span-4 md:col-span-4 ml-3">
            <Link href="/" className="block relative w-full lg:w-[277px]">
              <Image
                className="!relative"
                src={blacklogo}
                alt="logo"
                fill
                sizes=""
                priority
                fetchPriority="high"
              />
            </Link>
          </div>

          <div className="flex items-center justify-end gap-2 col-span-6 md:gap-4 sm:col-span-4 md:col-span-4">
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
                className={`cursor-pointer ${wishlistItems.length > 0 ? "text-primary" : "text-black"}`}
              />
              {wishlistItems.length > 0 &&
                <div className="md:w-5 md:h-5 w-3 h-3 rounded-full z-50 flex justify-center items-center shadow-2xl bg-white text-black absolute top-3 left-3 sm:left-2 sm:top-2 md:left-3 md:top-3">
                  <span className="font-medium text-11 md:text-18">
                    {wishlistItems.length}
                  </span>
                </div>
              }
            </Link>
            <Link
              href="/cart"
              className="relative text-22 sm:text-16 md:text-2xl"
            >
              <SlHandbag
                className={`cursor-pointer ${cartItems.length > 0 ? "text-primary" : "text-black"
                  }`}
              />
              {cartItemCount > 0 && (
                <div className="md:w-5 md:h-5 w-3 h-3 rounded-full z-50 flex justify-center items-center bg-white text-black absolute top-3 left-3 sm:left-2 sm:top-2 md:left-3 md:top-3">
                  <span className="font-medium text-11 md:text-18">
                    {cartItemCount}
                  </span>
                </div>
              )}
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
                    <ul className="space-y-4 flex flex-col " >
                      {navarlink.map((navItem, index) => {
                          const isSeriesLink = navItem.title.includes("Series");
                const slug = isSeriesLink 
                  ? `/products?category=${navItem.ref}`
                  : `/${navItem.ref || ''}`;

                // Precise active state comparison
                const isActive = isSeriesLink
                  ? currentCategory === navItem.ref
                  : activeLink === slug || pathname === `/${navItem.ref}`;

                        return (
                          <div onClick={onClose} key={index}>
                            <Link
                              className={`font-semibold text-16 text-black hover:text-black capitalize w-fit ${isActive ? "link-active" : "link-underline"
                                }`} onClick={() => handleLinkClick(slug, navItem.ref)}
                              href={slug}
                            >
                              {navItem.title.replace("Series", "")}
                            </Link>
                          </div>
                        );
                      })}
                    </ul>
                  </>
                }
              />
            </div>
          </div>
        </Container>

        <div>
          <Container
            className={`hidden lg:flex  lg:justify-between uppercase text-11 xl:text-13 py-3  ${isHomePage
              ? isScrolled
                ? "bg-white text-black"
                : "bg-white text-black"
              : "bg-white text-black"
              }`}
          >
            {navarlink.map((navItem, index) => {
               const isSeriesLink = navItem.title.includes("Series");
                const slug = isSeriesLink 
                  ? `/products?category=${navItem.ref}`
                  : `/${navItem.ref || ''}`;

                // Precise active state comparison
                const isActive = isSeriesLink
                  ? currentCategory === navItem.ref
                  : activeLink === slug || pathname === `/${navItem.ref}`;

              return (
                <Link
                  className={`2xl:leading-7 2xl:tracking-[20%] ${isActive ? "link-active" : "link-underline"
                    }`}
                  key={index}
                  href={slug} onClick={() => handleLinkClick(slug, navItem.ref)}
                >
                  {navItem.title.replace("Series", "")}
                </Link>
              );
            })}
          </Container>
        </div>
      </nav>

      <div className="fixed top-auto bottom-12 right-7 z-999 cursor-pointer" id="WHTSAPP-IF-PPC">

        <p
          id="WHTSAPP-IF-PPC"
          className="sticky top-1"
        >

          <Image className="sticky top-1" id="WHTSAPP-IF-PPC" src="/images/whatsapp.png" onClick={(e) => { e.stopPropagation(); e.preventDefault(); window.open("https://wa.link/mb359y", "_blank") }} alt='teximagte' width={50}
            height={100}></Image>
        </p>
      </div>

      <Modal
        title=""
        open={isModalOpen}
        onOk={handleCancel}
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
                        className="rounded-md h-[120px]"
                        width={100}
                        height={100}
                        src={product.posterImageUrl.imageUrl}
                        alt={product.posterImageUrl.altText || product.name}
                        loading="lazy"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-14 md:text-xl">
                        {product.name}
                      </p>
                      <p className="text-10 md:text-base">{truncateText(product.description || '', 60)}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-dark text-10 md:text-base dark:text-white">No products found</p>
              )}
            </div>
          )}
        </>
      </Modal>
      <CartDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        onMouseEnter={stopAutoCloseTimer}
        onMouseLeave={startAutoCloseTimer}
      />
    </>
  );
};

export default Navbar;
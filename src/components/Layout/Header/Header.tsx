import React, { useState, useEffect, useLayoutEffect } from 'react';
import Container from '../Container/Container';
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import Link from 'next/link';
import { IoMailOutline, IoSearch } from "react-icons/io5";
import { CiGlobe } from 'react-icons/ci';
import Image from 'next/image';
import logo from "../../../../public/images/logo.png";
import { IoMdHeartEmpty } from 'react-icons/io';
import { PiBag } from 'react-icons/pi';
import { FaRegUser, FaUser } from 'react-icons/fa';
import { RiMenuFold3Fill } from 'react-icons/ri';
import { MdOutlineHome, } from 'react-icons/md';
import DrawerMenu from 'components/ui/DrawerMenu/DrawerMenu';
import Button from 'components/ui/Button/Button';
import { useRouter } from 'next/navigation';
import { Modal, Popover } from 'antd';
import Megamanu from './Megamanu/Megamanu';
import Mobiletab from 'components/ui/Tabs/Mobiletab/Mobiletab';
import { generateSlug } from 'data/Data';
import axios from 'axios';
import { useAppSelector } from "components/Others/HelperRedux";
import Cookies from 'js-cookie';
import { loggedInUserAction } from '../../../redux/slices/userSlice';
import { useAppDispatch } from "components/Others/HelperRedux";
import Profile from 'components/user_profile/Profile'
import {Categories_Types} from 'types/interfaces'






import PRODUCTS_TYPES, { Category } from 'types/interfaces';

interface Product {
  name: string;
  description: string;
  posterImageUrl: {
    imageUrl: string;
  };
}

const Header = () => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false);
  const [category, setcategory] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [WishlistItems, setWishlistItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const { loggedInUser }: any = useAppSelector(state => state.userSlice);

  const AddminProfileTriggerHandler = async (token: string) => {
    try {
      if (!token) return null
      let user: any = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getuserHandler`, {
        headers: {
          "token": token
        }
      })
      dispatch(loggedInUserAction(user.data.user))

    } catch (err: any) {
      console.log(err, "err")
    }
  }

 
  const [loading, setLoading] = useState<boolean>(false);
  const [totalProducts, setTotalProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [activeLink, setActiveLink] = useState<Category | undefined>();
  const [Categories, setCategories] = useState<Categories_Types[]>([]);

  const productHandler = async () => {
    try {
      setLoading(true);
      const categoryRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`);
      const productRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
      const [categoryResponse, products] = await Promise.all([categoryRequest, productRequest]);

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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
        setProducts(response.data.products);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(product =>
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
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistItems(existingWishlist);
  }, []);
  useEffect(() => {
    const handleWishlistChange = () => {
      const updatedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
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
  };

  const router = useRouter()



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
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      showModal();
    }
  };


  return (
    <>
      <div className='bg-secondary sticky top-1 border-b border-gray  w-full'>
        <Container>
          <div className='flex justify-between flex-wrap lg:flex-nowrap gap-2 p-2 items-center'>
            <div className='flex gap-4 mx-auto md:mx-0'>
              <div className='flex gap-1 text-sm md:text-base lg:text-lg items-center '>
                <HiOutlineDevicePhoneMobile  className='text-primary text-base md:text-2xl' />
                <Link href="tel:+971505974495">+971 50 597 4495</Link>
              </div>
              <div className='flex gap-1 text-sm md:text-base lg:text-lg items-center '>
                <IoMailOutline  className='text-primary text-base md:text-2xl' />
                <Link href="mailto:cs@interiorfilm.ae" target="_blank">cs@interiorfilm.ae</Link>
              </div>
            </div>
            <div className='hidden lg:flex gap-2 mx-auto md:mx-0 '>
              <p className='text-sm md:text-base text-center lg:text-start'>Get Up To 20% off in your first order</p>
            </div>
            <div className='flex gap-2 items-center mx-auto md:mx-0'>
              <div className='flex gap-2 items-center text-sm md:text-base lg:text-lg'>
                <FaUser  className='text-primary text-base md:text-2xl' />
                {loggedInUser ? loggedInUser.fullName :
                  <p className='text-sm md:text-base'><span className='cursor-pointer' onClick={() => router.push('/login')}>Login</span>/<span className='cursor-pointer' onClick={() => router.push('/register')}>Register</span></p>
                }

              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className='sticky top-0 z-50'>

     
      <div className='bg-secondary  w-full py-3  '>
        <Container>
          <div className='flex justify-between flex-wrap lg:flex-nowrap gap-0 md:gap-2 items-center'>
            <Link href={"/"}>
              <Image className='w-14 lg:w-24' src={logo} alt="logo" width={100} height={100} />
            </Link>

            <div className='border border-gray w-3/6 lg:w-full max-w-screen-md flex'>

              <input className='w-full px-4 focus:outline-none active:border-none focus:border-none border-white' value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='Search Product Here...' onKeyPress={handleKeyPress} />

              <Button className='rounded-l-md px-2 md:px-4' onClick={showModal} title={<IoSearch size={25} />} />
              <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer="" width={800}>
                <>
                  <div className='mt-8 space-y-3 mb-3'>
                    <input
                      className='w-full px-4 border h-14 rounded-md'
                      type="text"
                      placeholder='Search Product Here...'
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
                            href={{ pathname: `/detail/${generateSlug(product.name)}` }}
                            onClick={() => setIsModalOpen(false)}
                            className='shadow p-2 flex gap-2 mt-2 rounded-md border text-black hover:text-black border-gray hover:border-primary'
                          >
                            {product.posterImageUrl && (
                              <Image className='rounded-md' width={100} height={100} src={product.posterImageUrl.imageUrl} alt='image' />
                            )}
                            <div>
                              <p className='font-semibold text-lg md:text-xl'>{product.name}</p>
                              <p>{truncateText(product.description, 160)}</p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className='text-dark dark:text-white' >No products found</p>
                      )}
                    </div>
                  )}
                </>
              </Modal>
            </div>
            <DrawerMenu
              showDrawer={showDrawer}
              onClose={onClose}
              open={open}
              width={250}
              title={<><div className='p-1 rounded-md block lg:hidden text-white bg-primary'>
                <RiMenuFold3Fill size={20} />
              </div></>}
              content={<>
                <ul className='space-y-2'>
                  <li><Link className='text-base font-semibold text-black hover:text-black' onClick={onClose} href="/">Home</Link></li>
                  <li><DrawerMenu
                      classDrawer=' back-transparent  backdrop-blur-md p-2 shadow-none'
                        className='text-base font-semibold text-black hover:text-black cursor-pointer'
                      width={500}
                      showDrawer={CategoryHandler}
                      onClose={CategoryHandlerclose}
                      open={category}
                        title={"product"}
                        content={<>
                          <Mobiletab staticConatiner='hidden bg-white'  cardClass=' rounded-md bg-white' className='color-white' />
                        </>}
                      /></li>
                  <li><Link className='text-base font-semibold text-black hover:text-black ' onClick={onClose} href="/about">About Us</Link></li>
                  <li><Link className='text-base font-semibold text-black hover:text-black' onClick={onClose} href="/contact">Contact Us</Link></li>
                </ul>
              </>}
            />
            <div className='hidden lg:flex items-center gap-2 md:gap-4 lg:gap-8'>
              <Link className='group relative' href="/wishlist">
                {WishlistItems.length > 0 ?
                  <>
                    <IoMdHeartEmpty className='text-primary group-hover:text-dark transition duration-200 ease-in' size={30} />
                    <div className='rounded-full text-white w-6 h-6 bg-dark group-hover:bg-primary absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
                      {WishlistItems.reduce((count: any, item: any) => count + item.count, 0)}
                    </div>
                  </>
                  : <><IoMdHeartEmpty className='text-primary group-hover:text-dark transition duration-200 ease-in' size={30} /></>
                }
              </Link>

              <Link className='relative group' href="/cart">

                <PiBag className='text-primary group-hover:text-dark transition duration-200 ease-in' size={30} />
                {cartItems.length > 0 ?
                  <div className='rounded-full text-white w-6 h-6 bg-dark group-hover:bg-primary absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
                    {cartItems.reduce((count: any, item: any) => count + item.count, 0)}
                  </div>
                  : <></>
                }
              </Link>

            {loggedInUser  ?
            <Profile/>
            :
            <Link className='text-base lg:text-lg' href="/profile">
            <FaRegUser size={25}className='text-primary'  />
            </Link>
            }
            
 
            </div>
          </div>
        </Container>
      </div>
      <div className='bg-primary py-4 hidden lg:block'>
        <ul className='flex justify-center gap-12 text-white'>
          <li><Link className='link-underline' href="/">Home</Link></li>
          <li><Popover className='cursor-pointer link-underline'  placement="bottom" trigger="hover" content={<Megamanu />} title="">
            Product
          </Popover></li>
          <li><Link className='link-underline' href="/about">About</Link></li>
          <li><Link className='link-underline' href="/contact">Contact</Link></li>
        </ul>
      </div>
      </div>
      <div className='bg-primary p-3 fixed w-full bottom-0 block lg:hidden z-50'>
        <div className='flex justify-evenly gap-4'>
          <Link className='text-base lg:text-lg' href="/"><MdOutlineHome size={30} className='text-white' /></Link>

          <Link className='group relative' href="/wishlist">
            {WishlistItems.length > 0 ?
              <>
                <IoMdHeartEmpty className='text-white transition duration-200 ease-in' size={30} />
                <div className='rounded-full text-dark w-6 h-6 bg-white absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
                  {WishlistItems.reduce((count: any, item: any) => count + item.count, 0)}
                </div>
              </>
              : <><IoMdHeartEmpty className='text-white transition duration-200 ease-in' size={30} /></>
            }
          </Link>

          <Link className='relative group' href="/cart">

            <PiBag className='text-white transition duration-200 ease-in' size={30} />
            {cartItems.length > 0 ?
              <div className='rounded-full text-dark w-6 h-6 bg-white absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
                {cartItems.reduce((count: any, item: any) => count + item.count, 0)}
              </div>
              : <></>
            }
          </Link>


            <Link className='text-base lg:text-lg' href="/profile">
            
            {loggedInUser  ?
            <Profile/>
            :
                        <FaRegUser size={25} className='text-white' />


            
            }
            
            </Link>
        </div>
      </div>
    </>
  );
};

export default Header ;

'use client'

import React, { useEffect, useState } from 'react'

import Container from 'components/Layout/Container/Container';
import Thumbnail from 'components/Carousel/Thumbnail/Thumbnail';
import { Rate, message } from 'antd';
import { RxMinus, RxPlus } from 'react-icons/rx';
import SelectList from 'components/ui/Select/Select';
import { GoHeart } from 'react-icons/go';
import PRODUCTS_TYPES from 'types/interfaces';


interface productDetailsProps {
    productDetail : PRODUCTS_TYPES
    categoryName?: any;
}

export default function ProductDetails({ productDetail,categoryName }: productDetailsProps) {
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [relatedProductsLoading, setRelatedProductsLoading] = useState<boolean>(false);
    const [reviews, setReviews] = useState<any[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [length, setLength] = useState<number>(1);

    console.log(categoryName, "categoryName productDetail")

    let options: any = []

    {
        ((productDetail && productDetail.sizes) && productDetail.sizes.length > 0) && productDetail.sizes.forEach((item: any) => {
            let SizesArray = { label: "1.22" + "x" + item.sizesDetails + " METERS", value: item.sizesDetails }
            options.push(SizesArray)

            return null
        })
    }


    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + review.star, 0);
        return totalRating / reviews.length;
    };


    const handleIncrement = () => {
        if (quantity < 100) {
            setQuantity(quantity + 1);
        } else {
            message.error('Quantity cannot exceed 100.');
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            message.error('Quantity cannot be less than 1.');
        }
    };


    const averageRating = calculateAverageRating();


    const handleAddToCart = (product: any) => {
        const newCartItem = {
            id: product._id,
            name: product.name,
            price: product.salePrice,
            imageUrl: product.posterImageUrl?.imageUrl,
            discountPrice: product.discountPrice,
            count: quantity,
            length: length,
            totalPrice: (product.discountPrice || product.salePrice) * length * quantity,
            purchasePrice: product.purchasePrice,
            sizes: product.sizes
        };

        let existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingItemIndex = existingCart.findIndex((item: any) => item.id === product._id);

        if (existingItemIndex !== -1) {
            existingCart[existingItemIndex].length += length;
            existingCart[existingItemIndex].count += quantity;
            existingCart[existingItemIndex].totalPrice += (product.discountPrice || product.salePrice) * length * quantity;
        } else {
            existingCart.push(newCartItem);
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));
        message.success('Product added to cart successfully!');
        window.dispatchEvent(new Event("cartChanged"));
    };


    const handleAddToWishlist = (product: any) => {
        const newWishlistItem = {
            id: product._id,
            name: product.name,
            price: product.salePrice,
            imageUrl: product.posterImageUrl?.imageUrl,
            discountPrice: product.discountPrice,
            count: quantity,
            length: length,
            totalPrice: (product.discountPrice || product.salePrice) * length * quantity,
        };

        let existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        const existingItemIndex = existingWishlist.findIndex((item: any) => item.id === product._id);

        if (existingItemIndex !== -1) {
            // Update length and quantity
            existingWishlist[existingItemIndex].length += length;
            existingWishlist[existingItemIndex].count += quantity;
            existingWishlist[existingItemIndex].totalPrice += (product.discountPrice || product.salePrice) * length * quantity;
        } else {
            existingWishlist.push(newWishlistItem);
        }

        localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
        message.success('Product added to Wishlist successfully!');
        window.dispatchEvent(new Event("WishlistChanged"));
    }



    const onChange = (value: string) => {
        setLength(Number(value))
    };




    useEffect(() => {
        if (productDetail) {
            const price = productDetail.discountPrice || productDetail.salePrice;

            setTotalPrice((price * length) * quantity);
        }
    }, [length, quantity, productDetail]);

    return (
        <Container className='mt-10 mb-5'>
            <div className='shadow  bg-white'>
                <div className='grid grid-cols-2 md:grid-cols-3 mt-2 p-2 '>

                    <div className='w-full col-span-3 md:col-span-2'>
                        <Thumbnail thumbs={productDetail.imageUrl} />
                    </div>

                    <div className='py-3 space-y-2 md:space-y-8 col-span-3 md:col-span-1 '>
                        <h1 className='text-3xl'>{productDetail.name}</h1>

                        {(reviews.length && reviews.length > 0) ?
                            <div className='flex gap-2'>
                                <Rate className='text-primary product_starts' value={averageRating} disabled />
                                <p className='flex items-center h-[30x] w-[30x]'>({reviews.length})</p>
                            </div>
                            : null}



                        <div className='flex gap-2'>
                            <p className='text-secondary font-poppins text-[85] font-bold'>
                                Dhs. <span>{productDetail.discountPrice ? productDetail.discountPrice : productDetail.salePrice}</span>.00
                            </p>
                            {productDetail.discountPrice ?
                                <p className='line-through text-light'>
                                    Dhs. <span>{productDetail.salePrice}</span>.00
                                </p>
                                : null}
                        </div>
                        <p><span className='font-semibold text-text'>Available Quantity: </span> {productDetail.totalStockQuantity && productDetail.totalStockQuantity > 0 ? "In Stock" : "Out Of Stock"} </p>

                        <div className='flex gap-2 items-center'>
                            <p className='font-semibold	 text-text'>Quantity :</p>
                            <div className='flex'>
                                <div className='h-7 w-7 rounded-md bg-white border border-gray flex justify-center items-center' onClick={handleDecrement}>
                                    <RxMinus size={20} />
                                </div>
                                <div className='h-7 w-7 rounded-md bg-white flex justify-center items-center'>
                                    <input
                                        className="h-8 w-8 text-center border border-gray rounded-md"
                                        type="text"
                                        min={1}
                                        max={100}
                                        disabled
                                        value={quantity}
                                    />
                                </div>
                                <div className='h-7 w-7 rounded-md bg-white border border-gray flex justify-center items-center' onClick={handleIncrement}>
                                    <RxPlus size={20} />
                                </div>
                            </div>
                        </div>

                        <p className='font-semibold text-text'>Width : <span className='text-blak font-normal'>1.22 mm</span></p>
                        <p className='text-secondary font-bold'>
                            <span className='font-font-semibold	 text-text'>Total Price :</span> Dhs. <span>{totalPrice}</span>.00
                        </p>
                        <div className='flex gap-2 items-center w-[70%]'>

                            <SelectList
                                className='w-full h-10 border outline-none shipment text-20'
                                onChange={onChange}
                                options={options}
                                defaultValue="Select Size"

                            />

                        </div>


                      

                        {productDetail.totalStockQuantity == null ? (
                            <p className="text-primary text-center text-2xl">Product is out of stock</p>
                        ) : (
                            <div className='flex flex-wrap gap-1 md:gap-2'>

                                <button className='bg-secondary text-12 md:text-16  py-2 px-3 md:px-5 text-white' onClick={() => { }} >Order Now</button>
                                <button className='bg-secondary  text-12 md:text-16  py-2 px-3 md:px-5 text-white' onClick={() => handleAddToCart(productDetail)} >Add To Cart</button>
                                <button className='bg-primary text-16 md:text-16  py-2 px-3 md:px-5 text-white' onClick={() => handleAddToWishlist(productDetail)}><GoHeart  /></button>
                            </div>
                        )}
                        <div className='flex items-center gap-2 text-black dark:text-white'>
                            <p className='font-medium text-12 md:text-14'>Categories: </p>
                            <p className='text-dark text-12 md:text-14'>{categoryName}</p>
                        </div>
                    </div>


                </div>
            </div>
        </Container>)
}

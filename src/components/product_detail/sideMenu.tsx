'use client';
import TextwithIcon from 'components/TextwithIcon';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { TextWithIconData } from 'data/sideMenuData';
import showToast from 'components/Toaster/Toaster';

interface Product {
  posterImageUrl: {
    public_id: string;
    imageUrl: string;
  };
  _id: string;
  name: string;
  description: string;
  salePrice: number;
  purchasePrice: number;
  category: string;
  imageUrl: Array<{
    imageIndex: number;
    public_id: string;
    imageUrl: string;
    _id: string;
  }>;
  discountPrice: number;
  starRating: string;
  reviews: string;
  code: string;
  totalStockQuantity: number;
  variantStockQuantities: Array<any>;
}

const SideMenu: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchedProducts: Product[] = [
      {
        posterImageUrl: {
          public_id: 'interiorFilms/cqzkqjcykjaafevr9cgi',
          imageUrl: 'http://res.cloudinary.com/dhh6gp5tr/image/upload/v1723790134/interiorFilms/cqzkqjcykjaafevr9cgi.jpg'
        },
        _id: '668bc6aeddbcasa58b0a2f93619',
        name: 'KH6015',
        description: 'test',
        salePrice: 100,
        purchasePrice: 80,
        category: '66867ce543c6399137eb296c',
        imageUrl: [
          {
            imageIndex: 1,
            public_id: 'interiorFilms/fhffxuv96loqhhjkvcr1',
            imageUrl: 'http://res.cloudinary.com/dqvywckz8/image/upload/v1720436201/interiorFilms/fhffxuv96loqhhjkvcr1.jpg',
            _id: '668bc6eddbca58b0a2f9361a'
          },
          {
            imageIndex: 2,
            public_id: 'interiorFilms/pnwlgv6had0dx4erysq5',
            imageUrl: 'http://res.cloudinary.com/dqvywckz8/image/upload/v1720436202/interiorFilms/pnwlgv6had0dx4erysq5.jpg',
            _id: '668bc6eddbca58b0a2f9361c'
          }
        ],
        discountPrice: 20,
        starRating: '',
        reviews: '',
        code: 'KH6015',
        totalStockQuantity: 10,
        variantStockQuantities: []
      },
      {
        posterImageUrl: {
          public_id: 'interiorFilms/cqzkqjcykjaafevr9cgi',
          imageUrl: 'http://res.cloudinary.com/dhh6gp5tr/image/upload/v1723790134/interiorFilms/cqzkqjcykjaafevr9cgi.jpg'
        },
        _id: '668bc6eddbca58sab0a2f93619',
        name: 'KH6015',
        description: 'test',
        salePrice: 100,
        purchasePrice: 80,
        category: '66867ce543c6399137eb296c',
        imageUrl: [
          {
            imageIndex: 1,
            public_id: 'interiorFilms/fhffxuv96loqhhjkvcr1',
            imageUrl: 'http://res.cloudinary.com/dqvywckz8/image/upload/v1720436201/interiorFilms/fhffxuv96loqhhjkvcr1.jpg',
            _id: '668bc6eddbca58b0a2f9361a'
          },
          {
            imageIndex: 2,
            public_id: 'interiorFilms/pnwlgv6had0dx4erysq5',
            imageUrl: 'http://res.cloudinary.com/dqvywckz8/image/upload/v1720436202/interiorFilms/pnwlgv6had0dx4erysq5.jpg',
            _id: '668bc6eddbca58b0a2f9361c'
          }
        ],
        discountPrice: 20,
        starRating: '',
        reviews: '',
        code: 'KH6015',
        totalStockQuantity: 10,
        variantStockQuantities: []
      },
      {
        posterImageUrl: {
          public_id: 'interiorFilms/cqzkqjcykjaafevr9cgi',
          imageUrl: 'http://res.cloudinary.com/dhh6gp5tr/image/upload/v1723790134/interiorFilms/cqzkqjcykjaafevr9cgi.jpg'
        },
        _id: '668bc6eddbca58b0a2f93619',
        name: 'KH6015',
        description: 'test',
        salePrice: 100,
        purchasePrice: 80,
        category: '66867ce543c6399137eb296c',
        imageUrl: [
          {
            imageIndex: 1,
            public_id: 'interiorFilms/fhffxuv96loqhhjkvcr1',
            imageUrl: 'http://res.cloudinary.com/dqvywckz8/image/upload/v1720436201/interiorFilms/fhffxuv96loqhhjkvcr1.jpg',
            _id: '668bc6eddbca58b0a2f9361a'
          },
          {
            imageIndex: 2,
            public_id: 'interiorFilms/pnwlgv6had0dx4erysq5',
            imageUrl: 'http://res.cloudinary.com/dqvywckz8/image/upload/v1720436202/interiorFilms/pnwlgv6had0dx4erysq5.jpg',
            _id: '668bc6eddbca58b0a2f9361c'
          }
        ],
        discountPrice: 20,
        starRating: '',
        reviews: '',
        code: 'KH6015',
        totalStockQuantity: 10,
        variantStockQuantities: []
      },
      
    ];

    // Set all products as selected initially
    setSelectedProducts(fetchedProducts);
    setProducts(fetchedProducts);
  }, []);

  const handleCheckboxChange = (product: Product) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(product)
        ? prevSelected.filter((p) => p !== product)
        : [...prevSelected, product]
    );
  };

  const handleAddToCart = () => {
    selectedProducts.forEach((product) => {
      const newCartItem = {
        id: product._id,
        name: product.name,
        price: product.salePrice,
        imageUrl: product.posterImageUrl?.imageUrl,
        discountPrice: product.discountPrice,
        totalStockQuantity: product.totalStockQuantity,
        count: 1,
        length,
        totalPrice: (product.discountPrice || product.salePrice), 
        purchasePrice: product.purchasePrice,
        //@ts-expect-error
        sizes: product.sizes || [], 
        product_code: product.code
      };

      let existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = existingCart.findIndex(
        (item: any) => item.id === product._id && item.length === length
      );

      if (existingItemIndex !== -1) {
        const existingItem = existingCart[existingItemIndex];
        // existingItem.count += quantity;
        existingItem.count += 0;
        existingItem.totalPrice =
          (product.discountPrice || product.salePrice) *
          existingItem.count *
          length;
        existingCart[existingItemIndex] = existingItem;
      } else {
        existingCart.push(newCartItem);
      }
      localStorage.setItem('cart', JSON.stringify(existingCart));
    });

    console.log('Products added to cart:', selectedProducts);
    showToast("success",'Products added to cart successfully!');
    window.dispatchEvent(new Event('cartChanged'));
  };

  const totalPrice = selectedProducts.reduce((total, product) => total + product.discountPrice, 0);

  return (
    <div className='flex md:flex-col gap-2'>
      <div className='divide-y-2 p-2 divide-[#E4E4E4] border-2 border-[#E4E4E4]'>
        {TextWithIconData.map((item, index) => (
          <TextwithIcon
            key={index}
            Icon={item.icon}
            title={item.title}
            titleCSS='!text-[12.96px] !font-bold'
            SubtitleCSS='text-[10px] text-[#726C6C]'
            subTitle={item.subTitle}
          />
        ))}
      </div>

      <div className="">
        <div className="text-start mb-4">
          <h2 className="font-semibold text-sm">Add on <span className="font-bold">5% Save</span></h2>
        </div>
        <div className="space-y-4">
          {products.map((product) => (
            <div className='relative' key={product._id}>
              <input
                type="checkbox"
                checked={selectedProducts.includes(product)}
                onChange={() => handleCheckboxChange(product)}
                className="w-4 h-4 accent-orange-600 absolute top-2 left-2 !text-white z-10"
              />
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Price:</span>
            <span>AED {totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="mt-4 w-full bg-black text-white py-2 rounded-sm flex items-center justify-center cursor-pointer"
            onClick={handleAddToCart}
          >
            🛒 Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <div className="flex items-center relative">
        <Image
          src={product.posterImageUrl.imageUrl}
          alt={product.name}
          width={100}
          height={100}
          className="w-25 h-20 object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-[12px] font-[#111111]">{product.name}</h3>
        <p className="text-xs">{product.code}</p>
        <div className="flex items-center gap-1">
          <div className="flex text-yellow-500 text-xs">
            <FaStar className='text-[10px]' />
            <FaStar className='text-[10px]' />
            <FaStar className='text-[10px]' />
          </div>
        </div>
        <div className="text-[14.92px] font-bold">AED: {product.discountPrice}</div>
        <div className="text-xs line-through text-gray-500">AED: {product.salePrice}</div>
      </div>
    </div>
  );
};

export default SideMenu;

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Skeleton, Button } from 'antd';
import Loader from 'components/Loader/Loader';
import PRODUCTS_TYPES from 'types/interfaces';
import { generateSlug } from 'data/Data';
import { useRouter } from 'next/navigation';

interface MegamanuProps {
    Categories: { _id: string, name: string }[];
    products: PRODUCTS_TYPES[];
    onClick: () => void;
}

const MobileMenu: React.FC<MegamanuProps> = ({ Categories, products, onClick }) => {
    const router = useRouter();
    const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<PRODUCTS_TYPES[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(10);
    const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

    useEffect(() => {
        if (Categories.length > 0) {
            setSelectedCategory(Categories[0]._id);
            setLoadingCategories(false); // Categories have been loaded
        }
    }, [Categories]);

    useEffect(() => {
        if (selectedCategory) {
            setLoadingProducts(true);
            const filtered = products.filter(product => product.category === selectedCategory);
            setFilteredProducts(filtered);
            setLoadingProducts(false); // Products have been filtered
        } else {
            setFilteredProducts(products);
            setLoadingProducts(false); // All products have been loaded
        }
    }, [selectedCategory, products]);

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setVisibleCount(10); // Reset the visible count when category changes
    };

    const loadMoreProducts = () => {
        setVisibleCount(prevCount => prevCount + 10);
    };

    return (
        <>
            <ul className="px-1 pt-2 space-y-1 flex items-center gap-4 max-w-max whitespace-nowrap overflow-scroll custom-scrollbar h-10">
                {loadingCategories ? (
                    <div className="flex justify-center items-center"><Loader /></div>
                ) : (
                    Categories.map((item, index) => (
                        <li className='' key={index}>
                            <div
                                className={item._id === selectedCategory ? " px-2  flex items-center cursor-pointer underline" : " px-2 flex items-center"}
                                onClick={() => handleCategoryClick(item._id)}
                            >
                                {item.name}
                            </div>
                        </li>
                    ))
                )}
            </ul>
            <div className='grid grid-cols-2 gap-2 mt-5'>
                {loadingProducts ? (
                    Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className='gap-2 space-y-2 bg-white shadow-10 p-2 rounded-md'>
                            <Skeleton.Image className="w-full rounded-md" />
                            <Skeleton active paragraph={{ rows: 1 }} />
                        </div>
                    ))
                ) : (
                    filteredProducts.slice(0, visibleCount).map((product, index) => (
                        <div
                            key={index}
                            className='gap-2 space-y-2 bg-white shadow-10 p-2 rounded-md'
                            onClick={() => {
                                onClick(); // Call the onClick prop to close the drawer
                                router.push(`/Product/${generateSlug(product.name)}`);
                            }}
                        >
                            <Image width={100} height={100} src={product.posterImageUrl.imageUrl} alt={product.name} className='w-full rounded-md' />
                            <p className='text-14 font-bold'>Code: {product.name}</p>
                        </div>
                    ))
                )}
            </div>
            {visibleCount < filteredProducts.length && (
                <div className="flex justify-center mt-5">
                    <Button onClick={loadMoreProducts} type="primary">
                        Load More
                    </Button>
                </div>
            )}
        </>
    );
};

export default MobileMenu;

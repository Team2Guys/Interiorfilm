import dynamic from 'next/dynamic';
import Hero from 'components/Hero/Hero';
const CategorySlider = dynamic(() => import('components/Carousel/category-slider/category-slider'));
const HomeFeature = dynamic(() => import('components/Home-Feature/home-feature'));
const InfoTabs = dynamic(() => import('components/Info-Tabs/info-tabs'));
const SearchProduct = dynamic(() => import('components/Common/search-product/search-product'));
const Offer = dynamic(() => import('components/widgets/Offer/Offer'));
const PreFooter = dynamic(() => import('components/Layout/Footer/PreFooter'));
const HomeAccordian = dynamic(() => import('components/widgets/HomeAccordian'));
const PDF = dynamic(() => import('components/PDF/PDF'));
const CategorySliderSkeleton = dynamic(() => import('components/Skeleton-loading/CategorySliderSkeleton'));
const ProductSliderSkeleton = dynamic(() => import('components/Skeleton-loading/ProductSliderSkeleton'));
import { offers } from "data/sideMenuData";
import { Metadata } from "next";
import blacklogo from "../../public/images/logoblack.png";
import axios from 'axios';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Premium Quality, Vinyl Wraps, Quick Installation | Interior Film ',
  description: 'Discover premium vinyl wraps to match any style, from sleek modern designs to cosy, traditional looks. We have products that suit everyone.',
  openGraph: {
    title: 'Premium Quality, Vinyl Wraps, Quick Installation | Interior Film ',
    description: 'Discover premium vinyl wraps to match any style, from sleek modern designs to cosy, traditional looks. We have products that suit everyone.',
    url: '/',
    images: [
      {
        url: `${blacklogo.src}`,
        alt: 'Interior Film',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const [categoriesRes, mainResponse, addOnResponse] = await Promise.all([axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`), axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`), axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/addsOn_product/getAllproducts`
  )]);
  const categories = categoriesRes.data;
  const mainProducts = Array.isArray(mainResponse.data.products)
    ? mainResponse.data.products
    : [];
  const addOnProducts = Array.isArray(addOnResponse.data.products)
    ? addOnResponse.data.products
    : [];
  const combinedProducts = [...mainProducts, ...addOnProducts];

  return (
    <>
      <Hero />
      <InfoTabs />
      <Suspense fallback={<CategorySliderSkeleton />}>
        <CategorySlider categories={categories} />
      </Suspense>
      <HomeAccordian />
      <PreFooter />
      <SearchProduct products={combinedProducts} />
      <PDF />
      <Suspense fallback={<ProductSliderSkeleton />}>
        <HomeFeature allProducts={mainProducts || []} />
      </Suspense>
      <Offer OffersData={offers} />
    </>
  );
}

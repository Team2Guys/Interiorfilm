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
import { offers } from "data/sideMenuData";
import { Metadata } from "next";
import blacklogo from "../../public/images/logoblack.png";
import axios from 'axios';
import { getCategorywihtCustomorizeField } from 'utils/fetch';

export const metadata: Metadata = {
  title: 'Premium Quality, Vinyl Wraps, Quick Installation | Interior Film ',
  description: 'Discover premium vinyl wraps to match any style, from sleek modern designs to cosy, traditional looks. We have products that suit everyone.',
  openGraph: {
    title: 'Premium Quality, Vinyl Wraps, Quick Installation | Interior Film ',
    description: 'Discover premium vinyl wraps to match any style, from sleek modern designs to cosy, traditional looks. We have products that suit everyone.',
    url: 'https://interiorfilm.ae',
    images: [
      {
        url: `${blacklogo.src}`,
        alt: 'Interior Film',
      },
    ],
  },
  alternates: {
    canonical: 'https://interiorfilm.ae',
  },
};

export default async function Home() {
  const [categoriesRes, mainResponse, addOnResponse] = await Promise.all([
getCategorywihtCustomorizeField("name _id posterImageUrl"),
  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`),
  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addsOn_product/getAllproducts`
  )]);
  const categories =  categoriesRes.categories
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
        <CategorySlider categories={categories} />
      <HomeAccordian />
      <PreFooter />
      <SearchProduct products={combinedProducts} />
      <PDF />
        <HomeFeature allProducts={mainProducts || []} />
      <Offer OffersData={offers} />
    </>
  );
}

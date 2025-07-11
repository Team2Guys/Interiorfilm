import React from 'react'
import Category from './Category'
import { getAllCategories } from 'config/fetch';
import blacklogo from "../../../public/images/logoblack.png";
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Top Notch Quality, Quick Delivery, Affordable Prices | Interior Film',
  description: 'Interior Film, based in Dubai, offers top-quality vinyl wrapping solutions from Yellowzone General Trading. Expert service for all your wrapping needs.',
  openGraph: {
    title: 'Top Notch Quality, Quick Delivery, Affordable Prices | Interior Film',
    description: 'Interior Film, based in Dubai, offers top-quality vinyl wrapping solutions from Yellowzone General Trading. Expert service for all your wrapping needs.',
    url: 'https://interiorfilm.ae/categories',
     type: "website",
    images: [
      {
        url: `${blacklogo.src}`,
        alt: 'Interior Film',
      },
    ],
  },
  alternates: {
    canonical: 'https://interiorfilm.ae/categories', 
  },
  
};

const CategoryPage = async () => {
  const categoriesData = await getAllCategories();
  return (
    <Category category={categoriesData} />
  )
}

export default CategoryPage
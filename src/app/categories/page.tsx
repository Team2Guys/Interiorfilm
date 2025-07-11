import React from 'react'
import Category from './Category'
import { getAllCategories } from 'config/fetch';
import blacklogo from "../../../public/images/logoblack.png";
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Stylish Interior Wall Coverings UAE',
  description: 'Explore our full range of wall décor categories at Interior Film UAE. Discover stylish interior film options to transform your space with ease and elegance.',
  openGraph: {
    title: 'Stylish Interior Wall Coverings UAE',
    description: 'Explore our full range of wall décor categories at Interior Film UAE. Discover stylish interior film options to transform your space with ease and elegance.',
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
import React from "react";
import {fetchCategoryMeta, } from "utils/fetch";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { headers } from "next/headers";
import ProductPage from "components/product/Product";


export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category?: string }> }): Promise<Metadata> {
  const { category } = await searchParams
  const headersList = await headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-invoke-path') || '/';
  const fullUrl = `${protocol}://${domain}${pathname}`;
  const { category:paramsCategory } = await searchParams
let Product =  await fetchCategoryMeta(paramsCategory?? "", true)

  let ImageUrl = Product?.posterImageUrl?.imageUrl || "interiorfilm";
  let alt = Product?.Images_Alt_Text || "Interior films";

  let NewImage = [
    {
      url: ImageUrl,
      alt: alt
    }
  ];
  let title = Product && Product.Meta_Title ? Product.Meta_Title : "Interior Films"
  let description = Product && Product.Meta_Description ? Product.Meta_Description : "Welcome to Interior films"
  let url = `${fullUrl}/products?category=${category}`
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
      images: NewImage,
    },
    alternates: {
      canonical: Product && Product.Canonical_Tag ? Product.Canonical_Tag : url,
    },
  }
}

async function Products({ searchParams }: { searchParams: Promise<{ category?: string }> }) {


  const { category:paramsCategory } = await searchParams
let category =  await fetchCategoryMeta(paramsCategory?? "")

if(!category) notFound()
  const totalProducts = category.products;
  return (

    <ProductPage initialCategory={paramsCategory ?? ''} category={category}  totalProducts={totalProducts}/>
  );
}

export default Products;

import React from "react";
import {fetchCategoryMeta, } from "utils/fetch";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { headers } from "next/headers";
import ProductPage from "components/product/Product";
import NotFound from "app/not-found";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category?: string }> }): Promise<Metadata | undefined> {
  const { category } = await searchParams;
  const headersList = await headers();
  const rawDomain = headersList.get('x-forwarded-host') || headersList.get('host') || 'interiorfilm.ae';
  const protocol = 'https';
  const pathname = headersList.get('x-invoke-path') || '/';
  const fullUrl = `${protocol}://${rawDomain}${pathname}`;
  console.log(fullUrl,"fullUrl")
  const { category: paramsCategory } = await searchParams;
  let Product = await fetchCategoryMeta(paramsCategory ?? "", true);
  
  if (!Product) {
    NotFound();
    return;
  }
  let ImageUrl = Product?.posterImageUrl?.imageUrl || "interiorfilm";
  let alt = Product?.Images_Alt_Text || "Interior films";

  let NewImage = [{
    url: ImageUrl,
    alt: alt
  }];

  let title = Product?.Meta_Title || "Interior Films";
  let description = Product?.Meta_Description || "Welcome to Interior films";
  let url = `${fullUrl}products?category=${category}`;
  
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
      images: NewImage,
      type: "website",
    },
    alternates: {
      canonical: Product?.Canonical_Tag || url,
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
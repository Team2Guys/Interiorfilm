import ProductPage from "components/product/Product";
import React, { Suspense } from "react";
import SkeletonLoading from "components/Skeleton-loading/SkeletonLoading";
import { generateSlug } from "data/Data";
import { headers } from "next/headers";
import { Metadata } from "next";
import axios from "axios";


export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category?: string }> }): Promise<Metadata> {
  const { category } = await searchParams
  const headersList = await headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || ''; // Fallback to host if x-forwarded-host is not present
  const protocol = headersList.get('x-forwarded-proto') || 'https'; // Default to https if no protocol is set
  const pathname = headersList.get('x-invoke-path') || '/'; // Fallback to root if no path
  const fullUrl = `${protocol}://${domain}${pathname}`;
  console.log(fullUrl, "fullurl")
  const productRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`);

  let Product = productRequest.data?.find((item: any) => generateSlug(item.name) == category)
  console.log(Product, "Product")

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
  const { category } = await searchParams
  console.log(category, "searchParams")
  return (
    <Suspense fallback={<SkeletonLoading />}>
      <ProductPage />
    </Suspense>
  );
}

export default Products;

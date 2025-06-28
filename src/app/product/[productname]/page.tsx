import type { Metadata } from 'next'
import Product from './Product';
import axios from 'axios';
import { headers } from "next/headers";
import { generateSlug } from 'data/Data';
import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ productname: string }>
}
export async function generateMetadata({ params }: Props,): Promise<Metadata> {
  const { productname } = await params;
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || ''; // Fallback to host if x-forwarded-host is not present
  const protocol = headersList.get('x-forwarded-proto') || 'https'; // Default to https if no protocol is set
  const pathname = headersList.get('x-invoke-path') || '/'; // Fallback to root if no path
  const fullUrl = `${protocol}://${domain}${pathname}`;
  console.log(fullUrl, "fullurl")
  const productRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
  const [productResponse] = await Promise.all([productRequest]);
  const { products } = productResponse.data

  let Product = products?.find((item: any) => generateSlug(item.name) == productname)
  if (!Product) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/addsOn_product/getAllproducts`
    );
    const Allproducts = await response.json();
    Product = Allproducts?.products?.find((item: any) => generateSlug(item.name) == productname)

  }

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
  let url = `${fullUrl}/product/${productname}`
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

const Page = async ({ params }: { params: Promise<{ productname: string }> }) => {
  const { productname } = await params;
  const [categoryResponse, productResponse] = await Promise.all([
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`),
    await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`),
  ]);
  if (productname && productResponse.data.products.length > 0) {
    const foundProduct = productResponse.data.products.find(
      (item: any) => generateSlug(item.name) === productname
    );

    if (foundProduct) {
      const foundCategory = categoryResponse.data.find(
        (cat: any) => cat._id === foundProduct.category
      );
      return (
        <Product productDetail={foundProduct} products={productResponse.data.products} categoryName={foundCategory.name} />
      )
    }
    if (foundProduct === undefined) {
      const adsonProducts = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addsOn_product/getAllproducts`);
      const foundProductAdon = adsonProducts.data.products.find(
        (item: any) => generateSlug(item.name) === productname
      );
      if (foundProductAdon) {
        return (
          <Product productsAdon={adsonProducts.data.products} products={productResponse.data.products} productDetail={foundProductAdon} categoryName='accessories' />
        )
      }
      return redirect('/404')
    }
  }
};

export default Page;

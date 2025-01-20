import type { Metadata } from 'next'
import Product from './Product';
import { headers } from "next/headers";
import { generateSlug } from 'data/Data';
import { getAlladsproducts, getAllCategories, getAllproducts } from 'config/fetch';
import { meta_props } from 'types/interfaces';


export async function generateMetadata({ params }: meta_props,): Promise<Metadata> {
  const headersList = await headers();
  const { productname } = await params;

  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || ''; // Fallback to host if x-forwarded-host is not present
  const protocol = headersList.get('x-forwarded-proto') || 'https'; // Default to https if no protocol is set
  const pathname = headersList.get('x-invoke-path') || '/'; // Fallback to root if no path
  const fullUrl = `${protocol}://${domain}${pathname}`;
  console.log(fullUrl, "fullurl")
  const [prod, addsOn_product] = await Promise.all([getAllproducts(), getAlladsproducts()]);
  let products = [...prod, ...addsOn_product]

  let Product = products?.find((item: any) => generateSlug(item.name) == productname)
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

const Page = async ({ params, }: meta_props) => {

  const { productname } = await params;

  let productDetail: any;
  let categoryName;
  let productsAdon;
  let filteredProducts;
  try {


    const [categories, products, addsOn_product] = await Promise.all([
      getAllCategories(),
      getAllproducts(),
      getAlladsproducts(),
    ]);



    if (productname && products.length > 0) {
      const foundProduct = products.find((item: any) => generateSlug(item.name) === productname);


      if (!foundProduct) {
        const foundProductAdon = addsOn_product.find((item: any) => generateSlug(item.name) === productname);
        productDetail = foundProductAdon
        productsAdon = addsOn_product
        categoryName = 'accessories'
      }
      else if (foundProduct) {
        productDetail = foundProduct
        const foundCategory = categories?.find((cat: any) => cat._id === foundProduct.category);
        categoryName = foundCategory ? foundCategory.name : null
      }
    }

    filteredProducts = products?.filter((product: any) => product.category === productDetail?.category && product.name !== productname);

    if (filteredProducts.length === 0) {
      filteredProducts = productsAdon
    }
    if (!filteredProducts) {
      return {
        notFound: true,
      };
    }

  } catch (error) {
    console.log(error, "error")

  }



  return (
    <>
      <Product
        productname={productname}
        filteredProducts={filteredProducts}
        productDetail={productDetail}
        categoryName={categoryName}



      />
    </>
  );
};

export default Page;

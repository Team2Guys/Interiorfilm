import type { Metadata } from 'next'
import Product from './Product';
import axios from 'axios';
import { headers } from "next/headers";
import { generateSlug } from 'data/Data';
import { getAlladsproducts, getAllCategories, getAllproducts } from 'config/fetch';

type Props = {
  params: { productname: string }
}
export async function generateMetadata({ params }: Props,): Promise<Metadata> {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || ''; // Fallback to host if x-forwarded-host is not present
  const protocol = headersList.get('x-forwarded-proto') || 'https'; // Default to https if no protocol is set
  const pathname = headersList.get('x-invoke-path') || '/'; // Fallback to root if no path
  const fullUrl = `${protocol}://${domain}${pathname}`;
  console.log(fullUrl, "fullurl")
  const productRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
  const [productResponse] = await Promise.all([productRequest]);
  const { products } = productResponse.data

  let Product = products?.find((item: any) => generateSlug(item.name) == params.productname)

  let ImageUrl = Product?.posterImageUrl?.imageUrl || "interiorfilm";
  let alt = Product?.Images_Alt_Text || "Interior films";

  let NewImage = [
    {
      url: ImageUrl,
      alt: alt
    }
  ];
  let title = Product && Product.Meta_Title ? Product.Meta_Title : "Interior Films"
  let description = Product && Product.description ? Product.description : "Welcome to Interior films"
  let url = `${fullUrl}/product/${params.productname}`
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

export async function getStaticPaths() {
  const [products, addsOn_product] = await Promise.all([getAllCategories(), getAllproducts(), getAlladsproducts()]);


  const paths = [...products, ...addsOn_product].map((product: any) => ({
    params: { productName: generateSlug(product.name) },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}


export async function getStaticProps({ params }: { params: { productname: string } }) {
  const { productname } = params;
  const [categories, products, addsOn_product] = await Promise.all([getAllCategories(), getAllproducts(), getAlladsproducts()]);

  let productDetail: any;
  let categoryName;
  let productsAdon;
  let filteredProducts

  if (productname && products.length > 0) {
    const foundProduct = products.find((item: any) => generateSlug(item.name) === productname);


    if (!foundProduct) {
      const foundProductAdon = addsOn_product.find((item: any) => generateSlug(item.name) === productname);

      productDetail = foundProductAdon
      productsAdon = foundProductAdon
      categoryName = 'accessories'
    }
    else if (foundProduct) {
      productDetail = foundProduct
      const foundCategory = categories.find((cat: any) => cat._id === foundProduct.category);
      categoryName = foundCategory ? foundCategory.name : null
    }
  }

  filteredProducts = products.filter((product: any) => product.category === productDetail?.category && product.name !==productname);

  if (filteredProducts.length === 0) {
    filteredProducts = productsAdon
  }

  if (!filteredProducts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      filteredProducts: filteredProducts,
      productDetail:productDetail,
      categoryName:categoryName
      
    },
    revalidate: 10,
  };
}

const Page = ({ params,filteredProducts,productDetail,categoryName }: { params: { productname: string },filteredProducts:any, productDetail:any, categoryName: any }) => {
console.log(categoryName, productDetail, productDetail)
  return (
    <>
      <Product 
      productname={params.productname}
      filteredProducts={filteredProducts}
      productDetail={productDetail}
      categoryName={categoryName}
      


       />
    </>
  );
};

export default Page;

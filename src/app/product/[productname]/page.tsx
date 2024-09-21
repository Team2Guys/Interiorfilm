import type { Metadata, ResolvingMetadata } from 'next'
import Product from './Product';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { headers } from "next/headers";
import { generateSlug } from 'data/Data';



type Props = {
  params: { productname: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props,): Promise<Metadata> {
  // read route params
  const headersList = headers();
  // Get the domain, protocol, and pathname
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || ''; // Fallback to host if x-forwarded-host is not present
  const protocol = headersList.get('x-forwarded-proto') || 'https'; // Default to https if no protocol is set
  const pathname = headersList.get('x-invoke-path') || '/'; // Fallback to root if no path

  // Construct the full URL
  const fullUrl = `${protocol}://${domain}${pathname}`;
  console.log(fullUrl, "fullurl")

  const categoryRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`);
  const productRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
  const [categoryResponse, productResponse] = await Promise.all([categoryRequest, productRequest]);

  const { products } = productResponse.data

  let Product = products?.find((item: any) => generateSlug(item.name) == params.productname)

  let ImageUrl = Product?.posterImageUrl?.imageUrl || "interiorfilm"; // Make sure the URL is correct
  let alt = Product?.Images_Alt_Text || "Interior films"; // Check if alt text is available
  
  let NewImage = [
    {
      url: ImageUrl, 
      alt: alt     }
  ];


  console.log(NewImage, "NewImage")


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
      canonical:Product && Product.Canonical_Tag? Product.Canonical_Tag : url , 
    },
  }
}



const Page = ({ params }: { params: { productname: string } }) => {





  return (
    <>
      <Product productname={params.productname} />
    </>
  );
};

export default Page;

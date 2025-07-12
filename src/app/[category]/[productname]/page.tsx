import type { Metadata } from 'next'
import axios from 'axios';
import { headers } from "next/headers";
import { generateSlug } from 'data/Data';
import { getSingleProduct } from 'utils/fetch';
import { notFound } from 'next/navigation';
import Container from "components/Layout/Container/Container";
import Overlay from "components/widgets/Overlay/Overlay";
import ProductSlider from "components/Carousel/ProductSlider/ProductSlider";
import ProductDetails from "components/product_detail/ProductDetails";
import Accordion from "components/widgets/Accordion";

type Props = {
  params: Promise<{ productname: string, category: string }>
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productname } = await params;
  const headersList = await headers();

  // Get domain or fallback to production domain
  const rawDomain = headersList.get('x-forwarded-host') || headersList.get('host');
  const domain = rawDomain || 'interiorfilm.ae';
  const protocol = 'https';
  const pathname = headersList.get('x-invoke-path') || '/';
  const fullUrl = `${protocol}://${domain}${pathname}`;
  console.log(fullUrl, "fullurl");
  const productRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
  const [productResponse] = await Promise.all([productRequest]);
  const { products } = productResponse.data;
  let Product = products?.find((item: any) => generateSlug(item.name) == productname);
  if (!Product) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/addsOn_product/getAllproducts`
    );
    const Allproducts = await response.json();
    Product = Allproducts?.products?.find((item: any) => generateSlug(item.name) == productname);
  }
  let ImageUrl = Product?.posterImageUrl?.imageUrl || "interiorfilm";
  let alt = Product?.Images_Alt_Text || "Interior films";

  let NewImage = [{
    url: ImageUrl,
    alt: alt
  }];

  let title = Product?.Meta_Title || "Interior Films";
  let description = Product?.Meta_Description || "Welcome to Interior films";
  let url = `https://${domain}/product/${productname}`;

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

const Page = async ({ params }: Props) => {
  const { productname, category } = await params;
  let {product, products} = await getSingleProduct(productname, category)

if(!product){
  return notFound()
}

  return (
   <>
      <Overlay title="Shop" />

          <ProductDetails
            productDetail={product}
            categoryName={category}
            isAccessory={category === 'accessories'}
          />

      {product ? (
        <>
          <div className="block lg:hidden mt-5">
            <Accordion />
          </div>
        </>
      ) : null}

      <Container className="mt-20">
        <div className="flex justify-center items-center">
          <p className="w-fit text-center text-lg border-b-2 border-primary md:text-3xl mb-5 uppercase tracking-[0.5rem]">
            recommended Products</p>
        </div>
        <ProductSlider categoryName={category}  loading={false} products={products} />
      </Container>
    </>  )




};

export default Page;

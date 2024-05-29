import Tabs from "components/ui/Tabs/Tabs";
import TabsData from "components/widgets/TabsData/TabsData";
import img2 from "../../public/images/img-1.png";
import img3 from "../../public/images/img-10.png";
import img4 from "../../public/images/img-11.png";
import img5 from "../../public/images/img-12.png";
import img6 from "../../public/images/img-13.png";
import img7 from "../../public/images/img-14.png";
import img8 from "../../public/images/img-15.png";
import img9 from "../../public/images/img-16.png";
import img143 from "../../public/images/CA143.png";
import img003 from "../../public/images/KH9003.png";
import img107 from "../../public/images/CA107.png";
import CollectiveProduct from "components/widgets/CollectiveProduct/CollectiveProduct";
import HeroSlider from "components/Carousel/HeroSlider/HeroSlider";
import Offer from "components/widgets/Offer/Offer";
import { SlDiamond } from "react-icons/sl";
import { CgBulb } from "react-icons/cg";
import { GiPayMoney } from "react-icons/gi";
import { RiCustomerService2Line } from "react-icons/ri";
import Testimonial from "components/widgets/Testimonial/Testimonial";
import ProductSlider from "components/Carousel/ProductSlider/ProductSlider";
import Container from "components/Layout/Container/Container";

const tabs = [
  {
    label: "Interior Vinyl Wraps",
    content: (
      <>
        <TabsData
          items={[
            {
              image: img2,
              title: "Sony Wireless Bohm",
              price: 19,
              oldprice: 38,
              star: 2,
            },
            {
              image: img3,
              title: "JBL Micoro Headphone",
              price: 23,
              oldprice: 38,
              star: 2,
            },
            {
              image: img4,
              title: "Bose Color Speaker",
              price: 21,
              oldprice: 38,
              star: 2,
            },
            {
              image: img5,
              title: "Bose Color Speaker",
              price: 30,
              oldprice: 38,
              star: 2,
            },
            {
              image: img6,
              title: "Asus Watch Speaker",
              price: 28,
              oldprice: 38,
              star: 2,
            },
            {
              image: img7,
              title: "Asus Watch Speaker",
              price: 12,
              oldprice: 38,
              star: 2,
            },
          ]}
        />
      </>
    ),
  },
  {
    label: "Exterior Vinyl Wraps",
    content: (
      <>
        <TabsData
          items={[
            {
              image: img8,
              title: "Sony Wireless Bohm",
              price: 19,
              oldprice: 38,
              star: 2,
            },
            {
              image: img9,
              title: "JBL Micoro Headphone",
              price: 23,
              oldprice: 38,
              star: 2,
            },
            {
              image: img2,
              title: "Bose Color Speaker",
              price: 21,
              oldprice: 38,
              star: 2,
            },
            {
              image: img4,
              title: "Bose Color Speaker",
              price: 30,
              oldprice: 38,
              star: 2,
            },
            {
              image: img6,
              title: "Asus Watch Speaker",
              price: 28,
              oldprice: 38,
              star: 2,
            },
            {
              image: img5,
              title: "Asus Watch Speaker",
              price: 12,
              oldprice: 38,
              star: 2,
            },
          ]}
        />
      </>
    ),
  },
  {
    label: "Window Film",
    content: (
      <>
        <TabsData
          items={[
            {
              image: img5,
              title: "Sony Wireless Bohm",
              price: 19,
              oldprice: 38,
              star: 2,
            },
            {
              image: img4,
              title: "JBL Micoro Headphone",
              price: 23,
              oldprice: 38,
              star: 2,
            },
            {
              image: img3,
              title: "Bose Color Speaker",
              price: 21,
              oldprice: 38,
              star: 2,
            },
            {
              image: img2,
              title: "Bose Color Speaker",
              price: 30,
              oldprice: 38,
              star: 2,
            },
            {
              image: img8,
              title: "Asus Watch Speaker",
              price: 28,
              oldprice: 38,
              star: 2,
            },
            {
              image: img9,
              title: "Asus Watch Speaker",
              price: 12,
              oldprice: 38,
              star: 2,
            },
          ]}
        />
      </>
    ),
  },
];
const items = [
  {
    image: img3,
    title: "JBL Micoro Headphone",
    price: 23,
    oldprice: 38,
    star: 2,
  },
  {
    image: img4,
    title: "Bose Color Speaker",
    price: 21,
    oldprice: 38,
    star: 3,
  },
  {
    image: img5,
    title: "Bose Color Speaker",
    price: 30,
    oldprice: 38,
    star: 1,
  },
  {
    image: img6,
    title: "Asus Watch Speaker",
    price: 28,
    oldprice: 38,
    star: 5,
  },
  {
    image: img7,
    title: "Asus Watch Speaker",
    price: 12,
    oldprice: 38,
    star: 4,
  },
  {
    image: img8,
    title: "Sony Wireless Bohm",
    price: 19,
    oldprice: 38,
    star: 2,
  },
];

const products = [
  { image: img143, category: "Realistic Woodgrain" },
  { image: img003, category: "Realistic Marbles" },
  { image: img107, category: "Realistic Matte" },
];
const offers = [
  {
    icon: (
      <SlDiamond className="text-primary  group-hover:text-white" size={40} />
    ),
    title: "Quality Products",
    detail: "Get free Quality Products for your interior design project.",
  },
  {
    icon: <CgBulb className="text-primary  group-hover:text-white" size={40} />,
    title: "Reasonable Pricing",
    detail: "We ensure the highest quality standards for your interiors.",
  },
  {
    icon: (
      <GiPayMoney className="text-primary  group-hover:text-white" size={40} />
    ),
    title: "Reasonable Pricing",
    detail: "Competitive pricing for all our services.",
  },
  {
    icon: (
      <RiCustomerService2Line
        className="text-primary  group-hover:text-white"
        size={40}
      />
    ),
    title: "24/7 Support",
    detail: "Our support team is available 24/7 to assist you.",
  },
];
export default function Home() {
  return (
    <>
      <HeroSlider />
      <h1 className="lg:text-5xl md:text-3xl font-semibold text-xl text-center mt-10">
        DISCOVER OUR PRODUCT RANGES
      </h1>
      <Tabs className="justify-center items-center" tabs={tabs} />

      <CollectiveProduct products={products} />
      <Container className="mt-20">
        <h1 className="lg:text-5xl md:text-3xl font-semibold text-xl text-center mb-5">Feature Product</h1>
        <ProductSlider Related={items} />
      </Container>
      <Offer Offers={offers} />
      <Testimonial />
    </>
  );
}


import Offer from "components/widgets/Offer/Offer";
import { SlDiamond } from "react-icons/sl";
import { CgBulb } from "react-icons/cg";
import { GiPayMoney } from "react-icons/gi";
import { RiCustomerService2Line } from "react-icons/ri";
import ProductSlider from "components/Carousel/ProductSlider/ProductSlider";
import Container from "components/Layout/Container/Container";
import Mobiletab from "components/ui/Tabs/Mobiletab/Mobiletab";
import axios from 'axios';
import PRODUCTS_TYPES from "types/interfaces";
import OfferProduct from "components/OfferProduct/OfferProduct";
import Hero from "components/Hero/Hero";
import CategorySlider from "components/Carousel/category-slider/category-slider";

const offers = [
  {
    icon: <SlDiamond className="text-primary group-hover:text-white" size={40} />,
    title: "Savings to your pocket ",
    detail: "We cut out the middle man, passing the savings on to you.",
  },
  {
    icon: <CgBulb className="text-primary group-hover:text-white" size={40} />,
    title: "Fast Delivery",
    detail: "Choose your material, select quantity, check out and receive by the next working day.",
  },
  {
    icon: <GiPayMoney className="text-primary group-hover:text-white" size={40} />,
    title: "Exclusive Collection ",
    detail: "We buy direct from the factory and are exclusive distributors for the GCC.",
  },
  {
    icon: <RiCustomerService2Line className="text-primary group-hover:text-white" size={40} />,
    title: "Service Promise",
    detail: "Our professional team are on hand 365 days a year to help with any queries you may have.",
  },
];

export default function Home() {


  return (
    <>
      <Hero />
      <div className=" mt-[560px] sm:mt-[550px] md:mt-[800px] lg:mt-[910px]" />
      <CategorySlider/>
      <Container className="mt-10">
        <h1 className="text-[24px] text-heading text-center ">
        FEATURE PRODUCT
        </h1>
        <hr className="w-52 mx-auto border-primary"/>
        <ProductSlider />
      </Container>
      {/* <h1 className="lg:text-[55px]  md:text-3xl text-xl font-bold md:font-black text-center text-heading">
        Discover Our Product Ranges
      </h1> */}
      {/* <Container className="mt-10 relative">
        <Mobiletab className="color-black" staticConatiner={"hidden md:block"} />
      </Container> */}
      {/* <OfferProduct/> */}
  
      {/* <Offer Offers={offers} /> */}
      {/* <Testimonial /> */}
    </>
  );
}

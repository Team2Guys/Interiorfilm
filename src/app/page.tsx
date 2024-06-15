
import HeroSlider from "components/Carousel/HeroSlider/HeroSlider";
import Offer from "components/widgets/Offer/Offer";
import { SlDiamond } from "react-icons/sl";
import { CgBulb } from "react-icons/cg";
import { GiPayMoney } from "react-icons/gi";
import { RiCustomerService2Line } from "react-icons/ri";
import Testimonial from "components/widgets/Testimonial/Testimonial";
import ProductSlider from "components/Carousel/ProductSlider/ProductSlider";
import Container from "components/Layout/Container/Container";
import Mobiletab from "components/ui/Tabs/Mobiletab/Mobiletab";

const offers = [
  {
    icon: 
      <SlDiamond className="text-primary  group-hover:text-white" size={40} />,
    title: "Quality Products",
    detail: "Get free Quality Products for your interior design project.",
  },
  {
    icon: <CgBulb className="text-primary  group-hover:text-white" size={40} />,
    title: "Reasonable Pricing",
    detail: "We ensure the highest quality standards for your interiors.",
  },
  {
    icon: <GiPayMoney className="text-primary  group-hover:text-white" size={40} />,
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
      <h1 className="lg:text-5xl md:text-3xl text-lg font-semibold  text-center mt-10">Discover Our Product Ranges</h1>
      <Container className="mt-10">
      <Mobiletab className="color-black" />
      </Container>
      <Container className="mt-20">
        <h1 className="lg:text-5xl md:text-3xl font-semibold text-xl text-center mb-5">Feature Product</h1>
        
        <ProductSlider  />
      </Container>
      <Offer Offers={offers} />
      <Testimonial />
    </>
  );
}

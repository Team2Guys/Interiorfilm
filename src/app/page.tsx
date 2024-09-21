import Hero from "components/Hero/Hero";
import CategorySlider from "components/Carousel/category-slider/category-slider";
import HomeFeature from "components/Home-Feature/home-feature";
import InfoTabs from "components/Info-Tabs/info-tabs";
import InteriorVideo from "components/Common/interior-video/interior-video";
import SearchProduct from "components/Common/search-product/search-product";
import Offer from "components/widgets/Offer/Offer";
import PreFooter from "components/Layout/Footer/PreFooter";
import HomeAccordian from "components/widgets/HomeAccordian";
import { offers } from "data/sideMenuData";
export default function Home() {
  return (
    <>
      {/* <div className='hidden sm:block fixed top-1/2 z-999 left-5 h-36 w-14 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white p-2'>
          <p className='transform  mt-20  -rotate-90 whitespace-nowrap'>Get 10% Off!</p>
        </div> */}

      <Hero />
      <InfoTabs />
      <CategorySlider />
      <PreFooter />
      <HomeAccordian />
      <InteriorVideo />
      <SearchProduct />
      <HomeFeature />
      <Offer Offers={offers} />
    </>
  );
}

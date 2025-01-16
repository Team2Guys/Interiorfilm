import Hero from "components/Hero/Hero";
import CategorySlider from "components/Carousel/category-slider/category-slider";
import HomeFeature from "components/Home-Feature/home-feature";
import InfoTabs from "components/Info-Tabs/info-tabs";
import SearchProduct from "components/Common/search-product/search-product";
import Offer from "components/widgets/Offer/Offer";
import PreFooter from "components/Layout/Footer/PreFooter";
import HomeAccordian from "components/widgets/HomeAccordian";
import { offers } from "data/sideMenuData";
import PDF from "components/PDF/PDF";
export default function Home() {
  return (
    <>
      <Hero />
      <InfoTabs />
      <CategorySlider />
      <HomeAccordian />
      <PreFooter />
      <SearchProduct />
      <PDF/>
      <HomeFeature />
      <Offer OffersData={offers} />
    </>
  );
}

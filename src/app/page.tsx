
import Hero from "components/Hero/Hero";
import CategorySlider from "components/Carousel/category-slider/category-slider";
import HomeFeature from "components/Home-Feature/home-feature";
import InfoTabs from "components/Info-Tabs/info-tabs";
export default function Home() {
  return (
    <>
      <Hero />
      <InfoTabs/>
      <CategorySlider/>
      <HomeFeature/>
    </>
  );
}

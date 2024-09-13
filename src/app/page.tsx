
import Hero from "components/Hero/Hero";
import CategorySlider from "components/Carousel/category-slider/category-slider";
import HomeFeature from "components/Home-Feature/home-feature";
import InfoTabs from "components/Info-Tabs/info-tabs";
import InteriorVideo from "components/Common/interior-video/interior-video";
import SearchProduct from "components/Common/search-product/search-product";
import Offer from "components/widgets/Offer/Offer";
import { SlDiamond } from 'react-icons/sl'
import { CgBulb } from 'react-icons/cg'
import { GiPayMoney } from 'react-icons/gi'
import { RiCustomerService2Line } from 'react-icons/ri'

const offers = [
  { icon:<SlDiamond className='text-primary group-hover:text-white text-23 md:text-[40px]'  /> ,title: 'Savings to your pocket', detail: 'We cut out the middle man, passing the savings on to you.' },
  { icon:<CgBulb className='text-primary  group-hover:text-white text-23 md:text-[40px]'  /> ,title: 'Fast Delivery ', detail: 'Choose your material, select quantity, check out and receive by the next working day.' },
  { icon:<GiPayMoney className='text-primary  group-hover:text-white text-23 md:text-[40px]'  /> ,title: 'Exclusive Collection', detail: 'We buy direct from the factory and are exclusive distributors for the GCC.' },
  { icon:<RiCustomerService2Line className='text-primary  group-hover:text-white text-23 md:text-[40px]'  /> ,title: 'Service Promise', detail: 'Our professional team are on hand 365 days a year to help with any queries you may have.' },
];

export default function Home() {
  return (
    <>

    {/* <div className='hidden sm:block fixed top-1/2 z-999 left-5 h-36 w-14 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white p-2'>
          <p className='transform  mt-20  -rotate-90 whitespace-nowrap'>Get 10% Off!</p>
        </div> */}

      <Hero />
      <InfoTabs/>
      <CategorySlider/>
      <InteriorVideo/>
      <SearchProduct/>
      <HomeFeature/>
      <Offer Offers={offers}/>
    </>
  );
}

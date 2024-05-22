import Tabs from "components/ui/Tabs/Tabs";
import TabsData from "components/widgets/TabsData/TabsData";
import img2 from "../../public/images/img-1.png"
import img3 from "../../public/images/img-10.png"
import img4 from "../../public/images/img-11.png"
import img5 from "../../public/images/img-12.png"
import img6 from "../../public/images/img-13.png"
import img7 from "../../public/images/img-14.png"
import img8 from "../../public/images/img-15.png"
import img9 from "../../public/images/img-16.png"
import CollectiveProduct from "components/widgets/CollectiveProduct/CollectiveProduct";

const tabs = [
  { label: 'Interior Vinyl Wraps', content: <><TabsData
  items ={ [
    { image: img2, title: "Sony Wireless Bohm", price: 19, oldprice: 38, star: 2 },
    { image: img3, title: "JBL Micoro Headphone", price: 23, oldprice: 38, star: 2 },
    { image: img4, title: "Bose Color Speaker", price: 21, oldprice: 38, star: 2 },
    { image: img5, title: "Bose Color Speaker", price: 30, oldprice: 38, star: 2 },
    { image: img6, title: "Asus Watch Speaker", price: 28, oldprice: 38, star: 2 },
    { image: img7, title: "Asus Watch Speaker", price: 12, oldprice: 38, star: 2 }
  ]}
  /></> },
  { label: 'Exterior Vinyl Wraps', content: <><TabsData
  items ={ [
    { image: img8, title: "Sony Wireless Bohm", price: 19, oldprice: 38, star: 2 },
    { image: img9, title: "JBL Micoro Headphone", price: 23, oldprice: 38, star: 2 },
    { image: img2, title: "Bose Color Speaker", price: 21, oldprice: 38, star: 2 },
    { image: img4, title: "Bose Color Speaker", price: 30, oldprice: 38, star: 2 },
    { image: img6, title: "Asus Watch Speaker", price: 28, oldprice: 38, star: 2 },
    { image: img5, title: "Asus Watch Speaker", price: 12, oldprice: 38, star: 2 }
  ]}
  /></> },
  { label: 'Window Film', content: <><TabsData
  items ={ [
    { image: img5, title: "Sony Wireless Bohm", price: 19, oldprice: 38, star: 2 },
    { image: img4, title: "JBL Micoro Headphone", price: 23, oldprice: 38, star: 2 },
    { image: img3, title: "Bose Color Speaker", price: 21, oldprice: 38, star: 2 },
    { image: img2, title: "Bose Color Speaker", price: 30, oldprice: 38, star: 2 },
    { image: img8, title: "Asus Watch Speaker", price: 28, oldprice: 38, star: 2 },
    { image: img9, title: "Asus Watch Speaker", price: 12, oldprice: 38, star: 2 }
  ]}
  /></> },
];
const products = [
  { image:img2, category: 'Realistic Woodgrain' },
  { image:img2, category: 'Realistic Marbles' },
  { image:img2, category: 'Realistic Matte' },
];

export default function Home() {
  return (
    <>
      {/* <HeroSlider/> */}
      <h1 className="text-[40px] md:text-[55px] font-bold text-center mt-10">DISCOVER OUR PRODUCT RANGES</h1>
      <Tabs tabs={tabs} />
      <CollectiveProduct products={products} />
    </>
  );
}

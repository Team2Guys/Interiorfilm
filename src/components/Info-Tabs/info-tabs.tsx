"use client";
import Container from "components/Layout/Container/Container";
import { useState } from "react";
export default function InfoTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Why Choose Us?",
    "Our Mission",
    "Product Range",
    "Popular Products",
    "Convenience",
  ];
  const content = [
    <>
    <p>There are many reasons, but the key ones would be that:</p>
    <ul className="px-6 list-disc">
      <li>We hold stocks</li>
      <li>We have been around for years and know the market very well</li>
      <li>We have a very service centric approach to customers</li>
      <li>Our prices are literally unbeatable</li>
    </ul>
    </>,
    "Our aim is to bring the latest colours and designs, direct to you at factory prices. ",
    "We carry almost 95% of the entire collection from one of the world’s largest vinyl architectural film manufacturers. This ensures you have the best choices at your fingertips",
    "Everything we offer is down to personal taste and one customer’s gold can be another customer’s dust. However, our Marble Series, Plain Series as well as Wood Series are the most popular collections, repeated in every shipment. ",
    "If you’re based in Dubai, we aim to have your order delivered within 48 hours. Out with of Dubai may add a day or so, but we will contact you to arrange delivery as soon as you place your order online.  ",
  ];
  
  return (
    <Container className="">
      <div className="flex justify-between  text-center overflow-x-scroll md:overflow-hidden  z-10">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`text-black py-2 md:py-6 whitespace-nowrap w-full px-4 text-17 hover:text-black focus:outline-none transition duration-300 ${
              activeTab === index
                ? "border-b-4 border-primary text-black font-bold"
                : "border-b-4 border-transparent hover:border-primary font-black"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
    <hr className=" relative bottom-1 bg-primary border-b-4 border-[#EAEBEC] -z-99999" />
      <div className="md:p-4 px-2 py-1">
        <div className="text-15">{content[activeTab]}</div>
      </div>
    </Container>
  );
}
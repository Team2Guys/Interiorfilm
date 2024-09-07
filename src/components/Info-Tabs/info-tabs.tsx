"use client";
import Container from "components/Layout/Container/Container";
import { useState } from "react";
export default function InfoTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Why Choose Us ?",
    "Our Mission",
    "Product Range",
    "Popular Products",
    "Convenience",
  ];
  const content = [
    "Content for Why Choose Us tab goes here. It explains why you should choose our services or products.",
    "Content for Our Mission tab goes here. It details our company's mission and values.",
    "Content for Product Range tab goes here. It describes the range of products we offer.",
    "Content for Popular Products tab goes here. It highlights our most popular products.",
    "Content for Convenience tab goes here. It discusses how our services or products provide convenience to customers.",
  ];
  return (
    <Container className="mt-10 relative">
      <div className="flex justify-between  text-center overflow-x-scroll md:overflow-hidden  z-10">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`text-black py-2 md:py-6 whitespace-nowrap w-full px-4 text-17 hover:text-black focus:outline-none transition duration-300 ${
              activeTab === index
                ? "border-b-4 border-primary text-black font-bold"
                : "border-b-4 border-transparent hover:border-primary font-medium"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
    <hr className=" relative bottom-1 bg-primary border-b-4 border-[#EAEBEC] -z-99999" />
      <div className="md:p-4 px-2 py-1">
        <p className="text-15">{content[activeTab]}</p>
      </div>
    </Container>
  );
}

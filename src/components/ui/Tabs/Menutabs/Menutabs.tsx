
"use client"
import Link from 'next/link';
import { useState, ReactNode } from 'react';

interface Tab  {
  label: string;
  content: ReactNode;
};

interface TabsProps  {
  tabs: Tab[];
  className?: string;
  classContent?: string;
  title?: string;

};

const Menutabs: React.FC<TabsProps> = ({ tabs,className,classContent,title }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='flex'>
      <div className={`w-2/12 space-y-1 ${className}`}  >
        <h1 className='text-2xl font-semibold mb-4'>All Categories</h1>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-1 px-0 lg:px-2 xl:px-4  w-full text-sm md:w-auto font-semibold   ${activeTab === index ? 'border-s-4 border-primary ' : 'border-primary text-dark'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={`w-10/12 px-3 border-s-2 ${classContent}`} >
        <div className='flex justify-between'>
        <h1 className='text-2xl font-semibold mb-4'>{tabs[activeTab].label}</h1>
        <Link className='hover:underline hover:text-black' href={"/productlist"}>View All</Link>
        </div>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Menutabs;

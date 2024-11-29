
"use client"
import Container from 'components/Layout/Container/Container';
import { useState, ReactNode } from 'react';

interface Tab  {
  label: string;
  content: ReactNode;
};

interface TabsProps  {
  tabs: Tab[];
  className?: string;
  classContent?: string;
};

const Tabs: React.FC<TabsProps> = ({ tabs,className,classContent }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container className='mt-10'>
      <div className={`flex space-x-2 ${className}`}  >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-2 px-4 rounded-md border line-clamp-1 w-full md:w-auto h-10  ${activeTab === index ? 'bg-primary text-white' : 'border-primary text-dark'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={`mt-4 ${classContent}`}>
        {tabs[activeTab].content}
      </div>
    </Container>
  );
};

export default Tabs;

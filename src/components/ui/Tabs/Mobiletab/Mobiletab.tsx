"use client"
import React,{useEffect, useLayoutEffect, useState} from 'react'
import { Tabs } from 'antd';
import TabsData from "components/widgets/TabsData/TabsData";


const { TabPane } = Tabs;

interface TabData {
  key: string;
  tab: string;
  content: any;
}

interface tabData{
  className?: string;
  staticConatiner?: string;
}


const Mobiletab: React.FC<tabData> = ({className,staticConatiner}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [Card, setCard] = useState<string>("card 0");
  

  useLayoutEffect(() => {
    const CategoryHandler = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
        );
        const Categories = await response.json();
        setCategories(Categories);
        setLoading(false)
  
      } catch (err) {
        console.log('err', err)
        setLoading(false)
  
  
      }
  
    };
  
    CategoryHandler();
  ;
  }, []);

  console.log(categories, 
    "categories"
  )

  return (
      <Tabs className={`z-20 text-xl ${className}`} defaultActiveKey="1" onChange={(card )=>setCard(card)}>
          {
            categories.map((category, index)=>{
              return (
                <TabPane   className='z-20' tab={category.name} key={index}  >
                <TabsData staticConatiner={staticConatiner} category={category._id} carDetail={Card}/>
              </TabPane>
              )
            })
          }


      </Tabs>
  );
};

export default Mobiletab;

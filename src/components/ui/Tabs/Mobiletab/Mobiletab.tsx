"use client"
import { Tabs } from 'antd';
import React from 'react';

const { TabPane } = Tabs;

interface TabData {
  key: string;
  tab: string;
  content: any;
}

interface tabData{
  tabData:TabData[];
  className?: string;
}



const Mobiletab: React.FC<tabData> = ({tabData,className}) => {
  return (
      <Tabs className={`z-20 text-xl ${className}`} defaultActiveKey="1">
        {tabData.map(({ key, tab, content }) => (
          <TabPane   className='z-20' tab={tab} key={key}>
            {content}
          </TabPane>
        ))}
      </Tabs>
  );
};

export default Mobiletab;

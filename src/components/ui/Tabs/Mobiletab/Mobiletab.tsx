import { Tabs } from 'antd';
import ProductSlider from 'components/Carousel/ProductSlider/ProductSlider';
import Menucard from 'components/ui/Card/Menucard/Menucard';
import { menuSlide, menudata } from 'data/Data';
import React from 'react';

const { TabPane } = Tabs;

interface TabData {
  key: string;
  tab: string;
  content: any;
}

const tabData: TabData[] = [
  { key: '1', tab: 'Cement Gray Series', content: <><Menucard 
    menudata={menudata}
  /></> },
  { key: '2', tab: 'Skin Texture Series', content: <><Menucard/></> },
  { key: '3', tab: 'Wood Grain Series', content: <><Menucard menudata={menudata}/></> },
  { key: '4', tab: 'Fabric Series', content: <><Menucard/></> },
  { key: '5', tab: 'Marble Serie', content: <><Menucard menudata={menudata}/></> },
  { key: '6', tab: 'Plain Series', content: <><Menucard menudata={menudata}/></> },

];

const Mobiletab: React.FC = () => {
  return (
    <div >
      <Tabs className='z-20 text-xl' defaultActiveKey="1">
        {tabData.map(({ key, tab, content }) => (
          <TabPane className='z-20' tab={tab} key={key}>
            {content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Mobiletab;

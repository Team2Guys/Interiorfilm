import { Tabs } from 'antd';
import React from 'react';

const { TabPane } = Tabs;

interface TabData {
  key: string;
  tab: string;
  content: string;
}

const tabData: TabData[] = [
  { key: '1', tab: 'Tab 1', content: 'Content of Tab Pane 1' },
  { key: '2', tab: 'Tab 2', content: 'Content of Tab Pane 2' },
  { key: '3', tab: 'Tab 3', content: 'Content of Tab Pane 3' },
  { key: '4', tab: 'Tab 4', content: 'Content of Tab Pane 3' },
  { key: '5', tab: 'Tab 5', content: 'Content of Tab Pane 3' },
  { key: '6', tab: 'Tab 6', content: 'Content of Tab Pane 3' },
  { key: '7', tab: 'Tab 7', content: 'Content of Tab Pane 3' },
  { key: '8', tab: 'Tab 8', content: 'Content of Tab Pane 3' },
  { key: '9', tab: 'Tab 9', content: 'Content of Tab Pane 3' },
  { key: '10', tab: 'Tab 10', content: 'Content of Tab Pane 1' },
  { key: '11', tab: 'Tab 11', content: 'Content of Tab Pane 2' },
  { key: '12', tab: 'Tab 12', content: 'Content of Tab Pane 3' },
  { key: '13', tab: 'Tab 13', content: 'Content of Tab Pane 3' },
  { key: '14', tab: 'Tab 14', content: 'Content of Tab Pane 3' },
  { key: '15', tab: 'Tab 15', content: 'Content of Tab Pane 3' },
  { key: '16', tab: 'Tab 16', content: 'Content of Tab Pane 3' },
  { key: '17', tab: 'Tab 17', content: 'Content of Tab Pane 3' },
  { key: '18', tab: 'Tab 18', content: 'Content of Tab Pane 3' },
];

const Mobiletab: React.FC = () => {
  return (
    <div >
      <Tabs className='z-20' defaultActiveKey="1">
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

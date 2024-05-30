'use client'
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('components/Dashboard/Charts/page'), { ssr: false });

import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";
const BasicChartPage: React.FC = () => {
  return (
    <DefaultLayout>

      <Chart />
    </DefaultLayout>

  );
};

export default BasicChartPage;

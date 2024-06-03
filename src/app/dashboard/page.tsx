'use client'
import dynamic from 'next/dynamic';

const ECommerce = dynamic(() => import('components/Dashboard/E-commerce'), { ssr: false });

import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";


export default function Home() {
  return (
    <>
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>

    </>
  );
}

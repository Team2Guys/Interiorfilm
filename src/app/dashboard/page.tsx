'use client'
import dynamic from 'next/dynamic';
import ProtectedRoute from 'hooks/AuthHookAdmin'

const ECommerce = dynamic(() => import('components/Dashboard/E-commerce'), { ssr: false });

import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";


 function Home() {
  return (
    <>
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>

    </>
  );
}


export default ProtectedRoute(Home)
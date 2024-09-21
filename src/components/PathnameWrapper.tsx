'use client';

import { usePathname } from 'next/navigation';
// import Header from 'components/Layout/Header/Header';
import Footer from './Layout/Footer/Footer';
import Authhook from 'hooks/AuthHook'
import Navbar from './Layout/Header/Navbar';
import { Suspense } from 'react';


const PathnameWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const withoutHeaderPages = [
    "/login",
    '/register',
    "/superAdminlogin",
    "/forgot-password",
    "/dashboard",
    "/"

  ]


  return (
    <Suspense>
      {
      withoutHeaderPages.includes(pathname)  || pathname.split('/').includes('dashboard') ? null : 
      <Navbar/>
      // <Header />
      }
      {children}
      {pathname !=="/" && (withoutHeaderPages.includes(pathname) || pathname.split('/').includes('dashboard')) ? null  : 
      <Footer /> 
      }
    </Suspense>
  );
};

export default Authhook(PathnameWrapper)

'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Layout/Footer/Footer';
import Authhook from 'hooks/AuthHook'
import Navbar from './Layout/Header/Navbar';


const PathnameWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const withoutHeaderPages = [
    "/login",
    '/register',
    "/superAdminlogin",
    "/forgot-password",
    "/dashboard",
    // "/"

  ]


  return (
    <>
      {
      withoutHeaderPages.includes(pathname)  || pathname.split('/').includes('dashboard') ? null : 
      <Navbar/>
      // <Header />
      }
      {children}
      {pathname !=="/" && (withoutHeaderPages.includes(pathname) || pathname.split('/').includes('dashboard')) ? null  : 
      <Footer /> 
      }
    </>
  );
};

export default Authhook(PathnameWrapper)

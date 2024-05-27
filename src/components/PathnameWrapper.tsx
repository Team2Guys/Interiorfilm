'use client';

import { usePathname } from 'next/navigation';
import Header from 'components/Layout/Header/Header';
import Footer from './Layout/Footer/Footer';
import {withoutHeaderPages} from 'data/Data'

const PathnameWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const withoutHeaderPages = [
    "/login",
    '/register',
    "/superAdminlogin"
  ]

  return (
    <>
      {
      withoutHeaderPages.includes(pathname) ? null : 
      <Header />}
      {children}
      { withoutHeaderPages.includes(pathname) ? null  : 
      <Footer />}
    </>
  );
};

export default PathnameWrapper;

'use client';

import { usePathname } from 'next/navigation';
import Header from 'components/Layout/Header/Header';
import Footer from './Layout/Footer/Footer';

const PathnameWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      {(pathname == '/login' || pathname == '/register' ) ? null : 
      <Header />}
      {children}
      {(pathname == '/login' || pathname == '/register' ) ? null : 
      <Footer />}
    </>
  );
};

export default PathnameWrapper;

import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from 'next/script'
import "./globals.css";
import PathnameWrapper from "components/PathnameWrapper";
import { ToastContainer } from 'react-toastify';
import { Providers } from "./Providers";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "../css/satoshi.css";
import "../css/style.css";
import { GoogleTagManager } from '@next/third-parties/google';

const futuraCyrillic = localFont({
  src: [
    {
      path: '../../public/fonts/FuturaCyrillicBold.ttf',
      weight: '700', 
      style: 'normal',
    },
    {
      path: '../../public/fonts/FuturaCyrillicDemi.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/FuturaCyrillicExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/FuturaCyrillicHeavy.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/FuturaCyrillicLight.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/FuturaCyrillicMedium.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-futura',
});

export const metadata: Metadata = {
  title: "Interior Film",
  description: "Welcome to Interior Films",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Providers>

      <html lang="en">
        <GoogleTagManager gtmId="GTM-PFNKXKTR" />
        <head>
          <GoogleTagManager gtmId="GTM-PFNKXKTR" />

          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PFNKXKTR');
            `,
            }}
          />
        </head>

        <body className={futuraCyrillic.className}>
          <GoogleTagManager gtmId="GTM-PFNKXKTR" />
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PFNKXKTR"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
          <PathnameWrapper>
            {children}
            <ToastContainer />
          </PathnameWrapper>
        </body>
      </html>
    </Providers>

  );
}

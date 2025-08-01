import '@ant-design/v5-patch-for-react-19';
import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from 'next/font/google';
import Script from 'next/script'
import "./globals.css";
import PathnameWrapper from "components/PathnameWrapper";
import { ToastContainer } from 'react-toastify';
import { Providers } from "./Providers";
import "../css/style.css";
import { GoogleTagManager } from '@next/third-parties/google';
const font = Montserrat({
  weight: '500',
  subsets: ['latin'],
});
export const futuraCyrillic = localFont({
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

const currency = localFont({ src: [
  {
    path: '../../public/fonts/currency-symbol-v2.otf',
    weight: '400',
    style: 'normal',
  }
],
 variable: '--font-currency'
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
        {/* <GoogleTagManager gtmId="GTM-PFNKXKTR" /> */}

          {/* <GoogleTagManager gtmId="GTM-PFNKXKTR" /> */}
          <Script
            id="google-tag-manager"
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
          <Script
            id="clarity-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "or4hq4vi39");
          `,
            }}
          />
          <Script
            id="google-analytics"
            src="https://www.googletagmanager.com/gtag/js?id=G-FEG0017QNF"
            strategy="afterInteractive"
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-FEG0017QNF');
              `,
            }}
          />
          <meta name="google-site-verification" content="U3UWHEaHFMmthAFYIMe_u0gQtTuiolqnAbsGeuuxkFk" />
    
    

        <body className={`${font.className} ${currency.variable}`} >
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

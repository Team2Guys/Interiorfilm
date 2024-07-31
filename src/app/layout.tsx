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

import {Poppins} from 'next/font/google'

const poppinsFont = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"], 
  display: "swap", 
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
        <head>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZNPK8S2CW7"></Script>
          <Script id="google-analytics">
            {
              `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-ZNPK8S2CW7'); `
            }
          </Script>
        </head>
        <body className={poppinsFont.className}>
          <PathnameWrapper>
            {children}
            <ToastContainer />

          </PathnameWrapper>

        </body>


      </html>
    </Providers>

  );
}

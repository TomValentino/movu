
import { Syne, Manrope } from "next/font/google";
import "@/styles/globals.css";
import { Suspense } from "react";
import { StoreFooter, StoreNav } from "./components";
import FacebookPixel from "@/facebook/fb-client";


export const metadata = {
  title: "Midnight Apparel",
  description: "Luxury intimates and sleepwear, Indonesian based.",
};

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable}`}>
      <body>

        <FacebookPixel />

        <Suspense fallback={null}>

        </Suspense>
        
        <div style={{ margin: 0, minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: '#F8F5F1' }}>

          <StoreNav />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <StoreFooter />
        </div>
        </body>
    </html>
  );
}




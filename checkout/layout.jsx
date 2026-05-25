
import { Syne, Manrope } from "next/font/google";
import "@/styles/globals.css";
import SetupFacebookPixel from "@/facebook/fb-client";
import { Suspense } from "react";
import { SetupCart } from "@/cart/cart-provider";


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

        <SetupCart />
        <Suspense fallback={null}>

            <SetupFacebookPixel />
        </Suspense>
        
        
        {children}
      
        </body>
    </html>
  );
}




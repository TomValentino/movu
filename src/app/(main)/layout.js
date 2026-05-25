
import { Syne, Manrope } from "next/font/google";
import "@/styles/globals.css";
import SeraNav from "@/components/nav-bar";
import { SetupCart } from "../../cart/cart-provider";
import SetupFacebookPixel from "@/facebook/fb-client";
import { Suspense } from "react";


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
        {/* <SliderCart/> */}

        <SetupCart />
        <Suspense fallback={null}>

        <SetupFacebookPixel />
        </Suspense>
        
        <SeraNav />
        
        {children}
        <footer className="footer">
        <div className="footer-inner">

     
      <div className="footer-top">
        <div>
          <div className="footer-brand-name">Sèra</div>
          <p className="footer-brand-desc">
            Luxury sleepwear and intimates. Crafted for comfort, designed for the woman who knows the difference.
          </p>
          <div className="footer-socials">
            <a href="#" className="footer-social">Instagram</a>
            <a href="#" className="footer-social">TikTok</a>
            <a href="#" className="footer-social">Pinterest</a>
          </div>
        </div>
        <div>
          <p className="footer-col-title">Shop</p>
          <ul className="footer-links">
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Pajamas</a></li>
            <li><a href="#">Sleepwear</a></li>
            <li><a href="#">Intimates</a></li>
            <li><a href="#">Bustiers & Tops</a></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Info</p>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Sustainability</a></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Help</p>
          <ul className="footer-links">
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Track My Order</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-legal">© 2025 Sèra. All rights reserved.</p>
        <p className="footer-made">Designed in Indonesia</p>
      </div>
         </div>
    </footer>
        </body>
    </html>
  );
}




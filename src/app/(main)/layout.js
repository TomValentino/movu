
import { Syne, Manrope } from "next/font/google";
import "@/styles/globals.css";
import SeraNav from "@/components/nav-bar";
import { SetupCart } from "../../cart/cart-provider";
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
  const WA_HREF = `https://wa.me/62xxxxxxxxxx?text=${encodeURIComponent('Hi, I need some help with my order.')}`

  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable}`}>
      <body>
                <FacebookPixel />
        

        <SetupCart />


        <SeraNav />
        
        {children}


      <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="Chat with us on WhatsApp">
          <span className="wa-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.41A9.962 9.962 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Z" fill="var(--c-accent)" />
              <path fillRule="evenodd" clipRule="evenodd" d="M8.87 7.5c-.22-.49-.44-.5-.65-.51H7.74c-.19 0-.49.07-.75.36C6.73 7.64 6 8.33 6 9.74c0 1.41 1.03 2.77 1.17 2.96.15.19 2 3.17 4.92 4.32 2.44.96 2.93.77 3.46.72.53-.05 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.36-.07-.12-.26-.19-.55-.33-.29-.14-1.7-.84-1.96-.93-.26-.1-.46-.14-.65.14-.2.28-.75.93-.92 1.13-.17.19-.34.22-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5L8.87 7.5Z" fill="var(--c-bg-dark)" />
            </svg>
          </span>
        </a>
        <footer className="footer">
        <div className="footer-inner">



     

      <div className="footer-top">
        <div>
          <div className="footer-brand-name">Lumèra</div>
          <p className="footer-brand-desc">
            Luxury sleepwear and intimates. Crafted for comfort, designed for the woman who knows the difference.
          </p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/lumera.pajamas/" className="footer-social">Instagram</a>
            <a href="https://www.instagram.com/lumera.pajamas/" className="footer-social">TikTok</a>
            <a href="https://www.instagram.com/lumera.pajamas/" className="footer-social">Pinterest</a>
          </div>
        </div>
        <div>
          <p className="footer-col-title">Shop</p>
          <ul className="footer-links">
            <li><a href="/collection/488966979830">New Arrivals</a></li>
            <li><a href="/collection/488865530102">Pajamas</a></li>
            <li><a href="/collection/488966979830">Sleepwear</a></li>
            <li><a href="/collection/488967012598">Intimates</a></li>
            <li><a href="/collection/488967110902">Bustiers & Tops</a></li>
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
        <p className="footer-legal">© 2026 Lumèra. All rights reserved.</p>
        <p className="footer-made">Designed in Indonesia</p>
      </div>
         </div>
    </footer>

        </body>
    </html>
  );
}




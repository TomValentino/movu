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

const WA_HREF = `https://wa.me/62xxxxxxxxxx?text=${encodeURIComponent('Hi, I need some help with my order.')}`

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable}`}>
      <body>
        <FacebookPixel />
        <div style={{ margin: 0, minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: '#F8F5F1' }}>
          <StoreNav />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <StoreFooter />
        </div>

        <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="Chat with us on WhatsApp">
          <span className="wa-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.41A9.962 9.962 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Z" fill="var(--c-accent)" />
              <path fillRule="evenodd" clipRule="evenodd" d="M8.87 7.5c-.22-.49-.44-.5-.65-.51H7.74c-.19 0-.49.07-.75.36C6.73 7.64 6 8.33 6 9.74c0 1.41 1.03 2.77 1.17 2.96.15.19 2 3.17 4.92 4.32 2.44.96 2.93.77 3.46.72.53-.05 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.36-.07-.12-.26-.19-.55-.33-.29-.14-1.7-.84-1.96-.93-.26-.1-.46-.14-.65.14-.2.28-.75.93-.92 1.13-.17.19-.34.22-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5L8.87 7.5Z" fill="var(--c-bg-dark)" />
            </svg>
          </span>
        </a>

      </body>
    </html>
  );
}
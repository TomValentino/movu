'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { trackServerEvent } from "./fb-server";
import { useEffect } from "react";
import Script from "next/script";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(';').shift() : null;
};

const generateEventId = (eventName) => {
  return `${eventName}_${Date.now()}_${crypto.randomUUID()}`;
};

export async function track(eventName, data = {}, userData = {}) {
  const eventId = generateEventId(eventName);

  // Wait for fbq to be available (up to 3 seconds)
  await new Promise((resolve) => {
    if (window.fbq) return resolve()
    let attempts = 0
    const interval = setInterval(() => {
      attempts++
      if (window.fbq || attempts > 50) {
        clearInterval(interval)
        resolve()
      }
    }, 200)
  })

  if (window.fbq) {
    window.fbq('track', eventName, data, { eventID: eventId });
  } else {
    console.warn('fbq still not available after waiting:', eventName)
  }

  await trackServerEvent(eventName, {
    ...data,
    eventId,
    eventSourceUrl: window.location.href,
  }, {
    ...userData,
    fbc: getCookie('_fbc'),
    fbp: getCookie('_fbp'),
  });
}

export const trackViewContent = (value, currency = 'IDR') => {
  console.log('tracking view content', value);
  track('ViewContent', { 
    value, 
    currency, 
    content_type: 'product' 
  });
};


export const trackAddToCart = (value, quantity = 1, currency = 'IDR') => {
      console.log('tracking view content', value);
      track('AddToCart', { 
        value, 
        content_type: 'product',
        currency, 
        num_items: quantity 
      });
}

export const trackPurchase = (orderId, numOfItems, totalValue, currency = 'IDR', userData = {}) =>
  track('Purchase', {
    value: totalValue,
    currency,
    order_id: orderId,
    num_items: numOfItems,
    content_type: 'product'
  }, userData);

  export const trackInitiateCheckout = (value, numItems, currency = 'IDR') => {
    console.log('FUCKING DIE BITCH')
    track('InitiateCheckout', {
      value,
      currency,
      num_items: numItems,
      content_type: 'product'
    })
  }



  const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export default function SetupFacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    track('PageView');
  }, [pathname, searchParams]);

  return (
    <Script
      id="fb-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
        `,
      }}
    />
  );
}



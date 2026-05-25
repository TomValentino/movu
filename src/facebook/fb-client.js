'use client'

/**
 * fb-client.jsx
 *
 * Meta Pixel initialisation + browser-side tracking helpers.
 * Import the named functions wherever you need them.
 */

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { trackServerEvent } from './fb-server';

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const DEFAULT_CURRENCY = 'IDR';

// ---------------------------------------------------------------------------
// Internals
// ---------------------------------------------------------------------------

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value, days = 90) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

/**
 * Ensure _fbp exists. The Pixel sets this on init, but if it hasn't fired
 * yet we generate a valid value so CAPI events are never sent without it.
 */
function ensureFbp() {
  let fbp = getCookie('_fbp');
  if (!fbp) {
    fbp = `fb.1.${Date.now()}.${Math.floor(Math.random() * 1e10)}`;
    setCookie('_fbp', fbp);
  }
  return fbp;
}

/**
 * If the URL contains fbclid, write a properly-formatted _fbc cookie.
 * Only written when a real click ID exists — never fabricated.
 */
function captureFbc() {
  const fbclid = new URLSearchParams(window.location.search).get('fbclid');
  if (fbclid) {
    const fbc = `fb.1.${Date.now()}.${fbclid}`;
    setCookie('_fbc', fbc);
  }
}

function generateEventId(eventName) {
  const uid = typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36).slice(2);
  return `${eventName}_${Date.now()}_${uid}`;
}

function waitForFbq(timeoutMs = 4000) {
  return new Promise((resolve) => {
    if (window.fbq) return resolve(true);
    const deadline = Date.now() + timeoutMs;
    const id = setInterval(() => {
      if (window.fbq || Date.now() >= deadline) {
        clearInterval(id);
        resolve(!!window.fbq);
      }
    }, 100);
  });
}

/**
 * Core: fires browser Pixel + CAPI server event with a shared eventId.
 */
async function fireEvent(eventName, customData = {}, userData = {}) {
  const eventId = generateEventId(eventName);

  // Browser pixel
  const fbqReady = await waitForFbq();
  if (fbqReady) {
    window.fbq('track', eventName, customData, { eventID: eventId });
  } else {
    console.warn('[FB] fbq unavailable for:', eventName);
  }

  // Server (CAPI)
  await trackServerEvent(
    eventName,
    { ...customData, eventId, eventSourceUrl: window.location.href },
    {
      ...userData,
      fbp: getCookie('_fbp') || ensureFbp(),
      fbc: getCookie('_fbc') || null,
      userAgent: navigator.userAgent,
    }
  );
}

// ---------------------------------------------------------------------------
// Public tracking functions
// ---------------------------------------------------------------------------

export const trackPageView = () =>
  fireEvent('PageView', {});
export const trackViewContent = ({ value, currency = DEFAULT_CURRENCY, contentId }) => {
  console.log('[FB] ViewContent', { value, currency, contentId })
  return fireEvent('ViewContent', {
    value,
    currency,
    content_ids: [String(contentId)],
    content_type: 'product',
  })
}

export const trackAddToCart = ({ value, currency = DEFAULT_CURRENCY, contentId, quantity = 1 }) =>
  fireEvent('AddToCart', {
    value,
    currency,
    content_ids: [String(contentId)],
    content_type: 'product',
    num_items: quantity,
    contents: [{ id: String(contentId), quantity }],
  });

export const trackInitiateCheckout = ({ value, currency = DEFAULT_CURRENCY, contents = [], numItems }) => {
  console.log('[FB] InitiateCheckout', { value, currency, contents, numItems })
  return fireEvent('InitiateCheckout', {
    value,
    currency,
    content_ids: contents.map((c) => String(c.id)),
    contents: contents.map((c) => ({ id: String(c.id), quantity: c.quantity })),
    content_type: 'product',
    num_items: numItems ?? contents.reduce((s, c) => s + c.quantity, 0),
  })
}
export const trackAddPaymentInfo = ({ value, currency = DEFAULT_CURRENCY, contents = [], userData = {} }) => {
  console.log('[FB] AddPaymentInfo', { value, currency, contents, userData })
  return fireEvent('AddPaymentInfo', {
    value,
    currency,
    content_ids: contents.map((c) => String(c.id)),
    contents: contents.map((c) => ({ id: String(c.id), quantity: c.quantity })),
    content_type: 'product',
  }, userData)
}
/**
 * trackPurchase — call on your thank-you page after order is confirmed.
 * Pass as much userData as you have for best Event Match Quality.
 */
export const trackPurchase = ({ orderId, value, currency = DEFAULT_CURRENCY, contents = [], userData = {} }) => {
  console.log('[FB] Purchase', { orderId, value, currency, contents, userData })
  return fireEvent(
    'Purchase',
    {
      value,
      currency,
      order_id: orderId,
      content_ids: contents.map((c) => String(c.id)),
      contents: contents.map((c) => ({ id: String(c.id), quantity: c.quantity })),
      content_type: 'product',
      num_items: contents.reduce((s, c) => s + c.quantity, 0),
    },
    userData
  )
}
export const trackSearch = ({ searchString }) =>
  fireEvent('Search', { search_string: searchString });

export const trackCompleteRegistration = (userData = {}) =>
  fireEvent('CompleteRegistration', {}, userData);

// Escape hatch for any non-standard event
export const trackCustomEvent = (eventName, customData = {}, userData = {}) =>
  fireEvent(eventName, customData, userData);

// ---------------------------------------------------------------------------
// Page-level component — place once in your root layout
// ---------------------------------------------------------------------------

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Capture fbclid → _fbc on every navigation (including first load)
  useEffect(() => {
    captureFbc();
    ensureFbp();
  }, [pathname, searchParams]);

  // PageView on route change (initial PageView is fired by fbq('init') below)
  const isFirstRender = typeof window !== 'undefined' && !window.__fbPageViewFired;
  useEffect(() => {
    if (isFirstRender) {
      window.__fbPageViewFired = true;
      return;
    }
    trackPageView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return (
    <Script
      id="fb-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
          }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${FB_PIXEL_ID}');
          fbq('track','PageView');
        `,
      }}
    />
  );
}
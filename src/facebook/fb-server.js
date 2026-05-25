'use server'

/**
 * fb-server.js
 *
 * Server-side mirror for every browser Pixel event.
 * Called from fb-client.jsx so Meta can deduplicate via the shared eventId.
 *
 * Environment variables required:
 *   FB_PIXEL_ID              - your numeric Pixel ID
 *   FB_CONVERSION_API_TOKEN  - your CAPI access token
 *   FB_TEST_EVENT_CODE       - (optional) test event code for Events Manager
 */

import crypto from 'crypto';
import { headers } from 'next/headers';
import * as bizSdk from 'facebook-nodejs-business-sdk';

const { ServerEvent, EventRequest, UserData, CustomData, Content } = bizSdk;

const ACCESS_TOKEN = process.env.FB_CONVERSION_API_TOKEN;
const PIXEL_ID     = process.env.FB_PIXEL_ID;
const TEST_CODE    = process.env.FB_TEST_EVENT_CODE;

// ---------------------------------------------------------------------------
// Hashing
// ---------------------------------------------------------------------------

/**
 * SHA-256 hash a string after normalising it (lowercase + trim).
 * Returns null if the value is falsy.
 * fbc / fbp must NOT be hashed — pass them through as-is.
 */
function hash(value) {
  if (!value) return null;
  return crypto
    .createHash('sha256')
    .update(String(value).toLowerCase().trim())
    .digest('hex');
}

/**
 * Normalise a phone number to E.164-ish digits only, then hash.
 * e.g. "+62 812-3456-7890" → "628123456789​0"
 */
function hashPhone(value) {
  if (!value) return null;
  const digits = String(value).replace(/\D/g, '');
  return crypto.createHash('sha256').update(digits).digest('hex');
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Track a server-side Conversions API event.
 *
 * @param {string} eventName
 * @param {object} eventData   - customData fields + eventId + eventSourceUrl
 * @param {object} userData    - PII + browser signals forwarded from the client
 */
export async function trackServerEvent(eventName, eventData = {}, userData = {}) {
  if (!ACCESS_TOKEN || !PIXEL_ID) {
    console.warn('[FB CAPI] Missing FB_PIXEL_ID or FB_CONVERSION_API_TOKEN — skipping');
    return { success: false, error: 'missing_config' };
  }

  try {
    const headersList = await headers();

    // Real client IP — prefer the leftmost value in x-forwarded-for
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headersList.get('x-real-ip') ||
      null;

    const serverUserAgent =
      headersList.get('user-agent') || userData.userAgent || '';

    // ------------------------------------------------------------------
    // UserData
    // ------------------------------------------------------------------
    const fbUserData = new UserData()
      .setClientIpAddress(ip)
      .setClientUserAgent(serverUserAgent);

    // fbc / fbp must be passed as plain strings — never hashed
    if (userData.fbc) fbUserData.setFbc(userData.fbc);
    if (userData.fbp) fbUserData.setFbp(userData.fbp);

    // PII — all hashed
    if (userData.email)      fbUserData.setEmails([hash(userData.email)]);
    if (userData.phone)      fbUserData.setPhones([hashPhone(userData.phone)]);
    if (userData.firstName)  fbUserData.setFirstNames([hash(userData.firstName)]);
    if (userData.lastName)   fbUserData.setLastNames([hash(userData.lastName)]);
    if (userData.city)       fbUserData.setCities([hash(userData.city)]);
    if (userData.state)      fbUserData.setStates([hash(userData.state)]);
    if (userData.zip)        fbUserData.setZipCodes([hash(userData.zip)]);
    // country should be a lowercase 2-letter ISO code, e.g. "id"
    if (userData.country)    fbUserData.setCountryCodes([hash(userData.country)]);
    // externalId ties the event to your own customer record
    if (userData.externalId) fbUserData.setExternalId(hash(String(userData.externalId)));

    // ------------------------------------------------------------------
    // CustomData
    // ------------------------------------------------------------------
    const customData = new CustomData();

    if (eventData.value     !== undefined) customData.setValue(Number(eventData.value));
    if (eventData.currency)               customData.setCurrency(eventData.currency);
    if (eventData.order_id)               customData.setOrderId(eventData.order_id);
    if (eventData.content_type)           customData.setContentType(eventData.content_type);
    if (eventData.num_items !== undefined) customData.setNumItems(Number(eventData.num_items));
    if (eventData.search_string)          customData.setSearchString(eventData.search_string);

    // content_ids — array of product SKUs / variant IDs
    if (Array.isArray(eventData.content_ids) && eventData.content_ids.length) {
      customData.setContentIds(eventData.content_ids.map(String));
    }

    // contents — richer line-item objects [{ id, quantity, item_price? }]
    if (Array.isArray(eventData.contents) && eventData.contents.length) {
      const contents = eventData.contents.map((c) => {
        const item = new Content()
          .setId(String(c.id))
          .setQuantity(Number(c.quantity));
        if (c.item_price !== undefined) item.setItemPrice(Number(c.item_price));
        return item;
      });
      customData.setContents(contents);
    }

    // ------------------------------------------------------------------
    // ServerEvent
    // ------------------------------------------------------------------
    const serverEvent = new ServerEvent()
      .setEventName(eventName)
      .setEventTime(Math.floor(Date.now() / 1000))
      .setUserData(fbUserData)
      .setCustomData(customData)
      .setEventSourceUrl(eventData.eventSourceUrl || '')
      .setActionSource('website');

    if (eventData.eventId) serverEvent.setEventId(eventData.eventId);

    // ------------------------------------------------------------------
    // EventRequest
    // ------------------------------------------------------------------
    const eventRequest = new EventRequest(ACCESS_TOKEN, PIXEL_ID)
      .setEvents([serverEvent]);

    if (TEST_CODE) eventRequest.setTestEventCode(TEST_CODE);

    const result = await eventRequest.execute();
    console.log(`[FB CAPI] ${eventName} → events_received:`, result?.events_received);
    return { success: true };

  } catch (error) {
    // Log the full Meta error body when available
    const detail = error?.response?.data ?? error?.message ?? error;
    console.error('[FB CAPI] Error:', detail);
    return { success: false, error: String(error?.message ?? error) };
  }
}
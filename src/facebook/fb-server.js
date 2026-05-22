'use server'
import crypto from 'crypto';
import { headers } from 'next/headers';
import * as bizSdk from 'facebook-nodejs-business-sdk';

const ACCESS_TOKEN = process.env.FB_CONVERSION_API_TOKEN;
const PIXEL_ID = process.env.FB_PIXEL_ID;
const TEST_EVENT_CODE = process.env.FB_TEST_EVENT_CODE;

const { ServerEvent, EventRequest, UserData, CustomData } = bizSdk;
const hashData = (data) => {
  if (!data) return null;
  return crypto.createHash('sha256')
    .update(data.toLowerCase().trim())
    .digest('hex');
};

export async function trackServerEvent(eventName, eventData = {}, userData = {}) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 
               headersList.get('x-real-ip') || null;
    const userAgent = headersList.get('user-agent') || '';

    const fbUserData = new UserData()
      .setClientIpAddress(ip)
      .setClientUserAgent(userAgent);

    if (userData.fbc) fbUserData.setFbc(userData.fbc);
    if (userData.fbp) fbUserData.setFbp(userData.fbp);
    if (userData.email) fbUserData.setEmails([hashData(userData.email)]);
    if (userData.phone) fbUserData.setPhones([hashData(userData.phone)]);
    if (userData.firstName) fbUserData.setFirstNames([hashData(userData.firstName)]);
    if (userData.lastName) fbUserData.setLastNames([hashData(userData.lastName)]);
    if (userData.city) fbUserData.setCities([hashData(userData.city)]);
    if (userData.state) fbUserData.setStates([hashData(userData.state)]);
    if (userData.zip) fbUserData.setZipCodes([hashData(userData.zip)]);
    if (userData.country) fbUserData.setCountryCodes([hashData(userData.country)]);
    if (userData.externalId) fbUserData.setExternalId(hashData(userData.externalId));

    const customData = new CustomData();
    if (eventData.value !== undefined) customData.setValue(eventData.value);
    if (eventData.currency) customData.setCurrency(eventData.currency);
    if (eventData.content_ids) customData.setContentIds(eventData.content_ids);
    if (eventData.content_name) customData.setContentName(eventData.content_name);
    if (eventData.content_type) customData.setContentType(eventData.content_type);
    if (eventData.contents) customData.setContents(eventData.contents);
    if (eventData.num_items !== undefined) customData.setNumItems(eventData.num_items);
    if (eventData.order_id) customData.setOrderId(eventData.order_id);

    const serverEvent = new ServerEvent()
      .setEventName(eventName)
      .setEventTime(Math.floor(Date.now() / 1000))
      .setUserData(fbUserData)
      .setCustomData(customData)
      .setEventSourceUrl(eventData.eventSourceUrl || '')
      .setActionSource('website');

    if (eventData.eventId) serverEvent.setEventId(eventData.eventId);

    const eventRequest = new EventRequest(ACCESS_TOKEN, PIXEL_ID)
      .setEvents([serverEvent]);

    if (TEST_EVENT_CODE) {
      eventRequest.setTestEventCode(TEST_EVENT_CODE);
    }

    const result = await eventRequest.execute();
    console.log('CAPI result:', result);
    return { success: true };
  } catch (error) {
    console.error('CAPI Error:', error.response?.data || error);
    return { success: false, error: error.message };
  }
}
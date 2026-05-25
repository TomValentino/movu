// lib/shopify/phone.utils.js
//
// International phone validation + E.164 formatting.
// Uses libphonenumber-js — the industry standard.
//
// Install: npm install libphonenumber-js
//
// Usage in your checkout form:
//   import { parsePhone, formatE164, validatePhone } from './phone.utils'

import { parsePhoneNumberWithError, isValidPhoneNumber } from 'libphonenumber-js'

/**
 * Try to parse + validate a phone number.
 * 
 * countryCode is the ISO 3166-1 alpha-2 hint (e.g. 'ID', 'US', 'GB').
 * It's used to handle numbers entered without a country prefix (e.g. "0812...")
 * If the user types a full international number with +, countryCode is ignored.
 *
 * Returns:
 *   { valid: true,  formatted: '+628123456789', error: null }
 *   { valid: false, formatted: null,            error: 'Human-readable error' }
 */
export function validatePhone(raw, countryCode = 'ID') {
  if (!raw || raw.trim() === '') {
    return { valid: false, formatted: null, error: 'Phone number is required.' }
  }

  try {
    const phone = parsePhoneNumberWithError(raw.trim(), countryCode)

    if (!phone.isValid()) {
      return {
        valid: false,
        formatted: null,
        error: 'Please enter a valid phone number for your country.',
      }
    }

    return {
      valid: true,
      formatted: phone.format('E.164'), // e.g. +628123456789
      error: null,
    }
  } catch {
    return {
      valid: false,
      formatted: null,
      error: 'Invalid phone number. Include your country code (e.g. +62 for Indonesia, +1 for US).',
    }
  }
}

/**
 * Quick boolean check — useful for real-time input feedback.
 */
export function isPhoneValid(raw, countryCode = 'ID') {
  if (!raw?.trim()) return false
  try {
    return isValidPhoneNumber(raw.trim(), countryCode)
  } catch {
    return false
  }
}

/**
 * Format to E.164 or return null if unparseable.
 * Safe to call without try/catch.
 */
export function formatE164(raw, countryCode = 'ID') {
  try {
    const phone = parsePhoneNumberWithError(raw?.trim(), countryCode)
    return phone.isValid() ? phone.format('E.164') : null
  } catch {
    return null
  }
}
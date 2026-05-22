'use server'

import { cookies } from 'next/headers'
import { createCart, fetchCartFromShopify } from './fetches'



export async function getProductionCart(storeKey) {
  const shopifyCartId = (await cookies()).get(`cart_${storeKey}`)?.value

  if (!shopifyCartId) return { storeKey }

  const { cart, formattedItems, checkoutUrl } = await fetchCartFromShopify(shopifyCartId)
  return { cart, formattedItems, checkoutUrl, shopifyCartId }
}

export async function readCartCookie(storeKey) {
  const cookieStore = await cookies()
  return cookieStore.get(`cart_${storeKey}`)?.value ?? null
}

export async function createCartAndSetCookie(storeKey) {
  const shopifyCartId = await createCart()
  if (!shopifyCartId) return null
  const cookieStore = await cookies()
  cookieStore.set(`cart_${storeKey}`, shopifyCartId, { path: '/' })
  return shopifyCartId
}


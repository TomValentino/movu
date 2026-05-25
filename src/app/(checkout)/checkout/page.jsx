import { cookies } from 'next/headers'
import { fetchCartFromShopify } from '@/shopify/fetches'
import CheckoutClient from './page-client'

export default async function CheckoutPage() {
  const cookieStore = await cookies()
  const cartId = cookieStore.get('cart_midnightMuse')?.value ?? null

  let cart = null
  if (cartId) {
    const result = await fetchCartFromShopify(cartId)
    cart = result.cart ?? null
  }

  return <CheckoutClient cartId={cartId} cart={cart} />
}
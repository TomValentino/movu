'use client'

import { useEffect } from "react"
import { fetchCartFromShopify } from "@/shopify/fetches"
import { createCartAndSetCookie, getProductionCart } from "@/shopify/cart"
import SliderCart from "@/cart/slider-cart"
import { cartState } from "./cart-state"

export function SetupCart({ storeKey = 'midnightMuse' }) {
  useEffect(() => {
    const init = async () => {
      const resolved = await getProductionCart(storeKey)
      if (!resolved.cart) {
        const shopifyCartId = await createCartAndSetCookie(resolved.storeKey)
        if (!shopifyCartId) return console.error('Failed to create cart')
        const { checkoutUrl } = await fetchCartFromShopify(shopifyCartId)
        cartState.setCheckoutUrl(checkoutUrl)
        cartState.initCartItems([], shopifyCartId)
      } else {
        cartState.setCheckoutUrl(resolved.checkoutUrl)
        cartState.initCartItems(resolved.formattedItems, resolved.shopifyCartId)
      }
    }
    init()
  }, [storeKey])
  return   <SliderCart />

}



'use client'

import { addToCart, removeCartLine, updateCartLine } from "@/shopify/fetches"
import { createCustomState } from "@/lib/state"
import { createStateCartItem } from "@/shopify/format"
import { trackAddToCart } from "@/facebook/fb-client"




export const cartState = createCustomState(
  {
    isLoaded: false,
    isOpen: false,
    isAdding: false,
    items: [],
    total: 0,
    count: 0, // number of items
    shopify_shopify_cart_id: null,
    checkoutUrl: null,
    shopifyCartId: null,
  },
  {

    setShopifyCartId: ({set}, shopify_cart_id) => {
      set('shopifyCartId', shopify_cart_id) 
    },
    setCartId: ({set}, shopify_cart_id) => {
      set('shopify_cart_id', shopify_cart_id) 
    },

    setCheckoutUrl: ({set}, checkout_url) => {
      set('checkoutUrl', checkout_url) 
    }
    ,
    

   initCartItems: ({ set, get }, initialItems, shopify_cart_id) => {

    set('isLoaded', true);
      set('shopify_cart_id', shopify_cart_id)
      const existingItems = get('items') || [];

      if (!existingItems.length) {
        // Cart empty → just set
        set('items', initialItems);
      }
       else {
        // Merge: update qty if variant exists, else add new at bottom
        const mergedItems = [...existingItems];

        initialItems.forEach((newItem) => {
          const index = mergedItems.findIndex(
            (item) => item.variant.id === newItem.variant.id
          );
          if (index > -1) {
            mergedItems[index].qty += newItem.qty; // increment qty if already exists
          } else {
            mergedItems.push(newItem); // add new item at bottom
          }
        });

        set('items', mergedItems);
      }

      // Recalculate totals
      const finalItems = get('items');
      set('total', finalItems.reduce((sum, i) => sum + (i.variant.price || 0) * (i.qty || 1), 0) );
      set( 'count', finalItems.reduce((sum, i) => sum + (i.qty || 1), 0) );

    },

    // Add a product (or increase qty if exists)
    addCartItem: async ({ get, set }, product, variant, qty = 1) => {
      console.log(variant)
      if (!product || !variant) return

      trackAddToCart(product.price, qty)

      // ---------- SNAPSHOT FOR ROLLBACK ----------
      const prevItems = get('items') || []
      const prevCount = get('count')
      const prevTotal = get('total')
      const shopify_cart_id = get('shopify_cart_id')
      if (!shopify_cart_id) console.error('NO ID')


      let newItems
      const existing = prevItems.find(item => item.variant.id === variant.id)

      if (existing) {
        newItems = [
          { ...existing, qty: existing.qty + qty },
          ...prevItems.filter(item => item.variant.id !== variant.id)
        ]
      } 
      else {
        newItems = [createStateCartItem(product, variant, qty, ), ...prevItems]
      }

      set('items', newItems)
      set('count', newItems.reduce((s, i) => s + (i.qty || 1), 0))
      set('total', newItems.reduce((s, i) => s + ((i.variant.price || 0) * (i.qty || 1)), 0))


      try {
        console.log('CART IDDDD', shopify_cart_id)    
        const addItemToShopify = await addToCart(shopify_cart_id, variant.id, qty)
        console.log('addItemToShopify', addItemToShopify)
        const lines = addItemToShopify?.cartLinesAdd?.cart?.lines?.edges ?? []
        const matchedLine = lines.find(e => e.node.merchandise.id === variant.id)
        const lineId = matchedLine?.node?.id ?? null

        const curr = get('items') || []

        const patched = curr.map(i =>
          i.variant.id === variant.id
            ? { ...i, id: lineId }
            : i
        )
        set('items', patched)

        return
      }

      // ---------- ROLLBACK ON FAILURE ----------
      catch (err) {
        console.error('ERROR adding to Shopify — rolling back', err)
        set('items', prevItems)
        set('count', prevCount)
        set('total', prevTotal)
        return null
      }
    },

    updateQty: async ({ get, set }, variantId, delta) => {
      if (!variantId || !delta) return

      const items = get('items') || []
      const item = items.find(i => i.variant.id === variantId)
      if (!item) return

      const lineId = item.id
      if (!lineId) return // still waiting for Shopify to return lineId from addToCart

      const newQty = item.qty + delta
      const shopify_cart_id = get('shopify_cart_id')
      if (!shopify_cart_id) return

      const prevItems = [...items]
      const prevCount = get('count')
      const prevTotal = get('total')

      const updatedItems = newQty <= 0
        ? items.filter(i => i.variant.id !== variantId)
        : items.map(i => i.variant.id === variantId ? { ...i, qty: newQty } : i)

      set('items', updatedItems)
      set('count', updatedItems.reduce((s, i) => s + i.qty, 0))
      set('total', updatedItems.reduce((s, i) => s + i.variant.price * i.qty, 0))

      try {
            if (newQty <= 0) {
          await removeCartLine(shopify_cart_id, lineId)
        } else {
          await updateCartLine(shopify_cart_id, lineId, newQty)
        }
      } catch (err) {
        console.error('Qty update failed — rollback', err)
        set('items', prevItems)
        set('count', prevCount)
        set('total', prevTotal)
      }
    },


    // Remove a product
    removeProduct: ({ get, set }, variantId) => {
      if (!variantId) return
      const items = get('items') || []
      const filtered = items.filter(item => item.variant.id !== variantId)
      set('items', filtered)
      set('count', filtered.reduce((s, i) => s + (i.qty || 1), 0))
      set('total', filtered.reduce((s, i) => s + ((i.variant.price || 0) * (i.qty || 1)), 0))
    },

    // Clear everything
    clearCart: ({ set }) => {
      set('items', [])
      set('count', 0)
      set('total', 0)
    }
  }
)











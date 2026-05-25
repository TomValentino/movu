'use client'
import { createCustomState } from '@/lib/state'
import { useRef } from 'react'

export const shopifyState = createCustomState(
  {
    collections: {},
    activeId: null,
  },
  {
    setCollections({ set }, collections) { set('collections', collections) },
    setActiveId({ set }, id)             { set('activeId', id) },
  }
)

export const ShopifyProvider = ({ collections, activeId, children }) => {
  const seeded = useRef(false)

  if (!seeded.current) {
    shopifyState.setSilent('collections', collections)
    shopifyState.setSilent('activeId', activeId)
    seeded.current = true
  }

  return children
}




export const shopifyProductState = createCustomState(
  {
    product: []

  },
  {
    setProduct({ set }, product)             { set('product', product) },



    /** Prepend a freshly-created property_pages row */
    
  }
)


export const ShopifyProductProvider = ({ product, children }) => {
  const seeded = useRef(false)

  // Option A: setSilent + manual notify (zero extra renders)
  if (!seeded.current) {

    shopifyProductState.setProduct(product)
    seeded.current = true
  }
  
  return children
}
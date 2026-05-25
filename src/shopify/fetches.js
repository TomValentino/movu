'use server'

import { createStateCartItem, reformatShopifyObj,  formatProduct} from "./format"


// ─── Core request ─────────────────────────────────────────────────────────────

/**
 * @param {string} query  - GraphQL query / mutation string
 * @param {object} variables
 * @param {number} revalidate - seconds; 0 = no cache
 */
export async function shopifyRequest(query, variables = {}, revalidate = 0) {
  if (!query) throw new Error('shopifyRequest: missing query')

  const store = process.env.SHOPIFY_STORE
  const token = process.env.SHOPIFY_STORE_TOKEN

  if (!store || !token) {
    throw new Error('shopifyRequest: missing SHOPIFY_STORE or SHOPIFY_STOREFRONT_TOKEN env vars')
  }

  const res = await fetch(
    `https://${store}.myshopify.com/api/2025-07/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
  //     next: revalidate > 0
  // ? { revalidate, tags: ['shopify', `shopify-${variables?.id ?? variables?.handle ?? 'global'}`] }
  // : { cache: 'no-store' },
    }
  )

  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}: ${await res.text()}`)
  }

  const json = await res.json()

  if (json.errors?.length) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`)
  }

  return json
}

// ─────────────────────────────────────
// PRODUCTS 
// ─────────────────────────────────────


export async function getProductById(id, preset = 'full') {
  if (!id) return null
  try {
    const { data } = await shopifyRequest(`
      query ProductById($id: ID!) {
        product(id: $id) { ${PRODUCT_FIELDS[preset]} }
      }
    `, { id }, 600)
    const raw = reformatShopifyObj(data.product)
    return formatProduct(raw)
  } catch (err) {
    console.error('getProductById error:', err)
    return null
  }
}

const PRODUCT_FIELDS = {
  card: `
    id title handle availableForSale
    featuredImage { url(transform: { maxWidth: 500, maxHeight: 500, crop: CENTER }) altText }
    priceRange { minVariantPrice { amount currencyCode } }
  `,

  full: `
    id title handle description tags availableForSale productType
    featuredImage { url(transform: { maxWidth: 1200, maxHeight: 1200, crop: CENTER }) altText }
    images(first: 20) { edges { node { url(transform: { maxWidth: 1200, maxHeight: 1200 }) altText } } }
    options { name values }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    metafield(namespace: "custom", key: "color_variations") { value }
    colorHex: metafield(namespace: "custom", key: "colorr_swatch") { value }
    collections(first: 30) { nodes { id handle title } }
    variants(first: 20) {
      edges { node {
id title sku availableForSale
        priceV2 { amount currencyCode }
        compareAtPriceV2 { amount currencyCode }
        selectedOptions { name value }
        image { url(transform: { maxWidth: 600, maxHeight: 600, crop: CENTER }) altText }
      }}
    }
  `,

  stock: `
    id
    variants(first: 20) {
      edges { node { id availableForSale } }
    }
  `,

  metafields: `
    id
    colorHex: metafield(namespace: "custom", key: "colorr_swatch") { value }
    colorVariations: metafield(namespace: "custom", key: "color_variations") { value }
  `,
}

const CART_LINE_PRODUCT_FIELDS = `
  id title handle tags productType
  featuredImage { url(transform: { maxWidth: 300, maxHeight: 300, crop: CENTER }) altText }
  collections(first: 10) { nodes { id handle title } }
`

const CART_LINE_FIELDS = `
  id quantity
  merchandise {
    ... on ProductVariant {
      id title sku
      priceV2 { amount currencyCode }
      compareAtPriceV2 { amount currencyCode }
      selectedOptions { name value }
      image { url(transform: { maxWidth: 300, maxHeight: 300, crop: CENTER }) altText }
      product { ${CART_LINE_PRODUCT_FIELDS} }
    }
  }
`


/**
 * Fetch a single product by handle.
 * @param {string} handle
 * @param {'card'|'full'|'stock'|'metafields'} preset
 */
export async function getProduct(handle, preset = 'full') {
  if (!handle) return null
  try {
    const { data } = await shopifyRequest(`
      query ProductByHandle($handle: String!) {
        productByHandle(handle: $handle) { ${PRODUCT_FIELDS[preset]} }
      }
    `, { handle }, 600)
    const raw = reformatShopifyObj(data.productByHandle)
    return formatProduct(raw)
  } catch (err) {
    console.error('getProduct error:', err)
    return null
  }
}

/**
 * Fetch a collection and its products.
 * @param {string} id - Shopify collection GID
 * @param {'card'|'full'} preset
 * @param {number} first - max products to fetch
 */
export async function getCollection(id, preset = 'full', first = 120) {
  if (!id) return null

  const gid = id.startsWith('gid://')
    ? id
    : `gid://shopify/Collection/${id}`

  try {
    const { data } = await shopifyRequest(`
      query CollectionById($id: ID!, $first: Int!) {
        collection(id: $id) {
          id title handle description
          image { url altText }
          products(first: $first, sortKey: MANUAL) {
            edges { node { ${PRODUCT_FIELDS[preset]} } }
          }
        }
      }
    `, { id: gid, first }, 600)

    const collection = reformatShopifyObj(data.collection)
    if (!collection) return null

    return {
      ...collection,
      products: collection.products?.map(formatProduct) ?? []
    }
  } catch (err) {
    console.error('getCollection error:', err)
    return null
  }
}






// ─────────────────────────────────────
// CART 
// ─────────────────────────────────────
const EMPTY_CART = { cart: null, formattedItems: [], checkoutUrl: null }

export async function fetchCartFromShopify(cartId) {
  if (!cartId) return EMPTY_CART
  try {
    const { data } = await shopifyRequest(`
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          id checkoutUrl
          lines(first: 50) { nodes { ${CART_LINE_FIELDS} } }
          estimatedCost {
            subtotalAmount { amount }
            totalAmount { amount }
          }
          discountCodes { code applicable }
          discountAllocations {
            discountedAmount { amount currencyCode }
            ... on CartCodeDiscountAllocation { code }
            ... on CartAutomaticDiscountAllocation { title }
            ... on CartCustomDiscountAllocation { title }
          }
        }
      }
    `, { cartId })

    const cart = data?.cart
    if (!cart) return EMPTY_CART

    const formattedItems = cart.lines?.nodes?.map(line =>
      createStateCartItem(
        line.merchandise.product,
        line.merchandise,
        line.quantity,
        line.id,
      )
    ) ?? []

    return { cart, formattedItems, checkoutUrl: cart.checkoutUrl ?? null }
  } catch (err) {
    console.error('fetchCartFromShopify error:', err)
    return EMPTY_CART
  }
}

export async function createCart() {
  try {
    const { data } = await shopifyRequest(`
      mutation { cartCreate { cart { id } userErrors { message } } }
    `)
    const errors = data?.cartCreate?.userErrors
    if (errors?.length) throw new Error(errors.map(e => e.message).join(', '))
    return data?.cartCreate?.cart?.id ?? null
  } catch (err) {
    console.error('createCart error:', err)
    return null
  }
}

export async function addToCart(cartId, variantId, qty = 1) {
  if (!cartId) throw new Error('addToCart: missing cartId')
  const { data } = await shopifyRequest(`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { 
          id
          lines(first: 50) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
          }
        }
        userErrors { field message }
      }
    }
  `, { cartId, lines: [{ merchandiseId: variantId, quantity: qty }] })
  const errors = data?.cartLinesAdd?.userErrors
  if (errors?.length) throw new Error(errors.map(e => e.message).join(', '))
  return data
}



export async function updateCartLine(cartId, lineId, qty) {
  if (!cartId || !lineId) throw new Error('updateCartLine: missing cartId or lineId')
  const { data } = await shopifyRequest(`
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { id }
        userErrors { field message }
      }
    }
  `, { cartId, lines: [{ id: lineId, quantity: qty }] })
  const errors = data?.cartLinesUpdate?.userErrors
  if (errors?.length) throw new Error(errors.map(e => e.message).join(', '))
  return data
}



export async function removeCartLine(cartId, lineId) {
  if (!cartId || !lineId) throw new Error('removeCartLine: missing cartId or lineId')
  const { data } = await shopifyRequest(`
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { id }
        userErrors { message }
      }
    }
  `, { cartId, lineIds: [lineId] })
  const errors = data?.cartLinesRemove?.userErrors
  if (errors?.length) throw new Error(errors.map(e => e.message).join(', '))
  return data
}









export async function clearShopifyCart(cartId, lineIds) {
  const { data } = await shopifyRequest(`
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { id }
        userErrors { message }
      }
    }
  `, { cartId, lineIds })
  return data
}
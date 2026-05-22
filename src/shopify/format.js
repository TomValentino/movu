// ─────────────────────────────────────
// lib/shopify/shopify.format.js
// ─────────────────────────────────────

// ─── Shopify Relay → plain object ────────────────────────────────────────────
// Unwraps { edges: [{ node }] } recursively. Call this on raw API responses
// before passing into any format* function.

export function reformatShopifyObj(obj) {
  if (!obj) return null
  if (Array.isArray(obj)) return obj.map(reformatShopifyObj)
  if (typeof obj !== 'object') return obj
  if (Array.isArray(obj.edges)) return obj.edges.map(e => reformatShopifyObj(e.node))
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, reformatShopifyObj(v)])
  )
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function parsePrice(p) {
  if (!p) return null
  return {
    amount: parseFloat(p.amount) || null,
    currencyCode: p.currencyCode ?? null,
  }
}

function parsePriceRange(range) {
  if (!range) return null
  return {
    min: parsePrice(range.minVariantPrice),
    max: parsePrice(range.maxVariantPrice),
  }
}

function parseImage(img) {
  if (!img) return null
  return {
    url: img.url ?? null,
    alt: img.altText ?? img.alt ?? '',
  }
}

function parseCollections(collections) {
  if (!collections) return null
  const arr = Array.isArray(collections) ? collections : (collections.nodes ?? null)
  return arr?.map(c => ({ id: c.id ?? null, handle: c.handle, title: c.title })) ?? null
}

function parseMetafield(raw) {
  if (!raw) return null
  const value = typeof raw === 'object' ? raw.value : raw
  if (!value) return null
  try { return JSON.parse(value) } catch { return value }
}

function parseVariant(v) {
  return {
    id: v.id ?? null,
    title: v.title ?? null,
    sku: v.sku ?? null,
    availableForSale: v.availableForSale ?? null,
    quantityAvailable: v.quantityAvailable ?? null,
    price: parseFloat(v.priceV2?.amount) || null,
    compare_at_price: parseFloat(v.compareAtPriceV2?.amount) || null,
    currencyCode: v.priceV2?.currencyCode ?? null,
    selected_options: v.selectedOptions?.map(o => ({ name: o.name, value: o.value })) ?? [],
    image: parseImage(v.image),
  }
}

// ─── Public formatters ────────────────────────────────────────────────────────

/**
 * Format a raw (already-reformat'd) Shopify product into a stable shape.
 * Compatible with all PRODUCT_FIELDS presets — missing fields become null/[].
 */
export function formatProduct(p) {
  if (!p) return null

  const images = p.images?.length ? p.images.map(parseImage).filter(Boolean) : []
  const featured_image = parseImage(p.featuredImage) ?? images[0] ?? null
  const variants = p.variants?.length ? p.variants.map(parseVariant) : []
  const priceRange = parsePriceRange(p.priceRange)
  const compareAtPriceRange = parsePriceRange(p.compareAtPriceRange)

  return {
    id: p.id ?? null,
    handle: p.handle ?? null,
    title: p.title ?? null,
    description: p.description ?? null,
    tags: p.tags ?? [],
    availableForSale: p.availableForSale ?? null,
    productType: p.productType ?? null,

    featured_image,
    images,
    options: p.options?.map(o => ({ name: o.name, values: o.values })) ?? null,
    variants,
    collections: parseCollections(p.collections),

    // Flat convenience fields (most components only need these)
    price: priceRange?.min?.amount ?? null,
    max_price: priceRange?.max?.amount ?? null,
    currencyCode: priceRange?.min?.currencyCode ?? null,

    // Full range objects (for display of sale pricing etc.)
    priceRange,
    compareAtPriceRange,

    // Metafields
    colorHex: parseMetafield(p.colorHex),
    colorVariations: parseMetafield(p.metafield ?? p.colorVariations),
  }
}

/**
 * Build a cart line item in the shape used by your client-side cart state.
 *
 * Handles both:
 *   - formatted product + formatted variant (post formatProduct)
 *   - raw Shopify merchandise + raw product (straight from cart query)
 */
export function createStateCartItem(product, variant, qty, lineId) {
  return {
    id: lineId ?? null,
    qty,
    variant: variant.priceV2 ? parseVariant(variant) : variant, // already formatted? use as-is
    product: product.variants ? product : formatProduct(product), // already formatted? use as-is
  }
}


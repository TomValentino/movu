'use client'
import { Suspense, useState } from "react";
import '@/styles/collection.css'
import Image from "next/image";
import { shopifyState } from "./provider";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

const COLORS = [
  { id: "black",    hex: "#1A1614" },
  { id: "white",    hex: "#F5F0EB", cls: "col-filters__swatch--white" },
  { id: "navy",     hex: "#1E2D4A" },
  { id: "burgundy", hex: "#5C1A26" },
  { id: "green",    hex: "#1F3A2A" },
  { id: "blush",    hex: "#E9D8C8" },
  { id: "rose",     hex: "#C4607A" },
]

const CATEGORIES = [
  { id: "488234778870", label: "All Items",  img: "/influencer-2.png" },
  { id: "488967012598", label: "Lingerie",   img: "/influencer-2.png" },
  { id: "488966979830", label: "Sleepwear",  img: "/influencer-2.png" },
  { id: "488865530102", label: "Pajamas",    img: "/influencer-1.png" },
  { id: "488967045366", label: "Bodysuits",  img: "/influencer-1.png" },
  { id: "488967110902", label: "Bustiers",   img: "/influencer-3.png" },
  { id: "488967078134", label: "Swimwear",   img: "/influencer-2.png" },
]

/* ── Collection Hero ── */
export function CollectionHero() {
  const collections = shopifyState.use('collections')
  const activeId    = shopifyState.use('activeId')
  const collection  = collections[activeId] ?? {}
  const count = collection.products?.length ?? 0

  return (
    <div className="col-wrapper">
      <section className="col-hero">
        <div className="col-inner">
          <div className="col-hero__bg">
            <Image
              src="/collection-hero.png"
              alt=""
              width={300}
              height={375}
              sizes="(max-width: 500px) 50vw, 25vw"
              className="proof-card-img"
              quality={100}
              priority
            />
          </div>
          <div className="col-hero__breadcrumb">
            <Link href="/">Home</Link>
            <div className="col-hero__breadcrumb-sep" />
            <span>{collection?.title || ''}</span>
          </div>
          <div className="col-hero__center">
            <h1 className="col-hero__headline">
              {collection?.title || ''}<span>({count})</span>
            </h1>
          </div>
          <div className="col-hero__stats">
            <div>
              <div className="col-hero__stat-num">180k+</div>
              <div className="col-hero__stat-label">Orders Delivered</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="col-hero__stat-num">40,000+</div>
              <div className="col-hero__stat-label">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── Top Bar ── */
export function CollectionTopBar({ updateSort }) {
  const collections = shopifyState.use('collections')
  const activeId    = shopifyState.use('activeId')
  const collection  = collections[activeId] ?? {}
  const count = collection.products?.length ?? 0

  return (
    <div className="col-topbar">
      <div className="col-topbar__left">
        <span className="col-topbar__breadcrumb">All</span>
        <span className="col-topbar__sep">›</span>
        <span className="col-topbar__name">{collection.title}</span>
        <span className="col-topbar__count">({count} items)</span>
      </div>
      <div className="col-topbar__actions">
        <button className="col-topbar__btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="8" y1="6" x2="21" y2="6"/>
            <line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/>
            <line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
          Filter
        </button>
        <div className="col-topbar__sort">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="6" y1="12" x2="21" y2="12"/>
            <line x1="9" y1="18" x2="21" y2="18"/>
          </svg>
          <select
            className="col-topbar__select"
            defaultValue="featured"
            onChange={(e) => updateSort(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="title_asc">Name: A → Z</option>
            <option value="title_desc">Name: Z → A</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  )
}

/* ── Category Tiles ── */
export function CollectionTiles() {
  const activeId = shopifyState.use('activeId')

  const orderedCategories = [
    ...CATEGORIES.filter(cat => cat.id === activeId),
    ...CATEGORIES.filter(cat => cat.id !== activeId),
  ]

  return (
    <div className="col-tiles">
      {orderedCategories.map((cat) => (
        <div
          key={cat.id}
          className={`col-tile${cat.id === activeId ? " col-tile--active" : ""}`}
        >
          <Link
            href={`/collection/${cat.id}`}
            className="col-tile__img-wrap"
            scroll={false}
            style={{ cursor: 'pointer' }}
          >
            <Image
              src={cat.img}
              alt={cat.label}
              width={300}
              height={375}
              sizes="(max-width: 500px) 50vw, 25vw"
              className="proof-card-img"
              quality={80}
            />
          </Link>

          <div className="col-tile__label">{cat.label}</div>
        </div>
      ))}
    </div>
  )
}

/* ── Product Tile ── */
export function ProductTile({ product }) {
  const HeartIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )

  const fmt = (amount) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: product.currencyCode ?? "IDR",
      maximumFractionDigits: 0,
    }).format(amount)

  const formattedPrice   = fmt(product.price)
  const formattedCompare = product.compareAtPriceRange?.max?.amount
    ? fmt(product.compareAtPriceRange.max.amount)
    : null

  const colorOption = product.options?.find((o) => o.name === "Color")
  const swatches    = colorOption?.values?.slice(0, 3) ?? []

  return (
    <div className="pt">
      <div className="pt__img">
        {product.featured_image?.url && (
          <a href={`/product/${product.handle}`} className="pt__bg-wrap" >
            <Image
              src={product.featured_image.url}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="pt__bg"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority={product.priority ?? false}
            />
          </a>
        )}
        {product.badge && <span className="pt__badge">{product.badge}</span>}
        <button className="pt__wish" aria-label="Save to wishlist">
          <HeartIcon />
        </button>
        {swatches.length > 0 && (
          <div className="pt__swatches">
            {swatches.map((color, i) => (
              <span key={i} className="pt__swatch" style={{ background: color.toLowerCase() }} />
            ))}
          </div>
        )}
      </div>
      <div className="pt__info">
        <p className="pt__name">{product.title}</p>
        <div className="pt__meta">
          <span className="pt__price">{formattedPrice}</span>
          {formattedCompare && <span className="pt__compare">{formattedCompare}</span>}
        </div>
      </div>
    </div>
  )
}

/* ── Page ── */
function CollectionPageInner({ searchParams }) {
  
}

export default function CollectionPage({ searchParams }) {
  const collections = shopifyState.use('collections')
  const activeId    = shopifyState.use('activeId')
  const collection  = collections[activeId] ?? {}
  const router      = useRouter()

  const page = Number(searchParams.page || 1)
  const q    = searchParams.q    || ''
  const sort = searchParams.sort || 'featured'

  const [sortVal, setSortVal] = useState(sort)

  const updateSort = (val) => {
    setSortVal(val)
    const params = new URLSearchParams({ ...searchParams, sort: val })
    params.delete('page')
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  const loadMore = () => {
    const params = new URLSearchParams({ ...searchParams, page: String(page + 1) })
    router.replace(`?${params.toString()}`, { scroll: false })
  }
  let filtered = (collection.products ?? []).filter(p =>
    !q || p.title.toLowerCase().includes(q.toLowerCase())
  )
  filtered = [...filtered].sort((a, b) => {
    if (sortVal === 'price_asc')  return parseFloat(a.price || 0) - parseFloat(b.price || 0)
    if (sortVal === 'price_desc') return parseFloat(b.price || 0) - parseFloat(a.price || 0)
    if (sortVal === 'title_asc')  return a.title.localeCompare(b.title)
    if (sortVal === 'title_desc') return b.title.localeCompare(a.title)
    if (sortVal === 'newest')     return (b.created_at ?? '') > (a.created_at ?? '') ? 1 : -1
    return 0
  })
  const LIMIT   = 12
  const visible = filtered.slice(0, page * LIMIT)
  const hasMore = filtered.length > page * LIMIT
  if (!collections[activeId]) return <>Collection not found</>
  return (
    <>
      {/* <CollectionHero /> */}
      <div className="col-layout">
        <main className="col-main">
          <CollectionTopBar updateSort={updateSort} />
          <CollectionTiles />
          <div className="col-grid">
            {visible.map((p) => (
              <ProductTile key={p.id} product={p} />
            ))}
          </div>
          {hasMore && (
            <div className="load-more">
              <div className="load-more__track">
                <div
                  className="load-more__fill"
                  style={{ width: `${(visible.length / filtered.length) * 100}%` }}
                />
              </div>
              <p className="load-more__count">
                {visible.length} of {filtered.length} pieces
              </p>
              <button className="load-more__btn" onClick={loadMore}>
                <span>Discover More</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
'use client'
import { ProductTile } from "@/app/(main)/collection/[collection_id]/client-page"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"


function HomePageProductsInner({ title = "Top Sellers", products, moreId = "488234778870", paginateBy }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get('page') || 1)
  const [visible, setVisible] = useState(page * paginateBy)
  const shown = products.slice(0, visible)
  const hasMore = visible < products.length
  const loadMore = () => {
    const next = page + 1
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(next))
    router.replace(`?${params.toString()}`, { scroll: false })
    setVisible(next * paginateBy)
  }
  return (
    <section className="products" id="products">
      <div className="products-inner">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <Link href={`/collection/${moreId}`} className="section-link">View all →</Link>
        </div>
        <div className="products-scroll">
          {shown.map((p, i) => (
            <ProductTile key={p.id ?? i} product={p} />
          ))}
        </div>
        {hasMore && (
          <div className="load-more">
            <div className="load-more__track">
              <div
                className="load-more__fill"
                style={{ width: `${(shown.length / products.length) * 100}%` }}
              />
            </div>
            <p className="load-more__count">
              {shown.length} of {products.length} pieces
            </p>
            <button className="load-more__btn" onClick={loadMore}>
              <span>Discover More</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export function HomePageProductsClient(props) {
  return (
    <Suspense fallback={null}>
      <HomePageProductsInner {...props} />
    </Suspense>
  )
}
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createUnpaidOrder } from '@/shopify/admin'
import { clearShopifyCart } from '@/shopify/fetches'

const fmtRp = (n) => 'Rp\u00a0' + Math.round(n).toLocaleString('id-ID')

export default function CheckoutClient({ cartId, cart }) {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const barRef = useRef(null)
  const drawerRef = useRef(null)

  const lines = cart?.lines?.nodes ?? []
  const subtotal = lines.reduce((sum, l) =>
    sum + parseFloat(l.merchandise.priceV2?.amount ?? 0) * l.quantity, 0)
  const totalItems = lines.reduce((s, l) => s + l.quantity, 0)

  // Close when clicking outside both bar and drawer
  useEffect(() => {
    if (!cartOpen) return
    const handler = (e) => {
      if (
        barRef.current?.contains(e.target) ||
        drawerRef.current?.contains(e.target)
      ) return
      setCartOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [cartOpen])

  async function handleOrder(e) {
    e.preventDefault()
    setError(null)
    if (!cartId) return setError('No active cart found.')
    if (!lines.length) return setError('Your cart is empty.')
    setLoading(true)
    const fd = new FormData(e.target)
    try {
      const { token } = await createUnpaidOrder(
        {
          email:       fd.get('email'),
          firstName:   fd.get('firstName'),
          lastName:    fd.get('lastName'),
          phone:       fd.get('phone'),
          address1:    fd.get('address1'),
          city:        fd.get('city'),
          province:    fd.get('province'),
          zip:         fd.get('zip'),
          countryCode: 'ID',
        },
        lines.map(l => ({ variantId: l.merchandise.id, quantity: l.quantity }))
      )
      await clearShopifyCart(cartId, lines.map(l => l.id))
      setDone(true)
      setTimeout(() => router.push(`/order/${token}`), 400)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Manrope:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .co-page {
          font-family: 'Manrope', sans-serif;
          background: #F8F5F1;
          min-height: 100%;
          color: #1A1614;
        }

        /* backdrop — pointer-events none, purely visual */
        .co-backdrop {
          display: none;
        }
        @media (max-width: 768px) {
          .co-backdrop {
            display: block;
            position: fixed; inset: 0;
            background: rgba(26,22,20,0.35);
            backdrop-filter: blur(2px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 300ms;
            z-index: 30;
          }
          .co-backdrop.open { opacity: 1; }
        }

        /* cart bar */
        .co-cart-bar { display: none; }
        @media (max-width: 768px) {
          .co-cart-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #FDFCFA;
            border-bottom: 1.5px solid rgba(180,165,150,0.3);
            padding: 12px clamp(1rem, 5vw, 1.5rem);
            cursor: pointer;
            position: sticky;
            top: 64px;
            z-index: 50;
            transition: background 150ms;
          }
          .co-cart-bar:hover { background: #EFE8DF; }
        }
        .co-cart-bar-left {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.82rem; font-weight: 500;
        }
        .co-cart-count {
          background: #1A1614; color: #FDFCFA;
          font-family: 'Syne', sans-serif;
          font-size: 10px; font-weight: 700;
          width: 20px; height: 20px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .co-cart-bar-right {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.82rem; font-weight: 600;
        }
        .co-chevron { transition: transform 250ms cubic-bezier(0.16,1,0.3,1); }
        .co-chevron.open { transform: rotate(180deg); }

        /* drawer */
        .co-drawer { display: none; }
        @media (max-width: 768px) {
          .co-drawer {
            display: block;
            position: fixed;
            top: 116px; left: 0; right: 0;
            z-index: 40;
            background: #FDFCFA;
            border-bottom: 1.5px solid rgba(180,165,150,0.3);
            padding: 20px clamp(1rem, 5vw, 1.5rem);
            max-height: 50dvh; overflow-y: auto;
            transform: translateY(-8px);
            opacity: 0;
            pointer-events: none;
            transition: transform 300ms cubic-bezier(0.16,1,0.3,1), opacity 200ms;
          }
          .co-drawer.open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
          }
        }

        /* layout */
        .co-layout {
          max-width: 960px;
          margin: 0 auto;
          padding: 2.5rem clamp(1rem, 5vw, 1.5rem) 4rem;
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 3rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .co-layout { grid-template-columns: 1fr; }
          .co-sidebar { display: none; }
        }

        .co-card {
          background: #FDFCFA;
          border: 1.5px solid rgba(180,165,150,0.3);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 12px;
        }
        .co-card-pad { padding: 24px; }

        .co-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #A8998E; margin-bottom: 18px;
        }

        .co-fields { display: flex; flex-direction: column; gap: 12px; }
        .co-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 480px) { .co-row { grid-template-columns: 1fr; } }

        .co-field-label {
          display: block;
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #A8998E; margin-bottom: 6px;
        }
        .co-field-label span { font-weight: 400; opacity: 0.7; }
        .co-input {
          width: 100%; height: 46px;
          padding: 0 14px;
          background: #fff;
          border: 1.5px solid rgba(180,165,150,0.35);
          border-radius: 10px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.875rem; color: #1A1614;
          outline: none;
          transition: border-color 150ms, box-shadow 150ms;
          appearance: none;
        }
        .co-input::placeholder { color: #C9BDB5; }
        .co-input:focus {
          border-color: #C4A07A;
          box-shadow: 0 0 0 3px rgba(196,160,122,0.12);
        }

        .co-error {
          display: flex; align-items: flex-start; gap: 10px;
          background: #FEF2F2;
          border: 1.5px solid #FCA5A5;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 0.875rem; color: #B91C1C;
          margin-bottom: 12px; line-height: 1.5;
        }
        .co-error svg { flex-shrink: 0; margin-top: 2px; }

        .co-empty { text-align: center; padding: 5rem 2rem; }
        .co-empty-icon {
          width: 52px; height: 52px; border-radius: 50%;
          background: #EFE8DF;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
        }
        .co-empty h2 {
          font-family: 'Syne', sans-serif;
          font-size: 1rem; font-weight: 700; margin-bottom: 8px;
        }
        .co-empty p { font-size: 0.875rem; color: #A8998E; }

        .co-submit-area { padding: 20px 24px 24px; }
        .co-btn {
          width: 100%; height: 52px;
          background: #1A1614; color: #FDFCFA;
          border: none; border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background 200ms, opacity 200ms, transform 150ms;
        }
        .co-btn:hover:not(:disabled) { background: #2d2420; }
        .co-btn:active:not(:disabled) { transform: scale(0.99); }
        .co-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .co-btn.done { background: #166534; }
        .co-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .co-trust {
          display: flex; align-items: center; justify-content: center;
          gap: 20px; flex-wrap: wrap;
          padding: 16px 24px;
          border-top: 1px solid rgba(180,165,150,0.2);
        }
        .co-trust-item {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.7rem; color: #C9BDB5; letter-spacing: 0.03em;
        }
        .co-trust-item svg { opacity: 0.5; }

        .co-summary { position: sticky; top: 84px; }
        .co-sum-line {
          display: flex; gap: 12px; align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid rgba(180,165,150,0.2);
        }
        .co-sum-line:first-of-type { padding-top: 0; }
        .co-sum-line:last-of-type { border-bottom: none; padding-bottom: 0; }
        .co-sum-img {
          width: 50px; height: 50px; border-radius: 8px;
          background: #EFE8DF;
          border: 1px solid rgba(180,165,150,0.3);
          overflow: hidden; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .co-sum-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .co-sum-info { flex: 1; min-width: 0; }
        .co-sum-name {
          font-size: 0.82rem; font-weight: 600;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          margin-bottom: 2px;
        }
        .co-sum-meta { font-size: 0.72rem; color: #A8998E; }
        .co-sum-qty {
          display: inline-flex; align-items: center; justify-content: center;
          width: 18px; height: 18px; border-radius: 4px;
          background: #EFE8DF;
          font-size: 10px; font-weight: 700; color: #6B5D55;
          margin-top: 4px;
        }
        .co-sum-price { font-size: 0.82rem; font-weight: 600; flex-shrink: 0; }
        .co-sum-total {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-top: 14px; padding-top: 14px;
          border-top: 1.5px solid rgba(180,165,150,0.25);
        }
        .co-sum-total-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #6B5D55;
        }
        .co-sum-total-val {
          font-family: 'Syne', sans-serif;
          font-size: 1rem; font-weight: 700;
        }
      `}</style>

      <div className="co-page">

        {/* Visual backdrop only — no pointer events, can't block anything */}
        <div className={`co-backdrop ${cartOpen ? 'open' : ''}`} />

        {lines.length > 0 && (
          <>
            {/* Bar — toggles drawer */}
            <div ref={barRef} className="co-cart-bar" onClick={() => setCartOpen(o => !o)}>
              <div className="co-cart-bar-left">
                <span className="co-cart-count">{totalItems}</span>
                <span>{cartOpen ? 'Hide summary' : 'Show summary'}</span>
              </div>
              <div className="co-cart-bar-right">
                <span>{fmtRp(subtotal)}</span>
                <svg className={`co-chevron ${cartOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Drawer */}
            <div ref={drawerRef} className={`co-drawer ${cartOpen ? 'open' : ''}`}>
              <SummaryLines lines={lines} subtotal={subtotal} />
            </div>
          </>
        )}

        <div className="co-layout">
          <div>
            {!cartId || !lines.length ? (
              <div className="co-empty">
                <div className="co-empty-icon">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" stroke="#A8998E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h2>Your cart is empty</h2>
                <p>Add some items before checking out.</p>
              </div>
            ) : (
              <form onSubmit={handleOrder} noValidate>
                <div className="co-card">
                  <div className="co-card-pad">
                    <p className="co-label">Contact</p>
                    {error && (
                      <div className="co-error" role="alert">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6.5" stroke="#B91C1C" strokeWidth="1.2"/><path d="M7.5 4.5v3.5M7.5 10.5h.01" stroke="#B91C1C" strokeWidth="1.3" strokeLinecap="round"/></svg>
                        {error}
                      </div>
                    )}
                    <div className="co-fields">
                      <div>
                        <label className="co-field-label" htmlFor="email">Email</label>
                        <input className="co-input" id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                      </div>
                      <div className="co-row">
                        <div>
                          <label className="co-field-label" htmlFor="firstName">First name</label>
                          <input className="co-input" id="firstName" name="firstName" type="text" autoComplete="given-name" placeholder="Anya" required />
                        </div>
                        <div>
                          <label className="co-field-label" htmlFor="lastName">Last name</label>
                          <input className="co-input" id="lastName" name="lastName" type="text" autoComplete="family-name" placeholder="Putri" required />
                        </div>
                      </div>
                      <div>
                        <label className="co-field-label" htmlFor="phone">Phone <span>(optional)</span></label>
                        <input className="co-input" id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+62 812 3456 7890" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="co-card">
                  <div className="co-card-pad">
                    <p className="co-label">Shipping address</p>
                    <div className="co-fields">
                      <div>
                        <label className="co-field-label" htmlFor="address1">Address</label>
                        <input className="co-input" id="address1" name="address1" type="text" autoComplete="address-line1" placeholder="Jl. Sudirman No. 1" required />
                      </div>
                      <div className="co-row">
                        <div>
                          <label className="co-field-label" htmlFor="city">City</label>
                          <input className="co-input" id="city" name="city" type="text" autoComplete="address-level2" placeholder="Jakarta" required />
                        </div>
                        <div>
                          <label className="co-field-label" htmlFor="zip">ZIP / Postal code</label>
                          <input className="co-input" id="zip" name="zip" type="text" autoComplete="postal-code" placeholder="12190" required />
                        </div>
                      </div>
                      <div>
                        <label className="co-field-label" htmlFor="province">Province <span>(optional)</span></label>
                        <input className="co-input" id="province" name="province" type="text" autoComplete="address-level1" placeholder="DKI Jakarta" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="co-card">
                  <div className="co-submit-area">
                    <button type="submit" disabled={loading || done} className={`co-btn ${done ? 'done' : ''}`}>
                      {loading ? (
                        <span className="co-spinner" />
                      ) : done ? (
                        <>
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2.5 7.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          Order placed
                        </>
                      ) : 'Place order'}
                    </button>
                  </div>
                  <div className="co-trust">
                    <span className="co-trust-item">
                      <svg width="11" height="12" viewBox="0 0 11 12" fill="none"><path d="M5.5 1L1 3.2V6.5c0 2.4 2 4.6 4.5 5.1C8 11.1 10 9 10 6.5V3.2L5.5 1Z" stroke="currentColor" strokeWidth="1.1"/></svg>
                      SSL secured
                    </span>
                    <span className="co-trust-item">
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><rect x="0.5" y="0.5" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1"/><path d="M0.5 3h11" stroke="currentColor"/></svg>
                      Bank transfer
                    </span>
                    <span className="co-trust-item">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.1"/><path d="M6 3.5V6l2 1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
                      Fast processing
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>

          <aside className="co-sidebar">
            <div className="co-summary">
              <div className="co-card">
                <div className="co-card-pad">
                  <p className="co-label">Order summary</p>
                  <SummaryLines lines={lines} subtotal={subtotal} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

function SummaryLines({ lines, subtotal }) {
  return (
    <>
      {lines.map((line, i) => {
        const price = parseFloat(line.merchandise.priceV2?.amount ?? 0) * line.quantity
        const imgUrl = line.merchandise.image?.url ?? line.merchandise.product?.featuredImage?.url
        const variants = line.merchandise.selectedOptions
          ?.filter(o => o.name.toLowerCase() !== 'title')
          .map(o => o.value).join(' · ')
        return (
          <div key={i} className="co-sum-line">
            <div className="co-sum-img">
              {imgUrl
                ? <img src={imgUrl} alt={line.merchandise.product?.title ?? ''} />
                : <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="16" height="16" rx="2" stroke="#C9BDB5" strokeWidth="1"/><path d="M1 12l4-4 3 3 3-4 6 6" stroke="#C9BDB5" strokeWidth="1" strokeLinecap="round"/></svg>
              }
            </div>
            <div className="co-sum-info">
              <p className="co-sum-name">{line.merchandise.product?.title ?? line.merchandise.title}</p>
              {variants && <p className="co-sum-meta">{variants}</p>}
              <span className="co-sum-qty">×{line.quantity}</span>
            </div>
            <span className="co-sum-price">{fmtRp(price)}</span>
          </div>
        )
      })}
      <div className="co-sum-total">
        <span className="co-sum-total-label">Total</span>
        <span className="co-sum-total-val">{fmtRp(subtotal)}</span>
      </div>
    </>
  )
}
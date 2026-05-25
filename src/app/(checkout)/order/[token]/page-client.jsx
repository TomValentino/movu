'use client'

import { useState } from 'react'
import { claimOrder } from '@/shopify/admin'
import { trackPurchase } from '@/facebook/fb-client'

const fmtRp = (n) => 'Rp\u00a0' + Math.round(parseFloat(n)).toLocaleString('id-ID')

export default function OrderClient({ order, token }) {
  const [claimed, setClaimed] = useState(order.tags.includes('payment:claimed'))
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

const isPaid = order.displayFinancialStatus === 'PAID'
  const total = order.totalPriceSet.shopMoney.amount
  const addr = order.shippingAddress

 async function handleClaim() {
  setLoading(true)
  setErr(null)
  try {
    await claimOrder(order.id, order.tags)

    trackPurchase({
      orderId: order.name,
      value: parseFloat(total),
      contents: order.lineItems.nodes.map(item => ({
        id: item.variant?.id,
        quantity: item.quantity,
      })),
      userData: {
        email:     order.email,
        firstName: addr?.firstName,
        lastName:  addr?.lastName,
        phone:     order.phone,
        city:      addr?.city,
        zip:       addr?.zip,
        state:     addr?.province,
        country:   'id',
      }
    })

    setClaimed(true)
  } catch (e) {
    setErr(e.message)
  } finally {
    setLoading(false)
  }
}
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Manrope:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .or-root {
          font-family: 'Manrope', sans-serif;
          background: #F8F5F1;
          min-height: 100dvh;
          color: #1A1614;
        }

        /* ── Header — white surface, clear separation ── */
        .or-header {
          background: #FDFCFA;
          border-bottom: 1.5px solid rgba(180,165,150,0.35);
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(1.25rem, 5vw, 2.5rem);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .or-logo {
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #1A1614;
        }
        .or-order-num {
          font-size: 0.75rem;
          font-weight: 500;
          color: #A8998E;
          letter-spacing: 0.06em;
        }

        /* ── Page body ── */
        .or-body {
          max-width: 520px;
          margin: 0 auto;
          padding: 2.5rem clamp(1rem, 5vw, 1.5rem) 5rem;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ── White card — the base surface ── */
        .or-card {
          background: #FDFCFA;
          border: 1.5px solid rgba(180,165,150,0.3);
          border-radius: 16px;
          overflow: hidden;
        }
        .or-card-pad { padding: 24px; }

        /* ── Section label ── */
        .or-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #A8998E;
          margin-bottom: 16px;
        }

        /* ── Status card ── */
        .or-status-inner {
          padding: 32px 24px 28px;
          text-align: center;
          border-bottom: 1.5px solid rgba(180,165,150,0.2);
        }
        .or-status-icon {
          width: 52px; height: 52px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
        }
        .or-status-icon.s-pending { background: #FEF3C7; }
        .or-status-icon.s-claimed { background: #DBEAFE; }
        .or-status-icon.s-paid    { background: #DCFCE7; }

        .or-status-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          color: #1A1614;
        }
        .or-status-sub {
          font-size: 0.875rem;
          color: #6B5D55;
          line-height: 1.6;
          max-width: 300px;
          margin: 0 auto 20px;
        }
        .or-badges {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .or-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 12px;
          border-radius: 99px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .or-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: 0.7; }
        .or-badge.b-unpaid  { background: #FEF3C7; color: #92400E; }
        .or-badge.b-paid    { background: #DCFCE7; color: #166534; }
        .or-badge.b-claimed { background: #DBEAFE; color: #1E40AF; }
        .or-badge.b-unclaimed { background: #EFE8DF; color: #6B5D55; }

        /* ── QR payment card ── */
        .or-qr-section {
          padding: 28px 24px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          border-bottom: 1.5px solid rgba(180,165,150,0.2);
        }
        .or-qr-wrap {
          width: 200px; height: 200px;
          border-radius: 14px;
          background: #fff;
          border: 1.5px solid rgba(180,165,150,0.35);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          padding: 12px;
        }
        .or-qr-wrap img {
          width: 100%; height: 100%;
          object-fit: contain;
          display: block;
        }
        /* QR placeholder when no image provided */
        .or-qr-placeholder {
          width: 100%; height: 100%;
          position: relative;
          display: flex; align-items: center; justify-content: center;
        }
        .or-qr-placeholder svg {
          width: 100%; height: 100%;
          opacity: 0.15;
        }
        .or-qr-hint {
          font-size: 0.8rem;
          color: #6B5D55;
          text-align: center;
          line-height: 1.5;
        }
        .or-qr-hint span {
          display: block;
          font-size: 0.7rem;
          color: #A8998E;
          margin-top: 3px;
          letter-spacing: 0.03em;
        }

        /* ── Amount row ── */
        .or-amount-strip {
          background: #F8F5F1;
          border-bottom: 1.5px solid rgba(180,165,150,0.2);
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .or-amount-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #A8998E;
        }
        .or-amount-val {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #1A1614;
        }

        /* ── CTA / claimed note ── */
        .or-cta-area { padding: 20px 24px 24px; }

        .or-btn {
          width: 100%; height: 52px;
          background: #1A1614;
          color: #FDFCFA;
          border: none; border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background 200ms, opacity 200ms, transform 150ms;
        }
        .or-btn:hover:not(:disabled) { background: #2d2420; }
        .or-btn:active:not(:disabled) { transform: scale(0.99); }
        .or-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .or-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .or-claimed-note {
          display: flex; align-items: flex-start; gap: 12px;
          background: #EFF6FF;
          border: 1.5px solid #BFDBFE;
          border-radius: 10px;
          padding: 14px 16px;
          font-size: 0.875rem;
          color: #1E40AF;
          line-height: 1.55;
        }
        .or-claimed-note svg { flex-shrink: 0; margin-top: 2px; }

        .or-error-note {
          background: #FEF2F2;
          border: 1.5px solid #FCA5A5;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 0.875rem;
          color: #B91C1C;
          margin-bottom: 12px;
        }

        /* ── Order line items ── */
        .or-line {
          display: flex; gap: 14px; align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid rgba(180,165,150,0.2);
        }
        .or-line:last-of-type { border-bottom: none; padding-bottom: 0; }
        .or-line:first-of-type { padding-top: 0; }

        .or-line-img {
          width: 54px; height: 54px;
          border-radius: 8px;
          background: #EFE8DF;
          border: 1px solid rgba(180,165,150,0.3);
          overflow: hidden;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .or-line-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .or-line-img-placeholder {
          width: 20px; height: 20px; opacity: 0.25;
        }

        .or-line-info { flex: 1; min-width: 0; }
        .or-line-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1A1614;
          margin-bottom: 3px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .or-line-meta {
          font-size: 0.75rem;
          color: #A8998E;
          margin-bottom: 2px;
        }
        .or-line-price {
          font-size: 0.875rem;
          font-weight: 600;
          flex-shrink: 0;
          color: #1A1614;
        }

        .or-total-row {
          display: flex; justify-content: space-between; align-items: baseline;
          padding-top: 16px;
          margin-top: 4px;
          border-top: 1.5px solid rgba(180,165,150,0.25);
        }
        .or-total-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #6B5D55;
        }
        .or-total-val {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem; font-weight: 700;
          color: #1A1614;
        }

        /* ── Shipping ── */
        .or-addr-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 20px;
        }
        @media (max-width: 400px) { .or-addr-grid { grid-template-columns: 1fr; } }

        .or-addr-field {}
        .or-addr-field-label {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #A8998E;
          margin-bottom: 4px;
        }
        .or-addr-field-val {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1A1614;
          line-height: 1.4;
        }

        /* ── Paid success strip ── */
        .or-paid-banner {
          background: #F0FDF4;
          border: 1.5px solid #BBF7D0;
          border-radius: 12px;
          padding: 20px 22px;
          display: flex; gap: 14px; align-items: flex-start;
        }
        .or-paid-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          border-radius: 50%;
          background: #DCFCE7;
          display: flex; align-items: center; justify-content: center;
        }
        .or-paid-text h3 {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem; font-weight: 700;
          color: #166534; margin-bottom: 4px;
        }
        .or-paid-text p {
          font-size: 0.8rem; color: #15803D; line-height: 1.5;
        }
      `}</style>

      <div className="or-root">


        <div className="or-body">

          {/* ── 1. Status card ── */}
          <div className="or-card">
            <div className="or-status-inner">
              <div className={`or-status-icon ${isPaid ? 's-paid' : claimed ? 's-claimed' : 's-pending'}`}>
                {isPaid ? (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4.5 11.5l4.5 4.5 9-9" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : claimed ? (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3v8m0 0l-3-3m3 3l3-3M4 17c0 2 3.1 3.5 7 3.5S18 19 18 17" stroke="#1E40AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8.5" stroke="#92400E" strokeWidth="1.6"/><path d="M11 7v4.5l3 1.5" stroke="#92400E" strokeWidth="1.6" strokeLinecap="round"/></svg>
                )}
              </div>
              <h1 className="or-status-title">
                {isPaid ? 'Payment confirmed' : claimed ? 'Transfer received' : 'Awaiting payment'}
              </h1>
              <p className="or-status-sub">
                {isPaid
                  ? 'Your order is confirmed and being prepared.'
                  : claimed
                    ? "We've received your notification. Our team is verifying — this usually takes a few hours."
                    : 'Scan the QR code below to complete your bank transfer.'}
              </p>
              <div className="or-badges">
                <span className={`or-badge ${isPaid ? 'b-paid' : 'b-unpaid'}`}>
                  <span className="or-badge-dot" />{isPaid ? 'Paid' : 'Unpaid'}
                </span>
                <span className={`or-badge ${claimed ? 'b-claimed' : 'b-unclaimed'}`}>
                  <span className="or-badge-dot" />{claimed ? 'Claimed' : 'Not yet claimed'}
                </span>
              </div>
            </div>

            {/* Paid success banner inside card */}
            {isPaid && (
              <div style={{padding: '20px 24px', borderBottom: '1.5px solid rgba(180,165,150,0.2)'}}>
                <div className="or-paid-banner">
                  <div className="or-paid-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="#166534" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="or-paid-text">
                    <h3>Order confirmed</h3>
                    <p>Confirmation sent to {order.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── 2. QR payment — only if not paid ── */}
          {!isPaid && (
            <div className="or-card">
              <div className="or-qr-section">
                <p className="or-label" style={{margin: 0}}>Scan to pay</p>
                <div className="or-qr-wrap">
                  {/* Replace src with real QRIS image URL when available */}
                  {/* <img src="/your-qr-code.png" alt="QRIS payment code" /> */}
             
                </div>
                <p className="or-qr-hint">
                  Scan with your banking app
                  <span>QRIS · all Indonesian banks supported</span>
                </p>
              </div>

              <div className="or-amount-strip">
                <span className="or-amount-label">Transfer exactly</span>
                <span className="or-amount-val">{fmtRp(total)}</span>
              </div>

              <div className="or-cta-area">
                {err && <p className="or-error-note">{err}</p>}
                {claimed ? (
                  <div className="or-claimed-note">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#1E40AF" strokeWidth="1.2"/><path d="M8 5v4M8 11h.01" stroke="#1E40AF" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    Transfer submitted — we'll confirm your payment within a few hours.
                  </div>
                ) : (
                  <button className="or-btn" onClick={handleClaim} disabled={loading}>
                    {loading ? <span className="or-spinner" /> : "I've transferred the amount"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── 3. Order items ── */}
          <div className="or-card">
            <div className="or-card-pad">
              <p className="or-label">Order summary</p>
              {order.lineItems.nodes.map((item, i) => {
                const price = parseFloat(item.originalUnitPriceSet.shopMoney.amount) * item.quantity
                const imgUrl = item.image?.url ?? item.variant?.image?.url
                const variants = item.variant?.selectedOptions
                  ?.filter(o => o.name.toLowerCase() !== 'title')
                  .map(o => o.value).join(' · ')
                return (
                  <div key={i} className="or-line">
                    <div className="or-line-img">
                      {imgUrl
                        ? <img src={imgUrl} alt={item.title} />
                        : <svg className="or-line-img-placeholder" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="2" stroke="#A8998E" strokeWidth="1.2"/><path d="M2 13l4-4 3 3 3-4 6 6" stroke="#A8998E" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      }
                    </div>
                    <div className="or-line-info">
                      <p className="or-line-name">{item.title}</p>
                      {variants && <p className="or-line-meta">{variants}</p>}
                      <p className="or-line-meta">Qty {item.quantity}</p>
                    </div>
                    <span className="or-line-price">{fmtRp(price)}</span>
                  </div>
                )
              })}
              <div className="or-total-row">
                <span className="or-total-label">Total</span>
                <span className="or-total-val">{fmtRp(total)}</span>
              </div>
            </div>
          </div>

          {/* ── 4. Shipping address ── */}
          {addr && (
            <div className="or-card">
              <div className="or-card-pad">
                <p className="or-label">Shipping to</p>
                <div className="or-addr-grid">
                  <div className="or-addr-field">
                    <p className="or-addr-field-label">Name</p>
                    <p className="or-addr-field-val">{addr.firstName} {addr.lastName}</p>
                  </div>
                  <div className="or-addr-field">
                    <p className="or-addr-field-label">City</p>
                    <p className="or-addr-field-val">{addr.city || '—'}</p>
                  </div>
                  <div className="or-addr-field" style={{gridColumn: '1 / -1'}}>
                    <p className="or-addr-field-label">Address</p>
                    <p className="or-addr-field-val">{addr.address1}</p>
                  </div>
                  {addr.province && (
                    <div className="or-addr-field">
                      <p className="or-addr-field-label">Province</p>
                      <p className="or-addr-field-val">{addr.province}</p>
                    </div>
                  )}
                  <div className="or-addr-field">
                    <p className="or-addr-field-label">ZIP</p>
                    <p className="or-addr-field-val">{addr.zip || '—'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
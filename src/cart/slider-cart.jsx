"use client";

import { formatPrice } from "@/app/product/[product_handle]/client-page";
import { cartState } from "@/cart/cart-state";
import '@/styles/cart.css'
import Image from "next/image";




function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M2 6h8"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 2v8M2 6h8"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M2 7h10M8 3l4 4-4 4"/>
    </svg>
  );
}

function CartItemRow({ item }) {
  const color = item.variant.selected_options.find(o => o.name === "Color")?.value;
  const size  = item.variant.selected_options.find(o => o.name === "Size")?.value;
  const price = formatPrice(item.variant.price, item.variant.currencyCode);

  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <Image
          src={item.variant.image.url ?? item.product.featured_image}
          alt={item.product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="pt__bg"
          style={{ objectFit: "cover", objectPosition: "center top" }}
          priority={false}
        />
      </div>
      <div className="cart-item-body">
        <span className="cart-item-name">{item.product.title}</span>
        <span className="cart-item-variants">{color} · Size {size}</span>
        <div className="cart-item-footer">
          <div className="qty-stepper">
            <button
              className="qty-btn"
              aria-label="Decrease quantity"
              onClick={() => cartState.updateQty(item.variant.id, -1)}
            >
              <MinusIcon />
            </button>
            <span className="qty-value">{item.qty}</span>
            <button
              className="qty-btn"
              aria-label="Increase quantity"
              onClick={() => cartState.updateQty(item.variant.id, +1)}
            >
              <PlusIcon />
            </button>
          </div>
          <span className="cart-item-price">{price}</span>
        </div>
      </div>

    </div>
  );
}
export default function SliderCart({  }) {
  // PREVIEW_OPEN overrides prop for design review
  const open = cartState.use('isOpen')
  const items = cartState.use('items')
  const total = cartState.use('total')
  console.log('items', items)

  return (
    <>

      {/* Backdrop */}
      <div
        className={`cart-overlay${open ? " cart-open" : ""}`}
        onClick={() => cartState.set('isOpen', false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer${open ? " cart-open" : ""}`}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >

        {/* ── Header ── */}
        <div className="cart-header">
          <div className="cart-header-left">
            <span className="cart-title">Your Cart</span>
            <span className="cart-count-badge">{items.length}</span>
          </div>
          <button className="cart-close-btn" onClick={() => cartState.set('isOpen', false)}   aria-label="Close cart">
            <CloseIcon />
          </button>
        </div>

        {/* ── Free shipping progress ── */}
       <CartShippingBar total={total} />


        {/* ── Scrollable items ── */}
        <div className="cart-items">
          {items.map(item => (
            <CartItemRow key={item.id} item={item} />
          ))}

          {/* ── You May Also Love upsell ── */}
          {/* <div style={{ padding: "var(--sp-5) var(--sp-6) var(--sp-2)", borderTop: "1px solid var(--c-border)" }}>
            <div style={{
              fontSize: "var(--fs-2xs)",
              letterSpacing: "var(--ls-widest)",
              textTransform: "uppercase",
              color: "var(--c-ink-soft)",
              fontWeight: 600,
              marginBottom: "var(--sp-3)"
            }}>
              You May Also Love
            </div>
          </div> */}
          {/* <div className="cart-upsell">
            <div className="upsell-img" />
            <div>
              <div className="upsell-label">Lumière</div>
              <div className="upsell-name">Silk Eye Mask</div>
              <div className="upsell-price">Rp 245.000</div>
            </div>
            <button className="upsell-add-btn">+ Add</button>
          </div> */}
        </div>

        {/* ── Footer ── */}
        <div className="cart-footer">

          {/* Promo code */}
          {/* <div className="promo-row">
            <input
              className="promo-input"
              type="text"
              placeholder="Gift card or promo code"
              aria-label="Promo code"
            />
            <button className="promo-apply-btn">Apply</button>
          </div> */}

          {/* Order summary */}
          <div className="cart-summary">
            {/* <div className="summary-row">
              <span>Subtotal</span>
              <span>Rp 2.185.000</span>
            </div> */}
            {/* <div className="summary-row">
              <span>Shipping</span>
              <span className="summary-shipping-note">Calculated at checkout</span>
            </div> */}
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button className="btn-checkout">
            Checkout <ArrowIcon />
          </button>

  

          {/* Trust strip */}
          <div className="cart-trust">
            <div className="trust-item">
              <span className="trust-icon">✦</span>
              <span>Secure Checkout</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">◎</span>
              <span>Free Returns</span>
            </div>
          
          </div>

        </div>
      </aside>
    </>
  );
}

// Constants — tweak thresholds to match your promos
const REWARDS = [
  { threshold: 200000,  label: "Free Shipping",  icon: "✦" },
  { threshold: 500000,  label: "Free Gift",       icon: "◈" },
  { threshold: 1000000, label: "VIP Treatment",   icon: "◎" },
];

function CartShippingBar({ total }) {
  const maxThreshold = REWARDS[REWARDS.length - 1].threshold;
  const clampedTotal = Math.min(total, maxThreshold);

  // Which reward tier are we in?
  const nextReward = REWARDS.find(r => total < r.threshold);
  const lastUnlocked = [...REWARDS].reverse().find(r => total >= r.threshold);
  const allUnlocked = total >= maxThreshold;

  const progressPct = allUnlocked ? 100 : (clampedTotal / maxThreshold) * 100;
  const amountAway = nextReward ? nextReward.threshold - total : 0;

  return (
    <div className="cart-shipping-bar">

      {/* Message */}
      <div className="cart-shipping-message">
        {allUnlocked ? (
          <span>🎉 All rewards unlocked — you're a VIP!</span>
        ) : lastUnlocked ? (
          <span>
            {lastUnlocked.icon} <strong>{lastUnlocked.label}</strong> unlocked!{" "}
            <strong>{formatPrice(amountAway)}</strong> away from {nextReward.icon} {nextReward.label}
          </span>
        ) : (
          <span>
            <strong>{formatPrice(amountAway)}</strong> away from {nextReward.icon} {nextReward.label}
          </span>
        )}
        <span className="shipping-pct">{Math.round(progressPct)}%</span>
      </div>

      {/* Track */}
      <div className="shipping-track" style={{ position: "relative" }}>

        {/* Milestone dots */}
        {REWARDS.map((r) => {
          const pos = (r.threshold / maxThreshold) * 100;
          const unlocked = total >= r.threshold;
          return (
            <div
              key={r.threshold}
              className={`milestone-dot${unlocked ? " unlocked" : ""}`}
              style={{ left: `${pos}%` }}
              title={r.label}
            >
              <span className="milestone-icon">{r.icon}</span>
            </div>
          );
        })}

        {/* Fill */}
        <div
          className={`shipping-fill${allUnlocked ? " complete" : ""}`}
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Milestone labels */}
      {/* <div className="milestone-labels">
        {REWARDS.map((r) => {
          const pos = (r.threshold / maxThreshold) * 100;
          const unlocked = total >= r.threshold;
          return (
            <div
              key={r.threshold}
              className={`milestone-label${unlocked ? " unlocked" : ""}`}
              style={{ left: `${pos}%` }}
            >
              {formatPrice(r.threshold, "IDR")}
            </div>
          );
        })}
      </div> */}

    </div>
  );
}
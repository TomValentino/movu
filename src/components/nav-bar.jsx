'use client' 
import { cartState } from "@/cart/cart-state";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Collections", href: "/collection/488234778870" },
  { label: "Shop", href: "/collection/488234778870" },
  { label: "About", href: "#" },
  { label: "Stockists", href: "#" },
];

const MEGA_CATEGORIES = [
  {
    label: "Sleepwear",
    tag: "New Season",
    href: "#",
    bg: "linear-gradient(160deg, #e8d5c4 0%, #d4b99a 100%)",
    accent: "#9A7040",
  },
  {
    label: "Intimates",
    tag: "SS 2025",
    href: "#",
    bg: "linear-gradient(160deg, #ede0d4 0%, #c9b4a0 100%)",
    accent: "#C4A07A",
  },
  {
    label: "Robes",
    tag: "Bestsellers",
    href: "#",
    bg: "linear-gradient(160deg, #ddd0c4 0%, #bfaa95 100%)",
    accent: "#9A7040",
  },
  {
    label: "Gifting",
    tag: "Curated",
    href: "#",
    bg: "linear-gradient(160deg, #e4d8ce 0%, #cdbfb0 100%)",
    accent: "#C4A07A",
  },
];

const TRUST_LINKS = [
  { label: "New Arrivals", href: "#" },
  { label: "Best Sellers", href: "#" },
  { label: "Our Story", href: "#" },
  { label: "Stockists", href: "#" },
];

const CartIcon = () => {

  const count = cartState.use('count')

  return (
  <div className="sera-cart-wrap" onClick={() => cartState.set('isOpen', true)}>
    <svg className="sera-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
    {count > 0 && <span className="sera-cart-badge">{count}</span>}
  </div>
)}

const SearchIcon = () => (
  <svg className="sera-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MenuIcon = ({ open }) => (
  <svg className={`sera-menu-svg${open ? " is-open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line className="sera-bar sera-bar--top" x1="3" y1="6" x2="21" y2="6" />
    <line className="sera-bar sera-bar--mid" x1="3" y1="12" x2="21" y2="12" />
    <line className="sera-bar sera-bar--bot" x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CategoryCard = ({ item, index }) => (
  <a href={item.href} className="sera-cat-card" style={{ background: item.bg, transitionDelay: `${index * 60}ms` }}>
    <span className="sera-cat-tag">{item.tag}</span>
    <span className="sera-cat-label">{item.label}</span>
    <span className="sera-cat-arrow" style={{ color: item.accent }}>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  </a>
);

export default function SeraNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const count = cartState.use('count')

  
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggle = () => setMenuOpen((v) => !v);
  const close = () => setMenuOpen(false);

  return (
    <>
      <style>{CSS}</style>

      <header className="sera-nav sera-nav--scrolled">
        <div className="sera-nav__inner">

          {/* Logo — always left */}
          <div style={{ height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>
                  {/* Hamburger — mobile only */}
            <button
              className="sera-icon-btn sera-menu-btn"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={toggle}
            >
              <MenuIcon open={menuOpen} />
            </button>
            <a  href="/" className="sera-nav__logo" aria-label="Séra home" onClick={close}>
                SÈRA
            </a>
          </div>
          <nav className="sera-nav__links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a  key={l.label} href={l.href} className="sera-nav__link">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop nav links — center/right, hidden on mobile */}

          {/* Right side icons */}
          <div className="sera-nav__icons">
            <button className="sera-icon-btn" aria-label="Search">
              <SearchIcon />
            </button>
            <button className="sera-icon-btn" aria-label={`Cart, ${count} items`}>
              <CartIcon count={count} />
            </button>
      
          </div>

        </div>
      </header>

      {/* Mobile Mega Menu */}
      <div ref={menuRef} className={`sera-mega${menuOpen ? " sera-mega--open" : ""}`} aria-hidden={!menuOpen}>
        <div className="sera-mega__backdrop" onClick={close} />
        <div className="sera-mega__panel">
          <section className="sera-mega__cats">
            {MEGA_CATEGORIES.map((item, i) => (
              <CategoryCard key={item.label} item={item} index={i} />
            ))}
          </section>
          <div className="sera-mega__divider" />
          <nav className="sera-mega__trust" aria-label="Quick links">
            {TRUST_LINKS.map((l, i) => (
              <a key={l.label} href={l.href} className="sera-mega__trust-link" style={{ transitionDelay: `${200 + i * 50}ms` }} onClick={close}>
                <span>{l.label}</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </nav>
          <div className="sera-mega__foot">
            <span className="sera-mega__tagline">Luxury sleepwear & intimates</span>
            <div className="sera-mega__socials">
              <a href="#" aria-label="Instagram" className="sera-mega__social-link">IG</a>
              <span className="sera-mega__social-sep">·</span>
              <a href="#" aria-label="Pinterest" className="sera-mega__social-link">PT</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CSS = `
  .sera-nav, .sera-mega {
    --font-display: 'Syne', sans-serif;
    --font-body: 'Manrope', sans-serif;
    --fs-xs: 0.75rem; --fs-sm: 0.875rem; --fs-base: 1rem;
    --fs-md: 1.125rem; --fs-lg: 1.375rem;
    --ls-wide: 0.06em; --ls-wider: 0.12em; --ls-widest: 0.22em;
    --ls-tight: -0.025em;
    --c-bg: #F8F5F1; --c-bg-warm: #EFE8DF; --c-bg-dark: #161210;
    --c-ink: #1A1614; --c-ink-mid: #6B5D55; --c-ink-soft: #A8998E;
    --c-ink-ghost: #C9BDB5; --c-accent: #C4A07A; --c-accent-deep: #9A7040;
    --c-blush: #E9D8C8; --c-white: #FDFCFA;
    --c-border: rgba(180,165,150,0.25); --c-border-mid: rgba(180,165,150,0.5);
    --ease-expo: cubic-bezier(0.16,1,0.3,1);
    --ease-smooth: cubic-bezier(0.65,0,0.35,1);
    --dur-fast: 250ms; --dur-mid: 450ms; --dur-slow: 700ms;
  }

  .sera-nav *, .sera-mega * { box-sizing: border-box; margin: 0; padding: 0; }
  .sera-nav a, .sera-mega a { text-decoration: none; }
  .sera-nav button { background: none; border: none; cursor: pointer; padding: 0; }

  /* ── Nav Bar ── */
  .sera-nav {
    position: sticky;
    top: 0; left: 0; right: 0;
    z-index: 900;
    height: 72px;
  }
  .sera-nav--scrolled {
    background: rgba(248,245,241,0.92);
    backdrop-filter: blur(12px) saturate(140%);
    -webkit-backdrop-filter: blur(12px) saturate(140%);
    box-shadow: 0 1px 0 var(--c-border);
  }

  .sera-nav__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 clamp(1.25rem, 4vw, 2.5rem);
    gap: 2rem;
  }

  /* ── Logo ── */
  .sera-nav__logo {
    font-family: var(--font-display);
    font-size: var(--fs-lg);
    font-weight: 700;
    letter-spacing: var(--ls-widest);
    color: var(--c-ink);
    white-space: nowrap;
    flex-shrink: 0;
    transition: opacity var(--dur-fast);
  }
  .sera-nav__logo:hover { opacity: 0.65; }

  /* ── Desktop Nav Links ── */
  .sera-nav__links {
    display: flex;
    margin-left: 20px;
    align-items: center;
    gap: 2rem;
    flex: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: flex-end;
  }

  .sera-nav__link {
    font-family: var(--font-body);
    font-size: var(--fs-xs);
    font-weight: 500;
    letter-spacing: var(--ls-wide);
    text-transform: uppercase;
    color: var(--c-ink);
    position: relative;
    padding-bottom: 2px;
    transition: color var(--dur-fast);
    white-space: nowrap;
        color: var(--c-ink-mid);

  }
  .sera-nav__link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: var(--c-accent);
    transition: width var(--dur-mid) var(--ease-expo);
  }
  .sera-nav__link:hover::after { width: 100%; }

  /* ── Right Icons ── */
  .sera-nav__icons {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex-shrink: 0;
    height: 100%;
  }

  .sera-icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    color: var(--c-ink);
    border-radius: 50%;
    transition: color var(--dur-fast), background var(--dur-fast);
    position: relative;
    height: 100%;

  }
  
  
  .sera-icon { width: 22px; height: 22px; display: block; }

  /* Hamburger hidden on desktop */
  .sera-menu-btn { display: none; }

  /* ── Cart Badge ── */
  .sera-cart-wrap { position: relative; display: flex; }
  .sera-cart-badge {
    position: absolute;
    top: -5px; right: -5px;
    min-width: 16px; height: 16px;
    background: var(--c-accent-deep);
    color: var(--c-white);
    font-family: var(--font-body);
    font-size: 0.6rem;
    font-weight: 700;
    border-radius: 99px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3px;
    line-height: 1;
    pointer-events: none;
  }

  /* ── Hamburger SVG ── */
  .sera-menu-svg { width: 24px; height: 24px; display: block; overflow: visible; }
  .sera-bar {
    transform-origin: center;
    transition: transform var(--dur-mid) var(--ease-expo), opacity var(--dur-fast) var(--ease-smooth);
  }
  .sera-bar--top { transform-origin: 12px 6px; }
  .sera-bar--mid { transform-origin: center; }
  .sera-bar--bot { transform-origin: 12px 18px; }
  .sera-menu-svg.is-open .sera-bar--top { transform: translateY(6px) rotate(45deg); }
  .sera-menu-svg.is-open .sera-bar--mid { opacity: 0; transform: scaleX(0); }
  .sera-menu-svg.is-open .sera-bar--bot { transform: translateY(-6px) rotate(-45deg); }

  /* ══════════════════════════════════════
     MOBILE MEGA MENU
  ══════════════════════════════════════ */
  .sera-mega {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 800;
    pointer-events: none;
  }

  .sera-mega__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(22,18,16,0);
    transition: background var(--dur-mid) var(--ease-smooth);
  }
  .sera-mega--open .sera-mega__backdrop {
    background: rgba(22,18,16,0.35);
    pointer-events: auto;
  }

  .sera-mega__panel {
    position: absolute;
    top: 64px;
    left: 0; right: 0;
    background: var(--c-bg);
    padding: 1.5rem 1.25rem 2rem;
    max-height: calc(100dvh - 64px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    transform: translateY(-12px);
    opacity: 0;
    transition: transform var(--dur-slow) var(--ease-expo), opacity var(--dur-mid) var(--ease-smooth);
    pointer-events: none;
    will-change: transform, opacity;
    box-shadow: 0 24px 48px -12px rgba(22,18,16,0.18);
  }
  .sera-mega--open .sera-mega__panel {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .sera-mega__cats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
    margin-bottom: 1.5rem;
  }

  .sera-cat-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 0.875rem;
    border-radius: 10px;
    min-height: 110px;
    overflow: hidden;
    transition: transform var(--dur-fast) var(--ease-expo), box-shadow var(--dur-fast) var(--ease-expo), opacity var(--dur-mid) var(--ease-expo);
    opacity: 0;
    transform: translateY(10px);
  }
  .sera-mega--open .sera-cat-card { opacity: 1; transform: translateY(0); }
  .sera-cat-card:active { transform: scale(0.97); }

  .sera-cat-tag {
    font-family: var(--font-body);
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: var(--ls-widest);
    text-transform: uppercase;
    color: var(--c-ink-mid);
    display: block;
  }
  .sera-cat-label {
    font-family: var(--font-display);
    font-size: var(--fs-md);
    font-weight: 700;
    letter-spacing: var(--ls-tight);
    color: var(--c-ink);
    display: block;
    margin-top: auto;
    padding-top: 1.5rem;
  }
  .sera-cat-arrow {
    position: absolute;
    bottom: 0.875rem; right: 0.875rem;
    width: 22px; height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform var(--dur-fast) var(--ease-expo);
  }
  .sera-cat-arrow svg { width: 16px; height: 16px; display: block; }
  .sera-cat-card:hover .sera-cat-arrow { transform: translate(3px, -3px); }

  .sera-mega__divider { height: 1px; background: var(--c-border-mid); margin-bottom: 1.25rem; }

  .sera-mega__trust { display: flex; flex-direction: column; gap: 0; margin-bottom: 1.75rem; }
  .sera-mega__trust-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--c-border);
    font-family: var(--font-body);
    font-size: var(--fs-sm);
    font-weight: 500;
    letter-spacing: var(--ls-wide);
    text-transform: uppercase;
    color: var(--c-ink-mid);
    transition: color var(--dur-fast), opacity var(--dur-mid) var(--ease-expo);
    opacity: 0;
  }
  .sera-mega--open .sera-mega__trust-link { opacity: 1; }
  .sera-mega__trust-link svg { width: 14px; height: 14px; flex-shrink: 0; transition: transform var(--dur-fast) var(--ease-expo); }
  .sera-mega__trust-link:hover { color: var(--c-ink); }
  .sera-mega__trust-link:hover svg { transform: translateX(4px); }

  .sera-mega__foot { display: flex; align-items: center; justify-content: space-between; }
  .sera-mega__tagline {
    font-family: var(--font-body);
    font-size: var(--fs-xs);
    color: var(--c-ink-ghost);
    font-style: italic;
  }
  .sera-mega__socials { display: flex; align-items: center; gap: 0.5rem; }
  .sera-mega__social-link {
    font-family: var(--font-body);
    font-size: var(--fs-xs);
    font-weight: 600;
    letter-spacing: var(--ls-wider);
    color: var(--c-ink-soft);
    transition: color var(--dur-fast);
  }
  .sera-mega__social-link:hover { color: var(--c-accent-deep); }
  .sera-mega__social-sep { color: var(--c-ink-ghost); }

  /* ══════════════════════════════════════
     RESPONSIVE
  ══════════════════════════════════════ */
  @media (max-width: 768px) {
    /* Hide desktop nav links, show hamburger */
    .sera-nav__links { display: none; }
    .sera-menu-btn { display: flex; }

    /* Show mega menu */
    .sera-mega { display: block; }
  }

  @supports (height: 100dvh) {
    .sera-mega__panel { max-height: calc(100dvh - 64px); }
  }
`;
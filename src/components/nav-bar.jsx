'use client'
import { cartState } from "@/cart/cart-state";
import { useState, useEffect, useRef } from "react";
import '@/styles/nav.css'
import Image from "next/image";

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
    href: "/collection/488966979830",
    img: "/influencer-2.png",
  },
  {
    label: "Intimates",
    tag: "SS 2025",
    href: "/collection/488967012598",
    img: "/influencer-1.png",
  },
  {
    label: "Pajamas",
    tag: "Bestsellers",
    href: "/collection/488865530102",
    img: "/influencer-3.png",
  },
  {
    label: "Bustiers",
    tag: "Curated",
    href: "/collection/488967110902",
    img: "/influencer-2.png",
  },
];

const TRUST_LINKS = [
  { label: "New Arrivals", href: "#" },
  { label: "Best Sellers", href: "#" },
];

export default function SeraNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const count = cartState.use('count');

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggle = () => setMenuOpen((v) => !v);
  const close = () => setMenuOpen(false);

  return (
    <>
      <header className="sera-nav sera-nav--scrolled">
        <div className="sera-nav__inner">

          <div style={{ height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <button
              className="sera-icon-btn sera-menu-btn"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={toggle}
            >
              <MenuIcon open={menuOpen} />
            </button>
            <a href="/" className="sera-nav__logo" aria-label="Séra home" onClick={close}>
              LUMÈRA
            </a>
          </div>

          <nav className="sera-nav__links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="sera-nav__link">
                {l.label}
              </a>
            ))}
          </nav>

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

          {/* Full-bleed image category grid */}
          <section className="sera-mega__cats">
            {MEGA_CATEGORIES.map((item) => (
              <CategoryCard key={item.label} item={item} />
            ))}
          </section>

          {/* Quick links */}
          <div className="sera-mega__divider" />
          <nav className="sera-mega__trust" aria-label="Quick links">
            {TRUST_LINKS.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                className="sera-mega__trust-link"
                style={{ transitionDelay: `${180 + i * 50}ms` }}
                onClick={close}
              >
                <span>{l.label}</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </nav>

          {/* Instagram CTA */}
          <div className="sera-mega__ig">
            <div className="sera-mega__ig-info">
              <div className="sera-mega__ig-icon" aria-hidden="true">
                <InstagramIcon />
              </div>
              <div className="sera-mega__ig-text">
                <span className="sera-mega__ig-handle">@seratheLabel</span>
                <span className="sera-mega__ig-sub">Follow us on Instagram</span>
              </div>
            </div>
            <a
              href="https://instagram.com/seratheLabel"
              target="_blank"
              rel="noopener noreferrer"
              className="sera-mega__ig-btn"
              aria-label="Follow Séra on Instagram"
            >
              Follow
            </a>
          </div>

          {/* Footer */}
          <div className="sera-mega__foot">
            <span className="sera-mega__tagline">Luxury sleepwear &amp; intimates</span>
          </div>

        </div>
      </div>
    </>
  );
}


const CartIcon = () => {
  const count = cartState.use('count');
  return (
    <div className="sera-cart-wrap" onClick={() => cartState.set('isOpen', true)}>
      <svg className="sera-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {count > 0 && <span className="sera-cart-badge">{count}</span>}
    </div>
  );
};

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

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const CategoryCard = ({ item }) => (
  <a href={item.href} className="sera-cat-card">
    <Image
      src={item.img}
      alt={item.label}
      fill
      sizes="(max-width: 500px) 50vw, 25vw"
      className="sera-cat-img"
      quality={90}
      priority
    />
    {/* arrow top-right */}
    <span className="sera-cat-arrow" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" strokeWidth="1.4">
        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
    {/* label bottom-left, over scrim */}
    <div className="sera-cat-body">
      <span className="sera-cat-tag">{item.tag}</span>
      <span className="sera-cat-label">{item.label}</span>
    </div>
  </a>
);
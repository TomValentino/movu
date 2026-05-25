import Image from 'next/image';
import Link from 'next/link';

// ─── PLACEHOLDER HELPER ───────────────────────────────────────────────────────
const Placeholder = ({ label }) => (
  <div style={{
    position: 'absolute', inset: 0,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: '10px',
  }}>
    <div className="img-ph" />
    <span className="img-ph-label">{label}</span>
  </div>
);

 

// ─── SECTION: HERO ────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <p className="hero-eyebrow">New Season — SS 2026</p>
        <h1 className="hero-heading">
          Worn for<br />
          the quiet<br />
          <em>hours.</em>
        </h1>
        <p className="hero-sub">
          Luxury sleepwear and intimates designed for the Indonesian woman. Softness, refined.
        </p>
        <div className="hero-ctas">
          <a href="#collections" className="btn-primary">Explore Garments</a>
          <a href="/collection/488234778870" className="hero-btn">Browse pieces</a>
        </div>
        <div className="hero-scroll-hint">
          <span className="scroll-line" />
          Scroll 

        </div>
      </div>
        <div className="hero-img">
          <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src="/hero.png" alt="" />
        </div>

    </section>
  );
}

// ─── SECTION: PROOF / CLIENT SHOTS ────────────────────────────────────────────
export function ProofStrip() {
  const cards = [
    { img: "https://midnightmuseclub.shop/cdn/shop/files/IMG_9756.jpg?v=1779012827&width=600", alt: "" },
    { img: "https://midnightmuseclub.shop/cdn/shop/files/IMG_9755.jpg?v=1779012827&width=600", alt: "" },
    {  img: "https://midnightmuseclub.shop/cdn/shop/files/IMG_9758.jpg?v=1779013269&width=600", alt: "" },
    {  img: "https://midnightmuseclub.shop/cdn/shop/files/IMG_9757.jpg?v=1779012828&width=600", alt: "" },
  ];

  return (
    <section className="proof-strip">
      <div className="proof-strip-inner">
        <p className="proof-eyebrow">As worn by our community</p>
        <div className="proof-grid">
          {cards.map((c, i) => (
            <a
              href="https://www.instagram.com/midnightmuseclub"
              target="_blank"
              rel="noopener noreferrer"
              className="proof-card"
              key={i}
            >
        

              {/* Photo */}
              <Image
                src={c.img}
                alt={c.alt}
                width={300}
                height={375}
                sizes="(max-width: 500px) 50vw, 25vw"
                className="proof-card-img"
                quality={80}
              />

              {/* Hover overlay — Instagram-feel */}
              <div className="proof-card-overlay">
                <div className="proof-card-overlay-inner">
                  <div className="proof-ig-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span className="proof-ig-cta">View on Instagram</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="proof-stat">
          <div className="stat-item">
            <span className="stat-num">32,000+</span>
            <span className="stat-label">Happy customers</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">4.9</span>
            <span className="stat-label">Average rating</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">120,000+</span>
            <span className="stat-label">Units delivered</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: COLLECTIONS ─────────────────────────────────────────────────────
export function Collections() {
  const cols = [
    { name: 'Browse All',  url: "/collection/488234778870", count: '146 pieces', img: '/influencer-1.png' },
    { name: 'Sleepwear',   url: "/collection/488966979830", count: '12 pieces',  img: 'https://cdn.shopify.com/s/files/1/0772/8241/0742/collections/IMG-1295.jpg?v=1779016835' },
    { name: 'Intimates',   url: "/collection/488967012598", count: '9 pieces',   img: '/influencer-3.png' },
    { name: 'Bodysuits',   url: "/collection/488967045366", count: '9 pieces',   img: 'https://cdn.shopify.com/s/files/1/0772/8241/0742/collections/7DC7502D-8C43-4EE0-81ED-A420DDA31FCC.jpg?v=1778843404' },
    { name: 'Bustiers',    url: "/collection/488967110902", count: '9 pieces',   img: '/influencer-2.png' },
    { name: 'Pajamas',     url: "/collection/488865530102", count: '9 pieces',   img: '/influencer-2.png' },
  ];

  return (
    <section className="collections" id="collections">
      <div className="collections-inner">
        <div className="section-header">
          <h2 className="section-title">Browse</h2>
          <a href="/collection/488234778870" className="section-link">All collections →</a>
        </div>
        <div className="collections-grid">
          {cols.map((col, i) => (
            <a href={col.url} className="col-card" key={i}>
              <Image
                src={col.img}
                alt={col.name}
                fill
                sizes="(max-width: 600px) 50vw, 33vw"
                className="col-card-img"
                quality={80}
              />
              <div className="col-card-meta">
                <div className="col-card-meta-inner">
                  <span className="col-count">{col.count}</span>
                  <span className="col-name">{col.name}</span>
                </div>
                <div className="col-card-arrow" >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─── SECTION: QUOTE + REVIEWS ─────────────────────────────────────────────────
export function MoreProof() {
  const reviews = [
    { body: 'The softest thing I have ever worn. I ordered twice in the same week.', author: 'Anindya R. — Jakarta', stars: '★★★★★' },
    { body: 'Worth every rupiah. The quality speaks for itself — so different from anything else.', author: 'Sari W. — Surabaya', stars: '★★★★★' },
    { body: 'Finally a local brand that feels truly luxurious. My go-to gift for everyone.', author: 'Dewi A. — Bali', stars: '★★★★★' },
  ];
  return (
    <section className="quote-section">
      <span className="quote-bg-text">MIDNIGHT</span>
      <p className="quote-eyebrow">What our customers say</p>
      <h2 className="quote-text">"Made to be felt, not just seen."</h2>
      <div className="divider" style={{ background: 'rgba(196,160,122,0.35)' }} />
      <div className="quote-reviews">
        {reviews.map((r, i) => (
          <div className="review-card" key={i}>
            <div className="review-stars">{r.stars}</div>
            <p className="review-body">{r.body}</p>
            <span className="review-author">{r.author}</span>
          </div>
        ))}
      </div>
    </section>
  );
}


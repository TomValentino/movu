'use client';

import { useState, useEffect, useRef } from 'react';
import './page.css'
// ─── NAV ────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav>
      <a href="#" className="nav-logo">Ashworth<span>.</span></a>
      <ul className="nav-links">
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#details">Details</a></li>
        <li><a href="#floorplan">Floor Plan</a></li>
        <li><a href="#location">Location</a></li>
      </ul>
      <a href="#enquire" className="nav-cta">Enquire Now</a>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero">
      <div className="hero-image-wrap">
        <div className="hero-badge">
          <div className="badge-dot" />
          <span className="badge-text">Listing Active</span>
        </div>
        {/* SVG placeholder — replace with real image */}
        <div style={{ width: '100%', height: '100%', background: '#0f0f0e' }} />
      </div>

      <div className="hero-content">
        <div className="overline">Exclusive Listing — Ref #AW-2024</div>
        <h1 className="hero-title">24 Ashworth</h1>
        <h2 className="hero-subtitle">Crescent.</h2>
        <p className="hero-desc">
          A rare penthouse collection redefining the skyline. Panoramic views, bespoke interiors,
          and a level of craftsmanship rarely available on the open market.
        </p>

        <div className="hero-price-row">
          <div>
            <div className="price-label">Guide Price</div>
            <div className="price-amount">$4,850,000</div>
          </div>
          <div className="stat-divider" />
          <div>
            <div className="price-label">Est. Rental Yield</div>
            <div className="price-amount" style={{ color: 'var(--accent-primary)' }}>5.8%</div>
            <div className="price-per">per annum</div>
          </div>
        </div>

        <div className="hero-stats">
          {[
            { val: '4', label: 'Bedrooms' },
            { val: '3', label: 'Bathrooms' },
            { val: '3,240', label: 'Sq Ft' },
            { val: '32F', label: 'Floor' },
          ].map(({ val, label }, i) => (
            <>
              {i > 0 && <div key={`div-${label}`} className="stat-divider" />}
              <div key={label} className="stat-item">
                <div className="stat-val">{val}</div>
                <div className="stat-label">{label}</div>
              </div>
            </>
          ))}
        </div>

        <div className="cta-row">
          <a href="#enquire" className="btn-primary">Book Private Viewing</a>
          <a href="#gallery" className="btn-secondary">View Gallery</a>
        </div>
      </div>
    </section>
  );
}

// ─── TRUST BAR ───────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  {
    label: 'Title Guaranteed',
    icon: <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  },
  {
    label: 'Full Legal Pack Available',
    icon: <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
  },
  {
    label: '24hr Response Guarantee',
    icon: <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  },
  {
    label: '17 Registered Buyers',
    icon: <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
];

function TrustBar() {
  return (
    <div className="trust-bar">
      {TRUST_ITEMS.map(({ label, icon }, i) => (
        <>
          {i > 0 && <div key={`div-${label}`} className="trust-divider" />}
          <div key={label} className="trust-item">
            {icon}
            <span className="trust-text">{label}</span>
          </div>
        </>
      ))}
    </div>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────

const GALLERY_ITEMS = [
  { label: '42 Photos', className: '' },
  { label: 'Kitchen', className: '' },
  { label: 'Master Bath', className: '' },
  { label: 'Private Terrace', className: '' },
  { label: 'Master Bedroom', className: '' },
];

function Gallery() {
  return (
    <section className="gallery-section" id="gallery">
      <div className="section-header reveal">
        <div>
          <div className="section-tag">Visual Tour</div>
          <h2 className="section-title">Property Gallery</h2>
        </div>
        <a href="#" className="section-link">View All 42 Photos →</a>
      </div>

      <div className="gallery-grid reveal">
        {GALLERY_ITEMS.map(({ label }) => (
          <div key={label} className="gallery-item">
            <div className="gallery-overlay" />
            {/* Replace with <Image> or real content */}
            <div style={{ width: '100%', height: '100%', background: '#111010' }} />
            <span className="gallery-count">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── DETAILS + SIDEBAR ───────────────────────────────────────────────────────

const FEATURES = [
  {
    name: 'Full Floor Residency',
    desc: 'Sole occupancy of level 32 with private lift access and dedicated lobby.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  },
  {
    name: '360° Panoramic Views',
    desc: 'Floor-to-ceiling glazing capturing city, harbour, and mountain vistas.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  },
  {
    name: 'Bespoke Interiors',
    desc: 'Custom-designed by Maison André — featuring Calacatta marble and aged oak.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  },
  {
    name: 'Private Terrace 820 sqft',
    desc: 'A fully landscaped wraparound terrace with integrated outdoor kitchen.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg>,
  },
  {
    name: 'Smart Home Integrated',
    desc: 'Crestron automation controlling climate, lighting, security and AV systems.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  },
  {
    name: '3 Secured Car Bays',
    desc: 'Dedicated basement parking with EV charging stations pre-installed.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  },
];

const BUYER_OPTIONS = [
  'Cash Buyer — Ready to Proceed',
  'Finance Pre-Approved',
  'Subject to Finance',
  'Exploring / Research Phase',
];

const VIEWING_OPTIONS = [
  'Weekday Morning (9am–12pm)',
  'Weekday Afternoon (12pm–5pm)',
  'Weekend Morning',
  'Weekend Afternoon',
  'Private Evening (By Request)',
];

function EnquirySidebar() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="sidebar-card">
      <div className="sidebar-label">Guide Price</div>
      <div className="sidebar-price">$4.85M</div>
      <div className="sidebar-price-note">Expressions of interest by 14 June 2025</div>

      {[
        { label: 'Full Name', type: 'text', placeholder: 'Your full name' },
        { label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
        { label: 'Phone Number', type: 'tel', placeholder: '+1 (000) 000-0000' },
      ].map(({ label, type, placeholder }) => (
        <div key={label} className="form-group">
          <label className="form-label">{label}</label>
          <input type={type} className="form-input" placeholder={placeholder} />
        </div>
      ))}

      <div className="form-group">
        <label className="form-label">Buyer Status</label>
        <select className="form-select form-input">
          <option value="" disabled>Select your position</option>
          {BUYER_OPTIONS.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Preferred Viewing</label>
        <select className="form-select form-input">
          <option value="" disabled>Select time preference</option>
          {VIEWING_OPTIONS.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>

      <button
        className="form-submit"
        onClick={handleSubmit}
        style={submitted ? { background: '#1e2a1e', color: '#5ecb6e' } : {}}
      >
        {submitted ? 'Enquiry Sent ✓' : 'Request Private Viewing'}
      </button>

      <p className="form-note">Your enquiry is confidential. We typically respond within 2 business hours.</p>

      <div className="agent-row">
        <div className="agent-avatar">
          <svg viewBox="0 0 48 48" width="48" height="48">
            <rect width="48" height="48" fill="#222018" />
            <circle cx="24" cy="18" r="10" fill="#2a2520" />
            <ellipse cx="24" cy="44" rx="16" ry="10" fill="#2a2520" />
          </svg>
        </div>
        <div className="agent-info">
          <div className="agent-name">Victoria Laurent</div>
          <div className="agent-title">Senior Property Advisor</div>
        </div>
        <a href="tel:+10001112222" className="agent-phone">+1 000 111 2222</a>
      </div>
    </div>
  );
}

function Details() {
  return (
    <section className="details-section" id="details">
      <div className="details-main">
        <div className="section-tag reveal">Property Details</div>
        <h2 className="section-title reveal">Crafted for the<br />Discerning Few.</h2>
        <p className="reveal" style={{ color: 'var(--text-secondary)', lineHeight: 'var(--leading-loose)', letterSpacing: 'var(--tracking-mid)', marginTop: 24, maxWidth: 560, fontSize: 'var(--text-md1)' }}>
          Occupying the entire 32nd floor, this exceptional residence offers an unparalleled living
          experience. Every surface has been selected by award-winning interior architects, with
          materials sourced from Italy, Japan, and Scandinavia.
        </p>
        <div className="features-grid reveal">
          {FEATURES.map(({ name, desc, icon }) => (
            <div key={name} className="feature-item">
              <div className="feature-icon-wrap">{icon}</div>
              <div className="feature-name">{name}</div>
              <div className="feature-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="details-sidebar" id="enquire">
        <EnquirySidebar />
      </div>
    </section>
  );
}

// ─── FLOOR PLAN ──────────────────────────────────────────────────────────────

const ROOMS = [
  { name: 'Master Suite', width: '100%', size: '820 sqft' },
  { name: 'Living / Dining', width: '90%', size: '740 sqft' },
  { name: 'Private Terrace', width: '100%', size: '820 sqft' },
  { name: 'Kitchen / Scullery', width: '65%', size: '320 sqft' },
  { name: 'Bedroom 2', width: '50%', size: '280 sqft' },
  { name: 'Bedroom 3', width: '42%', size: '220 sqft' },
  { name: 'Study / Library', width: '35%', size: '180 sqft' },
  { name: 'Total Internal', width: '100%', size: '3,240 sqft', accent: true },
];

function FloorPlan() {
  const barsRef = useRef(null);

  useEffect(() => {
    const bars = barsRef.current?.querySelectorAll('.room-bar');
    if (!bars) return;

    const targets = Array.from(bars).map(bar => {
      const w = bar.style.width;
      bar.style.width = '0%';
      return { bar, target: w };
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          targets.forEach(({ bar, target }) => {
            bar.style.transition = 'width 0.8s ease';
            bar.style.width = target;
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    if (barsRef.current) observer.observe(barsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="floorplan-section" id="floorplan">
      <div className="section-tag reveal">32nd Floor</div>
      <h2 className="section-title reveal">Floor Plan &amp; Room Dimensions</h2>

      <div className="floorplan-wrap">
        <div className="floorplan-svg-wrap reveal">
          {/* SVG placeholder — replace with real floor plan */}
          <div style={{ width: '100%', aspectRatio: '1', background: '#111', borderRadius: 2 }} />
        </div>

        <div className="floorplan-rooms reveal" ref={barsRef}>
          <h3 style={{ fontFamily: 'var(--heading)', fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)', marginBottom: 32 }}>
            Room Breakdown
          </h3>
          {ROOMS.map(({ name, width, size, accent }) => (
            <div key={name} className="room-row">
              <div className="room-name">{name}</div>
              <div className="room-bar-wrap">
                <div
                  className="room-bar"
                  style={{ width, ...(accent ? { background: 'var(--accent-primary)' } : {}) }}
                />
              </div>
              <div className="room-size" style={accent ? { color: 'var(--accent-primary)', fontWeight: 500 } : {}}>
                {size}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LOCATION ────────────────────────────────────────────────────────────────

const NEARBY = [
  { name: 'Michelin-Starred Restaurant Row', dist: '180m walk' },
  { name: 'City Botanical Gardens', dist: '400m walk' },
  { name: 'Central Train Station', dist: '600m walk' },
  { name: 'International Airport', dist: '22 min drive' },
  { name: 'Premium Private School', dist: '1.2km' },
  { name: 'Harbour Foreshore', dist: '800m walk', muted: true },
];

function Location() {
  return (
    <section className="location-section" id="location">
      <div className="location-content">
        <div className="section-tag reveal">Location</div>
        <h2 className="section-title reveal">Everything<br />Within Reach.</h2>
        <p className="reveal" style={{ color: 'var(--text-secondary)', marginTop: 20, fontSize: 'var(--text-md1)', letterSpacing: 'var(--tracking-mid)', lineHeight: 'var(--leading-loose)' }}>
          Positioned at the apex of Ashworth Crescent — the most prestigious address in the precinct
          — with immediate access to the city's finest cultural and culinary institutions.
        </p>

        <div className="location-nearby reveal">
          {NEARBY.map(({ name, dist, muted }) => (
            <div key={name} className="nearby-item">
              <div className="nearby-left">
                <div className="nearby-dot" style={muted ? { background: 'var(--text-muted)' } : {}} />
                <span className="nearby-name">{name}</span>
              </div>
              <span className="nearby-dist">{dist}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="location-map">
        {/* SVG placeholder — replace with real map */}
        <div style={{ width: '100%', height: '100%', background: '#0f0e0c' }} />
      </div>
    </section>
  );
}

// ─── TESTIMONIAL ─────────────────────────────────────────────────────────────

function Testimonial() {
  return (
    <section className="testimonial-section">
      <div className="stars">
        {[...Array(5)].map((_, i) => <span key={i} className="star">★</span>)}
      </div>
      <p className="testimonial-quote reveal">
        The team handled our acquisition with a discretion and professionalism we'd never experienced
        before. From first enquiry to settlement, every detail was managed immaculately.
      </p>
      <div className="testimonial-author">
        <div className="testimonial-avatar">
          <svg viewBox="0 0 44 44">
            <rect width="44" height="44" fill="#222018" />
            <circle cx="22" cy="16" r="9" fill="#2a2520" />
            <ellipse cx="22" cy="40" rx="14" ry="9" fill="#2a2520" />
          </svg>
        </div>
        <div className="author-info">
          <div className="author-name">Jonathan &amp; Elise Park</div>
          <div className="author-role">Previous Clients — Penthouse B, 2023</div>
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ───────────────────────────────────────────────────────────────

function FinalCta() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section className="final-cta">
      <div>
        <div className="urgency-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
          </svg>
          <span className="urgency-text">Expressions of Interest Close — 14 June 2025</span>
        </div>

        <h2 className="final-cta-title">Secure Your<br /><em>Viewing Today.</em></h2>
        <p className="final-cta-desc">
          Properties of this calibre rarely reach the open market. A private inspection can be
          arranged at your convenience, including outside of standard hours.
        </p>

        <div className="final-cta-actions">
          <a href="#enquire" className="btn-primary">Book Private Viewing</a>
          <a href="tel:+10001112222" className="btn-secondary">Call Direct</a>
        </div>

        <div className="social-proof">
          <div className="avatars-stack">
            {['#222018', '#1e2018', '#221e18'].map((fill, i) => (
              <div key={i} className="avatar-sm">
                <svg viewBox="0 0 32 32">
                  <rect width="32" height="32" rx="16" fill={fill} />
                  <circle cx="16" cy="12" r="7" fill="#2a2520" />
                  <ellipse cx="16" cy="30" rx="11" ry="7" fill="#2a2520" />
                </svg>
              </div>
            ))}
          </div>
          <p className="proof-text"><strong>17 registered buyers</strong> have expressed interest this week.</p>
        </div>
      </div>

      <div style={{ background: 'var(--background-muted)', border: '1px solid var(--border-default)', padding: 48 }}>
        <div className="sidebar-label" style={{ marginBottom: 24 }}>Quick Enquiry</div>
        {[
          { label: 'Name', type: 'text', placeholder: 'Your name' },
          { label: 'Email', type: 'email', placeholder: 'your@email.com' },
          { label: 'Phone', type: 'tel', placeholder: '+1 (000) 000-0000' },
        ].map(({ label, type, placeholder }) => (
          <div key={label} className="form-group">
            <label className="form-label">{label}</label>
            <input type={type} className="form-input" placeholder={placeholder} />
          </div>
        ))}
        <div className="form-group">
          <label className="form-label">Message (Optional)</label>
          <textarea className="form-input" rows={3} placeholder="Any questions or specific requirements..." style={{ resize: 'vertical', fontFamily: 'var(--body)' }} />
        </div>
        <button
          className="form-submit"
          onClick={handleSubmit}
          style={submitted ? { background: '#1e2a1e', color: '#5ecb6e' } : {}}
        >
          {submitted ? 'Sent ✓' : 'Send Enquiry →'}
        </button>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer>
      <div className="footer-logo">Ashworth<span>.</span> Residences</div>
      <ul className="footer-links">
        {['Privacy Policy', 'Disclaimer', 'Agent Licence', 'Contact'].map(link => (
          <li key={link}><a href="#">{link}</a></li>
        ))}
      </ul>
      <div className="footer-copy">© 2025 Ashworth Residences. All rights reserved.</div>
    </footer>
  );
}

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function AshworthPage() {
  useScrollReveal();

  return (
    <>
      <Nav />
      <Hero />
      <TrustBar />
      <Gallery />
      <Details />
      <FloorPlan />
      <Location />
      <Testimonial />
      <FinalCta />
      <Footer />
    </>
  );
}
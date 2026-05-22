'use client'

import { useState } from 'react';
import './page.css'
function Nav() {
  return (
    <nav>
      <a href="#" className="nav-logo">
        Meridian<span>.</span>Estate
      </a>
      <ul className="nav-links">
        <li><a href="#about">Overview</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#floorplan">Floor Plan</a></li>
        <li><a href="#location">Location</a></li>
      </ul>
      <a href="#contact" className="nav-cta">Schedule Viewing</a>
    </nav>
  );
}const HeroImageGrid = () => (


  <div className="hero-image-grid">
    <div className="img-main">
      <svg className="img-scene" viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c5cfe0" />
            <stop offset="100%" stopColor="#e8ede8" />
          </linearGradient>
          <linearGradient id="facade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d6cfc4" />
            <stop offset="100%" stopColor="#c2b9ae" />
          </linearGradient>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a8bcd4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7098b8" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <rect width="800" height="480" fill="url(#sky)" />
        <rect x="0" y="200" width="800" height="280" fill="#e0dbd4" opacity="0.4" />
        <rect x="60" y="160" width="80" height="320" fill="#bbb3aa" opacity="0.3" rx="2" />
        <rect x="600" y="140" width="100" height="340" fill="#bbb3aa" opacity="0.25" rx="2" />
        <rect x="700" y="180" width="60" height="300" fill="#bbb3aa" opacity="0.2" rx="2" />
        <rect x="220" y="40" width="360" height="440" fill="url(#facade)" rx="2" />
        <g opacity="0.75">
          {[60, 126, 192, 258].map((y) => (
            <>
              <rect key={`g1-${y}`} x="240" y={y} width="76" height="52" fill="url(#glass)" rx="1" />
              <rect key={`g2-${y}`} x="330" y={y} width="76" height="52" fill="url(#glass)" rx="1" />
              <rect key={`g3-${y}`} x="420" y={y} width="76" height="52" fill="url(#glass)" rx="1" />
              <rect key={`g4-${y}`} x="510" y={y} width="52" height="52" fill="url(#glass)" rx="1" />
            </>
          ))}
        </g>
        <rect x="230" y="48" width="342" height="68" fill="#f0ebdf" opacity="0.5" rx="1" />
        <rect x="230" y="48" width="342" height="3" fill="#5B6EA6" opacity="0.6" />
        <rect x="0" y="420" width="800" height="60" fill="#d4cec8" />
        <rect x="0" y="380" width="800" height="40" fill="#b8c8d8" opacity="0.25" />
      </svg>
      <div className="img-overlay" />
      <div className="img-badge">New Listing</div>
    </div>
 
    <div className="img-thumb">
      <svg className="img-scene" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ minHeight: 200 }}>
        <defs>
          <linearGradient id="lr-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0ebe3" />
            <stop offset="100%" stopColor="#e0d9cf" />
          </linearGradient>
        </defs>
        <rect width="400" height="280" fill="url(#lr-bg)" />
        <rect x="0" y="210" width="400" height="70" fill="#c8b89a" />
        <rect x="0" y="0" width="400" height="210" fill="#ede8df" />
        <rect x="20" y="20" width="160" height="180" fill="#e4ddd4" rx="2" opacity="0.5" />
        <rect x="220" y="20" width="160" height="180" fill="#e4ddd4" rx="2" opacity="0.5" />
        <rect x="140" y="0" width="120" height="200" fill="#b8cedd" opacity="0.6" />
        <line x1="200" y1="0" x2="200" y2="200" stroke="#a0b2c2" strokeWidth="2" />
        <rect x="80" y="170" width="240" height="50" fill="#c4b8aa" rx="4" />
        <rect x="80" y="155" width="240" height="22" fill="#d0c4b6" rx="2" />
        <rect x="80" y="155" width="22" height="65" fill="#c4b8aa" rx="2" />
        <rect x="298" y="155" width="22" height="65" fill="#c4b8aa" rx="2" />
        <rect x="150" y="215" width="100" height="8" fill="#9e8e7a" rx="1" />
        <ellipse cx="200" cy="120" rx="100" ry="60" fill="white" opacity="0.08" />
      </svg>
      <div className="img-overlay" />
      <div className="g-label">Living Room</div>
    </div>
 
    <div className="img-thumb">
      <svg className="img-scene" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ minHeight: 200 }}>
        <rect width="400" height="280" fill="#e8e2da" />
        <rect x="0" y="40" width="400" height="80" fill="#d8d0c4" rx="1" />
        <line x1="133" y1="40" x2="133" y2="120" stroke="#cac2b6" strokeWidth="1" />
        <line x1="267" y1="40" x2="267" y2="120" stroke="#cac2b6" strokeWidth="1" />
        <rect x="0" y="170" width="400" height="20" fill="#a89880" rx="1" />
        <rect x="0" y="190" width="400" height="90" fill="#c8c0b4" />
        <line x1="133" y1="190" x2="133" y2="280" stroke="#bab2a6" strokeWidth="1" />
        <line x1="267" y1="190" x2="267" y2="280" stroke="#bab2a6" strokeWidth="1" />
        <rect x="0" y="120" width="400" height="50" fill="#d4cdc6" />
        <g opacity="0.4">
          {[130, 140, 150, 160].map((y) => (
            <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#b8b2ac" strokeWidth="0.5" />
          ))}
          {[80, 160, 240, 320].map((x) => (
            <line key={x} x1={x} y1="120" x2={x} y2="170" stroke="#b8b2ac" strokeWidth="0.5" />
          ))}
        </g>
        <circle cx="160" cy="30" r="14" fill="#e0d8cc" stroke="#c8c0b4" strokeWidth="1.5" />
        <circle cx="240" cy="30" r="14" fill="#e0d8cc" stroke="#c8c0b4" strokeWidth="1.5" />
        <line x1="160" y1="0" x2="160" y2="16" stroke="#b0a898" strokeWidth="1.5" />
        <line x1="240" y1="0" x2="240" y2="16" stroke="#b0a898" strokeWidth="1.5" />
      </svg>
      <div className="img-overlay" />
      <div className="g-label">Chef's Kitchen</div>
    </div>
  </div>
);
 
function Hero() {
  return (
    <section className="hero" style={{ padding: 0, marginTop: 80 }}>
      <div className="hero-left">
        <div className="hero-eyebrow">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">Exclusive New Listing</span>
        </div>
 
        <h1 className="hero-title">The Meridian</h1>
        <p className="hero-subtitle">Penthouse Collection</p>
 
        <div className="hero-address">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1C4.79 1 3 2.79 3 5C3 8 7 13 7 13C7 13 11 8 11 5C11 2.79 9.21 1 7 1ZM7 6.5C6.17 6.5 5.5 5.83 5.5 5C5.5 4.17 6.17 3.5 7 3.5C7.83 3.5 8.5 4.17 8.5 5C8.5 5.83 7.83 6.5 7 6.5Z" fill="#8a8a86" />
          </svg>
          14 Harbour Boulevard, Level 42 · Sydney, NSW 2000
        </div>
 
        <div className="hero-price-block">
          <div className="price-label">Guide Price</div>
          <div className="price-value">$8,450,000</div>
        </div>
 
        <div className="hero-stats">
          {[
            { value: '4', label: 'Bedrooms' },
            { value: '3', label: 'Bathrooms' },
            { value: '420', label: 'sqm total' },
            { value: '2', label: 'Car spaces' },
          ].map(({ value, label }) => (
            <div key={label} className="stat-item">
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
 
        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L9.5 5H12.5L10 8L11 12L7 10L3 12L4 8L1.5 5H4.5L7 1Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
            </svg>
            Book a Private Tour
          </a>
          <a href="#gallery" className="btn-secondary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="12" height="12" rx="1" stroke="#1a1a1a" strokeWidth="1.2" />
              <path d="M1 9L4.5 5.5L7 8L9.5 5.5L13 9" stroke="#1a1a1a" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            Gallery
          </a>
        </div>
      </div>
 
      <div className="hero-right">
        <HeroImageGrid />
      </div>
    </section>
  );
}
 

const STRIP_ITEMS = [
  { label: 'Status', value: 'Available Now', icon: true },
  { label: 'Strata', value: '$3,200 / qtr' },
  { label: 'Council', value: '$1,850 / qtr' },
  { label: 'Property Type', value: 'Penthouse' },
  { label: 'Built', value: '2021' },
  { label: 'Level', value: '42 / 44' },
];
 
function Strip() {
  return (
    <div className="strip">
      {STRIP_ITEMS.map(({ label, value, icon }, i) => (
        <>
          {i > 0 && <div key={`sep-${i}`} className="strip-sep" />}
          <div key={label} className="strip-item">
            {icon && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10 6H15L11 9.5L12.5 14.5L8 11.5L3.5 14.5L5 9.5L1 6H6L8 1Z" fill="rgba(255,255,255,0.35)" />
              </svg>
            )}
            <span className="strip-label">{label}</span>
            <span className="strip-value">{value}</span>
          </div>
        </>
      ))}
    </div>
  );
}
 


const FEATURES = [
  {
    label: 'Panoramic Harbour Views',
    desc: 'Uninterrupted 270° views from every principal room.',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L11.5 7H16.5L12.5 10.5L14 15.5L9 12.5L4 15.5L5.5 10.5L1.5 7H6.5L9 2Z" stroke="#5B6EA6" strokeWidth="1.3" strokeLinejoin="round" fill="none" /></svg>,
  },
  {
    label: 'Private Lift Lobby',
    desc: 'Dedicated lift access exclusive to this penthouse level.',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="8" width="14" height="8" stroke="#5B6EA6" strokeWidth="1.3" rx="1" /><path d="M5 8V5C5 3.34 6.34 2 8 2H10C11.66 2 13 3.34 13 5V8" stroke="#5B6EA6" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  },
  {
    label: 'Sub-Penthouse Retreat',
    desc: 'Separate guest suite with ensuite and private entrance.',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 14C2 14 4 10 9 10C14 10 16 14 16 14" stroke="#5B6EA6" strokeWidth="1.3" strokeLinecap="round" /><circle cx="9" cy="6" r="3" stroke="#5B6EA6" strokeWidth="1.3" /></svg>,
  },
  {
    label: '4-Car Basement',
    desc: 'Secure basement parking with dedicated storage vault.',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" stroke="#5B6EA6" strokeWidth="1.3" rx="2" /><path d="M2 7H16M7 2V16" stroke="#5B6EA6" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  },
  {
    label: 'Smart Home Automation',
    desc: 'Full Lutron and Crestron integration throughout.',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2C5.13 2 2 5.13 2 9C2 12.87 5.13 16 9 16C12.87 16 16 12.87 16 9C16 5.13 12.87 2 9 2Z" stroke="#5B6EA6" strokeWidth="1.3" /><path d="M9 5V9.5L12 11" stroke="#5B6EA6" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  },
  {
    label: 'Rooftop Terrace',
    desc: '780sqm private terrace with pool, spa and outdoor kitchen.',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 14L9 3L14 14" stroke="#5B6EA6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 10.5H12" stroke="#5B6EA6" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  },
];

const BedroomScene = () => (
  <svg className="img-scene" viewBox="0 0 500 625" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="rm-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f2ece4" />
        <stop offset="100%" stopColor="#e8e0d6" />
      </linearGradient>
    </defs>
    <rect width="500" height="625" fill="url(#rm-bg)" />
    <rect x="0" y="480" width="500" height="145" fill="#d4c4aa" />
    <rect x="0" y="0" width="500" height="480" fill="#ece6de" />
    <rect x="0" y="0" width="200" height="480" fill="#d0deea" opacity="0.5" />
    <line x1="100" y1="0" x2="100" y2="480" stroke="#b0c0d0" strokeWidth="2" opacity="0.5" />
    <g opacity="0.4">
      <rect x="20" y="200" width="30" height="280" fill="#8a9aaa" />
      <rect x="60" y="240" width="20" height="240" fill="#8a9aaa" />
      <rect x="120" y="180" width="40" height="300" fill="#8a9aaa" />
    </g>
    <rect x="220" y="300" width="260" height="200" fill="#c8b89a" rx="4" />
    <rect x="220" y="285" width="260" height="30" fill="#d4c4aa" rx="2" />
    <rect x="240" y="290" width="90" height="28" fill="#ede8df" rx="12" />
    <rect x="350" y="290" width="90" height="28" fill="#ede8df" rx="12" />
    <rect x="180" y="350" width="40" height="80" fill="#b8a890" rx="2" />
    <rect x="480" y="350" width="40" height="80" fill="#b8a890" rx="2" />
    <rect x="192" y="320" width="16" height="36" fill="#8a7a68" rx="1" />
    <ellipse cx="200" cy="316" rx="22" ry="14" fill="#e8e0d4" opacity="0.8" />
    <rect x="320" y="60" width="160" height="240" fill="#c8c0b4" rx="2" />
    <line x1="400" y1="60" x2="400" y2="300" stroke="#b8b0a4" strokeWidth="1.5" />
    <rect x="230" y="70" width="80" height="100" fill="#d8d0c8" rx="1" />
    <rect x="236" y="76" width="68" height="88" fill="#c4bcb0" rx="1" />
  </svg>
);


function About() {
  return (
    <section className="about reveal" id="about">
      <div className="about-visual">
        <div className="about-img-wrap">
          <svg className="img-scene" viewBox="0 0 500 625" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="rm-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f2ece4" />
                <stop offset="100%" stopColor="#e8e0d6" />
              </linearGradient>
            </defs>
            <rect width="500" height="625" fill="url(#rm-bg)" />
            <rect x="0" y="480" width="500" height="145" fill="#d4c4aa" />
            <rect x="0" y="0" width="500" height="480" fill="#ece6de" />
            <rect x="0" y="0" width="200" height="480" fill="#d0deea" opacity="0.5" />
            <line x1="100" y1="0" x2="100" y2="480" stroke="#b0c0d0" strokeWidth="2" opacity="0.5" />
            <g opacity="0.4">
              <rect x="20" y="200" width="30" height="280" fill="#8a9aaa" />
              <rect x="60" y="240" width="20" height="240" fill="#8a9aaa" />
              <rect x="120" y="180" width="40" height="300" fill="#8a9aaa" />
            </g>
            <rect x="220" y="300" width="260" height="200" fill="#c8b89a" rx="4" />
            <rect x="220" y="285" width="260" height="30" fill="#d4c4aa" rx="2" />
            <rect x="240" y="290" width="90" height="28" fill="#ede8df" rx="12" />
            <rect x="350" y="290" width="90" height="28" fill="#ede8df" rx="12" />
            <rect x="180" y="350" width="40" height="80" fill="#b8a890" rx="2" />
            <rect x="480" y="350" width="40" height="80" fill="#b8a890" rx="2" />
            <rect x="192" y="320" width="16" height="36" fill="#8a7a68" rx="1" />
            <ellipse cx="200" cy="316" rx="22" ry="14" fill="#e8e0d4" opacity="0.8" />
            <rect x="320" y="60" width="160" height="240" fill="#c8c0b4" rx="2" />
            <line x1="400" y1="60" x2="400" y2="300" stroke="#b8b0a4" strokeWidth="1.5" />
            <rect x="230" y="70" width="80" height="100" fill="#d8d0c8" rx="1" />
            <rect x="236" y="76" width="68" height="88" fill="#c4bcb0" rx="1" />
          </svg>
          <div className="img-overlay" />
        </div>
        <div className="about-card">
          <div className="about-card-value">42nd</div>
          <div className="about-card-label">Floor · Ocean Views</div>
        </div>
      </div>
 
      <div className="about-content">
        <div className="section-eyebrow">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">Property Overview</span>
        </div>
        <h2 className="section-title">A residence above<br />the ordinary</h2>
        <p className="section-body">
          The Meridian Penthouse Collection redefines elevated living with an unrivalled position on
          the 42nd level. Designed by award-winning architects Carr &amp; Associates, every detail
          speaks to a life of exceptional quality — from the floor-to-ceiling glazing framing sweeping
          harbour panoramas, to the hand-selected Italian stone and European oak throughout.
        </p>
        <div className="about-features">
          {FEATURES.map(({ label, desc, icon }) => (
            <div key={label} className="feature-item">
              <div className="feature-icon">{icon}</div>
              <div className="feature-name">{label}</div>
              <div className="feature-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


const TerraceSVG = () => (
  <svg className="img-scene" viewBox="0 0 500 640" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ minHeight: 400 }}>
    <defs>
      <linearGradient id="terrace-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#b0c4d8" />
        <stop offset="60%" stopColor="#d8e4ee" />
        <stop offset="100%" stopColor="#e4dcd4" />
      </linearGradient>
    </defs>
    <rect width="500" height="640" fill="url(#terrace-sky)" />
    <rect x="0" y="340" width="500" height="300" fill="#c8d4dc" opacity="0.4" />
    <g opacity="0.25">
      <rect x="20" y="280" width="40" height="360" fill="#789" rx="1" />
      <rect x="80" y="300" width="30" height="340" fill="#789" rx="1" />
      <rect x="380" y="260" width="50" height="380" fill="#789" rx="1" />
      <rect x="440" y="290" width="35" height="350" fill="#789" rx="1" />
    </g>
    <rect x="80" y="400" width="340" height="160" fill="#7098b8" opacity="0.7" rx="4" />
    <rect x="80" y="400" width="340" height="10" fill="#88aac8" opacity="0.5" rx="2" />
    <rect x="0" y="380" width="500" height="260" fill="#d4c8b8" opacity="0.5" />
    <rect x="120" y="350" width="100" height="36" fill="#e8e0d4" rx="2" />
    <rect x="280" y="350" width="100" height="36" fill="#e8e0d4" rx="2" />
    <rect x="0" y="330" width="500" height="6" fill="#e4ddd6" />
    <g stroke="#d0cac4" strokeWidth="1.5" opacity="0.8">
      {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480].map((x) => (
        <line key={x} x1={x} y1="336" x2={x} y2="400" />
      ))}
    </g>
  </svg>
);

const BathSVG = () => (
  <svg className="img-scene" viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ minHeight: 200 }}>
    <rect width="700" height="300" fill="#eeebe6" />
    <rect x="0" y="0" width="700" height="300" fill="#e8e4de" />
    <path d="M0 80 Q 100 70 200 90 Q 300 110 400 85 Q 500 65 600 88 Q 650 96 700 82" stroke="#d8d4ce" strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M0 120 Q 150 108 300 125 Q 450 140 600 118 Q 650 112 700 120" stroke="#d8d4ce" strokeWidth="1" fill="none" opacity="0.4" />
    <rect x="0" y="220" width="700" height="80" fill="#cdc8c0" />
    <rect x="250" y="140" width="200" height="90" fill="#f0ece6" rx="8" />
    <rect x="258" y="148" width="184" height="74" fill="#e8e2da" rx="6" />
    <rect x="336" y="136" width="28" height="14" fill="#c8c4bc" rx="2" />
    <rect x="345" y="125" width="10" height="15" fill="#b8b4ac" rx="1" />
    <rect x="500" y="20" width="160" height="200" fill="#b8cedd" opacity="0.5" />
    <line x1="580" y1="20" x2="580" y2="220" stroke="#a0b2c2" strokeWidth="1.5" opacity="0.5" />
    <rect x="20" y="160" width="200" height="70" fill="#c8c0b4" rx="2" />
    <rect x="30" y="140" width="180" height="22" fill="#e0d8d0" rx="1" />
    <rect x="30" y="30" width="160" height="110" fill="#d4dce8" opacity="0.5" rx="1" />
    <rect x="34" y="34" width="152" height="102" fill="#c8d4e4" opacity="0.4" rx="1" />
  </svg>
);

const DiningSVG = () => (
  <svg className="img-scene" viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ minHeight: 200 }}>
    <rect width="340" height="300" fill="#ece7de" />
    <rect x="0" y="240" width="340" height="60" fill="#c4b8a4" />
    <rect x="60" y="150" width="220" height="100" fill="#b0a090" rx="3" />
    <rect x="58" y="148" width="224" height="6" fill="#c0b0a0" rx="2" />
    {[80, 150, 220].map((x) => (
      <>
        <rect key={`top-${x}`} x={x} y="110" width="50" height="44" fill="#c8beb0" rx="3" />
        <rect key={`bot-${x}`} x={x} y="248" width="50" height="40" fill="#c8beb0" rx="3" />
      </>
    ))}
    <ellipse cx="170" cy="50" rx="50" ry="16" fill="#d8d0c4" opacity="0.8" />
    <line x1="170" y1="0" x2="170" y2="34" stroke="#b8b0a4" strokeWidth="2" />
    <g opacity="0.5">
      <line x1="130" y1="50" x2="120" y2="70" stroke="#b8b0a4" strokeWidth="1" />
      <line x1="150" y1="66" x2="145" y2="80" stroke="#b8b0a4" strokeWidth="1" />
      <line x1="170" y1="66" x2="170" y2="82" stroke="#b8b0a4" strokeWidth="1" />
      <line x1="190" y1="66" x2="195" y2="80" stroke="#b8b0a4" strokeWidth="1" />
      <line x1="210" y1="50" x2="220" y2="70" stroke="#b8b0a4" strokeWidth="1" />
    </g>
    <rect x="0" y="0" width="340" height="100" fill="#e8e2d8" opacity="0.5" />
    <rect x="20" y="10" width="120" height="80" fill="#e0d8ce" rx="1" opacity="0.4" />
    <rect x="200" y="10" width="120" height="80" fill="#e0d8ce" rx="1" opacity="0.4" />
  </svg>
);

function Gallery() {
  return (
    <section className="gallery reveal" id="gallery">
      <div className="gallery-header">
        <div>
          <div className="section-eyebrow">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Photo Gallery</span>
          </div>
          <h2 className="section-title">Every detail,<br />considered</h2>
        </div>
        <a href="#contact" className="btn-secondary">
          View All 36 Photos
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6H10M7 3L10 6L7 9" stroke="#1a1a1a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <div className="gallery-grid">
        <div className="g-cell g-cell-tall">
          <svg className="img-scene" viewBox="0 0 500 640" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="terrace-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b0c4d8" />
                <stop offset="60%" stopColor="#d8e4ee" />
                <stop offset="100%" stopColor="#e4dcd4" />
              </linearGradient>
            </defs>
            <rect width="500" height="640" fill="url(#terrace-sky)" />
            <rect x="0" y="340" width="500" height="300" fill="#c8d4dc" opacity="0.4" />
            <g opacity="0.25">
              <rect x="20" y="280" width="40" height="360" fill="#789" rx="1" />
              <rect x="80" y="300" width="30" height="340" fill="#789" rx="1" />
              <rect x="380" y="260" width="50" height="380" fill="#789" rx="1" />
              <rect x="440" y="290" width="35" height="350" fill="#789" rx="1" />
            </g>
            <rect x="80" y="400" width="340" height="160" fill="#7098b8" opacity="0.7" rx="4" />
            <rect x="80" y="400" width="340" height="10" fill="#88aac8" opacity="0.5" rx="2" />
            <rect x="0" y="380" width="500" height="260" fill="#d4c8b8" opacity="0.5" />
            <rect x="120" y="350" width="100" height="36" fill="#e8e0d4" rx="2" />
            <rect x="280" y="350" width="100" height="36" fill="#e8e0d4" rx="2" />
            <rect x="0" y="330" width="500" height="6" fill="#e4ddd6" />
            <g stroke="#d0cac4" strokeWidth="1.5" opacity="0.8">
              {[40,80,120,160,200,240,280,320,360,400,440,480].map(x => (
                <line key={x} x1={x} y1="336" x2={x} y2="400" />
              ))}
            </g>
          </svg>
          <div className="img-overlay" />
          <div className="g-label">Private Rooftop Terrace &amp; Pool</div>
        </div>

        <div className="g-cell g-cell-wide">
          <svg className="img-scene" viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <rect width="700" height="300" fill="#e8e4de" />
            <path d="M0 80 Q 100 70 200 90 Q 300 110 400 85 Q 500 65 600 88 Q 650 96 700 82" stroke="#d8d4ce" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M0 120 Q 150 108 300 125 Q 450 140 600 118 Q 650 112 700 120" stroke="#d8d4ce" strokeWidth="1" fill="none" opacity="0.4" />
            <rect x="0" y="220" width="700" height="80" fill="#cdc8c0" />
            <rect x="250" y="140" width="200" height="90" fill="#f0ece6" rx="8" />
            <rect x="258" y="148" width="184" height="74" fill="#e8e2da" rx="6" />
            <rect x="336" y="136" width="28" height="14" fill="#c8c4bc" rx="2" />
            <rect x="345" y="125" width="10" height="15" fill="#b8b4ac" rx="1" />
            <rect x="500" y="20" width="160" height="200" fill="#b8cedd" opacity="0.5" />
            <line x1="580" y1="20" x2="580" y2="220" stroke="#a0b2c2" strokeWidth="1.5" opacity="0.5" />
            <rect x="20" y="160" width="200" height="70" fill="#c8c0b4" rx="2" />
            <rect x="30" y="140" width="180" height="22" fill="#e0d8d0" rx="1" />
            <rect x="30" y="30" width="160" height="110" fill="#d4dce8" opacity="0.5" rx="1" />
          </svg>
          <div className="img-overlay" />
          <div className="g-label">Master Ensuite</div>
        </div>

        <div className="g-cell">
          <svg className="img-scene" viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <rect width="340" height="300" fill="#ece7de" />
            <rect x="0" y="240" width="340" height="60" fill="#c4b8a4" />
            <rect x="60" y="150" width="220" height="100" fill="#b0a090" rx="3" />
            <rect x="58" y="148" width="224" height="6" fill="#c0b0a0" rx="2" />
            {[80,150,220].map(x => (
              <>
                <rect key={`tc-${x}`} x={x} y="110" width="50" height="44" fill="#c8beb0" rx="3" />
                <rect key={`bc-${x}`} x={x} y="248" width="50" height="40" fill="#c8beb0" rx="3" />
              </>
            ))}
            <ellipse cx="170" cy="50" rx="50" ry="16" fill="#d8d0c4" opacity="0.8" />
            <line x1="170" y1="0" x2="170" y2="34" stroke="#b8b0a4" strokeWidth="2" />
            <rect x="0" y="0" width="340" height="100" fill="#e8e2d8" opacity="0.5" />
            <rect x="20" y="10" width="120" height="80" fill="#e0d8ce" rx="1" opacity="0.4" />
            <rect x="200" y="10" width="120" height="80" fill="#e0d8ce" rx="1" opacity="0.4" />
          </svg>
          <div className="img-overlay" />
          <div className="g-label">Formal Dining</div>
        </div>
      </div>
    </section>
  );
}





const TABS = ['Level 42', 'Rooftop', 'Basement'];

const ROOMS = [
  { name: 'Master Bedroom Suite', size: '68 sqm' },
  { name: 'Living & Dining', size: '94 sqm' },
  { name: "Chef's Kitchen", size: '42 sqm' },
  { name: 'Bedroom 2', size: '38 sqm' },
  { name: 'Bedroom 3 & 4', size: '28 sqm each' },
  { name: 'Study / Media Room', size: '32 sqm' },
  { name: 'Terrace', size: '78 sqm' },
];

function FloorPlan() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="floorplan reveal" id="floorplan">
      <div>
        <div className="section-eyebrow">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">Floor Plan</span>
        </div>
        <h2 className="section-title">Intelligently<br />considered layout</h2>
        <p className="section-body" style={{ marginBottom: 32 }}>
          420sqm of thoughtfully arranged living space across a single level, with a separate media
          room, formal dining, and dedicated study — all oriented to maximise the harbour views.
        </p>

        <div className="floorplan-tabs">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              className={`fp-tab${activeTab === i ? ' active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="room-list">
          {ROOMS.map(({ name, size }) => (
            <div key={name} className="room-row">
              <span className="room-name">{name}</span>
              <span className="room-size">{size}</span>
            </div>
          ))}
        </div>

        <a href="#contact" className="btn-primary" style={{ maxWidth: 280 }}>
          Download Full Plans
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 2V9M3.5 6.5L6.5 9.5L9.5 6.5M2 11H11" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <div className="floorplan-diagram">
        <svg className="fp-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="360" height="360" fill="white" stroke="#1a1a1a" strokeWidth="2.5" />
          <rect x="20" y="20" width="160" height="140" fill="#f5f2ee" />
          <rect x="20" y="20" width="80" height="60" fill="#eeeae4" stroke="#1a1a1a" strokeWidth="1.2" />
          <rect x="180" y="20" width="200" height="200" fill="#f0ede8" stroke="#1a1a1a" strokeWidth="1.2" />
          <rect x="20" y="220" width="160" height="80" fill="#edeae4" stroke="#1a1a1a" strokeWidth="1.2" />
          <rect x="20" y="300" width="120" height="80" fill="#f5f2ee" stroke="#1a1a1a" strokeWidth="1.2" />
          <rect x="140" y="300" width="100" height="80" fill="#edeae4" stroke="#1a1a1a" strokeWidth="1.2" />
          <rect x="240" y="220" width="140" height="160" fill="#f5f2ee" stroke="#1a1a1a" strokeWidth="1.2" />
          <text x="100" y="88" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="8" fill="#8a8a86" fontWeight="600" letterSpacing="0.04em">MASTER</text>
          <text x="100" y="100" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="7" fill="#adadaa" fontWeight="500">68 sqm</text>
          <text x="60" y="52" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="7" fill="#adadaa" fontWeight="500">ENSUITE</text>
          <text x="280" y="115" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="8" fill="#8a8a86" fontWeight="600" letterSpacing="0.04em">LIVING &amp; DINING</text>
          <text x="280" y="128" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="7" fill="#adadaa" fontWeight="500">94 sqm</text>
          <text x="100" y="262" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="8" fill="#8a8a86" fontWeight="600" letterSpacing="0.04em">KITCHEN</text>
          <text x="100" y="274" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="7" fill="#adadaa" fontWeight="500">42 sqm</text>
          <text x="80" y="342" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="8" fill="#8a8a86" fontWeight="600" letterSpacing="0.04em">BED 2</text>
          <text x="80" y="354" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="7" fill="#adadaa" fontWeight="500">38 sqm</text>
          <text x="190" y="342" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="7.5" fill="#8a8a86" fontWeight="600" letterSpacing="0.04em">STUDY</text>
          <text x="310" y="264" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="7.5" fill="#8a8a86" fontWeight="600" letterSpacing="0.04em">BED 3</text>
          <text x="310" y="336" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="7.5" fill="#8a8a86" fontWeight="600" letterSpacing="0.04em">BED 4</text>
          <line x1="20" y1="160" x2="180" y2="160" stroke="#1a1a1a" strokeWidth="1.2" />
          <line x1="180" y1="20" x2="180" y2="220" stroke="#1a1a1a" strokeWidth="1.2" />
          <line x1="20" y1="80" x2="100" y2="80" stroke="#1a1a1a" strokeWidth="1.2" />
          <line x1="100" y1="20" x2="100" y2="80" stroke="#1a1a1a" strokeWidth="1.2" />
          <line x1="20" y1="220" x2="240" y2="220" stroke="#1a1a1a" strokeWidth="1.2" />
          <line x1="20" y1="300" x2="240" y2="300" stroke="#1a1a1a" strokeWidth="1.2" />
          <line x1="140" y1="300" x2="140" y2="380" stroke="#1a1a1a" strokeWidth="1.2" />
          <line x1="240" y1="220" x2="240" y2="380" stroke="#1a1a1a" strokeWidth="1.2" />
          <line x1="240" y1="300" x2="380" y2="300" stroke="#1a1a1a" strokeWidth="1.2" />
          <path d="M 160 160 A 20 20 0 0 1 180 140" stroke="#5B6EA6" strokeWidth="1" fill="none" strokeDasharray="3,2" />
          <path d="M 180 220 A 20 20 0 0 0 200 240" stroke="#5B6EA6" strokeWidth="1" fill="none" strokeDasharray="3,2" />
          <g transform="translate(355, 355)">
            <circle cx="0" cy="0" r="14" fill="white" stroke="#ebebea" strokeWidth="1" />
            <path d="M0 -10 L3 0 L0 3 L-3 0 Z" fill="#1a1a1a" />
            <path d="M0 10 L3 0 L0 -3 L-3 0 Z" fill="#c4c4bf" />
            <text x="0" y="-14" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="7" fill="#8a8a86" fontWeight="700">N</text>
          </g>
          <line x1="20" y1="395" x2="80" y2="395" stroke="#c4c4bf" strokeWidth="1.5" />
          <line x1="20" y1="392" x2="20" y2="398" stroke="#c4c4bf" strokeWidth="1.5" />
          <line x1="80" y1="392" x2="80" y2="398" stroke="#c4c4bf" strokeWidth="1.5" />
          <text x="50" y="393" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="6" fill="#adadaa">10m</text>
        </svg>
      </div>
    </section>
  );
}


const MapSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 560 420" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="560" height="420" fill="#e8e4de" />
    <g stroke="#d8d4ce" strokeWidth="1">
      {[70, 140, 210, 280, 350].map((y) => (
        <line key={`h-${y}`} x1="0" y1={y} x2="560" y2={y} />
      ))}
      {[80, 160, 240, 320, 400, 480].map((x) => (
        <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="420" />
      ))}
    </g>
    <g stroke="#d0cbc4" strokeWidth="6">
      <line x1="0" y1="210" x2="560" y2="210" />
      <line x1="240" y1="0" x2="240" y2="420" />
    </g>
    <rect x="320" y="0" width="240" height="210" fill="#c8d8e4" opacity="0.6" rx="4" />
    <rect x="0" y="0" width="80" height="140" fill="#d4dcc8" opacity="0.5" rx="2" />
    <rect x="320" y="280" width="160" height="140" fill="#d4dcc8" opacity="0.5" rx="2" />
    <g fill="#cec8c0" opacity="0.7">
      <rect x="90" y="150" width="60" height="50" rx="1" />
      <rect x="170" y="80" width="50" height="40" rx="1" />
      <rect x="170" y="150" width="50" height="50" rx="1" />
      <rect x="90" y="220" width="60" height="50" rx="1" />
      <rect x="170" y="220" width="50" height="50" rx="1" />
      <rect x="90" y="80" width="60" height="50" rx="1" />
      <rect x="340" y="220" width="40" height="50" rx="1" />
      <rect x="400" y="220" width="60" height="50" rx="1" />
      <rect x="340" y="290" width="60" height="50" rx="1" />
    </g>
    <circle cx="240" cy="210" r="18" fill="white" opacity="0.9" />
    <circle cx="240" cy="210" r="10" fill="#5B6EA6" />
    <circle cx="240" cy="210" r="18" fill="none" stroke="#5B6EA6" strokeWidth="2" opacity="0.3" />
    <rect x="158" y="236" width="164" height="32" fill="white" rx="1" />
    <text x="240" y="255" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="10" fontWeight="700" fill="#1a1a1a" letterSpacing="0.04em">14 HARBOUR BLVD</text>
    <text x="420" y="100" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="11" fontWeight="500" fill="#7098b8" opacity="0.8" letterSpacing="0.06em">SYDNEY</text>
    <text x="420" y="116" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="11" fontWeight="500" fill="#7098b8" opacity="0.8" letterSpacing="0.06em">HARBOUR</text>
  </svg>
);

const PROXIMITY = [
  { name: 'Sydney CBD Core', time: '4 min drive' },
  { name: 'Circular Quay', time: '6 min walk' },
  { name: 'The Grounds Restaurant', time: '3 min walk' },
  { name: 'Sydney Opera House', time: '8 min walk' },
  { name: 'SHORE / PLC Schools', time: '12 min drive' },
  { name: 'Sydney Airport', time: '22 min drive' },
];

function Location() {
  return (
    <section className="location-section reveal" id="location">
      <div className="section-eyebrow">
        <div className="eyebrow-line" />
        <span className="eyebrow-text">Location</span>
      </div>
      <h2 className="section-title" style={{ marginBottom: 48 }}>
        Positioned at the<br />heart of it all
      </h2>

      <div className="location-inner">
        <div>
          <p className="section-body" style={{ marginBottom: 32 }}>
            14 Harbour Boulevard sits within moments of Sydney's most revered dining, cultural
            institutions, and private schools — while the private lobby provides complete seclusion
            from the city's energy below.
          </p>
          <div className="proximity-list">
            {PROXIMITY.map(({ name, time }) => (
              <div key={name} className="prox-row">
                <div className="prox-left">
                  <div className="prox-dot" />
                  <span className="prox-name">{name}</span>
                </div>
                <span className="prox-time">{time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="map-placeholder">
          <svg width="100%" height="100%" viewBox="0 0 560 420" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <rect width="560" height="420" fill="#e8e4de" />
            <g stroke="#d8d4ce" strokeWidth="1">
              {[70,140,210,280,350].map(y => <line key={y} x1="0" y1={y} x2="560" y2={y} />)}
              {[80,160,240,320,400,480].map(x => <line key={x} x1={x} y1="0" x2={x} y2="420" />)}
            </g>
            <g stroke="#d0cbc4" strokeWidth="6">
              <line x1="0" y1="210" x2="560" y2="210" />
              <line x1="240" y1="0" x2="240" y2="420" />
            </g>
            <rect x="320" y="0" width="240" height="210" fill="#c8d8e4" opacity="0.6" rx="4" />
            <rect x="0" y="0" width="80" height="140" fill="#d4dcc8" opacity="0.5" rx="2" />
            <rect x="320" y="280" width="160" height="140" fill="#d4dcc8" opacity="0.5" rx="2" />
            <g fill="#cec8c0" opacity="0.7">
              <rect x="90" y="150" width="60" height="50" rx="1" />
              <rect x="170" y="80" width="50" height="40" rx="1" />
              <rect x="170" y="150" width="50" height="50" rx="1" />
              <rect x="90" y="220" width="60" height="50" rx="1" />
              <rect x="170" y="220" width="50" height="50" rx="1" />
              <rect x="90" y="80" width="60" height="50" rx="1" />
              <rect x="340" y="220" width="40" height="50" rx="1" />
              <rect x="400" y="220" width="60" height="50" rx="1" />
              <rect x="340" y="290" width="60" height="50" rx="1" />
            </g>
            <circle cx="240" cy="210" r="18" fill="white" opacity="0.9" />
            <circle cx="240" cy="210" r="10" fill="#5B6EA6" />
            <circle cx="240" cy="210" r="18" fill="none" stroke="#5B6EA6" strokeWidth="2" opacity="0.3" />
            <rect x="158" y="236" width="164" height="32" fill="white" rx="1" />
            <text x="240" y="255" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="10" fontWeight="700" fill="#1a1a1a" letterSpacing="0.04em">14 HARBOUR BLVD</text>
            <text x="420" y="100" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="11" fontWeight="500" fill="#7098b8" opacity="0.8" letterSpacing="0.06em">SYDNEY</text>
            <text x="420" y="116" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="11" fontWeight="500" fill="#7098b8" opacity="0.8" letterSpacing="0.06em">HARBOUR</text>
          </svg>
        </div>
      </div>
    </section>
  );
}




const VIEWING_TIMES = [
  'Weekday Morning',
  'Weekday Afternoon',
  'Weekend Morning',
  'Weekend Afternoon',
  'By Appointment',
];

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: 'white',
  fontFamily: 'var(--body)',
  fontSize: 'var(--text-sm)',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle = {
  display: 'block',
  fontSize: 'var(--text-xxs)',
  fontWeight: 700,
  letterSpacing: 'var(--tracking-extra-wide)',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.35)',
  marginBottom: 8,
};

 function Agent() {
  const [focused, setFocused] = useState(null);

  const focusStyle = (field) => ({
    ...inputStyle,
    borderColor: focused === field ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)',
  });

  return (
    <section className="agent-section" id="contact">
      <div>
        <div className="agent-tag">Your Agent</div>
        <h2 className="agent-headline">
          Ready to make<br />this yours?
        </h2>
        <p className="agent-body">
          Contact our dedicated specialist directly to arrange a private viewing, request the full
          information memorandum, or discuss expressions of interest. Available seven days.
        </p>

        <div className="agent-card">
          <div className="agent-avatar">
            <div className="avatar-placeholder">JM</div>
          </div>
          <div className="agent-info">
            <div className="agent-name">James Mercer</div>
            <div className="agent-title">Principal — Prestige Residential</div>
          </div>
        </div>

        <div className="agent-contact-col">
          <a href="tel:0400000000" className="contact-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 1H6L7.5 4.5L5.5 5.5C6.5 7.5 8.5 9.5 10.5 10.5L11.5 8.5L15 10V13C15 14.1 14.1 15 13 15C6.4 15 1 9.6 1 3C1 1.9 1.9 1 3 1Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
            </svg>
            <div>
              <div className="contact-btn-label">Call James Directly</div>
              <div className="contact-btn-sub">+61 400 000 000</div>
            </div>
            <svg className="contact-btn-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M8 4L11 7L8 10" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a href="mailto:james@meridian.estate" className="contact-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="white" strokeWidth="1.2" />
              <path d="M1 4L8 9L15 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <div>
              <div className="contact-btn-label">Send an Enquiry</div>
              <div className="contact-btn-sub">james@meridian.estate</div>
            </div>
            <svg className="contact-btn-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M8 4L11 7L8 10" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: 40 }}>
          <div style={{ fontSize: 'var(--text-xxs)', fontWeight: 700, letterSpacing: 'var(--tracking-extra-wide)', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
            Request a Private Viewing
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[['First Name', 'Alexander', 'firstName'], ['Last Name', 'Whitmore', 'lastName']].map(([label, placeholder, field]) => (
                <div key={field}>
                  <label style={labelStyle}>{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    style={focusStyle(field)}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              ))}
            </div>

            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                placeholder="alexander@example.com"
                style={focusStyle('email')}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
            </div>

            <div>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel"
                placeholder="+61 400 000 000"
                style={focusStyle('phone')}
                onFocus={() => setFocused('phone')}
                onBlur={() => setFocused(null)}
              />
            </div>

            <div>
              <label style={labelStyle}>Preferred Viewing Time</label>
              <select
                style={{ ...focusStyle('time'), color: 'rgba(255,255,255,0.6)', appearance: 'none', cursor: 'pointer' }}
                onFocus={() => setFocused('time')}
                onBlur={() => setFocused(null)}
              >
                {VIEWING_TIMES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Message (Optional)</label>
              <textarea
                rows={3}
                placeholder="Any specific questions or requirements..."
                style={{ ...focusStyle('message'), resize: 'vertical' }}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
              />
            </div>

            <button
              style={{ padding: '18px 32px', background: 'white', color: '#1a1a1a', border: 'none', fontFamily: 'var(--body)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', cursor: 'pointer', transition: 'opacity 0.2s', marginTop: 6 }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.88')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Submit Enquiry →
            </button>

            <p style={{ fontSize: 'var(--text-xxs)', color: 'rgba(255,255,255,0.25)', lineHeight: 1.6, letterSpacing: 'var(--tracking-normal)' }}>
              Your information is handled with complete discretion. We will respond within 2 business hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


function CtaStrip() {
  return (
    <div className="cta-strip">
      <div className="cta-strip-left">
        <div className="cta-strip-eyebrow">Limited Opportunity</div>
        <div className="cta-strip-title">
          One of only two residences<br />at this level. Act with intention.
        </div>
      </div>
      <div className="cta-strip-actions">
        <a href="#contact" className="btn-white">
          Register Interest
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6H10M7 3L10 6L7 9" stroke="#5B6EA6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <a href="#" className="btn-ghost-white">
          Download Brochure
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2V8M3.5 5.5L6 8.5L8.5 5.5M2 10H10" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

 function Footer() {
  return (
    <footer>
      <div className="footer-logo">Meridian<span>.</span>Estate</div>
      <div className="footer-legal">© 2025 Meridian Estate. All rights reserved. License No. 000 000.</div>
      <div className="footer-links">
        <a href="#">Privacy</a>
        <a href="#">Disclaimer</a>
        <a href="#">Contact</a>
      </div>
    </footer>
  );
}

export default function page() {
 
 
 
  return (
    <>
      <Nav />
      <Hero />
      <Strip />
      <About />
      <Gallery />
      <FloorPlan />
      <Location />
      <Agent />
      <CtaStrip />
      <Footer />
    </>
  );
}
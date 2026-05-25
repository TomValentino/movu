'use client'
import React, { useEffect } from 'react'



const styles = `
/* ============================================================
   MOVU MOBILITY — DESIGN TOKENS
   Fonts: Manrope (display) · DM Sans (body)
   CLAMP FORMULA — viewport min: 400px, max: 1280px
   vw  = (max - min) / 880 * 100
   off = min - (400 × vw / 100)
   → clamp(min, off + Xvw, max)
   ============================================================ */
:root {

  /* ── FONTS ─────────────────────────────────────────────── */
  --font-display: 'Manrope', sans-serif;
  --font-body:    'DM Sans', sans-serif;

  /* ── FONT SIZES ─────────────────────────────────────────── */
  --fs-1:    clamp( 9px,  8.55px + 0.114vw,  10px);
  --fs-2:    clamp(11px, 10.55px + 0.114vw,  12px);
  --fs-3:    clamp(12px, 11.55px + 0.114vw,  13px);
  --fs-4:    clamp(14px, 13.55px + 0.114vw,  15px);
  --fs-base: var(--fs-4);
  --fs-5:    clamp(15px, 14.55px + 0.114vw,  16px);
  --fs-6:    clamp(18px, 14.36px + 0.909vw,  26px);
  --fs-7:    clamp(22px, 15.64px + 1.591vw,  36px);
  --fs-8:    clamp(32px, 19.27px + 3.182vw,  60px);
  --fs-9:    clamp(48px, 20.36px + 6.818vw, 82px);

  /* ── LETTER SPACINGS ────────────────────────────────────── */
  --ls-1: -0.05em;
  --ls-2: -0.04em;
  --ls-3: -0.03em;
  --ls-4: -0.01em;
  --ls-5:  0.08em;
  --ls-6:  0.12em;
  --ls-7:  0.18em;

  /* ── LINE HEIGHTS ───────────────────────────────────────── */
  --lh-1: 0.92;
  --lh-2: 1.00;
  --lh-3: 1.10;
  --lh-4: 1.30;
  --lh-5: 1.60;
  --lh-6: 1.65;

  /* ── SPACING ────────────────────────────────────────────── */
  --sp-1:   2px;  --sp-2:   4px;  --sp-3:   8px;  --sp-4:  12px;
  --sp-5:  16px;  --sp-6:  20px;  --sp-7:  24px;  --sp-8:  32px;
  --sp-9:  40px;  --sp-10: 48px;  --sp-11: 56px;  --sp-12: 64px;
  --sp-13: 80px;  --sp-14: 96px;  --sp-15: 120px; --sp-16: 160px;

  /* ── BORDER RADII ───────────────────────────────────────── */
  --r-1: 4px;   --r-2: 8px;   --r-3: 14px;
  --r-4: 20px;  --r-5: 28px;  --r-6: 40px;  --r-7: 999px;

  /* ── ICON SIZES ─────────────────────────────────────────── */
  --icon-size-1: 12px; --icon-size-2: 14px; --icon-size-3: 18px;
  --icon-size-4: 20px; --icon-size-5: 24px; --icon-size-6: 32px;

  /* ── BORDER COLORS ──────────────────────────────────────── */
  --border-col-1: rgba(18,26,32,0.06);
  --border-col-2: rgba(18,26,32,0.10);
  --border-col-3: rgba(18,26,32,0.16);
  --border-col-4: rgba(18,26,32,0.24);

  /* ==========================================================
     MOVU BRAND PALETTE — NORDIC EDITION
     Inspired by: birch forests, fjord slate, winter sky,
     warm Norwegian interiors.
     ~85% light / ~15% dark. Arctic whites, slate blues,
     warm birch neutrals — with fjord blue as the sole accent.
     ========================================================== */

  /* ── FJORD — primary accent (deep Nordic blue) ─────────── */
  --primary-100: #E8EEF5;
  --primary-200: #C8D8EC;
  --primary-300: #9ABBD9;
  --primary-400: #6899C4;
  --primary-500: #3A7BB5;   /* main brand accent */
  --primary-600: #2D6398;
  --primary-700: #1F4C7A;
  --primary-800: #14345C;
  --primary-900: #0A1F3B;

  /* ── BIRCH — warm off-whites (primary surfaces) ─────────── */
  --cream-100: #FDFCFB;
  --cream-200: #F8F6F2;
  --cream-300: #F2EFE9;   /* primary page bg */
  --cream-400: #E8E4DC;
  --cream-500: #DDD8CE;
  --cream-600: #CEC8BC;
  --cream-700: #B8B0A2;
  --cream-800: #9A9287;
  --cream-900: #7C746A;

  /* ── SLATE — dark ink tones ─────────────────────────────── */
  --dark-100: #3D434A;
  --dark-200: #2C3138;
  --dark-300: #1C2128;
  --dark-400: #141920;
  --dark-500: #0E1319;   /* primary dark */
  --dark-600: #090D13;
  --dark-700: #060910;
  --dark-800: #03060B;
  --dark-900: #000000;

  /* ── GREY — neutrals ────────────────────────────────────── */
  --grey-100: #F4F5F6;
  --grey-200: #E6E8EA;
  --grey-300: #CDD1D5;
  --grey-400: #B2B8BE;
  --grey-500: #909899;
  --grey-600: #71797E;
  --grey-700: #545C62;
  --grey-800: #363D42;
  --grey-900: #1A1F22;

  /* ── WHITE opacity steps (dark surfaces) ────────────────── */
  --white-100: rgba(255,255,255,0.05);
  --white-200: rgba(255,255,255,0.10);
  --white-300: rgba(255,255,255,0.20);
  --white-400: rgba(255,255,255,0.35);
  --white-500: rgba(255,255,255,0.50);
  --white-600: rgba(255,255,255,0.65);
  --white-700: rgba(255,255,255,0.80);
  --white-800: rgba(255,255,255,0.92);
  --white-900: rgba(255,255,255,1.00);

  /* ── ARCTIC MIST — very light blue-tinted sections ──────── */
  --mist-100: #F0F5FA;
  --mist-200: #E2EDF5;
  --mist-300: #C8DDF0;

  /* ── MOSS — subtle green for nature nods ────────────────── */
  --moss-100: #EBF2EC;
  --moss-500: #5A8A62;

  /* ── RUST — warm accent for highlights ──────────────────── */
  --rust-100: #FDF0E8;
  --rust-500: #C96D3A;

  /* Convenience aliases */
  --page-bg:   var(--cream-300);
  --alt-bg:    var(--cream-200);
  --dark-bg:   var(--dark-500);
  --text-head: var(--dark-400);
  --text-body: var(--dark-200);
  --text-muted:var(--grey-600);
  --accent:    var(--primary-500);
}

/* ============================================================
   RESET & BASE
   ============================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: var(--font-body);
  font-size: var(--fs-base);
  line-height: var(--lh-6);
  color: var(--text-body);
  background: var(--page-bg);
  overflow-x: hidden;
}

h1,h2,h3,h4,h5,h6 {
  font-family: var(--font-display);
  color: var(--text-head);
  line-height: var(--lh-3);
}

img { display: block; max-width: 100%; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }

/* ============================================================
   BUTTONS
   ============================================================ */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: var(--ls-5);
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  transition:
    background 0.25s cubic-bezier(0.22,1,0.36,1),
    transform  0.25s cubic-bezier(0.22,1,0.36,1),
    box-shadow 0.25s cubic-bezier(0.22,1,0.36,1),
    border-color 0.25s cubic-bezier(0.22,1,0.36,1),
    color 0.25s cubic-bezier(0.22,1,0.36,1);
}
.btn-primary       { background: var(--primary-500); color: #fff; border-radius: var(--r-3); }
.btn-primary:hover { background: var(--primary-400); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(58,123,181,.32); }
.btn-dark          { background: var(--dark-500); color: #fff; border-radius: var(--r-3); }
.btn-dark:hover    { background: var(--dark-300); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.28); }
.btn-outline       { background: transparent; color: var(--dark-400); border: 1.5px solid var(--border-col-3); border-radius: var(--r-3); }
.btn-outline:hover { border-color: var(--dark-400); transform: translateY(-1px); }
.btn-ghost         { background: transparent; color: var(--grey-700); border-bottom: 1.5px solid transparent; padding-left: 0; padding-right: 0; border-radius: 0; }
.btn-ghost:hover   { color: var(--dark-400); border-bottom-color: var(--dark-400); }
.btn-sm { padding: 10px 20px; font-size: var(--fs-1); }
.btn-md { padding: 16px 32px; font-size: var(--fs-2); }
.btn-lg { padding: clamp(16px,1.5vw,20px) clamp(28px,3vw,40px); font-size: var(--fs-2); }
.btn-ghost.btn-sm { padding: 8px 0; }
.btn-ghost.btn-md { padding: 12px 0; }
.btn-ghost.btn-lg { padding: 16px 0; }
.btn-icon { width: var(--icon-size-2); height: var(--icon-size-2); flex-shrink: 0; transition: transform 0.2s cubic-bezier(0.22,1,0.36,1); }
.btn:hover .btn-icon-arrow { transform: translate(3px,-3px); }
.btn:hover .btn-icon-right { transform: translateX(4px); }

/* ============================================================
   LAYOUT UTILITIES
   ============================================================ */
.container { width: 100%; max-width: 1200px; margin-inline: auto; padding-inline: clamp(20px, 5vw, 80px); }
.container--wide { max-width: 1380px; }
.section-pad { padding-block: clamp(var(--sp-13), 10vw, var(--sp-15)); }
.section-pad--sm { padding-block: clamp(var(--sp-10), 7vw, var(--sp-13)); }

/* ── Eyebrow pill ────────────────────────────────────────── */
.eyebrow {
  display: inline-block;
  font-family: var(--font-display);
  font-size: var(--fs-1);
  font-weight: 700;
  letter-spacing: var(--ls-7);
  text-transform: uppercase;
  color: var(--primary-600);
  background: var(--primary-100);
  padding: 6px 14px;
  border-radius: var(--r-7);
  margin-bottom: var(--sp-6);
}
.eyebrow--light {
  color: var(--white-800);
  background: var(--white-200);
}

/* ── Section heading ─────────────────────────────────────── */
.section-title {
  font-size: var(--fs-8);
  font-weight: 800;
  letter-spacing: var(--ls-2);
  line-height: var(--lh-2);
  color: var(--text-head);
}
.section-title--light { color: var(--white-900); }

.section-body {
  font-family: var(--font-body);
  font-size: var(--fs-5);
  line-height: var(--lh-6);
  color: var(--text-muted);
  max-width: 52ch;
}
.section-body--light { color: var(--white-600); }

/* ============================================================
   NAV
   ============================================================ */
.nav {
  position: fixed;
  top: 40px; left: 0; right: 0;
  z-index: 100;
  background: var(--mist-100);
  transition: background 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease;
}
.nav.scrolled {
  background: rgba(242,239,233,0.88);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 1px 0 var(--border-col-2);
}
.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-8);
  padding: clamp(16px,2vw,22px) clamp(20px,5vw,64px);
}
.nav__logo {
  font-family: var(--font-display);
  font-size: clamp(20px,2.5vw,26px);
  font-weight: 800;
  letter-spacing: var(--ls-3);
  color: var(--dark-500);
  display: flex;
  align-items: center;
  gap: 8px;
}
.nav__logo-mark {
  width: 32px;
  height: 32px;
  background: var(--primary-500);
  border-radius: var(--r-2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav__logo-mark svg { color: #fff; }

.nav__links {
  display: flex;
  align-items: center;
  gap: clamp(20px,3vw,40px);
}
.nav__link {
  font-family: var(--font-display);
  font-size: var(--fs-3);
  font-weight: 600;
  letter-spacing: var(--ls-5);
  text-transform: uppercase;
  color: var(--grey-700);
  transition: color 0.2s;
}
.nav__link:hover { color: var(--dark-500); }
.nav__cta { margin-left: var(--sp-4); }

@media (max-width: 768px) {
  .nav__links { display: none; }
  .nav__cta   { display: none; }
  .nav__mobile-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px; height: 44px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--dark-400);
  }
}
@media (min-width: 769px) {
  .nav__mobile-menu { display: none; }
}

/* ============================================================
   ANNOUNCEMENT BAR
   ============================================================ */
.announcement {
position: fixed;
top: 0px;
left: 0px;
right: 0px;
z-index: 10;
height: 40px;
display: flex;
align-items: center;
justify-content: center;
  background: var(--primary-500);
  color: #fff;
  text-align: center;
  padding: 10px var(--sp-7);
  font-family: var(--font-display);
  font-size: var(--fs-2);
  font-weight: 600;
  letter-spacing: var(--ls-5);
  text-transform: uppercase;
}
.announcement a { color: rgba(255,255,255,0.8); text-decoration: underline; }
.announcement a:hover { color: #fff; }

/* ============================================================
   HERO BASE
   ============================================================ */

.hero {
  position: relative;
  min-height: clamp(520px, 90vh, 820px);
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--dark-500);
  padding-top: 120px;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(14,19,25,0.92) 0%, rgba(14,19,25,0.55) 55%, rgba(14,19,25,0.8) 100%);
  z-index: 1;
}

.hero__bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right, rgba(14,19,25,0.8) 35%, transparent 100%);
  z-index: 0;
}

/* ============================================================
   LAYOUT
   ============================================================ */

.hero__container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: clamp(32px, 6vw, 80px);

  padding: clamp(40px, 6vw, 80px) clamp(20px, 5vw, 60px);
}

/* ============================================================
   CONTENT
   ============================================================ */

.hero__content {
  max-width: 620px;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--fs-1);
  font-weight: 700;
  letter-spacing: var(--ls-7);
  text-transform: uppercase;
  color: var(--white-700);
  margin-bottom: var(--sp-7);
}

.hero__eyebrow-dot {
  width: 6px;
  height: 6px;
  background: var(--primary-400);
  border-radius: 50%;
}

.hero__title {
  font-size: var(--fs-9);
  font-weight: 800;
  line-height: var(--lh-1);
  color: var(--white-900);
  margin-bottom: var(--sp-8);
}

.hero__title em {
  color: var(--primary-300);
  font-style: normal;
}

.hero__body {
  font-size: var(--fs-6);
  line-height: var(--lh-5);
  color: var(--white-600);
  margin-bottom: var(--sp-10);
  max-width: 48ch;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-5);
}

/* ============================================================
   IMAGE
   ============================================================ */

.hero__media {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero__image {
  width: 100%;
  max-width: 520px;
  border-radius: 12px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 40px 80px rgba(0, 0, 0, 0.6));
}

/* ============================================================
   SOCIAL
   ============================================================ */

.hero__social-proof {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
  margin-top: var(--sp-12);
  padding-top: var(--sp-9);
  border-top: 1px solid var(--white-200);
}

.hero__avatars {
  display: flex;
}

.hero__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.3);
  margin-left: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background: var(--primary-700);
}

.hero__avatar:first-child {
  margin-left: 0;
}

.hero__stars {
  color: #F5C842;
}

/* ============================================================
   MOBILE (KEY PART)
   ============================================================ */

@media (max-width: 900px) {
  .hero {
    padding-top: 140px;
  }

  .hero__container {
    display: flex;
    flex-direction: column; /* 👈 image goes UNDER */
    padding: 40px 20px;
    gap: 30px;
  }

  .hero__content {
    text-align: center;
    margin: 0 auto;
  }

  .hero__actions {
    justify-content: center;
  }

  .hero__social-proof {
    justify-content: center;
  }

  /* 🔥 IMAGE becomes cropped "hero block" */
  .hero__media {
    width: 100%;
    height: 260px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
  }

  .hero__image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 👈 key: crop instead of contain */
    object-position: center top; /* tweak this for best crop */
  }
}
/* ============================================================
   LOGO BAR / AS SEEN IN
   ============================================================ */
.logo-bar {
  background: var(--dark-400);
  padding-block: var(--sp-8);
  border-bottom: 1px solid var(--white-100);
}
.logo-bar__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(var(--sp-8), 5vw, var(--sp-12));
  flex-wrap: wrap;
}
.logo-bar__label {
  font-family: var(--font-display);
  font-size: var(--fs-1);
  font-weight: 700;
  letter-spacing: var(--ls-7);
  text-transform: uppercase;
  color: var(--white-400);
  white-space: nowrap;
}
.logo-bar__items {
  display: flex;
  align-items: center;
  gap: clamp(var(--sp-8), 5vw, var(--sp-13));
  flex-wrap: wrap;
  justify-content: center;
}
.logo-bar__item {
  font-family: var(--font-display);
  font-size: var(--fs-3);
  font-weight: 700;
  letter-spacing: var(--ls-5);
  text-transform: uppercase;
  color: var(--white-400);
  transition: color 0.2s;
}
.logo-bar__item:hover { color: var(--white-700); }
/* Separator dots */
.logo-bar__sep { color: var(--white-200); font-size: 18px; line-height: 1; }

/* ============================================================
   3 PILLARS
   ============================================================ */
.pillars { background: var(--cream-200); }
.pillars__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: clamp(var(--sp-5), 2vw, var(--sp-7));
}
.pillar-card {
  background: var(--cream-100);
  border-radius: var(--r-5);
  padding: clamp(var(--sp-10),4vw,var(--sp-12));
  border: 1px solid var(--border-col-1);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
}
.pillar-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(14,19,25,0.1);
}
.pillar-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--primary-500);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
}
.pillar-card:hover::before { transform: scaleX(1); }

.pillar-icon {
  width: clamp(44px,5vw,52px);
  height: clamp(44px,5vw,52px);
  border-radius: var(--r-2);
  background: var(--primary-100);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--sp-8);
  color: var(--primary-600);
}
.pillar-icon svg { width: var(--icon-size-6); height: var(--icon-size-6); }
.pillar-number {
  font-family: var(--font-display);
  font-size: var(--fs-1);
  font-weight: 700;
  letter-spacing: var(--ls-7);
  text-transform: uppercase;
  color: var(--primary-500);
  margin-bottom: var(--sp-4);
}
.pillar-title {
  font-size: var(--fs-7);
  font-weight: 800;
  letter-spacing: var(--ls-3);
  line-height: var(--lh-3);
  color: var(--dark-400);
  margin-bottom: var(--sp-5);
}
.pillar-body {
  font-family: var(--font-body);
  font-size: var(--fs-4);
  line-height: var(--lh-6);
  color: var(--grey-600);
}

/* ============================================================
   WHY MOVU
   ============================================================ */

.why {
  background: var(--page-bg);
  position: relative;
  overflow: hidden;
}

.why::before {
  content: '';
  position: absolute;
  bottom: -15%;
  left: -10%;
  width: clamp(300px, 50vw, 700px);
  height: clamp(300px, 50vw, 700px);
  border-radius: 50%;
  background: radial-gradient(circle, var(--mist-200) 0%, transparent 65%);
}

/* ============================================================
   LAYOUT
   ============================================================ */

.why__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(var(--sp-12), 8vw, var(--sp-15));
  align-items: center;
}

@media (min-width: 900px) {
  .why__layout {
    grid-template-columns: 1fr 1fr;
  }
}

/* ============================================================
   TEXT
   ============================================================ */

.why__text {
  position: relative;
  z-index: 1;
}

/* ============================================================
   POINTS
   ============================================================ */

.why__points {
  display: flex;
  flex-direction: column;
  gap: var(--sp-6);
  margin-bottom: var(--sp-10);
}

.why__point {
  display: flex;
  gap: var(--sp-5);
}

.why__point-icon {
  width: 28px;
  height: 28px;
  border-radius: var(--r-1);
  background: var(--primary-100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-600);
}

.why__point-title {
  font-size: var(--fs-4);
  font-weight: 700;
  color: var(--dark-400);
}

.why__point-body {
  font-size: var(--fs-3);
  color: var(--grey-600);
}

/* ============================================================
   VISUAL
   ============================================================ */

.why__visual {
  position: relative;
  z-index: 1;
}

.why__card-stack {
  position: relative;
  min-height: clamp(320px, 50vw, 520px);
}

.why__img-card {
  border-radius: var(--r-5);
  overflow: hidden;
  position: absolute;
}

/* MAIN IMAGE */

.why__img-card--main {
  width: 85%;
  aspect-ratio: 3/4;
  left: 0;
  top: 0;
  background: #111;
  box-shadow: 0 24px 64px rgba(14,19,25,0.25);
}

.why__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* overlay for readability */

.why__image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.6) 0%,
    transparent 50%
  );
}

/* badge */

.why__badge {
  position: absolute;
  bottom: 16px;
  left: 16px;

  display: flex;
  align-items: center;
  gap: 8px;

  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(10px);

  padding: 6px 12px;
  border-radius: 999px;
}

.why__stars {
  color: #F5C842;
  font-size: 12px;
}

.why__rating {
  font-size: 12px;
  color: #fff;
}

/* ACCENT CARD */

.why__img-card--accent {
  width: 55%;
  aspect-ratio: 4/3;
  right: 0;
  bottom: clamp(-20px,-5vw,-40px);

  background: linear-gradient(135deg, var(--primary-700), var(--primary-900));

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 16px 40px rgba(14,19,25,0.2);
}

/* STAT */

.why__stat {
  text-align: center;
}

.why__stat-num {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  color: var(--white-900);
}

.why__stat-label {
  font-size: var(--fs-3);
  color: var(--white-500);
}

/* ============================================================
   MOBILE (matches your hero logic)
   ============================================================ */

@media (max-width: 900px) {
  .why__layout {
    display: flex;
    flex-direction: column-reverse; /* 👈 image below text */
  }

  .why__card-stack {
    position: relative;
    min-height: auto;
  }

  .why__img-card--main {
    position: relative;
    width: 100%;
    aspect-ratio: 16/10; /* 👈 more "hero-like" crop */
  }

  .why__img-card--accent {
    position: relative;
    width: 60%;
    margin: -40px auto 0;
  }
}

/* ============================================================
   HOW IT WORKS
   ============================================================ */
.how {
  background: var(--cream-200);
}
.how__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
  gap: clamp(var(--sp-5), 3vw, var(--sp-8));
  counter-reset: step;
}
.how__step {
  text-align: center;
  padding: clamp(var(--sp-9),4vw,var(--sp-11));
  position: relative;
}
/* Connector line between steps */
.how__step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: clamp(36px,4vw,48px);
  right: -20px;
  width: 40px;
  height: 2px;
  background: var(--primary-200);
  z-index: 0;
}
@media (max-width: 768px) {
  .how__step::after { display: none; }
}
.how__step-num {
  width: clamp(48px,5vw,56px);
  height: clamp(48px,5vw,56px);
  border-radius: 50%;
  background: var(--primary-500);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: var(--fs-6);
  letter-spacing: var(--ls-3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--sp-7);
  position: relative;
  z-index: 1;
  box-shadow: 0 6px 20px rgba(58,123,181,0.30);
}
.how__step-title {
  font-family: var(--font-display);
  font-size: var(--fs-5);
  font-weight: 800;
  letter-spacing: var(--ls-3);
  color: var(--dark-400);
  margin-bottom: var(--sp-4);
}
.how__step-body {
  font-family: var(--font-body);
  font-size: var(--fs-3);
  line-height: var(--lh-5);
  color: var(--grey-600);
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
.testimonials { background: var(--page-bg); }
.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px,100%), 1fr));
  gap: clamp(var(--sp-5), 2vw, var(--sp-7));
}
.testimonial-card {
  background: var(--cream-100);
  border-radius: var(--r-5);
  padding: clamp(var(--sp-9),3vw,var(--sp-11));
  border: 1px solid var(--border-col-1);
  position: relative;
  transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
}
.testimonial-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(14,19,25,0.08);
}
.testimonial-card--featured {
  background: var(--dark-500);
  border-color: transparent;
}
.testimonial-quote {
  font-family: var(--font-body);
  font-size: var(--fs-5);
  line-height: var(--lh-6);
  color: var(--grey-700);
  margin-bottom: var(--sp-8);
  font-style: italic;
}
.testimonial-card--featured .testimonial-quote { color: var(--white-700); }

.testimonial-meta { display: flex; align-items: center; gap: var(--sp-5); }
.testimonial-avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--primary-200);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: var(--fs-4);
  font-weight: 800;
  color: var(--primary-700);
  flex-shrink: 0;
}
.testimonial-card--featured .testimonial-avatar {
  background: var(--primary-800);
  color: var(--primary-300);
}
.testimonial-name {
  font-family: var(--font-display);
  font-size: var(--fs-3);
  font-weight: 700;
  color: var(--dark-400);
}
.testimonial-card--featured .testimonial-name { color: var(--white-800); }
.testimonial-role {
  font-family: var(--font-body);
  font-size: var(--fs-1);
  color: var(--grey-500);
  margin-top: 2px;
}
.testimonial-card--featured .testimonial-role { color: var(--white-400); }
.testimonial-stars { color: #F5C842; font-size: 14px; margin-bottom: var(--sp-5); letter-spacing: 2px; }

/* ============================================================
   FIND A DEALER / CTA
   ============================================================ */
.dealer {
  background: var(--dark-500);
  position: relative;
  overflow: hidden;
}
.dealer::before {
  content: '';
  position: absolute;
  top: -30%; right: -15%;
  width: clamp(300px, 50vw, 700px);
  height: clamp(300px, 50vw, 700px);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(58,123,181,0.15) 0%, transparent 65%);
  pointer-events: none;
}
.dealer::after {
  content: '';
  position: absolute;
  bottom: -20%; left: -10%;
  width: clamp(200px, 35vw, 500px);
  height: clamp(200px, 35vw, 500px);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(90,138,98,0.08) 0%, transparent 65%);
  pointer-events: none;
}

.dealer__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(var(--sp-12), 6vw, var(--sp-15));
  align-items: start;
}
@media (min-width: 900px) {
  .dealer__inner { grid-template-columns: 1.2fr 1fr; }
}
.dealer__text .section-title { margin-bottom: var(--sp-7); }
.dealer__text .section-body { margin-bottom: var(--sp-9); }
.dealer__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-5);
  align-items: center;
}

/* Steps cards on right */
.dealer__steps {
  display: flex;
  flex-direction: column;
  gap: var(--sp-5);
}
.dealer__step-card {
  background: var(--white-100);
  border: 1px solid var(--white-200);
  border-radius: var(--r-4);
  padding: var(--sp-8) var(--sp-9);
  display: flex;
  gap: var(--sp-6);
  align-items: flex-start;
  transition: background 0.25s, border-color 0.25s;
}
.dealer__step-card:hover {
  background: var(--white-200);
  border-color: var(--white-300);
}
.dealer__step-num {
  font-family: var(--font-display);
  font-size: var(--fs-7);
  font-weight: 800;
  letter-spacing: var(--ls-2);
  color: var(--primary-400);
  line-height: 1;
  flex-shrink: 0;
}
.dealer__step-title {
  font-family: var(--font-display);
  font-size: var(--fs-4);
  font-weight: 700;
  letter-spacing: var(--ls-3);
  color: var(--white-800);
  margin-bottom: 4px;
}
.dealer__step-body {
  font-family: var(--font-body);
  font-size: var(--fs-3);
  line-height: var(--lh-5);
  color: var(--white-400);
}

/* ============================================================
   FAQ
   ============================================================ */
.faq { background: var(--cream-200); }
.faq__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(340px,100%), 1fr));
  gap: clamp(var(--sp-3), 1.5vw, var(--sp-5));
  margin-top: clamp(var(--sp-10), 5vw, var(--sp-12));
}
.faq__item {
  background: var(--cream-100);
  border-radius: var(--r-4);
  border: 1px solid var(--border-col-1);
  overflow: hidden;
}
.faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-5);
  padding: var(--sp-8) var(--sp-9);
  cursor: pointer;
  font-family: var(--font-display);
  font-size: var(--fs-4);
  font-weight: 700;
  letter-spacing: var(--ls-4);
  color: var(--dark-400);
  transition: color 0.2s;
  list-style: none;
  user-select: none;
}
.faq__question:hover { color: var(--primary-600); }
.faq__question::-webkit-details-marker { display: none; }
.faq__chevron {
  width: 20px; height: 20px;
  flex-shrink: 0;
  color: var(--grey-500);
  transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
}
details[open] .faq__chevron { transform: rotate(180deg); }
.faq__answer {
  padding: 0 var(--sp-9) var(--sp-8);
  font-family: var(--font-body);
  font-size: var(--fs-4);
  line-height: var(--lh-6);
  color: var(--grey-600);
  border-top: 1px solid var(--border-col-1);
}
.faq__answer p { padding-top: var(--sp-6); }

/* ============================================================
   NEWSLETTER / INTRO OFFER
   ============================================================ */
.intro {
  background: var(--mist-100);
  border-top: 1px solid var(--mist-200);
  border-bottom: 1px solid var(--mist-200);
}
.intro__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(var(--sp-9), 5vw, var(--sp-12));
  align-items: center;
  text-align: center;
}
@media (min-width: 760px) {
  .intro__inner {
    grid-template-columns: 1fr auto;
    text-align: left;
  }
}
.intro__title {
  font-size: var(--fs-7);
  font-weight: 800;
  letter-spacing: var(--ls-3);
  color: var(--dark-400);
  margin-bottom: var(--sp-4);
}
.intro__body {
  font-family: var(--font-body);
  font-size: var(--fs-4);
  color: var(--grey-600);
}
.intro__form {
  display: flex;
  gap: var(--sp-3);
  flex-wrap: wrap;
  justify-content: center;
}
@media (min-width: 760px) { .intro__form { justify-content: flex-end; } }
.intro__input {
  font-family: var(--font-body);
  font-size: var(--fs-4);
  color: var(--dark-400);
  background: #fff;
  border: 1.5px solid var(--border-col-2);
  border-radius: var(--r-3);
  padding: 14px 20px;
  width: clamp(200px, 30vw, 280px);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.intro__input:focus {
  border-color: var(--primary-400);
  box-shadow: 0 0 0 3px rgba(58,123,181,0.12);
}
.intro__input::placeholder { color: var(--grey-400); }

/* ============================================================
   FOOTER
   ============================================================ */
.footer {
  background: var(--dark-500);
  color: var(--white-500);
  padding-top: clamp(var(--sp-13), 8vw, var(--sp-15));
  padding-bottom: clamp(var(--sp-10), 5vw, var(--sp-12));
}
.footer__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(180px,100%), 1fr));
  gap: clamp(var(--sp-9), 4vw, var(--sp-12));
  margin-bottom: clamp(var(--sp-12), 6vw, var(--sp-15));
}
.footer__brand-name {
  font-family: var(--font-display);
  font-size: var(--fs-6);
  font-weight: 800;
  letter-spacing: var(--ls-3);
  color: var(--white-900);
  margin-bottom: var(--sp-5);
}
.footer__tagline {
  font-family: var(--font-body);
  font-size: var(--fs-3);
  line-height: var(--lh-6);
  color: var(--white-400);
  max-width: 28ch;
  margin-bottom: var(--sp-7);
}
.footer__social {
  display: flex;
  gap: var(--sp-4);
}
.footer__social-link {
  width: 36px; height: 36px;
  border-radius: var(--r-2);
  background: var(--white-100);
  border: 1px solid var(--white-200);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white-500);
  transition: background 0.2s, color 0.2s;
}
.footer__social-link:hover {
  background: var(--white-200);
  color: var(--white-800);
}
.footer__col-title {
  font-family: var(--font-display);
  font-size: var(--fs-2);
  font-weight: 700;
  letter-spacing: var(--ls-6);
  text-transform: uppercase;
  color: var(--white-700);
  margin-bottom: var(--sp-7);
}
.footer__links {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}
.footer__link {
  font-family: var(--font-body);
  font-size: var(--fs-4);
  color: var(--white-400);
  transition: color 0.2s;
}
.footer__link:hover { color: var(--white-800); }

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-5);
  padding-top: var(--sp-9);
  border-top: 1px solid var(--white-100);
}
.footer__copy {
  font-family: var(--font-body);
  font-size: var(--fs-2);
  color: var(--white-300);
}
.footer__legal {
  display: flex;
  gap: var(--sp-6);
  flex-wrap: wrap;
}
.footer__legal-link {
  font-family: var(--font-body);
  font-size: var(--fs-2);
  color: var(--white-300);
  transition: color 0.2s;
}
.footer__legal-link:hover { color: var(--white-600); }

/* ============================================================
   SECTION HEADER UTILITY
   ============================================================ */
.section-header {
  max-width: 640px;
  margin-bottom: clamp(var(--sp-11), 5vw, var(--sp-13));
}
.section-header--center { margin-inline: auto; text-align: center; }
.section-header--center .section-body { margin-inline: auto; }
.section-header .section-title { margin-bottom: var(--sp-6); }

/* ============================================================
   ANIMATIONS
   ============================================================ */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Scroll-triggered reveal via IntersectionObserver */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }

/* ============================================================
   RESPONSIVE TWEAKS
   ============================================================ */
@media (max-width: 600px) {
  .hero__title br { display: none; }
  .dealer__step-card { flex-direction: column; gap: var(--sp-4); }
  .dealer__step-num { font-size: var(--fs-6); }
}
    .hero__title br, .section-title br { display: none; }

  `
const page = () => {

  useEffect(() => {
    // Nav scroll effect
    const nav = document.getElementById("nav");

    const handleScroll = () => {
      if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 60);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Scroll reveal
    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -48px 0px",
      }
    );

    reveals.forEach((el) => revealObserver.observe(el));

    // ✅ Cleanup (VERY important in React)
    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
    };
  }, []);


  return (
    <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Movu — Gå trygt. Gå oppreist.</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap"
    rel="stylesheet"
  />
  <style>
  {styles}
    </style>
  {/* ────────────────────────────────────────────────
  ANNOUNCEMENT BAR
──────────────────────────────────────────────── */}
  <div className="announcement">
    🌿 Vårpris: Spar 15&nbsp;% på Movu rød — <a href="#order">Kjøp nå</a>
  </div>
  {/* ────────────────────────────────────────────────
  NAV
──────────────────────────────────────────────── */}
  <nav className="nav" id="nav">
    <div className="nav__inner">
      <a href="#" className="nav__logo">
        <div className="nav__logo-mark">
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 20L12 4L21 20" />
            <path d="M7 14h10" />
          </svg>
        </div>
        Movu
      </a>
      <div className="nav__links">
        <a href="#why" className="nav__link">
          Om Movu
        </a>
        <a href="#how" className="nav__link">
          Slik fungerer det
        </a>
        <a href="#testimonials" className="nav__link">
          Anmeldelser
        </a>
        <a href="#dealer" className="nav__link">
          Finn forhandler
        </a>
        <a href="#faq" className="nav__link">
          FAQ
        </a>
      </div>
      <a href="#order" className="btn btn-primary btn-sm nav__cta">
        Kjøp Movu
      </a>
      <button className="nav__mobile-menu" aria-label="Åpne meny">
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          <line x1={3} y1={6} x2={21} y2={6} />
          <line x1={3} y1={12} x2={21} y2={12} />
          <line x1={3} y1={18} x2={21} y2={18} />
        </svg>
      </button>
    </div>
  </nav>
  {/* ────────────────────────────────────────────────
  HERO
──────────────────────────────────────────────── */}
<section className="hero">
  <div className="hero__bg" />

  <div className="hero__container">
    {/* LEFT */}
    <div className="hero__content">
      <div className="hero__eyebrow">
        <span className="hero__eyebrow-dot" />
        Norsk design · Skandinavisk kvalitet
      </div>

      <h1 className="hero__title">
        Gå trygt.
        <br />
        Gå <em>oppreist</em>.<br />
        Gå Movu.
      </h1>

      <p className="hero__body">
        Movu er den moderne, norskutviklede trehjulede rullatoren som lar deg
        bevege deg med frihet og verdighet — ute i naturen, i byen, eller på
        kafé.
      </p>

      <div className="hero__actions">
        <a href="#order" className="btn btn-primary btn-lg">
          Kjøp Movu nå
        </a>

        <a
          href="#dealer"
          className="btn btn-outline btn-lg"
          style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}
        >
          Finn forhandler
        </a>
      </div>

      <div className="hero__social-proof">
        <div className="hero__avatars">
          <div className="hero__avatar">AK</div>
          <div className="hero__avatar">VE</div>
          <div className="hero__avatar">GR</div>
          <div className="hero__avatar">+</div>
        </div>

        <div>
          <div className="hero__stars">★★★★★</div>
          <div className="hero__proof-text">
            <strong>4.9/5</strong> basert på 200+ anmeldelser
          </div>
        </div>
      </div>
    </div>

    {/* RIGHT / IMAGE */}
    <div className="hero__media">
      <img
        src="/movu.webp"
        alt="Movu rullator"
        className="hero__image"
      />
    </div>
  </div>
</section>
  {/* ────────────────────────────────────────────────
  LOGO / MEDIA BAR
──────────────────────────────────────────────── */}
  <div className="logo-bar">
    <div className="logo-bar__inner">
      <span className="logo-bar__label">Omtalt i</span>
      <div className="logo-bar__items">
        <span className="logo-bar__item">NRK</span>
        <span className="logo-bar__sep">·</span>
        <span className="logo-bar__item">Dagbladet</span>
        <span className="logo-bar__sep">·</span>
        <span className="logo-bar__item">Aftenposten</span>
        <span className="logo-bar__sep">·</span>
        <span className="logo-bar__item">Senior Living</span>
        <span className="logo-bar__sep">·</span>
        <span className="logo-bar__item">Unicare</span>
      </div>
    </div>
  </div>
  {/* ────────────────────────────────────────────────
  3 PILLARS
──────────────────────────────────────────────── */}
  <section className="pillars section-pad">
    <div className="container">
      <div className="section-header section-header--center reveal">
        <div className="eyebrow">Tre kjerneverdier</div>
        <h2 className="section-title">
          Designet for livet slik det faktisk leves
        </h2>
      </div>
      <div className="pillars__grid">
        <div className="pillar-card reveal reveal-delay-1">
          <div className="pillar-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22V12M12 12l-4 4M12 12l4 4" />
              <circle cx={12} cy={7} r={3} />
              <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
            </svg>
          </div>
          <div className="pillar-number">01 — Stabilitet</div>
          <h3 className="pillar-title">Stabil kontroll</h3>
          <p className="pillar-body">
            Det store forhjulet og ergonomisk ratt gir deg intuitiv kontroll
            over fortauskanter, grusveier og snø. Du bestemmer retningen — Movu
            følger med.
          </p>
        </div>
        <div className="pillar-card reveal reveal-delay-2">
          <div className="pillar-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1={12} y1={2} x2={12} y2={22} />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="pillar-number">02 — Holdning</div>
          <h3 className="pillar-title">Oppreist holdning</h3>
          <p className="pillar-body">
            Justerbart ratt plassert i riktig høyde fremmer en naturlig,
            oppreist kroppsholdning. Avslappede skuldre. Hevet hode. Du møter
            verden i øyehøyde.
          </p>
        </div>
        <div className="pillar-card reveal reveal-delay-3">
          <div className="pillar-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div className="pillar-number">03 — Design</div>
          <h3 className="pillar-title">Skandinavisk design</h3>
          <p className="pillar-body">
            Norskt formet. Minimalt og tidløst. Movu er et hjelpemiddel du er
            stolt av å ta med — til butikken, kaféen eller fisketuren.
          </p>
        </div>
      </div>
    </div>
  </section>
  {/* ────────────────────────────────────────────────
  WHY MOVU — PROBLEM / SOLUTION
──────────────────────────────────────────────── */}
<section className="why section-pad" id="why">
  <div className="container">
    <div className="why__layout">
      
      {/* TEXT */}
      <div className="why__text">
        <div className="eyebrow reveal">Hvorfor Movu?</div>

        <h2 className="section-title reveal">
          En rullator som ikke
          <br />
          ser ut som en rullator
        </h2>

        <p className="section-body reveal" style={{ marginTop: "var(--sp-6)" }}>
          Tradisjonelle rullatorer er funksjonelle — men de sender et signal
          du kanskje ikke ønsker å sende. Movu er annerledes. Folk er
          nysgjerrige, ikke dømmende.
        </p>

        <div className="why__points" style={{ marginTop: "var(--sp-9)" }}>
          {/* points unchanged */}
        </div>

        <a href="#order" className="btn btn-dark btn-md reveal">
          Se Movu i detalj
        </a>
      </div>

      {/* VISUAL */}
      <div className="why__visual reveal">
        <div className="why__card-stack">

          {/* MAIN IMAGE CARD */}
          <div className="why__img-card why__img-card--main">
            <img
              src="/movu.webp"
              alt="Movu rullator"
              className="why__image"
            />

            {/* subtle overlay */}
            <div className="why__image-overlay" />

            {/* rating badge */}
            <div className="why__badge">
              <span className="why__stars">★★★★★</span>
              <span className="why__rating">4.9 / 5</span>
            </div>
          </div>

          {/* ACCENT CARD */}
          <div className="why__img-card why__img-card--accent">
            <div className="why__stat">
              <div className="why__stat-num">2 800&nbsp;kr</div>
              <div className="why__stat-label">
                Fra
                <br />
                fri frakt inkludert
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>
  {/* ────────────────────────────────────────────────
  HOW IT WORKS
──────────────────────────────────────────────── */}
  <section className="how section-pad" id="how">
    <div className="container">
      <div className="section-header section-header--center reveal">
        <div className="eyebrow">Kom i gang</div>
        <h2 className="section-title">Enkelt fra start</h2>
        <p className="section-body" style={{ marginTop: "var(--sp-5)" }}>
          Fra bestilling til første tur — fire enkle steg.
        </p>
      </div>
      <div className="how__grid">
        <div className="how__step reveal reveal-delay-1">
          <div className="how__step-num">1</div>
          <h3 className="how__step-title">Finn en partner</h3>
          <p className="how__step-body">
            Bruk vår forhandlerkart og finn nærmeste showroom, eller bestill
            direkte i nettbutikk.
          </p>
        </div>
        <div className="how__step reveal reveal-delay-2">
          <div className="how__step-num">2</div>
          <h3 className="how__step-title">Få en intro</h3>
          <p className="how__step-body">
            En av våre partnere viser deg Movu personlig og setter opp ratthøyde
            og tilbehør tilpasset deg.
          </p>
        </div>
        <div className="how__step reveal reveal-delay-3">
          <div className="how__step-num">3</div>
          <h3 className="how__step-title">Ta den hjem</h3>
          <p className="how__step-body">
            Movu leveres til døren eller hentes i butikk. Klar til bruk innen
            minutter.
          </p>
        </div>
        <div className="how__step reveal reveal-delay-4">
          <div className="how__step-num">4</div>
          <h3 className="how__step-title">Start din reise</h3>
          <p className="how__step-body">
            Gå ut. Nyt hverdagen. Movu støtter deg — og vi er her om du trenger
            hjelp.
          </p>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "clamp(var(--sp-11),5vw,var(--sp-13))"
        }}
        className="reveal"
      >
        <a href="#dealer" className="btn btn-primary btn-lg">
          Finn din forhandler
          <svg
            className="btn-icon btn-icon-right"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </a>
      </div>
    </div>
  </section>
  {/* ────────────────────────────────────────────────
  TESTIMONIALS
──────────────────────────────────────────────── */}
  <section className="testimonials section-pad" id="testimonials">
    <div className="container">
      <div className="section-header section-header--center reveal">
        <div className="eyebrow">Kundeanmeldelser</div>
        <h2 className="section-title">Hva brukerne sier</h2>
      </div>
      <div className="testimonials__grid">
        <div className="testimonial-card reveal reveal-delay-1">
          <div className="testimonial-stars">★★★★★</div>
          <p className="testimonial-quote">
            "Jeg går ofte ute i bymiljøet — grus, kanter, bommer. Har ikke hatt
            noe problem. Jeg drar bare litt i rattet og suser videre."
          </p>
          <div className="testimonial-meta">
            <div className="testimonial-avatar">AK</div>
            <div>
              <div className="testimonial-name">Anne Kari</div>
              <div className="testimonial-role">Oslo · Daglig bruker</div>
            </div>
          </div>
        </div>
        <div className="testimonial-card testimonial-card--featured reveal reveal-delay-2">
          <div className="testimonial-stars">★★★★★</div>
          <p className="testimonial-quote">
            "Jeg har fått kommentarer om at jeg går rettere i ryggen etter at
            jeg begynte å bruke Movu. Det betyr alt."
          </p>
          <div className="testimonial-meta">
            <div className="testimonial-avatar">GR</div>
            <div>
              <div className="testimonial-name">Grete</div>
              <div className="testimonial-role">Bergen · Bruker siden 2023</div>
            </div>
          </div>
        </div>
        <div className="testimonial-card reveal reveal-delay-3">
          <div className="testimonial-stars">★★★★★</div>
          <p className="testimonial-quote">
            "Den er så lett å ta med i bilen. Jeg elsker å gå tur ved sjøen —
            legger bare Movu i bagasjerommet og durer av gårde."
          </p>
          <div className="testimonial-meta">
            <div className="testimonial-avatar">VE</div>
            <div>
              <div className="testimonial-name">Vera</div>
              <div className="testimonial-role">Stavanger · Turgåer</div>
            </div>
          </div>
        </div>
        <div className="testimonial-card reveal reveal-delay-4">
          <div className="testimonial-stars">★★★★★</div>
          <p className="testimonial-quote" style={{ fontStyle: "normal" }}>
            "Movu er et genialt hjelpemiddel. Den gir god stabilitet og er enkel
            å håndtere — jeg anbefaler den til mine pasienter."
          </p>
          <div className="testimonial-meta">
            <div className="testimonial-avatar">DR</div>
            <div>
              <div className="testimonial-name">Dr. Thorp</div>
              <div className="testimonial-role">Spesialist, Unicare</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ────────────────────────────────────────────────
  FIND A DEALER / GET STARTED
──────────────────────────────────────────────── */}
  <section className="dealer section-pad" id="dealer">
    <div className="container">
      <div className="dealer__inner">
        <div className="dealer__text">
          <div className="eyebrow eyebrow--light reveal">Kom i gang</div>
          <h2 className="section-title section-title--light reveal">
            Finn din
            <br />
            nærmeste partner
          </h2>
          <p
            className="section-body section-body--light reveal"
            style={{ marginTop: "var(--sp-6)" }}
          >
            Over 28 forhandlere over hele Norge. Bestill online med fri frakt,
            eller besøk en showroom for en personlig introduksjon.
          </p>
          <div
            className="dealer__actions reveal"
            style={{ marginTop: "var(--sp-9)" }}
          >
            <a href="#" className="btn btn-primary btn-lg">
              Finn forhandler
              <svg
                className="btn-icon btn-icon-right"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </a>
            <a
              href="#order"
              className="btn btn-ghost btn-lg"
              style={{
                color: "rgba(255,255,255,0.65)",
                borderBottomColor: "transparent"
              }}
            >
              Bestill online
            </a>
          </div>
        </div>
        <div className="dealer__steps reveal">
          <div className="dealer__step-card">
            <div className="dealer__step-num">01</div>
            <div>
              <div className="dealer__step-title">Søk etter postnummer</div>
              <p className="dealer__step-body">
                Finn nærmeste utsalgssted på kartet vårt og se åpningstider og
                kontaktinfo.
              </p>
            </div>
          </div>
          <div className="dealer__step-card">
            <div className="dealer__step-num">02</div>
            <div>
              <div className="dealer__step-title">Book en introduksjon</div>
              <p className="dealer__step-body">
                Vår forhandler setter opp Movu personlig — vi justerer ratthøyde
                og tilbehør til deg.
              </p>
            </div>
          </div>
          <div className="dealer__step-card">
            <div className="dealer__step-num">03</div>
            <div>
              <div className="dealer__step-title">Kom deg ut</div>
              <p className="dealer__step-body">
                Ta første tur samme dag. Vi er tilgjengelige om du har spørsmål
                underveis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ────────────────────────────────────────────────
  NEWSLETTER / INTRO OFFER
──────────────────────────────────────────────── */}
  <section className="intro section-pad--sm">
    <div className="container">
      <div className="intro__inner reveal">
        <div>
          <h3 className="intro__title">Hold deg oppdatert fra Movu</h3>
          <p className="intro__body">
            Nyheter, tips og tilbud — rett i innboksen din.
          </p>
        </div>
        <div className="intro__form">
          <input
            type="email"
            className="intro__input"
            placeholder="Din e-postadresse"
            aria-label="E-post"
          />
          <button className="btn btn-primary btn-md">Meld meg på</button>
        </div>
      </div>
    </div>
  </section>
  {/* ────────────────────────────────────────────────
  FAQ
──────────────────────────────────────────────── */}
  <section className="faq section-pad" id="faq">
    <div className="container">
      <div className="section-header section-header--center reveal">
        <div className="eyebrow">Ofte stilte spørsmål</div>
        <h2 className="section-title">Har du spørsmål?</h2>
      </div>
      <div className="faq__grid">
        <details className="faq__item reveal reveal-delay-1">
          <summary className="faq__question">
            Hva skiller Movu fra en tradisjonell rullator?
            <svg
              className="faq__chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <div className="faq__answer">
            <p>
              Movu har tre hjul og et stort forhjul som gir bedre
              fremkommelighet og et langt mer moderne utseende. Den fremmer en
              oppreist holdning, er sammenfoldbar for transport, og har et
              integrert LED-lys for synlighet i mørket.
            </p>
          </div>
        </details>
        <details className="faq__item reveal reveal-delay-2">
          <summary className="faq__question">
            Kan jeg prøve Movu før jeg kjøper?
            <svg
              className="faq__chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <div className="faq__answer">
            <p>
              Absolutt. Vi har over 28 forhandlere i Norge. Bruk kartet vårt for
              å finne nærmeste showroom, og book en gratis intro-time der vi
              setter opp Movu personlig for deg.
            </p>
          </div>
        </details>
        <details className="faq__item reveal reveal-delay-3">
          <summary className="faq__question">
            Hva er returrettighetene?
            <svg
              className="faq__chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <div className="faq__answer">
            <p>
              Vi tilbyr 30 dagers angrerett. Ikke fornøyd? Vi henter Movu gratis
              og refunderer fullt beløp innen 5 virkedager.
            </p>
          </div>
        </details>
        <details className="faq__item reveal reveal-delay-4">
          <summary className="faq__question">
            Passer Movu utendørs og innendørs?
            <svg
              className="faq__chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <div className="faq__answer">
            <p>
              Ja. Movu er designet for begge. Det store forhjulet takler grus,
              fortauskanter og snø utendørs, og den kompakte bredden gjør den
              like enkel å manøvrere i butikk og hjemme.
            </p>
          </div>
        </details>
        <details className="faq__item reveal reveal-delay-1">
          <summary className="faq__question">
            Finnes det ekstrautstyr?
            <svg
              className="faq__chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <div className="faq__answer">
            <p>
              Ja — vi tilbyr kurver, ryggsekker, drikkeholdere og refleksutstyr
              i vår tilbehørsbutikk. Alt er designet for å matche Movus
              estetikk.
            </p>
          </div>
        </details>
        <details className="faq__item reveal reveal-delay-2">
          <summary className="faq__question">
            Finnes det brukerhåndbok?
            <svg
              className="faq__chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <div className="faq__answer">
            <p>
              Ja. Full brukerhåndbok (norsk og engelsk) følger med og er
              tilgjengelig for nedlasting på vår nettside. Du finner den under
              Kundeservice → Brukerhåndbok.
            </p>
          </div>
        </details>
      </div>
    </div>
  </section>
  {/* ────────────────────────────────────────────────
  FOOTER
──────────────────────────────────────────────── */}
  <footer className="footer">
    <div className="container">
      <div className="footer__grid">
        <div>
          <div className="footer__brand-name">Movu</div>
          <p className="footer__tagline">
            Et norsk selskap som ønsker at flere skal oppleve mestring, natur og
            sosiale møteplasser i hverdagen.
          </p>
          <div className="footer__social">
            <a
              href="https://www.facebook.com/MyMovu"
              className="footer__social-link"
              aria-label="Facebook"
              target="_blank"
              rel="noopener"
            >
              <svg
                width={16}
                height={16}
                viewBox="2 2 16 16"
                fill="currentColor"
              >
                <path d="M18 10.049C18 5.603 14.419 2 10 2c-4.419 0-8 3.603-8 8.049C2 14.067 4.925 17.396 8.75 18v-5.624H6.719v-2.328h2.03V8.275c0-2.017 1.195-3.132 3.023-3.132.874 0 1.79.158 1.79.158v1.98h-1.009c-.994 0-1.303.621-1.303 1.258v1.51h2.219l-.355 2.326H11.25V18c3.825-.604 6.75-3.933 6.75-7.951Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/mymovu/"
              className="footer__social-link"
              aria-label="Instagram"
              target="_blank"
              rel="noopener"
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <div className="footer__col-title">Produkter</div>
          <ul className="footer__links">
            <li>
              <a href="#" className="footer__link">
                Kjøp Movu
              </a>
            </li>
            <li>
              <a href="#" className="footer__link">
                Ekstrautstyr
              </a>
            </li>
            <li>
              <a href="#" className="footer__link">
                Alle farger
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="footer__col-title">Kundeservice</div>
          <ul className="footer__links">
            <li>
              <a href="#" className="footer__link">
                Kontakt oss
              </a>
            </li>
            <li>
              <a href="#faq" className="footer__link">
                Ofte stilte spørsmål
              </a>
            </li>
            <li>
              <a href="#" className="footer__link">
                Brukerhåndbok
              </a>
            </li>
            <li>
              <a href="#" className="footer__link">
                Retur &amp; angrerett
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="footer__col-title">Om oss</div>
          <ul className="footer__links">
            <li>
              <a href="#" className="footer__link">
                Om Movu Mobility
              </a>
            </li>
            <li>
              <a href="#dealer" className="footer__link">
                Finn forhandler
              </a>
            </li>
            <li>
              <a href="#" className="footer__link">
                Aktuelt
              </a>
            </li>
            <li>
              <a href="#" className="footer__link">
                Media
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__copy">
          © 2026 Movu Mobility AS. Alle rettigheter forbeholdt.
        </p>
        <div className="footer__legal">
          <a href="#" className="footer__legal-link">
            Personvern
          </a>
          <a href="#" className="footer__legal-link">
            Kjøpsbetingelser
          </a>
          <a href="#" className="footer__legal-link">
            Fraktsretningslinjer
          </a>
        </div>
      </div>
    </div>
  </footer>
  {/* ────────────────────────────────────────────────
  SCRIPTS
──────────────────────────────────────────────── */}
</>

  )
}

export default page
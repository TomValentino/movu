import Link from 'next/link'

export function StoreNav() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Manrope:wght@400;500;600&display=swap');
        .sn-nav {
          background: #FDFCFA;
          border-bottom: 1.5px solid rgba(180,165,150,0.3);
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(1.25rem, 5vw, 2.5rem);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .sn-logo {
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #1A1614;
          text-decoration: none;
        }
        .sn-right {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.72rem;
          color: #A8998E;
          letter-spacing: 0.04em;
        }
        .sn-right svg { opacity: 0.55; }
      `}</style>
      <nav className="sn-nav">
        <Link href="/" className="sn-logo">Midnight Muse</Link>
        <span className="sn-right">
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
            <path d="M6 1L1 3.5V7c0 2.76 2.16 5.34 5 5.95C8.84 12.34 11 9.76 11 7V3.5L6 1Z" stroke="currentColor" strokeWidth="1.1"/>
          </svg>
          Secure checkout
        </span>
      </nav>
    </>
  )
}
export function StoreFooter() {
  return (
    <>
      <style>{`
        .sf-footer {
          border-top: 1px solid rgba(180,165,150,0.2);
          background: #FDFCFA;
          padding: 1.5rem clamp(1.25rem, 5vw, 2.5rem);
        }
        .sf-inner {
          max-width: 1080px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .sf-copy {
          font-family: 'Manrope', sans-serif;
          font-size: 0.75rem;
          color: #C9BDB5;
        }
        .sf-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .sf-trust {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .sf-trust-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.72rem;
          color: #C9BDB5;
        }
        .sf-trust-item svg { opacity: 0.5; }
        .sf-legal {
          display: flex;
          gap: 14px;
        }
        .sf-legal a {
          font-family: 'Manrope', sans-serif;
          font-size: 0.72rem;
          color: #C9BDB5;
          text-decoration: none;
          transition: color 150ms;
        }
        .sf-legal a:hover { color: #1A1614; }
        @media (max-width: 640px) {
          .sf-inner { flex-direction: column; align-items: flex-start; gap: 10px; }
          .sf-right { flex-wrap: wrap; }
        }
      `}</style>
      <footer className="sf-footer">
        <div className="sf-inner">
          <span className="sf-copy">© {new Date().getFullYear()} Midnight Muse</span>
          <div className="sf-right">
      
            <div className="sf-legal">
              <a href="/pages/privacy">Refunds</a>
              <a href="/pages/privacy">Privacy</a>
              <a href="/pages/terms">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
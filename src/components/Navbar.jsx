import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// 👇 CHANGE to your real details
const WHATSAPP_NUMBER = '2347012983524';
const PHONE_NUMBER = '+2347012983524';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/cars', label: 'Cars' },
  { to: '/about', label: 'About' },
  { to: '/sell', label: 'Sell Your Car' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        .sa-nav * { box-sizing: border-box; }

        .sa-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1.1rem 2rem;
          transition: background 0.3s ease, backdrop-filter 0.3s ease,
                      padding 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          border-bottom: 1px solid transparent;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .sa-nav.scrolled {
          background: rgba(10, 12, 15, 0.85);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border-bottom-color: rgba(255, 255, 255, 0.06);
          padding: 0.75rem 2rem;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }

        .sa-nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        /* ============ LOGO ============ */
        .sa-logo {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          text-decoration: none;
          color: #fff;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .sa-logo:hover { transform: translateY(-1px); }

        .sa-logo-mark {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: #ff4d1c;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 6px 20px rgba(255, 77, 28, 0.4);
          flex-shrink: 0;
        }
        .sa-logo-mark svg {
          width: 22px;
          height: 22px;
        }

        .sa-logo-text {
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .sa-logo-start {
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
        }
        .sa-logo-autos {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ff4d1c;
        }

        /* ============ LINKS ============ */
        .sa-nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex: 1;
          justify-content: center;
        }
        .sa-nav-link {
          position: relative;
          padding: 0.6rem 1rem;
          color: rgba(232, 234, 237, 0.72);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
        }
        .sa-nav-link:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.05);
        }
        .sa-nav-link.active {
          color: #ff4d1c;
          font-weight: 600;
        }
        .sa-nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ff4d1c;
        }

        /* ============ ACTIONS ============ */
        .sa-nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .sa-nav-phone {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(232, 234, 237, 0.75);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.55rem 0.9rem;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
        }
        .sa-nav-phone:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.05);
        }
        .sa-nav-phone svg {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        .sa-nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.2rem;
          background: #ff4d1c;
          color: #fff;
          text-decoration: none;
          border-radius: 100px;
          font-size: 0.87rem;
          font-weight: 700;
          transition: all 0.25s;
          box-shadow: 0 4px 16px rgba(255, 77, 28, 0.35);
          white-space: nowrap;
        }
        .sa-nav-cta:hover {
          background: #ff6a3d;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(255, 77, 28, 0.5);
          color: #fff;
        }
        .sa-nav-cta svg {
          width: 15px;
          height: 15px;
        }

        /* ============ HAMBURGER ============ */
        .sa-hamburger {
          display: none;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 0;
          transition: background 0.2s;
        }
        .sa-hamburger:hover { background: rgba(255, 255, 255, 0.1); }
        .sa-hamburger span {
          display: block;
          width: 18px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }

        /* ============ MOBILE DRAWER ============ */
        .sa-mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 98;
          animation: sa-fadeIn 0.2s ease-out;
        }
        @keyframes sa-fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .sa-mobile-drawer {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 320px;
          max-width: 85vw;
          background: #0d1015;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 99;
          padding: 1.5rem 1.5rem 2rem;
          flex-direction: column;
          overflow-y: auto;
          animation: sa-slideIn 0.3s cubic-bezier(0.2, 0.9, 0.3, 1);
        }
        @keyframes sa-slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .sa-mobile-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 1.5rem;
        }
        .sa-mobile-close {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 1.4rem;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: all 0.2s;
        }
        .sa-mobile-close:hover {
          background: rgba(255, 77, 28, 0.15);
          border-color: rgba(255, 77, 28, 0.3);
          color: #ff4d1c;
        }

        .sa-mobile-links {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 2rem;
        }
        .sa-mobile-link {
          padding: 0.9rem 1rem;
          color: rgba(232, 234, 237, 0.8);
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          border-radius: 10px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sa-mobile-link:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }
        .sa-mobile-link.active {
          background: rgba(255, 77, 28, 0.12);
          color: #ff4d1c;
        }
        .sa-mobile-link svg {
          width: 14px;
          height: 14px;
          opacity: 0.5;
        }

        .sa-mobile-actions {
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .sa-mobile-phone {
          padding: 0.9rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          text-decoration: none;
          border-radius: 10px;
          font-size: 0.92rem;
          font-weight: 600;
          text-align: center;
          transition: all 0.2s;
        }
        .sa-mobile-phone:hover {
          border-color: rgba(255, 77, 28, 0.4);
          color: #ff4d1c;
        }
        .sa-mobile-wa {
          padding: 0.9rem;
          background: #ff4d1c;
          color: #fff;
          text-decoration: none;
          border-radius: 10px;
          font-size: 0.92rem;
          font-weight: 700;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 6px 20px rgba(255, 77, 28, 0.35);
          transition: all 0.2s;
        }
        .sa-mobile-wa:hover {
          background: #ff6a3d;
          color: #fff;
        }
        .sa-mobile-wa svg { width: 16px; height: 16px; }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 1024px) {
          .sa-nav-phone { display: none; }
        }

        @media (max-width: 900px) {
          .sa-nav-links { display: none; }
          .sa-nav-cta { display: none; }
          .sa-hamburger { display: flex; }
          .sa-mobile-overlay,
          .sa-mobile-drawer { display: flex; }
        }

        @media (max-width: 560px) {
          .sa-nav { padding: 0.85rem 1.25rem; }
          .sa-nav.scrolled { padding: 0.6rem 1.25rem; }
          .sa-logo-mark { width: 36px; height: 36px; }
          .sa-logo-start,
          .sa-logo-autos { font-size: 1rem; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className={`sa-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="sa-nav-inner">
          <Link to="/" className="sa-logo">
            <div className="sa-logo-mark">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </div>
            <div className="sa-logo-text">
              <span className="sa-logo-start">Star</span>
              <span className="sa-logo-autos">Autos</span>
            </div>
          </Link>

          <div className="sa-nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`sa-nav-link ${isActive(link.to) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="sa-nav-actions">
            <a href={`tel:${PHONE_NUMBER}`} className="sa-nav-phone">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {PHONE_NUMBER}
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sa-nav-cta"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>

            <button
              className="sa-hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <>
          <div
            className="sa-mobile-overlay"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="sa-mobile-drawer">
            <div className="sa-mobile-head">
              <Link to="/" className="sa-logo" onClick={() => setMobileOpen(false)}>
                <div className="sa-logo-mark">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                  </svg>
                </div>
                <div className="sa-logo-text">
                  <span className="sa-logo-start">Start</span>
                  <span className="sa-logo-autos">Autos</span>
                </div>
              </Link>
              <button
                className="sa-mobile-close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <nav className="sa-mobile-links">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`sa-mobile-link ${isActive(link.to) ? 'active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              ))}
            </nav>

            <div className="sa-mobile-actions">
              <a href={`tel:${PHONE_NUMBER}`} className="sa-mobile-phone">
                📞 Call {PHONE_NUMBER}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sa-mobile-wa"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
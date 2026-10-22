import React from 'react';
import { Link } from 'react-router-dom';

// 👇 CHANGE to your real details
const WHATSAPP_NUMBER = '2347012983524';
const PHONE_NUMBER = '+2347012983524';
const EMAIL = 'hello@startautos.com';
const ADDRESS = '1 Shoretire Street, Orile Agege, Lagos';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/cars', label: 'Browse Cars' },
  { to: '/about', label: 'About Us' },
  { to: '/sell', label: 'Sell Your Car' },
  { to: '/contact', label: 'Contact' },
];

const carBrands = [
  'Toyota',
  'Lexus',
  'Mercedes-Benz',
  'Honda',
  'Range Rover',
];

const socials = [
  {
    label: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .sa-footer * { box-sizing: border-box; }

        .sa-footer {
          background: #08090b;
          color: #e8eaed;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          position: relative;
          overflow: hidden;
        }
        .sa-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 77, 28, 0.5), transparent);
        }

        .sa-footer-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4.5rem 2rem 3rem;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
          gap: 3rem;
        }

        /* ============ BRAND COLUMN ============ */
        .sa-footer-brand {}

        .sa-footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          text-decoration: none;
          color: #fff;
          margin-bottom: 1.25rem;
        }
        .sa-footer-logo-mark {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: #ff4d1c;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 6px 20px rgba(255, 77, 28, 0.35);
          flex-shrink: 0;
        }
        .sa-footer-logo-mark svg {
          width: 22px;
          height: 22px;
        }
        .sa-footer-logo-text {
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .sa-footer-logo-start {
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
        }
        .sa-footer-logo-autos {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ff4d1c;
        }

        .sa-footer-tagline {
          font-size: 0.92rem;
          color: rgba(232, 234, 237, 0.55);
          line-height: 1.7;
          margin: 0 0 1.5rem;
          max-width: 320px;
        }

        .sa-socials {
          display: flex;
          gap: 0.5rem;
        }
        .sa-social {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(232, 234, 237, 0.7);
          transition: all 0.25s;
          text-decoration: none;
        }
        .sa-social:hover {
          background: rgba(255, 77, 28, 0.15);
          border-color: rgba(255, 77, 28, 0.4);
          color: #ff4d1c;
          transform: translateY(-2px);
        }
        .sa-social svg {
          width: 16px;
          height: 16px;
        }

        /* ============ COLUMNS ============ */
        .sa-footer-col h4 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #fff;
          margin: 0 0 1.25rem;
        }
        .sa-footer-col a {
          display: block;
          color: rgba(232, 234, 237, 0.6);
          text-decoration: none;
          font-size: 0.9rem;
          padding: 0.35rem 0;
          transition: color 0.2s, padding-left 0.2s;
        }
        .sa-footer-col a:hover {
          color: #ff4d1c;
          padding-left: 4px;
        }

        /* ============ CONTACT COLUMN ============ */
        .sa-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.7rem;
          padding: 0.55rem 0;
          color: rgba(232, 234, 237, 0.65);
          text-decoration: none;
          font-size: 0.9rem;
          line-height: 1.5;
          transition: color 0.2s;
        }
        .sa-contact-item:hover { color: #ff4d1c; }
        .sa-contact-icon {
          color: #ff4d1c;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .sa-contact-icon svg {
          width: 15px;
          height: 15px;
        }

        /* ============ BOTTOM ============ */
        .sa-footer-bottom {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.5rem 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          font-size: 0.82rem;
          color: rgba(232, 234, 237, 0.4);
        }
        .sa-footer-copy {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .sa-footer-copy strong {
          color: rgba(232, 234, 237, 0.7);
          font-weight: 600;
        }
        .sa-footer-legal {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .sa-footer-legal a {
          color: rgba(232, 234, 237, 0.5);
          text-decoration: none;
          transition: color 0.2s;
        }
        .sa-footer-legal a:hover { color: #ff4d1c; }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 1024px) {
          .sa-footer-inner {
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 2.5rem;
          }
          .sa-footer-inner > div:nth-child(4) {
            grid-column: span 3;
          }
        }

        @media (max-width: 768px) {
          .sa-footer-inner {
            grid-template-columns: 1fr 1fr;
            padding: 3.5rem 1.5rem 2rem;
            gap: 2rem;
          }
          .sa-footer-inner > div:nth-child(4) {
            grid-column: span 2;
          }
          .sa-footer-brand {
            grid-column: span 2;
          }
        }

        @media (max-width: 560px) {
          .sa-footer-inner {
            grid-template-columns: 1fr;
            padding: 3rem 1.25rem 1.5rem;
            gap: 2rem;
          }
          .sa-footer-inner > div {
            grid-column: span 1 !important;
          }
          .sa-footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
            padding: 1.25rem;
          }
          .sa-footer-legal {
            gap: 1rem;
          }
        }
      `}</style>

      <footer className="sa-footer">
        <div className="sa-footer-inner">
          {/* BRAND */}
          <div className="sa-footer-brand">
            <Link to="/" className="sa-footer-logo">
              <div className="sa-footer-logo-mark">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
              </div>
              <div className="sa-footer-logo-text">
                <span className="sa-footer-logo-start">Start</span>
                <span className="sa-footer-logo-autos">Autos</span>
              </div>
            </Link>

            <p className="sa-footer-tagline">
              Quality brand-new and foreign-used cars in Lagos. Fully inspected,
              honestly priced, and delivered with care.
            </p>

            <div className="sa-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="sa-social"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="sa-footer-col">
            <h4>Quick Links</h4>
            {quickLinks.map((l) => (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* BRANDS */}
          <div className="sa-footer-col">
            <h4>Brands</h4>
            {carBrands.map((brand) => (
              <Link
                key={brand}
                to={`/cars?brand=${encodeURIComponent(brand)}`}
              >
                {brand}
              </Link>
            ))}
          </div>

          {/* CONTACT */}
          <div className="sa-footer-col">
            <h4>Get in Touch</h4>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="sa-contact-item"
            >
              <span className="sa-contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              {PHONE_NUMBER}
            </a>
            <a href={`mailto:${EMAIL}`} className="sa-contact-item">
              <span className="sa-contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              {EMAIL}
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sa-contact-item"
            >
              <span className="sa-contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              {ADDRESS}
            </a>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="sa-footer-bottom">
          <div className="sa-footer-copy">
            © {new Date().getFullYear()} <strong>Start Autos</strong>. All rights reserved.
          </div>
          <div className="sa-footer-legal">
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
}
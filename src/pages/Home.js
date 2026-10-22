import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('dc-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.dc-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        .dc-home {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #0a0c0f;
          color: #e8eaed;
          min-height: 100vh;
          overflow-x: hidden;
        }
        .dc-home * { box-sizing: border-box; }

        /* ============ HERO ============ */
        .dc-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 2rem 4rem;
          overflow: hidden;
        }
        .dc-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          animation: dc-zoom 22s ease-in-out infinite alternate;
        }
        @keyframes dc-zoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1.16); }
        }
        .dc-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at center, rgba(10,12,15,0.25) 0%, rgba(10,12,15,0.9) 75%),
            linear-gradient(to bottom, rgba(10,12,15,0.85) 0%, rgba(10,12,15,0.35) 40%, rgba(10,12,15,0.98) 100%);
        }
        .dc-hero-content {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          text-align: center;
          width: 100%;
        }
        .dc-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255,77,28,0.12);
          border: 1px solid rgba(255,77,28,0.35);
          border-radius: 100px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #ff7a3d;
          margin-bottom: 2rem;
          letter-spacing: 0.02em;
          animation: dc-fadeUp 0.8s 0.1s both;
        }
        .dc-badge-dot {
          width: 7px;
          height: 7px;
          background: #ff4d1c;
          border-radius: 50%;
          animation: dc-pulse 2s infinite;
        }
        @keyframes dc-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(255,77,28,0.7); }
          70%  { box-shadow: 0 0 0 10px rgba(255,77,28,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,77,28,0); }
        }
        .dc-hero-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -0.03em;
          margin: 0 0 1.5rem;
          animation: dc-fadeUp 0.8s 0.2s both;
        }
        .dc-hero-title .dc-accent {
          color: #ff4d1c;
          font-style: italic;
        }
        .dc-hero-sub {
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          color: rgba(232,234,237,0.7);
          max-width: 620px;
          margin: 0 auto 3rem;
          line-height: 1.6;
          animation: dc-fadeUp 0.8s 0.3s both;
        }

        /* ============ SEARCH BAR ============ */
        .dc-search {
          display: flex;
          gap: 0.4rem;
          max-width: 880px;
          margin: 0 auto;
          padding: 0.6rem;
          background: rgba(21,24,29,0.85);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.55);
          animation: dc-fadeUp 0.8s 0.4s both;
          flex-wrap: wrap;
        }
        .dc-search-field {
          flex: 1;
          min-width: 140px;
          display: flex;
          flex-direction: column;
          padding: 0.6rem 1rem;
          border-radius: 12px;
          transition: background 0.2s;
        }
        .dc-search-field:hover { background: rgba(255,255,255,0.03); }
        .dc-search-field label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(232,234,237,0.5);
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .dc-search-field select {
          background: transparent;
          border: none;
          color: #e8eaed;
          font-size: 0.95rem;
          font-weight: 500;
          outline: none;
          padding: 0;
          font-family: inherit;
          width: 100%;
          cursor: pointer;
        }
        .dc-search-field select option { background: #15181d; color: #e8eaed; }
        .dc-search-btn {
          padding: 1.1rem 2rem;
          background: #ff4d1c;
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 0.95rem;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          transition: all 0.25s;
          box-shadow: 0 8px 24px rgba(255,77,28,0.35);
        }
        .dc-search-btn:hover {
          background: #ff6a3d;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(255,77,28,0.5);
        }

        @keyframes dc-fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ============ BRANDS ============ */
        .dc-brands {
          padding: 2.5rem 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: #0d1015;
        }
        .dc-brands-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .dc-brand {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: rgba(232,234,237,0.35);
          transition: color 0.3s;
          text-transform: uppercase;
        }
        .dc-brand:hover { color: rgba(232,234,237,0.85); }

        /* ============ SECTIONS ============ */
        .dc-section {
          padding: 6rem 2rem;
          max-width: 1300px;
          margin: 0 auto;
        }
        .dc-section-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .dc-eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #ff4d1c;
          margin-bottom: 0.75rem;
        }
        .dc-section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.1;
        }
        .dc-view-all {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #e8eaed;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.92rem;
          padding: 0.65rem 1.2rem;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          transition: all 0.25s;
        }
        .dc-view-all:hover {
          border-color: #ff4d1c;
          color: #ff4d1c;
          transform: translateX(3px);
        }

        /* ============ CARS GRID ============ */
        .dc-cars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        /* ============ WHY ============ */
        .dc-why {
          padding: 6rem 2rem;
          background: #0d1015;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .dc-why-inner { max-width: 1300px; margin: 0 auto; }
        .dc-why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
        }
        .dc-why-card {
          padding: 2rem 1.75rem;
          background: #14171c;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          transition: all 0.3s;
        }
        .dc-why-card:hover {
          border-color: rgba(255,77,28,0.3);
          transform: translateY(-4px);
        }
        .dc-why-icon {
          width: 52px;
          height: 52px;
          background: rgba(255,77,28,0.12);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          margin-bottom: 1.25rem;
        }
        .dc-why-card h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 0.6rem;
        }
        .dc-why-card p {
          font-size: 0.92rem;
          color: rgba(232,234,237,0.6);
          line-height: 1.65;
          margin: 0;
        }

        /* ============ STATS ============ */
        .dc-stats {
          padding: 5rem 2rem;
          max-width: 1300px;
          margin: 0 auto;
        }
        .dc-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .dc-stat {
          text-align: center;
          padding: 2rem 1rem;
          border-left: 1px solid rgba(255,255,255,0.06);
        }
        .dc-stat:first-child { border-left: none; }
        .dc-stat-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #ff4d1c;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .dc-stat-label {
          font-size: 0.8rem;
          color: rgba(232,234,237,0.55);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
        }

        /* ============ CTA ============ */
        .dc-cta {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #0f1217 0%, #1a1010 100%);
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .dc-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255,77,28,0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .dc-cta-inner {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .dc-cta h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 1.25rem;
        }
        .dc-cta h2 span { color: #ff4d1c; }
        .dc-cta p {
          font-size: 1.05rem;
          color: rgba(232,234,237,0.65);
          margin: 0 auto 2.5rem;
          max-width: 560px;
          line-height: 1.6;
        }
        .dc-cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .dc-btn-primary {
          padding: 1rem 2rem;
          background: #ff4d1c;
          color: #fff;
          border: none;
          border-radius: 100px;
          font-size: 1rem;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          transition: all 0.25s;
          box-shadow: 0 10px 30px rgba(255,77,28,0.4);
        }
        .dc-btn-primary:hover {
          background: #ff6a3d;
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(255,77,28,0.55);
          color: #fff;
        }
        .dc-btn-secondary {
          padding: 1rem 2rem;
          background: transparent;
          color: #e8eaed;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 100px;
          font-size: 1rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          transition: all 0.25s;
        }
        .dc-btn-secondary:hover {
          border-color: #e8eaed;
          background: rgba(255,255,255,0.05);
          color: #fff;
        }

        /* ============ REVEAL ============ */
        .dc-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.2,0.9,0.3,1), transform 0.8s cubic-bezier(0.2,0.9,0.3,1);
        }
        .dc-visible { opacity: 1; transform: translateY(0); }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 768px) {
          .dc-hero { padding: 6rem 1.25rem 3rem; min-height: auto; }
          .dc-search { flex-direction: column; gap: 0.3rem; padding: 0.7rem; }
          .dc-search-btn { width: 100%; justify-content: center; padding: 1rem; }
          .dc-brands-inner { justify-content: center; gap: 1.25rem; }
          .dc-brand { font-size: 0.9rem; }
          .dc-section, .dc-why, .dc-cta { padding: 4rem 1.25rem; }
          .dc-stats { padding: 3rem 1.25rem; }
          .dc-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem 1rem; }
          .dc-stat { border-left: none; }
          .dc-stat:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.06); }
          .dc-section-head { flex-direction: column; align-items: flex-start; }
          .dc-cars-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dc-home">
        {/* ============ HERO ============ */}
        <section className="dc-hero">
          <div className="dc-hero-bg" />
          <div className="dc-hero-overlay" />

          <div className="dc-hero-content">
            <div className="dc-badge">
              <span className="dc-badge-dot" />
              <span>⭐ Star Autos · Now stocking 2024 &amp; 2025 models</span>
            </div>

            <h1 className="dc-hero-title">
              Find Your <span className="dc-accent">Perfect</span> Ride<br />
              with Star Autos.
            </h1>

            <p className="dc-hero-sub">
              Brand-new and foreign-used cars, hand-picked by Star Autos, fully
              inspected, and ready to drive. Visit our Lagos showroom or browse
              online.
            </p>

            <form
              className="dc-search"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Search coming soon — connect to your inventory API!');
              }}
            >
              <div className="dc-search-field">
                <label>Brand</label>
                <select defaultValue="">
                  <option value="">Any Brand</option>
                  <option>Toyota</option>
                  <option>Lexus</option>
                  <option>Mercedes-Benz</option>
                  <option>Honda</option>
                  <option>BMW</option>
                  <option>Range Rover</option>
                </select>
              </div>

              <div className="dc-search-field">
                <label>Type</label>
                <select defaultValue="">
                  <option value="">Any Type</option>
                  <option>Brand New</option>
                  <option>Foreign Used</option>
                </select>
              </div>

              <div className="dc-search-field">
                <label>Max Price</label>
                <select defaultValue="">
                  <option value="">No Limit</option>
                  <option>₦20M</option>
                  <option>₦35M</option>
                  <option>₦50M</option>
                  <option>₦80M</option>
                  <option>₦100M+</option>
                </select>
              </div>

              <button type="submit" className="dc-search-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Search Cars
              </button>
            </form>
          </div>
        </section>

        {/* ============ BRANDS ============ */}
        <section className="dc-brands">
          <div className="dc-brands-inner">
            <span className="dc-brand">Toyota</span>
            <span className="dc-brand">Lexus</span>
            <span className="dc-brand">Mercedes</span>
            <span className="dc-brand">Honda</span>
            <span className="dc-brand">BMW</span>
            <span className="dc-brand">Range Rover</span>
          </div>
        </section>

        {/* ============ FEATURED CARS ============ */}
        <section className="dc-section">
          <div className="dc-section-head dc-reveal">
            <div>
              <span className="dc-eyebrow">Featured Star Autos Inventory</span>
              <h2 className="dc-section-title">Hand-picked cars, ready to drive.</h2>
            </div>
            <Link to="/cars" className="dc-view-all">
              View all cars
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <div className="dc-cars-grid">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>

        {/* ============ WHY CHOOSE US ============ */}
        <section className="dc-why">
          <div className="dc-why-inner">
            <div className="dc-reveal">
              <span className="dc-eyebrow">Why Choose Star Autos</span>
              <h2 className="dc-section-title">A dealership built on trust.</h2>
            </div>

            <div className="dc-why-grid">
              <div className="dc-why-card dc-reveal">
                <div className="dc-why-icon">🛡️</div>
                <h3>Verified Vehicles</h3>
                <p>
                  Every Star Autos car is inspected, documented, and cleared. No
                  surprises, no hidden damage — just clean, road-ready cars.
                </p>
              </div>
              <div className="dc-why-card dc-reveal">
                <div className="dc-why-icon">💰</div>
                <h3>Transparent Pricing</h3>
                <p>
                  Fair, honest prices from Star Autos with flexible payment plans.
                  What you see is what you pay — no inflated fees, no games.
                </p>
              </div>
              <div className="dc-why-card dc-reveal">
                <div className="dc-why-icon">🚗</div>
                <h3>Financing Available</h3>
                <p>
                  Pay a deposit and drive today. Star Autos works with leading banks
                  and financiers to make ownership easy.
                </p>
              </div>
              <div className="dc-why-card dc-reveal">
                <div className="dc-why-icon">🔧</div>
                <h3>After-Sales Support</h3>
                <p>
                  Registration, insurance, servicing — Star Autos handles it all so
                  you can just enjoy the drive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className="dc-stats">
          <div className="dc-stats-grid">
            <div className="dc-stat dc-reveal">
              <div className="dc-stat-num">500+</div>
              <div className="dc-stat-label">Cars Sold</div>
            </div>
            <div className="dc-stat dc-reveal">
              <div className="dc-stat-num">8+</div>
              <div className="dc-stat-label">Years in Business</div>
            </div>
            <div className="dc-stat dc-reveal">
              <div className="dc-stat-num">100%</div>
              <div className="dc-stat-label">Verified Cars</div>
            </div>
            <div className="dc-stat dc-reveal">
              <div className="dc-stat-num">4.9</div>
              <div className="dc-stat-label">Customer Rating</div>
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="dc-cta">
          <div className="dc-cta-inner dc-reveal">
            <h2>
              Can't find <span>what you're looking for?</span>
            </h2>
            <p>
              Tell Star Autos your dream car and we'll source it — from any brand,
              any model, any year. We deliver nationwide.
            </p>
            <div className="dc-cta-buttons">
              <Link to="/contact" className="dc-btn-primary">
                Talk to Star Autos
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link to="/sell" className="dc-btn-secondary">
                Sell Your Car
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cars, buildWhatsAppLink, scrubVin } from '../data/cars';

export default function CarDetail() {
  const { id } = useParams();
  const car = cars.find((c) => c.id === parseInt(id, 10));
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImg(0);
  }, [id]);

  if (!car) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0c0f', color: '#e8eaed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', fontFamily: 'Inter, sans-serif' }}>
        <h1 style={{ fontSize: '2rem' }}>Car not found 🚗</h1>
        <Link to="/" style={{ color: '#ff4d1c', fontWeight: 600 }}>
          ← Back to homepage
        </Link>
      </div>
    );
  }

  const related = cars.filter((c) => c.id !== car.id).slice(0, 3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        .dc-detail {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #0a0c0f;
          color: #e8eaed;
          min-height: 100vh;
          padding: 7rem 2rem 5rem;
          overflow-x: hidden;
        }
        .dc-detail * { box-sizing: border-box; }

        .dc-detail-inner {
          max-width: 1300px;
          margin: 0 auto;
        }

        /* Breadcrumb */
        .dc-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: rgba(232,234,237,0.5);
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .dc-breadcrumb a {
          color: rgba(232,234,237,0.7);
          text-decoration: none;
          transition: color 0.2s;
        }
        .dc-breadcrumb a:hover { color: #ff4d1c; }
        .dc-breadcrumb span:last-child { color: #e8eaed; font-weight: 500; }

        /* Main grid */
        .dc-detail-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 2.5rem;
          margin-bottom: 4rem;
        }

        /* Gallery */
        .dc-gallery {
          position: sticky;
          top: 90px;
          align-self: start;
        }
        .dc-gallery-main {
          width: 100%;
          aspect-ratio: 16 / 10;
          background: #14171c;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 1rem;
        }
        .dc-gallery-main img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .dc-gallery-thumbs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }
        .dc-thumb {
          aspect-ratio: 1;
          background: #14171c;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          transition: border-color 0.2s, transform 0.2s;
          padding: 0;
        }
        .dc-thumb:hover { transform: translateY(-2px); }
        .dc-thumb.active { border-color: #ff4d1c; }
        .dc-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Info panel */
        .dc-info-panel { }

        .dc-info-badge-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .dc-condition-badge {
          padding: 0.4rem 0.9rem;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .dc-condition-badge.brand-new {
          background: rgba(255,77,28,0.15);
          color: #ff7a3d;
          border: 1px solid rgba(255,77,28,0.4);
        }
        .dc-condition-badge.foreign-used {
          background: rgba(50,180,100,0.15);
          color: #5cd88f;
          border: 1px solid rgba(50,180,100,0.4);
        }
        .dc-info-id {
          padding: 0.4rem 0.9rem;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(232,234,237,0.7);
        }

        .dc-info-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 0.6rem;
        }
        .dc-info-year {
          font-size: 1rem;
          color: rgba(232,234,237,0.55);
          margin-bottom: 1rem;
        }

        .dc-info-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        .dc-stars {
          display: flex;
          gap: 2px;
        }
        .dc-stars svg {
          width: 16px;
          height: 16px;
          fill: #ffb800;
        }
        .dc-stars svg.empty { fill: rgba(255,184,0,0.25); }
        .dc-rating-num { font-weight: 700; color: #e8eaed; }
        .dc-rating-count { color: rgba(232,234,237,0.5); }

        .dc-info-price {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #ff4d1c;
          letter-spacing: -0.02em;
          line-height: 1;
          margin-bottom: 0.3rem;
        }
        .dc-info-price-tag {
          font-size: 0.8rem;
          color: rgba(232,234,237,0.5);
          margin-bottom: 1.5rem;
        }

        .dc-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 1.5rem 0;
        }

        /* Quick specs */
        .dc-quick-specs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem 1.25rem;
          margin-bottom: 1.5rem;
        }
        .dc-spec {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .dc-spec-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(232,234,237,0.45);
          font-weight: 600;
        }
        .dc-spec-value {
          font-size: 0.92rem;
          font-weight: 600;
          color: #e8eaed;
        }
        .dc-spec.full {
          grid-column: span 2;
        }

        /* VIN box */
        .dc-vin-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1rem 1.1rem;
          margin-bottom: 1.5rem;
        }
        .dc-vin-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(232,234,237,0.45);
          font-weight: 600;
          margin-bottom: 0.4rem;
        }
        .dc-vin-value {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #e8eaed;
          word-break: break-all;
        }
        .dc-vin-hint {
          display: block;
          margin-top: 0.4rem;
          font-size: 0.75rem;
          color: rgba(232,234,237,0.45);
        }

        /* CTA buttons */
        .dc-actions {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          margin-bottom: 1.25rem;
        }
        .dc-action-btn {
          padding: 1rem 1.5rem;
          border-radius: 12px;
          border: none;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: all 0.25s;
        }
        .dc-action-btn.primary {
          background: #ff4d1c;
          color: #fff;
          box-shadow: 0 10px 24px rgba(255,77,28,0.35);
        }
        .dc-action-btn.primary:hover {
          background: #ff6a3d;
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(255,77,28,0.5);
        }
        .dc-action-btn.secondary {
          background: transparent;
          color: #e8eaed;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .dc-action-btn.secondary:hover {
          border-color: #ff4d1c;
          color: #ff4d1c;
        }

        .dc-trust-badges {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          font-size: 0.78rem;
          color: rgba(232,234,237,0.6);
        }
        .dc-trust-badges span::before {
          content: '✓ ';
          color: #ff4d1c;
          font-weight: 700;
        }

        /* Below sections */
        .dc-detail-section {
          max-width: 1300px;
          margin: 0 auto 4rem;
          padding-top: 3rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .dc-detail-section h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.5rem, 2.8vw, 2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 1.5rem;
        }
        .dc-description {
          font-size: 1rem;
          line-height: 1.75;
          color: rgba(232,234,237,0.75);
          max-width: 800px;
        }

        .dc-features {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 0.75rem 1.5rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .dc-features li {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.92rem;
          color: rgba(232,234,237,0.8);
        }
        .dc-features li::before {
          content: '✓';
          color: #ff4d1c;
          font-weight: 700;
          font-size: 1rem;
          flex-shrink: 0;
        }

        /* Related cars */
        .dc-related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .dc-detail-grid {
            grid-template-columns: 1fr;
          }
          .dc-gallery { position: static; }
        }
        @media (max-width: 560px) {
          .dc-detail { padding: 6rem 1.25rem 3rem; }
          .dc-gallery-thumbs { grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }
          .dc-info-price { font-size: 1.6rem; }
          .dc-quick-specs { grid-template-columns: 1fr; gap: 0.85rem; }
          .dc-spec.full { grid-column: span 1; }
        }
      `}</style>

      <div className="dc-detail">
        <div className="dc-detail-inner">
          {/* Breadcrumb */}
          <div className="dc-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/cars">Cars</Link>
            <span>›</span>
            <span>{car.name} {car.year}</span>
          </div>

          {/* Main grid */}
          <div className="dc-detail-grid">
            {/* GALLERY */}
            <div className="dc-gallery">
              <div className="dc-gallery-main">
                <img
                  src={car.images[activeImg]}
                  alt={`${car.name} ${car.year} - pics ${activeImg + 1}`}
                />
              </div>
              <div className="dc-gallery-thumbs">
                {car.images.map((img, idx) => (
                  <button
                    key={img}
                    className={`dc-thumb ${idx === activeImg ? 'active' : ''}`}
                    onClick={() => setActiveImg(idx)}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            </div>

            {/* INFO PANEL */}
            <div className="dc-info-panel">
              <div className="dc-info-badge-row">
                <span className={`dc-condition-badge ${car.condition === 'Brand New' ? 'brand-new' : 'foreign-used'}`}>
                  {car.condition}
                </span>
                <span className="dc-info-id">Vehicle ID: #{String(car.id).padStart(3, '0')}</span>
              </div>

              <h1 className="dc-info-title">{car.name}</h1>
              <div className="dc-info-year">{car.year} · {car.bodyType} · {car.seats} Seats</div>

              <div className="dc-info-rating">
                <div className="dc-stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} viewBox="0 0 24 24" className={i <= Math.round(car.rating) ? '' : 'empty'}>
                      <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.6-6.2 4.6 2.4-7.4-6.2-4.5h7.6z" />
                    </svg>
                  ))}
                </div>
                <span className="dc-rating-num">{car.rating}</span>
                <span className="dc-rating-count">({car.reviews} reviews)</span>
              </div>

              <div className="dc-info-price">{car.priceFormatted}</div>
              <div className="dc-info-price-tag">Price negotiable · Financing available</div>

              <div className="dc-divider" />

              <div className="dc-quick-specs">
                <div className="dc-spec">
                  <span className="dc-spec-label">Mileage</span>
                  <span className="dc-spec-value">{car.mileage}</span>
                </div>
                <div className="dc-spec">
                  <span className="dc-spec-label">Transmission</span>
                  <span className="dc-spec-value">{car.transmission}</span>
                </div>
                <div className="dc-spec">
                  <span className="dc-spec-label">Engine</span>
                  <span className="dc-spec-value">{car.engine}</span>
                </div>
                <div className="dc-spec">
                  <span className="dc-spec-label">Fuel</span>
                  <span className="dc-spec-value">{car.fuel}</span>
                </div>
                <div className="dc-spec">
                  <span className="dc-spec-label">Exterior Color</span>
                  <span className="dc-spec-value">{car.exteriorColor}</span>
                </div>
                <div className="dc-spec">
                  <span className="dc-spec-label">Interior</span>
                  <span className="dc-spec-value">{car.interiorColor}</span>
                </div>
                <div className="dc-spec full">
                  <span className="dc-spec-label">Location</span>
                  <span className="dc-spec-value">📍 {car.location}</span>
                </div>
              </div>

              <div className="dc-vin-box">
                <div className="dc-vin-label">VIN Number</div>
                <div className="dc-vin-value">{scrubVin(car.vin)}</div>
                <span className="dc-vin-hint">🔒 Full VIN shared on request — protects against cloning.</span>
              </div>

              <div className="dc-actions">
                <a
                  href={buildWhatsAppLink(car)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dc-action-btn primary"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contact Seller on WhatsApp
                </a>

                <a
                  href={`tel:+2348012345678`}
                  className="dc-action-btn secondary"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call Now
                </a>
              </div>

              <div className="dc-trust-badges">
                <span>Inspected</span>
                <span>Verified</span>
                <span>Financing</span>
                <span>Nationwide Delivery</span>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="dc-detail-section">
            <h2>About this car</h2>
            <p className="dc-description">{car.description}</p>
          </div>

          {/* FEATURES */}
          <div className="dc-detail-section">
            <h2>Features &amp; Options</h2>
            <ul className="dc-features">
              {car.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          {/* RELATED */}
          {related.length > 0 && (
            <div className="dc-detail-section">
              <h2>Similar Cars</h2>
              <div className="dc-related-grid">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to={`/cars/${r.id}`}
                    style={{
                      display: 'block',
                      background: '#14171c',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 18,
                      overflow: 'hidden',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.3s',
                    }}
                  >
                    <img src={r.images[0]} alt={r.name} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '1rem 1.25rem 1.25rem' }}>
                      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.25rem' }}>{r.name}</div>
                      <div style={{ fontSize: '0.82rem', color: 'rgba(232,234,237,0.5)', marginBottom: '0.75rem' }}>{r.year} · {r.mileage}</div>
                      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#ff4d1c' }}>{r.priceFormatted}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
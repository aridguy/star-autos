// src/components/CarCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { buildWhatsAppLink } from '../data/cars';

export default function CarCard({ car }) {
  return (
    <>
      <style>{`
        .dc-car {
          background: #14171c;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.2,0.9,0.3,1);
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .dc-car:hover {
          transform: translateY(-6px);
          border-color: rgba(255,77,28,0.35);
          box-shadow: 0 25px 50px rgba(0,0,0,0.6);
        }
        .dc-car-img-wrap {
          position: relative;
          height: 210px;
          overflow: hidden;
          display: block;
        }
        .dc-car-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
          display: block;
        }
        .dc-car:hover .dc-car-img { transform: scale(1.06); }
        .dc-car-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          padding: 0.4rem 0.85rem;
          background: rgba(10,12,15,0.85);
          backdrop-filter: blur(10px);
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .dc-car-badge.brand-new {
          background: rgba(255,77,28,0.95);
          border-color: #ff4d1c;
        }
        .dc-car-badge.foreign-used {
          background: rgba(50,180,100,0.9);
          border-color: transparent;
        }
        .dc-car-body {
          padding: 1.25rem 1.25rem 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .dc-car-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .dc-car-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0;
          color: #e8eaed;
          text-decoration: none;
          line-height: 1.2;
        }
        .dc-car-name:hover { color: #ff4d1c; }
        .dc-car-year {
          font-size: 0.8rem;
          color: rgba(232,234,237,0.5);
          margin-top: 0.2rem;
        }
        .dc-car-rating {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: rgba(232,234,237,0.6);
          flex-shrink: 0;
          padding-top: 0.1rem;
        }
        .dc-car-rating svg {
          width: 13px;
          height: 13px;
          fill: #ffb800;
          flex-shrink: 0;
        }
        .dc-car-rating strong {
          color: #e8eaed;
          font-weight: 600;
        }
        .dc-car-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.55rem 0.75rem;
          margin: 1rem 0 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .dc-car-detail {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: rgba(232,234,237,0.6);
          line-height: 1.3;
          min-width: 0;
        }
        .dc-car-detail svg {
          width: 13px;
          height: 13px;
          flex-shrink: 0;
          opacity: 0.55;
        }
        .dc-car-detail span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .dc-car-detail.location {
          grid-column: span 2;
        }
        .dc-car-price {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #ff4d1c;
          letter-spacing: -0.02em;
          line-height: 1;
          margin-bottom: 1rem;
        }
        .dc-car-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-top: auto;
        }
        .dc-btn-card {
          padding: 0.7rem 0.9rem;
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.82rem;
          font-weight: 700;
          text-align: center;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          border: 1px solid transparent;
          white-space: nowrap;
        }
        .dc-btn-card.outline {
          background: rgba(255,255,255,0.05);
          color: #e8eaed;
          border-color: rgba(255,255,255,0.12);
        }
        .dc-btn-card.outline:hover {
          border-color: #ff4d1c;
          color: #ff4d1c;
          background: rgba(255,77,28,0.08);
        }
        .dc-btn-card.primary {
          background: #ff4d1c;
          color: #fff;
        }
        .dc-btn-card.primary:hover {
          background: #ff6a3d;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(255,77,28,0.4);
        }
        @media (max-width: 480px) {
          .dc-btn-card { font-size: 0.78rem; padding: 0.65rem 0.5rem; }
          .dc-car-details { font-size: 0.75rem; }
        }
      `}</style>

      <div className="dc-car dc-reveal">
        <Link to={`/cars/${car.id}`} className="dc-car-img-wrap">
          <img
            src={car.images[0]}
            alt={`${car.name} ${car.year}`}
            className="dc-car-img"
            loading="lazy"
          />
          <span
            className={`dc-car-badge ${
              car.condition === 'Brand New' ? 'brand-new' : 'foreign-used'
            }`}
          >
            {car.condition}
          </span>
        </Link>

        <div className="dc-car-body">
          <div className="dc-car-head">
            <div>
              <Link to={`/cars/${car.id}`} style={{ textDecoration: 'none' }}>
                <h3 className="dc-car-name">{car.name}</h3>
              </Link>
              <div className="dc-car-year">{car.year}</div>
            </div>
            <div className="dc-car-rating">
              <svg viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.6-6.2 4.6 2.4-7.4-6.2-4.5h7.6z" />
              </svg>
              <strong>{car.rating}</strong>
              <span>({car.reviews})</span>
            </div>
          </div>

          <div className="dc-car-details">
            <div className="dc-car-detail location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{car.location}</span>
            </div>
            <div className="dc-car-detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>{car.engine}</span>
            </div>
            <div className="dc-car-detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 6V4M12 20v-2M6 12H4M20 12h-2M8 8l-2-2M18 18l-2-2M8 16l-2 2M18 6l-2 2" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>{car.transmission}</span>
            </div>
            <div className="dc-car-detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span>{car.mileage}</span>
            </div>
          </div>

          <div className="dc-car-price">{car.priceFormatted}</div>

          <div className="dc-car-actions">
            <Link to={`/cars/${car.id}`} className="dc-btn-card outline">
              View Details
            </Link>
            <a
              href={buildWhatsAppLink(car)}
              target="_blank"
              rel="noopener noreferrer"
              className="dc-btn-card primary"
            >
              Contact Seller
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
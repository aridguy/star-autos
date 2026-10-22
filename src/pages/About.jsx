import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// ══════════════════════════════════════════════════════════════════
// 👇 EDIT THESE TO MATCH YOUR REAL BUSINESS
// ══════════════════════════════════════════════════════════════════

const FOUNDER_NAME = 'Your Name';
const FOUNDER_TITLE = 'Founder & CEO, Star Autos';
const FOUNDER_IMAGE = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80&auto=format&fit=crop';

// ══════════════════════════════════════════════════════════════════

const STATS = [
  { num: '500+', label: 'Cars Sold' },
  { num: '8+', label: 'Years in Business' },
  { num: '4.9', label: 'Customer Rating' },
  { num: '100%', label: 'Verified Cars' },
];

const VALUES = [
  {
    icon: '🛡️',
    title: 'Trust First',
    desc: 'Every car at Star Autos is inspected, verified, and documented. We never sell what we would not drive ourselves.',
  },
  {
    icon: '💰',
    title: 'Honest Pricing',
    desc: 'No hidden fees, no last-minute surprises. The price Star Autos quotes is the price you pay — always.',
  },
  {
    icon: '🤝',
    title: 'Real Relationships',
    desc: 'We treat every customer like family. Many Star Autos buyers come back for their second and third car.',
  },
  {
    icon: '🔧',
    title: 'After-Sales Care',
    desc: 'Registration, insurance, servicing, and support — Star Autos stays with you long after you drive off the lot.',
  },
];

const TIMELINE = [
  {
    year: '2017',
    title: 'Star Autos is Born',
    desc: 'We started with just 3 cars and one vision: bring honest, high-quality vehicles to Lagos buyers without the usual headaches. That was the birth of Star Autos.',
  },
  {
    year: '2019',
    title: 'First Star Autos Showroom',
    desc: 'Opened our Orile Agege showroom — a physical space where customers can inspect, test-drive, and buy with confidence under the Star Autos name.',
  },
  {
    year: '2022',
    title: 'Going National',
    desc: 'Star Autos launched nationwide delivery. Today we serve customers from Abuja to Port Harcourt, with the same care we give in Lagos.',
  },
  {
    year: '2024',
    title: '500 Cars & Counting',
    desc: 'Star Autos crossed the 500-car mark and built a 4.9-star reputation — one honest deal at a time.',
  },
];

const TEAM = [
  {
    name: 'Your Name',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80&auto=format&fit=crop',
  },
  {
    name: 'Team Member',
    role: 'Head of Sales',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&auto=format&fit=crop',
  },
  {
    name: 'Team Member',
    role: 'Vehicle Inspector',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&auto=format&fit=crop',
  },
];

const GALLERY = [
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&auto=format&fit=crop',
];

export default function About() {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('dc-visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.dc-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        .dc-about {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #0a0c0f;
          color: #e8eaed;
          min-height: 100vh;
          overflow-x: hidden;
        }
        .dc-about * { box-sizing: border-box; }

        .dc-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.2,0.9,0.3,1), transform 0.7s cubic-bezier(0.2,0.9,0.3,1);
        }
        .dc-visible { opacity: 1; transform: translateY(0); }

        /* ============ HERO ============ */
        .dc-about-hero {
          position: relative;
          padding: 9rem 2rem 6rem;
          overflow: hidden;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .dc-about-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920&q=80&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          opacity: 0.15;
          filter: grayscale(0.6);
        }
        .dc-about-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at center, rgba(10,12,15,0.4) 0%, rgba(10,12,15,0.95) 80%),
            linear-gradient(to bottom, rgba(10,12,15,0.7) 0%, rgba(10,12,15,0.95) 100%);
        }
        .dc-about-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 0 auto;
        }

        .dc-breadcrumb {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: rgba(232,234,237,0.5);
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .dc-breadcrumb a { color: rgba(232,234,237,0.7); text-decoration: none; transition: color 0.2s; }
        .dc-breadcrumb a:hover { color: #ff4d1c; }
        .dc-breadcrumb span:last-child { color: #e8eaed; font-weight: 500; }

        .dc-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255,77,28,0.12);
          border: 1px solid rgba(255,77,28,0.35);
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #ff7a3d;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .dc-hero-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.4rem, 6vw, 4.5rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 0 0 1.5rem;
        }
        .dc-hero-title em { color: #ff4d1c; font-style: italic; }

        .dc-hero-sub {
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          color: rgba(232,234,237,0.7);
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ============ STATS ============ */
        .dc-about-stats {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .dc-about-stat {
          text-align: center;
          padding: 1.5rem 1rem;
        }
        .dc-about-stat-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 4.5vw, 3.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #ff4d1c;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .dc-about-stat-label {
          font-size: 0.78rem;
          color: rgba(232,234,237,0.55);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
        }

        /* ============ SECTIONS ============ */
        .dc-about-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 2rem;
        }
        .dc-section-eyebrow {
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
          font-size: clamp(1.8rem, 3.5vw, 2.75rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 1rem;
        }
        .dc-section-title em { color: #ff4d1c; font-style: italic; }

        /* ============ STORY ============ */
        .dc-story-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 4rem;
          align-items: center;
          padding-top: 2rem;
        }
        .dc-story-img-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 4 / 5;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .dc-story-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s;
        }
        .dc-story-img-wrap:hover img { transform: scale(1.03); }
        .dc-story-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,12,15,0.6), transparent 50%);
          pointer-events: none;
        }
        .dc-story-badge {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          padding: 1.25rem 1.5rem;
          background: rgba(10,12,15,0.85);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          backdrop-filter: blur(20px);
          z-index: 2;
        }
        .dc-story-badge-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #ff4d1c;
          line-height: 1;
          margin-bottom: 0.2rem;
        }
        .dc-story-badge-label {
          font-size: 0.82rem;
          color: rgba(232,234,237,0.7);
          font-weight: 500;
        }

        .dc-story-text p {
          font-size: 1rem;
          color: rgba(232,234,237,0.7);
          line-height: 1.8;
          margin: 0 0 1.25rem;
        }
        .dc-story-text p:last-of-type { margin-bottom: 2rem; }
        .dc-story-signature {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .dc-story-sig-img {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(255,77,28,0.3);
        }
        .dc-story-sig-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #e8eaed;
        }
        .dc-story-sig-role {
          font-size: 0.8rem;
          color: rgba(232,234,237,0.5);
          margin-top: 0.15rem;
        }

        /* ============ VALUES ============ */
        .dc-values-section {
          background: #0d1015;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .dc-values-head { text-align: center; margin-bottom: 3rem; }
        .dc-values-head .dc-section-title { margin: 0 auto; }

        .dc-values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
        }
        .dc-value-card {
          padding: 2rem 1.75rem;
          background: #14171c;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          transition: all 0.3s;
        }
        .dc-value-card:hover {
          border-color: rgba(255,77,28,0.3);
          transform: translateY(-4px);
        }
        .dc-value-icon {
          width: 54px;
          height: 54px;
          background: rgba(255,77,28,0.12);
          border: 1px solid rgba(255,77,28,0.2);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .dc-value-card h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 0.6rem;
        }
        .dc-value-card p {
          font-size: 0.92rem;
          color: rgba(232,234,237,0.6);
          line-height: 1.7;
          margin: 0;
        }

        /* ============ TIMELINE ============ */
        .dc-timeline {
          position: relative;
          max-width: 900px;
          margin: 3rem auto 0;
          padding-left: 2rem;
        }
        .dc-timeline::before {
          content: '';
          position: absolute;
          left: 7px;
          top: 1rem;
          bottom: 1rem;
          width: 2px;
          background: linear-gradient(to bottom, #ff4d1c, rgba(255,77,28,0.1));
        }
        .dc-tl-item {
          position: relative;
          padding-bottom: 2.5rem;
          padding-left: 2rem;
        }
        .dc-tl-item:last-child { padding-bottom: 0; }
        .dc-tl-dot {
          position: absolute;
          left: -1rem;
          top: 0.35rem;
          width: 16px;
          height: 16px;
          background: #ff4d1c;
          border-radius: 50%;
          border: 3px solid #0a0c0f;
          box-shadow: 0 0 0 3px rgba(255,77,28,0.25);
        }
        .dc-tl-year {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #ff4d1c;
          margin-bottom: 0.4rem;
          letter-spacing: 0.05em;
        }
        .dc-tl-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          letter-spacing: -0.01em;
        }
        .dc-tl-desc {
          font-size: 0.95rem;
          color: rgba(232,234,237,0.65);
          line-height: 1.7;
          margin: 0;
        }

        /* ============ GALLERY ============ */
        .dc-gallery-section {
          background: #0d1015;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .dc-gallery-main {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          margin: 2rem 0 1rem;
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
        .dc-gallery-thumb {
          aspect-ratio: 16 / 10;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          transition: border-color 0.2s, transform 0.2s;
          padding: 0;
          background: none;
        }
        .dc-gallery-thumb:hover { transform: translateY(-2px); }
        .dc-gallery-thumb.active { border-color: #ff4d1c; }
        .dc-gallery-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          opacity: 0.6;
          transition: opacity 0.2s;
        }
        .dc-gallery-thumb.active img,
        .dc-gallery-thumb:hover img { opacity: 1; }

        /* ============ TEAM ============ */
        .dc-team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
        }
        .dc-team-card {
          background: #14171c;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          overflow: hidden;
          transition: all 0.3s;
        }
        .dc-team-card:hover {
          border-color: rgba(255,77,28,0.3);
          transform: translateY(-4px);
        }
        .dc-team-img {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          display: block;
          filter: grayscale(0.4);
          transition: filter 0.3s, transform 0.4s;
        }
        .dc-team-card:hover .dc-team-img {
          filter: grayscale(0);
          transform: scale(1.02);
        }
        .dc-team-info {
          padding: 1.25rem 1.5rem 1.5rem;
        }
        .dc-team-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 0.25rem;
        }
        .dc-team-role {
          font-size: 0.85rem;
          color: #ff4d1c;
          font-weight: 500;
        }

        /* ============ CTA ============ */
        .dc-about-cta {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #0f1217 0%, #1a1010 100%);
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .dc-about-cta::before {
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
        .dc-cta-inner h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 1.25rem;
        }
        .dc-cta-inner h2 em { color: #ff4d1c; font-style: italic; }
        .dc-cta-inner p {
          font-size: 1.05rem;
          color: rgba(232,234,237,0.65);
          margin: 0 auto 2.5rem;
          max-width: 520px;
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

        /* ============ RESPONSIVE ============ */
        @media (max-width: 900px) {
          .dc-about-hero { padding: 7rem 1.25rem 4rem; }
          .dc-about-stats { grid-template-columns: repeat(2, 1fr); padding: 3rem 1.25rem; }
          .dc-about-section { padding: 4rem 1.25rem; }
          .dc-story-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .dc-story-img-wrap { aspect-ratio: 16 / 10; }
          .dc-gallery-thumbs { grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }
        }
        @media (max-width: 560px) {
          .dc-hero-title { font-size: 2.1rem; }
          .dc-timeline { padding-left: 1.5rem; }
          .dc-tl-item { padding-left: 1.5rem; padding-bottom: 2rem; }
          .dc-gallery-thumbs { grid-template-columns: repeat(2, 1fr); }
          .dc-cta-buttons { flex-direction: column; }
          .dc-btn-primary,
          .dc-btn-secondary { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="dc-about">
        {/* ============ HERO ============ */}
        <section className="dc-about-hero">
          <div className="dc-about-hero-inner">
            <div className="dc-breadcrumb">
              <Link to="/">Home</Link>
              <span>›</span>
              <span>About</span>
            </div>
            <div className="dc-hero-eyebrow">
              <span>⭐ Star Autos · Est. 2017 · Lagos, Nigeria</span>
            </div>
            <h1 className="dc-hero-title">
              Star Autos Doesn't Just Sell Cars.<br />
              We <em>Earn Trust.</em>
            </h1>
            <p className="dc-hero-sub">
              For over 8 years, Star Autos has helped hundreds of Nigerian families
              and businesses find the right car — inspected, verified, and delivered
              with honesty.
            </p>
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className="dc-about-stats">
          {STATS.map((s) => (
            <div key={s.label} className="dc-about-stat dc-reveal">
              <div className="dc-about-stat-num">{s.num}</div>
              <div className="dc-about-stat-label">{s.label}</div>
            </div>
          ))}
        </section>

        {/* ============ STORY ============ */}
        <section className="dc-about-section">
          <div className="dc-story-grid">
            <div className="dc-story-img-wrap dc-reveal">
              <img src={FOUNDER_IMAGE} alt="Star Autos founder" />
              <div className="dc-story-badge">
                <div className="dc-story-badge-num">8+ Years</div>
                <div className="dc-story-badge-label">Serving Nigerian buyers</div>
              </div>
            </div>

            <div className="dc-story-text dc-reveal">
              <span className="dc-section-eyebrow">The Star Autos Story</span>
              <h2 className="dc-section-title">
                Started small. Built on <em>doing right.</em>
              </h2>

              <p>
                Star Autos opened its doors in 2017 with just 3 cars and a simple
                idea: Nigerian car buyers deserve better. No fake mileage. No hidden
                damage. No pressure tactics. Just clean, honest deals.
              </p>

              <p>
                Today, Star Autos is one of Lagos' most trusted dealerships — but we
                still operate the same way we did on day one. Every car on our lot
                is physically inspected, mechanically verified, and fully documented
                before it goes up for sale.
              </p>

              <p>
                We've helped hundreds of families, business owners, and first-time
                buyers find their perfect car through Star Autos. Many of them come
                back for their second and third. That's the only review that matters.
              </p>

              <div className="dc-story-signature">
                <img
                  className="dc-story-sig-img"
                  src={FOUNDER_IMAGE}
                  alt={FOUNDER_NAME}
                />
                <div>
                  <div className="dc-story-sig-name">{FOUNDER_NAME}</div>
                  <div className="dc-story-sig-role">{FOUNDER_TITLE}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ VALUES ============ */}
        <section className="dc-values-section">
          <div className="dc-about-section">
            <div className="dc-values-head dc-reveal">
              <span className="dc-section-eyebrow">What Star Autos Stands For</span>
              <h2 className="dc-section-title">Four values. Every single deal.</h2>
            </div>

            <div className="dc-values-grid">
              {VALUES.map((v) => (
                <div key={v.title} className="dc-value-card dc-reveal">
                  <div className="dc-value-icon">{v.icon}</div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TIMELINE ============ */}
        <section className="dc-about-section">
          <div className="dc-reveal" style={{ textAlign: 'center' }}>
            <span className="dc-section-eyebrow">The Star Autos Journey</span>
            <h2 className="dc-section-title">From 3 cars to 500+ sold.</h2>
          </div>

          <div className="dc-timeline">
            {TIMELINE.map((t) => (
              <div key={t.year} className="dc-tl-item dc-reveal">
                <div className="dc-tl-dot" />
                <div className="dc-tl-year">{t.year}</div>
                <h3 className="dc-tl-title">{t.title}</h3>
                <p className="dc-tl-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ GALLERY ============ */}
        <section className="dc-gallery-section">
          <div className="dc-about-section">
            <div className="dc-reveal">
              <span className="dc-section-eyebrow">Inside the Star Autos Showroom</span>
              <h2 className="dc-section-title">Real cars. Real people. Real photos.</h2>
              <p style={{ fontSize: '1rem', color: 'rgba(232,234,237,0.6)', margin: '0.75rem 0 0', maxWidth: 600, lineHeight: 1.7 }}>
                Everything you see here is on the Star Autos lot right now. No stock
                photos — what you see is what you drive home.
              </p>
            </div>

            <div className="dc-gallery-main dc-reveal">
              <img src={GALLERY[activeImg]} alt={`Star Autos showroom view ${activeImg + 1}`} />
            </div>

            <div className="dc-gallery-thumbs dc-reveal">
              {GALLERY.map((img, i) => (
                <button
                  key={img}
                  className={`dc-gallery-thumb ${i === activeImg ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TEAM ============ */}
        <section className="dc-about-section">
          <div className="dc-reveal" style={{ textAlign: 'center' }}>
            <span className="dc-section-eyebrow">The People Behind Star Autos</span>
            <h2 className="dc-section-title">Meet the team that makes it happen.</h2>
          </div>

          <div className="dc-team-grid">
            {TEAM.map((m) => (
              <div key={m.name + m.role} className="dc-team-card dc-reveal">
                <img src={m.image} alt={m.name} className="dc-team-img" />
                <div className="dc-team-info">
                  <h3 className="dc-team-name">{m.name}</h3>
                  <div className="dc-team-role">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="dc-about-cta">
          <div className="dc-cta-inner dc-reveal">
            <h2>
              Ready to find <em>your next car</em> with Star Autos?
            </h2>
            <p>
              Browse our current Star Autos inventory or give us a call. No pressure,
              no salespeople chasing you — just straight answers and honest cars.
            </p>
            <div className="dc-cta-buttons">
              <Link to="/cars" className="dc-btn-primary">
                Browse All Cars
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link to="/contact" className="dc-btn-secondary">
                Contact Star Autos
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
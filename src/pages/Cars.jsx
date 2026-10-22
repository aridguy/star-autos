import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';

// Extract brand from car name (handles "Range Rover" and "Mercedes-Benz")
const getBrand = (name) => {
  if (name.includes('Range Rover')) return 'Range Rover';
  if (name.includes('Mercedes')) return 'Mercedes-Benz';
  return name.split(' ')[0];
};

const PRICE_RANGES = [
  { label: 'Under ₦30M', value: 'under-30', min: 0, max: 30000000 },
  { label: '₦30M – ₦50M', value: '30-50', min: 30000000, max: 50000000 },
  { label: '₦50M – ₦70M', value: '50-70', min: 50000000, max: 70000000 },
  { label: '₦70M and above', value: '70-plus', min: 70000000, max: Infinity },
];

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'Most Reviewed', value: 'popular' },
];

export default function Cars() {
  const [search, setSearch] = useState('');
  const [condition, setCondition] = useState('all');
  const [brandFilter, setBrandFilter] = useState([]);
  const [bodyFilter, setBodyFilter] = useState([]);
  const [transFilter, setTransFilter] = useState('all');
  const [fuelFilter, setFuelFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll reveal for CarCard
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('dc-visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.dc-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile filter drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Derived options
  const allBrands = useMemo(() => [...new Set(cars.map((c) => getBrand(c.name)))].sort(), []);
  const allBodies = useMemo(() => [...new Set(cars.map((c) => c.bodyType))].sort(), []);
  const allTrans = useMemo(() => [...new Set(cars.map((c) => c.transmission))].sort(), []);
  const allFuels = useMemo(() => [...new Set(cars.map((c) => c.fuel))].sort(), []);
  const allConditions = useMemo(() => [...new Set(cars.map((c) => c.condition))].sort(), []);

  // Apply filters + sort
  const results = useMemo(() => {
    const filtered = cars.filter((car) => {
      const q = search.toLowerCase().trim();
      if (q && !`${car.name} ${car.year} ${car.location} ${car.bodyType}`.toLowerCase().includes(q)) return false;
      if (condition !== 'all' && car.condition !== condition) return false;
      if (brandFilter.length && !brandFilter.includes(getBrand(car.name))) return false;
      if (bodyFilter.length && !bodyFilter.includes(car.bodyType)) return false;
      if (transFilter !== 'all' && car.transmission !== transFilter) return false;
      if (fuelFilter !== 'all' && car.fuel !== fuelFilter) return false;
      if (priceFilter !== 'all') {
        const r = PRICE_RANGES.find((p) => p.value === priceFilter);
        if (r && (car.price < r.min || car.price >= r.max)) return false;
      }
      return true;
    });

    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-asc': sorted.sort((a, b) => a.price - b.price); break;
      case 'price-desc': sorted.sort((a, b) => b.price - a.price); break;
      case 'rating': sorted.sort((a, b) => b.rating - a.rating); break;
      case 'popular': sorted.sort((a, b) => b.reviews - a.reviews); break;
      case 'newest':
      default: sorted.sort((a, b) => b.year - a.year || b.id - a.id); break;
    }
    return sorted;
  }, [search, condition, brandFilter, bodyFilter, transFilter, fuelFilter, priceFilter, sortBy]);

  const activeCount =
    (condition !== 'all' ? 1 : 0) +
    brandFilter.length +
    bodyFilter.length +
    (transFilter !== 'all' ? 1 : 0) +
    (fuelFilter !== 'all' ? 1 : 0) +
    (priceFilter !== 'all' ? 1 : 0);

  const resetAll = () => {
    setSearch('');
    setCondition('all');
    setBrandFilter([]);
    setBodyFilter([]);
    setTransFilter('all');
    setFuelFilter('all');
    setPriceFilter('all');
    setSortBy('newest');
  };

  const toggleBrand = (b) =>
    setBrandFilter((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);
  const toggleBody = (b) =>
    setBodyFilter((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        .dc-cars-page {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #0a0c0f;
          color: #e8eaed;
          min-height: 100vh;
          padding: 7rem 2rem 4rem;
          overflow-x: hidden;
        }
        .dc-cars-page * { box-sizing: border-box; }

        /* reveal animation for CarCard */
        .dc-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.2,0.9,0.3,1), transform 0.7s cubic-bezier(0.2,0.9,0.3,1);
        }
        .dc-visible { opacity: 1; transform: translateY(0); }

        /* ============ HEADER ============ */
        .dc-cars-header {
          max-width: 1400px;
          margin: 0 auto 3rem;
        }
        .dc-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: rgba(232,234,237,0.5);
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .dc-breadcrumb a { color: rgba(232,234,237,0.7); text-decoration: none; transition: color 0.2s; }
        .dc-breadcrumb a:hover { color: #ff4d1c; }
        .dc-breadcrumb span:last-child { color: #e8eaed; font-weight: 500; }

        .dc-cars-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin: 0 0 0.75rem;
        }
        .dc-cars-title em { color: #ff4d1c; font-style: italic; }
        .dc-cars-subtitle {
          font-size: 1rem;
          color: rgba(232,234,237,0.6);
          max-width: 620px;
          margin: 0;
        }

        /* ============ LAYOUT ============ */
        .dc-cars-layout {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2.5rem;
          align-items: start;
        }

        /* ============ SIDEBAR / FILTERS ============ */
        .dc-filters {
          position: sticky;
          top: 90px;
          align-self: start;
          max-height: calc(100vh - 110px);
          overflow-y: auto;
          padding-right: 0.5rem;
          padding-bottom: 1rem;
        }
        .dc-filters::-webkit-scrollbar { width: 4px; }
        .dc-filters::-webkit-scrollbar-track { background: transparent; }
        .dc-filters::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
        .dc-filters::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

        .dc-filter-head-mobile { display: none; }

        .dc-filters-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .dc-filters-head h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0;
        }
        .dc-filters-clear {
          background: none;
          border: none;
          color: rgba(232,234,237,0.5);
          font-family: inherit;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }
        .dc-filters-clear:hover { color: #ff4d1c; }

        /* Search input */
        .dc-search-wrap {
          position: relative;
          margin-bottom: 1.5rem;
        }
        .dc-search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          background: #14171c;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: #e8eaed;
          font-family: inherit;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .dc-search-input:focus { border-color: #ff4d1c; }
        .dc-search-input::placeholder { color: rgba(232,234,237,0.35); }
        .dc-search-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          width: 15px;
          height: 15px;
          opacity: 0.5;
          pointer-events: none;
        }

        /* Filter groups */
        .dc-filter-group {
          padding: 1.25rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .dc-filter-group:last-of-type { border-bottom: none; }
        .dc-filter-group h4 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #e8eaed;
          margin: 0 0 0.85rem;
        }

        /* Custom checkbox */
        .dc-checkbox,
        .dc-radio {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          cursor: pointer;
          padding: 0.4rem 0;
          user-select: none;
          font-size: 0.9rem;
          color: rgba(232,234,237,0.75);
          transition: color 0.2s;
        }
        .dc-checkbox:hover,
        .dc-radio:hover { color: #e8eaed; }
        .dc-checkbox input,
        .dc-radio input { display: none; }

        .dc-check-box {
          width: 18px;
          height: 18px;
          border: 1.5px solid rgba(255,255,255,0.2);
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .dc-checkbox input:checked + .dc-check-box {
          background: #ff4d1c;
          border-color: #ff4d1c;
        }
        .dc-check-box::after {
          content: '';
          width: 9px;
          height: 5px;
          border-left: 2px solid #fff;
          border-bottom: 2px solid #fff;
          transform: rotate(-45deg) translate(1px, -1px);
          opacity: 0;
          transition: opacity 0.15s;
        }
        .dc-checkbox input:checked + .dc-check-box::after { opacity: 1; }

        .dc-radio-box {
          width: 18px;
          height: 18px;
          border: 1.5px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .dc-radio input:checked + .dc-radio-box {
          border-color: #ff4d1c;
        }
        .dc-radio input:checked + .dc-radio-box::after {
          content: '';
          width: 9px;
          height: 9px;
          background: #ff4d1c;
          border-radius: 50%;
        }

        /* Sidebar reset button (desktop) */
        .dc-reset-btn {
          display: none;
          width: 100%;
          padding: 0.85rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          color: #e8eaed;
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 1rem;
        }
        .dc-reset-btn:hover {
          border-color: #ff4d1c;
          color: #ff4d1c;
        }

        /* Mobile-only apply button */
        .dc-apply-btn { display: none; }

        /* ============ MAIN ============ */
        .dc-cars-main {}

        .dc-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .dc-results-count {
          font-size: 0.9rem;
          color: rgba(232,234,237,0.6);
        }
        .dc-results-count strong {
          color: #e8eaed;
          font-weight: 700;
        }

        .dc-mobile-filter-btn {
          display: none;
          padding: 0.65rem 1rem;
          background: #14171c;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: #e8eaed;
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          gap: 0.5rem;
          align-items: center;
        }
        .dc-mobile-filter-btn span {
          background: #ff4d1c;
          color: #fff;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-size: 0.72rem;
        }

        .dc-sort-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 0.9rem;
          background: #14171c;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          transition: border-color 0.2s;
        }
        .dc-sort-wrap:hover { border-color: rgba(255,255,255,0.15); }
        .dc-sort-wrap svg {
          width: 14px;
          height: 14px;
          opacity: 0.5;
          flex-shrink: 0;
        }
        .dc-sort-select {
          background: none;
          border: none;
          color: #e8eaed;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
          padding-right: 0.5rem;
        }
        .dc-sort-select option { background: #14171c; }

        /* Active chips */
        .dc-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .dc-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.65rem;
          background: rgba(255,77,28,0.1);
          border: 1px solid rgba(255,77,28,0.3);
          border-radius: 100px;
          font-size: 0.78rem;
          color: #ff7a3d;
          font-weight: 600;
        }
        .dc-chip button {
          background: none;
          border: none;
          cursor: pointer;
          color: inherit;
          font-size: 1.05rem;
          line-height: 1;
          padding: 0;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .dc-chip button:hover { opacity: 1; }

        /* Cars grid */
        .dc-cars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        /* Empty state */
        .dc-no-results {
          text-align: center;
          padding: 5rem 2rem;
          background: #0f1217;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
        }
        .dc-no-results-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .dc-no-results h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
        }
        .dc-no-results p {
          color: rgba(232,234,237,0.6);
          margin: 0 auto 1.5rem;
          max-width: 400px;
        }
        .dc-no-results button {
          padding: 0.85rem 1.75rem;
          background: #ff4d1c;
          color: #fff;
          border: none;
          border-radius: 100px;
          font-family: inherit;
          font-size: 0.92rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .dc-no-results button:hover {
          background: #ff6a3d;
          transform: translateY(-2px);
        }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 1024px) {
          .dc-cars-layout { grid-template-columns: 240px 1fr; gap: 1.75rem; }
        }

        @media (max-width: 900px) {
          .dc-cars-page { padding: 6rem 1.25rem 3rem; }
          .dc-cars-layout { grid-template-columns: 1fr; gap: 1.5rem; }

          .dc-mobile-filter-btn { display: inline-flex; }
          .dc-reset-btn { display: block; }
          .dc-apply-btn {
            display: block;
            width: 100%;
            padding: 0.9rem;
            background: #ff4d1c;
            color: #fff;
            border: none;
            border-radius: 10px;
            font-family: inherit;
            font-size: 0.92rem;
            font-weight: 700;
            cursor: pointer;
            margin-top: 0.75rem;
          }

          .dc-filters {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 320px;
            max-width: 85vw;
            height: 100vh;
            max-height: 100vh;
            padding: 1.5rem 1.25rem;
            background: #0d1015;
            border-right: 1px solid rgba(255,255,255,0.08);
            z-index: 200;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            overflow-y: auto;
          }
          .dc-filters.open { transform: translateX(0); }

          .dc-filter-head-mobile {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .dc-filter-head-mobile h3 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.15rem;
            font-weight: 700;
            margin: 0;
          }
          .dc-filter-head-mobile button {
            background: none;
            border: none;
            color: #e8eaed;
            font-size: 1.75rem;
            line-height: 1;
            cursor: pointer;
            padding: 0;
          }

          .dc-filter-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            z-index: 199;
            animation: dc-fadeIn 0.2s;
          }
          @keyframes dc-fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .dc-filters-head { display: none; }
        }

        @media (max-width: 560px) {
          .dc-toolbar { gap: 0.75rem; }
          .dc-cars-grid { grid-template-columns: 1fr; }
          .dc-cars-title { font-size: 1.8rem; }
        }
      `}</style>

      <div className="dc-cars-page">
        {/* HEADER */}
        <div className="dc-cars-header">
          <div className="dc-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Cars</span>
          </div>
          <h1 className="dc-cars-title">
            Browse <em>All Cars</em>
          </h1>
          <p className="dc-cars-subtitle">
            Hand-picked, fully inspected, and ready to drive. Filter by brand, price,
            or type to find your perfect match.
          </p>
        </div>

        {/* LAYOUT */}
        <div className="dc-cars-layout">
          {/* Mobile backdrop */}
          {mobileOpen && (
            <div className="dc-filter-backdrop" onClick={() => setMobileOpen(false)} />
          )}

          {/* SIDEBAR / FILTERS */}
          <aside className={`dc-filters ${mobileOpen ? 'open' : ''}`}>
            {/* Mobile drawer header */}
            <div className="dc-filter-head-mobile">
              <h3>Filters {activeCount > 0 && `(${activeCount})`}</h3>
              <button onClick={() => setMobileOpen(false)} aria-label="Close filters">×</button>
            </div>

            {/* Desktop header */}
            <div className="dc-filters-head">
              <h3>Filters {activeCount > 0 && `(${activeCount})`}</h3>
              {activeCount > 0 && (
                <button className="dc-filters-clear" onClick={resetAll}>
                  Clear all
                </button>
              )}
            </div>

            {/* Search */}
            <div className="dc-search-wrap">
              <svg className="dc-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="dc-search-input"
                placeholder="Search cars, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Condition */}
            <div className="dc-filter-group">
              <h4>Condition</h4>
              <label className="dc-radio">
                <input
                  type="radio"
                  name="condition"
                  checked={condition === 'all'}
                  onChange={() => setCondition('all')}
                />
                <span className="dc-radio-box" />
                All Conditions
              </label>
              {allConditions.map((c) => (
                <label key={c} className="dc-radio">
                  <input
                    type="radio"
                    name="condition"
                    checked={condition === c}
                    onChange={() => setCondition(c)}
                  />
                  <span className="dc-radio-box" />
                  {c}
                </label>
              ))}
            </div>

            {/* Brand */}
            <div className="dc-filter-group">
              <h4>Brand</h4>
              {allBrands.map((b) => (
                <label key={b} className="dc-checkbox">
                  <input
                    type="checkbox"
                    checked={brandFilter.includes(b)}
                    onChange={() => toggleBrand(b)}
                  />
                  <span className="dc-check-box" />
                  {b}
                </label>
              ))}
            </div>

            {/* Body Type */}
            <div className="dc-filter-group">
              <h4>Body Type</h4>
              {allBodies.map((b) => (
                <label key={b} className="dc-checkbox">
                  <input
                    type="checkbox"
                    checked={bodyFilter.includes(b)}
                    onChange={() => toggleBody(b)}
                  />
                  <span className="dc-check-box" />
                  {b}
                </label>
              ))}
            </div>

            {/* Transmission */}
            <div className="dc-filter-group">
              <h4>Transmission</h4>
              <label className="dc-radio">
                <input
                  type="radio"
                  name="trans"
                  checked={transFilter === 'all'}
                  onChange={() => setTransFilter('all')}
                />
                <span className="dc-radio-box" />
                Any
              </label>
              {allTrans.map((t) => (
                <label key={t} className="dc-radio">
                  <input
                    type="radio"
                    name="trans"
                    checked={transFilter === t}
                    onChange={() => setTransFilter(t)}
                  />
                  <span className="dc-radio-box" />
                  {t}
                </label>
              ))}
            </div>

            {/* Fuel */}
            <div className="dc-filter-group">
              <h4>Fuel Type</h4>
              <label className="dc-radio">
                <input
                  type="radio"
                  name="fuel"
                  checked={fuelFilter === 'all'}
                  onChange={() => setFuelFilter('all')}
                />
                <span className="dc-radio-box" />
                Any
              </label>
              {allFuels.map((f) => (
                <label key={f} className="dc-radio">
                  <input
                    type="radio"
                    name="fuel"
                    checked={fuelFilter === f}
                    onChange={() => setFuelFilter(f)}
                  />
                  <span className="dc-radio-box" />
                  {f}
                </label>
              ))}
            </div>

            {/* Price */}
            <div className="dc-filter-group">
              <h4>Price Range</h4>
              <label className="dc-radio">
                <input
                  type="radio"
                  name="price"
                  checked={priceFilter === 'all'}
                  onChange={() => setPriceFilter('all')}
                />
                <span className="dc-radio-box" />
                Any Price
              </label>
              {PRICE_RANGES.map((r) => (
                <label key={r.value} className="dc-radio">
                  <input
                    type="radio"
                    name="price"
                    checked={priceFilter === r.value}
                    onChange={() => setPriceFilter(r.value)}
                  />
                  <span className="dc-radio-box" />
                  {r.label}
                </label>
              ))}
            </div>

            <button className="dc-reset-btn" onClick={resetAll}>
              Clear All Filters
            </button>

            <button className="dc-apply-btn" onClick={() => setMobileOpen(false)}>
              Show {results.length} {results.length === 1 ? 'Car' : 'Cars'}
            </button>
          </aside>

          {/* MAIN */}
          <main className="dc-cars-main">
            <div className="dc-toolbar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  className="dc-mobile-filter-btn"
                  onClick={() => setMobileOpen(true)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="7" y1="12" x2="17" y2="12" />
                    <line x1="10" y1="18" x2="14" y2="18" />
                  </svg>
                  Filters
                  {activeCount > 0 && <span>{activeCount}</span>}
                </button>
                <div className="dc-results-count">
                  <strong>{results.length}</strong> {results.length === 1 ? 'car' : 'cars'} found
                </div>
              </div>

              <div className="dc-sort-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="6" y1="12" x2="18" y2="12" />
                  <line x1="10" y1="18" x2="14" y2="18" />
                </svg>
                <select
                  className="dc-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active chips */}
            {activeCount > 0 && (
              <div className="dc-chips">
                {condition !== 'all' && (
                  <span className="dc-chip">
                    {condition}
                    <button onClick={() => setCondition('all')}>×</button>
                  </span>
                )}
                {brandFilter.map((b) => (
                  <span key={b} className="dc-chip">
                    {b}
                    <button onClick={() => toggleBrand(b)}>×</button>
                  </span>
                ))}
                {bodyFilter.map((b) => (
                  <span key={b} className="dc-chip">
                    {b}
                    <button onClick={() => toggleBody(b)}>×</button>
                  </span>
                ))}
                {transFilter !== 'all' && (
                  <span className="dc-chip">
                    {transFilter}
                    <button onClick={() => setTransFilter('all')}>×</button>
                  </span>
                )}
                {fuelFilter !== 'all' && (
                  <span className="dc-chip">
                    {fuelFilter}
                    <button onClick={() => setFuelFilter('all')}>×</button>
                  </span>
                )}
                {priceFilter !== 'all' && (
                  <span className="dc-chip">
                    {PRICE_RANGES.find((r) => r.value === priceFilter)?.label}
                    <button onClick={() => setPriceFilter('all')}>×</button>
                  </span>
                )}
              </div>
            )}

            {/* Grid */}
            {results.length > 0 ? (
              <div className="dc-cars-grid">
                {results.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="dc-no-results">
                <div className="dc-no-results-icon">🚗</div>
                <h3>No cars match your filters</h3>
                <p>
                  Try adjusting your search, clearing some filters, or browsing all
                  available cars.
                </p>
                <button onClick={resetAll}>Clear All Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
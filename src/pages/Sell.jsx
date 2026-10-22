import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// 👇 CHANGE to your real WhatsApp number (digits only)
const WHATSAPP_NUMBER = '2347012983524';

const brands = [
  'Toyota', 'Lexus', 'Mercedes-Benz', 'Honda', 'BMW',
  'Range Rover', 'Ford', 'Hyundai', 'Kia', 'Nissan',
  'Peugeot', 'Volkswagen', 'Audi', 'Other',
];

const conditions = [
  'Nigerian Used (Naija Used)',
  'Foreign Used (Tokunbo)',
  'Brand New',
];

const years = Array.from({ length: 2026 - 1995 + 1 }, (_, i) => 2026 - i);

const WHY_SELL = [
  {
    icon: '⚡',
    title: 'Fast Cash Offer',
    desc: 'Get a real number — not a runaround. We respond within 24 hours with a fair, transparent offer.',
  },
  {
    icon: '🔍',
    title: 'Free Inspection',
    desc: 'We come to you anywhere in Lagos. No cost, no obligation, no pressure to sell.',
  },
  {
    icon: '💵',
    title: 'Instant Payment',
    desc: 'Accept the offer and get paid the same day via bank transfer. No delays, no excuses.',
  },
  {
    icon: '📋',
    title: 'We Handle Paperwork',
    desc: 'Change of ownership, transfer, and all documentation — we take care of it end to end.',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Tell us about your car',
    desc: 'Fill out the short form below with your car details. Takes 2 minutes.',
  },
  {
    num: '02',
    title: 'Get a free inspection',
    desc: 'We come to your location in Lagos to inspect the car. Completely free, no strings.',
  },
  {
    num: '03',
    title: 'Accept & get paid',
    desc: 'Happy with the offer? We pay you the same day and handle all paperwork.',
  },
];

const FAQS = [
  {
    q: 'Do you buy cars outside Lagos?',
    a: 'We currently buy cars within Lagos only for physical inspection. If you are outside Lagos, send us details on WhatsApp — we can still discuss depending on the car.',
  },
  {
    q: 'Will you lowball my car price?',
    a: 'No. We price fairly based on real market value, condition, mileage, and documentation. If you have proof of a higher genuine offer, we can match or beat it in most cases.',
  },
  {
    q: 'Do you buy cars with issues?',
    a: 'Yes — minor repairs, small dents, high mileage, and non-accident issues are fine. We do not buy cars with serious structural damage or complicated paperwork.',
  },
  {
    q: 'How long does the process take?',
    a: 'From filling this form to getting paid: usually 24–48 hours. If you accept our offer, you can get payment on the same day as inspection.',
  },
  {
    q: 'Is the inspection really free?',
    a: '100% free. No hidden fees, no commitment, no obligation. Even if you decide not to sell, no cost to you.',
  },
];

export default function Sell() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    brand: '',
    model: '',
    year: '',
    condition: '',
    mileage: '',
    location: '',
    askingPrice: '',
    notes: '',
  });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('dc-visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.dc-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.brand || !form.model || !form.year) {
      alert('Please fill in the required fields (Name, Phone, Brand, Model, Year).');
      return;
    }

    const text =
      `*🚗 Sell My Car Enquiry*%0A%0A` +
      `*Name:* ${form.name}%0A` +
      `*Phone:* ${form.phone}%0A%0A` +
      `*Vehicle Details:*%0A` +
      `• Brand: ${form.brand}%0A` +
      `• Model: ${form.model}%0A` +
      `• Year: ${form.year}%0A` +
      (form.condition ? `• Condition: ${form.condition}%0A` : '') +
      (form.mileage ? `• Mileage: ${form.mileage} km%0A` : '') +
      (form.location ? `• Location: ${form.location}%0A` : '') +
      (form.askingPrice ? `• My asking price: ₦${form.askingPrice}%0A` : '') +
      (form.notes ? `%0A*Extra notes:*%0A${form.notes}` : '');

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setSent(true);
    setForm({
      name: '', phone: '', brand: '', model: '', year: '',
      condition: '', mileage: '', location: '', askingPrice: '', notes: '',
    });
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        .dc-sell {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #0a0c0f;
          color: #e8eaed;
          min-height: 100vh;
          overflow-x: hidden;
        }
        .dc-sell * { box-sizing: border-box; }

        .dc-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.2,0.9,0.3,1), transform 0.7s cubic-bezier(0.2,0.9,0.3,1);
        }
        .dc-visible { opacity: 1; transform: translateY(0); }

        /* ============ HERO ============ */
        .dc-sell-hero {
          position: relative;
          padding: 9rem 2rem 6rem;
          overflow: hidden;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .dc-sell-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          opacity: 0.18;
          filter: grayscale(0.5);
        }
        .dc-sell-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at center, rgba(10,12,15,0.4) 0%, rgba(10,12,15,0.95) 75%),
            linear-gradient(to bottom, rgba(10,12,15,0.7) 0%, rgba(10,12,15,0.95) 100%);
        }
        .dc-sell-hero-inner {
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
          max-width: 620px;
          margin: 0 auto 2rem;
          line-height: 1.65;
        }
        .dc-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 1rem 2rem;
          background: #ff4d1c;
          color: #fff;
          text-decoration: none;
          border-radius: 100px;
          font-weight: 700;
          font-size: 1rem;
          box-shadow: 0 10px 30px rgba(255,77,28,0.4);
          transition: all 0.25s;
        }
        .dc-hero-cta:hover {
          background: #ff6a3d;
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(255,77,28,0.55);
          color: #fff;
        }

        /* ============ SECTIONS ============ */
        .dc-sell-section {
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

        /* ============ STEPS ============ */
        .dc-steps-section {
          background: #0d1015;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .dc-steps-head { text-align: center; margin-bottom: 3rem; }
        .dc-steps-head .dc-section-title { margin: 0 auto; }

        .dc-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .dc-step-card {
          padding: 2.25rem 1.75rem;
          background: #14171c;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          position: relative;
          transition: all 0.3s;
        }
        .dc-step-card:hover {
          border-color: rgba(255,77,28,0.3);
          transform: translateY(-4px);
        }
        .dc-step-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 3.5rem;
          font-weight: 700;
          color: #ff4d1c;
          line-height: 1;
          margin-bottom: 1.25rem;
          opacity: 0.9;
        }
        .dc-step-card h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 0.6rem;
        }
        .dc-step-card p {
          font-size: 0.92rem;
          color: rgba(232,234,237,0.6);
          line-height: 1.65;
          margin: 0;
        }

        /* ============ WHY SELL ============ */
        .dc-why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
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
        .dc-why-card h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 0.6rem;
        }
        .dc-why-card p {
          font-size: 0.92rem;
          color: rgba(232,234,237,0.6);
          line-height: 1.7;
          margin: 0;
        }

        /* ============ FORM SECTION ============ */
        .dc-form-section {
          background: #0d1015;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .dc-form-layout {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 4rem;
          align-items: start;
        }
        .dc-form-info p {
          font-size: 1rem;
          color: rgba(232,234,237,0.65);
          line-height: 1.75;
          margin: 0 0 1.5rem;
        }
        .dc-form-benefits {
          list-style: none;
          padding: 0;
          margin: 2rem 0 0;
        }
        .dc-form-benefits li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.85rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.92rem;
          color: rgba(232,234,237,0.75);
        }
        .dc-form-benefits li:last-child { border-bottom: none; }
        .dc-form-benefits li::before {
          content: '✓';
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          background: rgba(255,77,28,0.15);
          color: #ff4d1c;
          border-radius: 50%;
          font-weight: 700;
          font-size: 0.72rem;
          flex-shrink: 0;
        }

        .dc-sell-form {
          background: #14171c;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 2.25rem 2rem;
        }
        .dc-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .dc-form-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }
        .dc-form-field label {
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(232,234,237,0.6);
        }
        .dc-form-field label span { color: #ff4d1c; }
        .dc-form-field input,
        .dc-form-field select,
        .dc-form-field textarea {
          padding: 0.85rem 1rem;
          background: #0d1015;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: #e8eaed;
          font-family: inherit;
          font-size: 0.92rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }
        .dc-form-field input:focus,
        .dc-form-field select:focus,
        .dc-form-field textarea:focus {
          border-color: #ff4d1c;
          box-shadow: 0 0 0 3px rgba(255,77,28,0.15);
        }
        .dc-form-field input::placeholder,
        .dc-form-field textarea::placeholder {
          color: rgba(232,234,237,0.3);
        }
        .dc-form-field select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717A' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }
        .dc-form-field select option { background: #0d1015; color: #e8eaed; }
        .dc-form-field textarea {
          resize: vertical;
          min-height: 100px;
          line-height: 1.5;
        }
        .dc-sell-submit {
          margin-top: 0.5rem;
          width: 100%;
          padding: 1rem 1.5rem;
          background: #ff4d1c;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: all 0.25s;
          box-shadow: 0 10px 24px rgba(255,77,28,0.3);
        }
        .dc-sell-submit:hover {
          background: #ff6a3d;
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(255,77,28,0.45);
        }
        .dc-success-msg {
          margin-top: 1rem;
          padding: 1rem 1.15rem;
          background: rgba(50,180,100,0.1);
          border: 1px solid rgba(50,180,100,0.3);
          border-radius: 10px;
          color: #5cd88f;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: dc-slideIn 0.3s ease-out;
        }
        @keyframes dc-slideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ============ FAQ ============ */
        .dc-faq-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 2.5rem;
        }
        .dc-faq-item {
          background: #14171c;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .dc-faq-item.open { border-color: rgba(255,77,28,0.35); }
        .dc-faq-q {
          width: 100%;
          background: none;
          border: none;
          text-align: left;
          padding: 1.25rem 1.5rem;
          color: #e8eaed;
          font-family: inherit;
          font-size: 0.98rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          transition: color 0.2s;
        }
        .dc-faq-q:hover { color: #ff4d1c; }
        .dc-faq-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s;
          position: relative;
        }
        .dc-faq-icon::before,
        .dc-faq-icon::after {
          content: '';
          position: absolute;
          background: currentColor;
          transition: transform 0.3s;
        }
        .dc-faq-icon::before { width: 9px; height: 1.5px; }
        .dc-faq-icon::after { width: 1.5px; height: 9px; }
        .dc-faq-item.open .dc-faq-icon {
          background: #ff4d1c;
          border-color: #ff4d1c;
          color: #fff;
        }
        .dc-faq-item.open .dc-faq-icon::after { transform: scaleY(0); }
        .dc-faq-a {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.35s ease;
          padding: 0 1.5rem;
        }
        .dc-faq-item.open .dc-faq-a {
          max-height: 300px;
          padding: 0 1.5rem 1.25rem;
        }
        .dc-faq-a p {
          margin: 0;
          color: rgba(232,234,237,0.65);
          font-size: 0.92rem;
          line-height: 1.65;
        }

        /* ============ FINAL CTA ============ */
        .dc-sell-final-cta {
          padding: 5rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0f1217 0%, #1a1010 100%);
        }
        .dc-sell-final-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255,77,28,0.12) 0%, transparent 60%);
          pointer-events: none;
        }
        .dc-final-inner {
          max-width: 700px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .dc-final-inner h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.75rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 1rem;
        }
        .dc-final-inner h2 em { color: #ff4d1c; font-style: italic; }
        .dc-final-inner p {
          font-size: 1rem;
          color: rgba(232,234,237,0.65);
          margin: 0 auto 2rem;
          max-width: 520px;
          line-height: 1.6;
        }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 900px) {
          .dc-sell-hero { padding: 7rem 1.25rem 4rem; }
          .dc-sell-section { padding: 4rem 1.25rem; }
          .dc-steps-grid { grid-template-columns: 1fr; gap: 1rem; }
          .dc-form-layout { grid-template-columns: 1fr; gap: 2.5rem; }
          .dc-form-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .dc-hero-title { font-size: 2.1rem; }
          .dc-sell-form { padding: 1.75rem 1.5rem; }
        }
      `}</style>

      <div className="dc-sell">
        {/* ============ HERO ============ */}
        <section className="dc-sell-hero">
          <div className="dc-sell-hero-inner">
            <div className="dc-breadcrumb">
              <Link to="/">Home</Link>
              <span>›</span>
              <span>Sell Your Car</span>
            </div>
            <div className="dc-hero-eyebrow">
              <span>💰 Fair offers · Same-day payment</span>
            </div>
            <h1 className="dc-hero-title">
              Sell Your Car<br />
              in <em>24 Hours.</em>
            </h1>
            <p className="dc-hero-sub">
              Skip the endless calls, low-ball offers, and wasted weekends. We buy
              quality cars in Lagos — fair price, free inspection, instant payment.
            </p>
            <a href="#sell-form" className="dc-hero-cta">
              Get My Free Offer
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </a>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="dc-steps-section">
          <div className="dc-sell-section">
            <div className="dc-steps-head dc-reveal">
              <span className="dc-section-eyebrow">How It Works</span>
              <h2 className="dc-section-title">Three steps. One day. <em>Done.</em></h2>
            </div>

            <div className="dc-steps-grid">
              {STEPS.map((step) => (
                <div key={step.num} className="dc-step-card dc-reveal">
                  <div className="dc-step-num">{step.num}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ WHY SELL TO US ============ */}
        <section className="dc-sell-section">
          <div className="dc-reveal">
            <span className="dc-section-eyebrow">Why Sell to Us</span>
            <h2 className="dc-section-title">The easiest way to sell your car in Lagos.</h2>
            <p style={{ fontSize: '1rem', color: 'rgba(232,234,237,0.6)', maxWidth: 620, lineHeight: 1.7, margin: '0.5rem 0 0' }}>
              No listing fees, no time-wasters, no strangers showing up at your house. Just a fair deal, done properly.
            </p>
          </div>

          <div className="dc-why-grid">
            {WHY_SELL.map((v) => (
              <div key={v.title} className="dc-why-card dc-reveal">
                <div className="dc-why-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ FORM ============ */}
        <section id="sell-form" className="dc-form-section">
          <div className="dc-sell-section">
            <div className="dc-form-layout">
              {/* Left — info */}
              <div className="dc-form-info dc-reveal">
                <span className="dc-section-eyebrow">Get Started</span>
                <h2 className="dc-section-title">Tell us about your car.</h2>
                <p>
                  Fill out the short form and we'll get back to you within a few
                  hours — usually on WhatsApp — with a free, no-obligation offer.
                </p>
                <p>
                  <strong style={{ color: '#e8eaed' }}>Not ready to fill a form?</strong>{' '}
                  Click the WhatsApp button in the form and just chat with us
                  directly. We'll guide you through.
                </p>

                <ul className="dc-form-benefits">
                  <li>Free inspection — we come to you</li>
                  <li>Fair price based on real market value</li>
                  <li>Same-day bank transfer if you accept</li>
                  <li>We handle all ownership transfer paperwork</li>
                  <li>No listing fees, no hidden charges</li>
                </ul>
              </div>

              {/* Right — form */}
              <form className="dc-sell-form dc-reveal" onSubmit={handleSubmit}>
                <div className="dc-form-row">
                  <div className="dc-form-field">
                    <label>Full Name <span>*</span></label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="dc-form-field">
                    <label>Phone Number <span>*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="080 1234 5678"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="dc-form-row">
                  <div className="dc-form-field">
                    <label>Brand <span>*</span></label>
                    <select name="brand" value={form.brand} onChange={handleChange} required>
                      <option value="">Select brand</option>
                      {brands.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div className="dc-form-field">
                    <label>Model <span>*</span></label>
                    <input
                      type="text"
                      name="model"
                      placeholder="e.g. Camry, RX 350"
                      value={form.model}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="dc-form-row">
                  <div className="dc-form-field">
                    <label>Year <span>*</span></label>
                    <select name="year" value={form.year} onChange={handleChange} required>
                      <option value="">Select year</option>
                      {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div className="dc-form-field">
                    <label>Condition</label>
                    <select name="condition" value={form.condition} onChange={handleChange}>
                      <option value="">Select condition</option>
                      {conditions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="dc-form-row">
                  <div className="dc-form-field">
                    <label>Mileage (km)</label>
                    <input
                      type="number"
                      name="mileage"
                      placeholder="e.g. 45000"
                      value={form.mileage}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                  <div className="dc-form-field">
                    <label>Your Location</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Ikeja, Lagos"
                      value={form.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="dc-form-field">
                  <label>Asking Price (₦) — optional</label>
                  <input
                    type="number"
                    name="askingPrice"
                    placeholder="e.g. 25000000"
                    value={form.askingPrice}
                    onChange={handleChange}
                    min="0"
                  />
                </div>

                <div className="dc-form-field">
                  <label>Anything else we should know? (optional)</label>
                  <textarea
                    name="notes"
                    placeholder="Accident history, recent repairs, special features, urgency... tell us anything relevant."
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="dc-sell-submit">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Get My Free Offer via WhatsApp
                </button>

                {sent && (
                  <div className="dc-success-msg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Sent! WhatsApp is opening — just hit send and we'll reply shortly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="dc-sell-section">
          <div className="dc-reveal" style={{ textAlign: 'center' }}>
            <span className="dc-section-eyebrow">Common Questions</span>
            <h2 className="dc-section-title">Everything you might ask.</h2>
          </div>

          <div className="dc-faq-list" style={{ maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            {FAQS.map((faq, i) => (
              <div key={i} className={`dc-faq-item ${openFaq === i ? 'open' : ''}`}>
                <button
                  className="dc-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {faq.q}
                  <span className="dc-faq-icon" />
                </button>
                <div className="dc-faq-a">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="dc-sell-final-cta">
          <div className="dc-final-inner dc-reveal">
            <h2>
              Still thinking about it?<br />
              <em>Let's just talk.</em>
            </h2>
            <p>
              No pressure, no salespeople. Send one message and see what your car
              is really worth — free.
            </p>
            <a href="#sell-form" className="dc-hero-cta">
              Get My Free Offer
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
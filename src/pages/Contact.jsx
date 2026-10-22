import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 👇 CHANGE these to your real details
const WHATSAPP_NUMBER = '2347012983524';
const PHONE_NUMBER = '+2347012983524';
const EMAIL = 'hello@yourdealership.com';
const ADDRESS = '1 Shoretire Street, Orile Agege, Lagos';
const MAP_QUERY = '1+Shoretire+Street,+Orile+Agege,+Lagos,+Nigeria';

const carOptions = [
  'Toyota Camry',
  'Lexus RX 350',
  'Mercedes-Benz GLE',
  'Honda Accord',
  'Toyota Highlander',
  'Range Rover Sport',
  'Not sure yet — just exploring',
];

const faqs = [
  {
    q: 'Can I inspect a car before buying?',
    a: 'Absolutely. Every car on our lot is available for inspection at our Orile Agege showroom. Book an appointment via WhatsApp and we will have it ready.',
  },
  {
    q: 'Do you offer financing?',
    a: 'Yes — we work with trusted banks and financiers. You can pay a deposit and spread the balance over an agreed period. Contact us to discuss your options.',
  },
  {
    q: 'Do you deliver outside Lagos?',
    a: 'We deliver nationwide. Delivery cost depends on your location — reach out on WhatsApp and we will quote you.',
  },
  {
    q: 'Do you accept trade-ins?',
    a: 'Yes. We buy clean cars and accept trade-ins on newer models. Send us photos and details and we will give you a valuation within 24 hours.',
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    car: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      alert('Please fill in your name, phone, and message.');
      return;
    }

    const text =
      `*New Enquiry from Website*%0A%0A` +
      `*Name:* ${form.name}%0A` +
      `*Phone:* ${form.phone}%0A` +
      (form.email ? `*Email:* ${form.email}%0A` : '') +
      (form.car ? `*Car of interest:* ${form.car}%0A` : '') +
      `%0A*Message:*%0A${form.message}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setSent(true);
    setForm({ name: '', phone: '', email: '', car: '', message: '' });
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        .dc-contact {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #0a0c0f;
          color: #e8eaed;
          min-height: 100vh;
          padding: 7rem 2rem 0;
          overflow-x: hidden;
        }
        .dc-contact * { box-sizing: border-box; }

        .dc-contact-inner {
          max-width: 1300px;
          margin: 0 auto;
        }

        /* ============ HEADER ============ */
        .dc-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: rgba(232,234,237,0.5);
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .dc-breadcrumb a {
          color: rgba(232,234,237,0.7);
          text-decoration: none;
          transition: color 0.2s;
        }
        .dc-breadcrumb a:hover { color: #ff4d1c; }
        .dc-breadcrumb span:last-child { color: #e8eaed; font-weight: 500; }

        .dc-contact-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin: 0 0 0.75rem;
        }
        .dc-contact-title em { color: #ff4d1c; font-style: italic; }
        .dc-contact-subtitle {
          font-size: 1rem;
          color: rgba(232,234,237,0.6);
          max-width: 620px;
          margin: 0 0 3rem;
          line-height: 1.6;
        }

        /* ============ MAIN GRID ============ */
        .dc-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 2.5rem;
          margin-bottom: 4rem;
          align-items: start;
        }

        /* ============ LEFT — INFO ============ */
        .dc-info-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .dc-info-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.4rem 1.5rem;
          background: #14171c;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          text-decoration: none;
          color: inherit;
          transition: all 0.25s;
        }
        .dc-info-card:hover {
          border-color: rgba(255,77,28,0.35);
          transform: translateY(-2px);
        }
        .dc-info-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: rgba(255,77,28,0.12);
          border: 1px solid rgba(255,77,28,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #ff4d1c;
        }
        .dc-info-icon svg { width: 20px; height: 20px; }
        .dc-info-body { flex: 1; min-width: 0; }
        .dc-info-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(232,234,237,0.45);
          font-weight: 700;
          margin-bottom: 0.35rem;
        }
        .dc-info-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #e8eaed;
          line-height: 1.4;
          word-break: break-word;
        }
        .dc-info-hint {
          font-size: 0.8rem;
          color: rgba(232,234,237,0.5);
          margin-top: 0.3rem;
        }
        .dc-info-arrow {
          color: rgba(232,234,237,0.3);
          flex-shrink: 0;
          align-self: center;
          transition: all 0.25s;
        }
        .dc-info-card:hover .dc-info-arrow {
          color: #ff4d1c;
          transform: translateX(3px);
        }

        /* Hours card */
        .dc-hours-card {
          background: #14171c;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 1.4rem 1.5rem;
          margin-top: 0.5rem;
        }
        .dc-hours-card h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(232,234,237,0.45);
          margin: 0 0 1rem;
          font-weight: 700;
        }
        .dc-hours-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.55rem 0;
          font-size: 0.9rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .dc-hours-row:last-child { border-bottom: none; }
        .dc-hours-day { color: rgba(232,234,237,0.7); }
        .dc-hours-time { color: #e8eaed; font-weight: 600; }
        .dc-hours-time.closed { color: rgba(232,234,237,0.4); font-weight: 500; }

        /* ============ RIGHT — FORM ============ */
        .dc-form-col {
          background: #14171c;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 2.25rem 2rem;
        }
        .dc-form-col h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 0.5rem;
        }
        .dc-form-intro {
          font-size: 0.9rem;
          color: rgba(232,234,237,0.55);
          margin: 0 0 1.75rem;
          line-height: 1.5;
        }

        .dc-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .dc-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .dc-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .dc-field label {
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(232,234,237,0.6);
        }
        .dc-field label span { color: #ff4d1c; }
        .dc-field input,
        .dc-field select,
        .dc-field textarea {
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
        .dc-field input:focus,
        .dc-field select:focus,
        .dc-field textarea:focus {
          border-color: #ff4d1c;
          box-shadow: 0 0 0 3px rgba(255,77,28,0.15);
        }
        .dc-field input::placeholder,
        .dc-field textarea::placeholder {
          color: rgba(232,234,237,0.3);
        }
        .dc-field select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717A' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }
        .dc-field select option {
          background: #0d1015;
          color: #e8eaed;
        }
        .dc-field textarea {
          resize: vertical;
          min-height: 120px;
          font-family: inherit;
          line-height: 1.5;
        }

        .dc-submit {
          margin-top: 0.5rem;
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
        .dc-submit:hover {
          background: #ff6a3d;
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(255,77,28,0.45);
        }
        .dc-submit:disabled {
          background: rgba(255,77,28,0.4);
          cursor: not-allowed;
          transform: none;
        }

        .dc-success {
          margin-top: 1rem;
          padding: 1rem 1.15rem;
          background: rgba(50,180,100,0.1);
          border: 1px solid rgba(50,180,100,0.3);
          border-radius: 10px;
          color: #5cd88f;
          font-size: 0.9rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: dc-slideIn 0.3s ease-out;
        }
        @keyframes dc-slideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ============ MAP ============ */
        .dc-map-wrap {
          max-width: 1300px;
          margin: 0 auto;
          padding-bottom: 5rem;
        }
        .dc-map-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 0.4rem;
        }
        .dc-map-sub {
          font-size: 0.92rem;
          color: rgba(232,234,237,0.55);
          margin: 0 0 1.5rem;
        }
        .dc-map-frame {
          width: 100%;
          height: 420px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          filter: grayscale(0.3) brightness(0.85) contrast(1.05);
          transition: filter 0.3s;
        }
        .dc-map-frame:hover { filter: grayscale(0) brightness(0.9) contrast(1); }
        .dc-map-frame iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }

        /* ============ FAQ ============ */
        .dc-faq-wrap {
          max-width: 1300px;
          margin: 0 auto;
          padding-bottom: 6rem;
        }
        .dc-faq-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 0.5rem;
        }
        .dc-faq-sub {
          font-size: 0.92rem;
          color: rgba(232,234,237,0.55);
          margin: 0 0 2rem;
        }
        .dc-faq-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
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
        .dc-faq-item.open .dc-faq-icon::after {
          transform: scaleY(0);
        }
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

        /* ============ RESPONSIVE ============ */
        @media (max-width: 900px) {
          .dc-contact { padding: 6rem 1.25rem 0; }
          .dc-contact-grid { grid-template-columns: 1fr; gap: 2rem; }
          .dc-form-col { padding: 1.75rem 1.5rem; }
          .dc-form-row { grid-template-columns: 1fr; }
          .dc-map-frame { height: 320px; }
        }
        @media (max-width: 560px) {
          .dc-contact-title { font-size: 1.9rem; }
          .dc-info-card { padding: 1.15rem 1.25rem; }
          .dc-info-icon { width: 42px; height: 42px; }
          .dc-info-value { font-size: 0.92rem; }
          .dc-map-frame { height: 260px; }
        }
      `}</style>

      <div className="dc-contact">
        <div className="dc-contact-inner">
          {/* BREADCRUMB + HEADER */}
          <div className="dc-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Contact</span>
          </div>

          <h1 className="dc-contact-title">
            Let's <em>Talk.</em>
          </h1>
          <p className="dc-contact-subtitle">
            Have a question, want to book a test drive, or ready to buy? We're one
            message away. Reach us via phone, WhatsApp, or visit our Lagos showroom.
          </p>

          {/* MAIN GRID */}
          <div className="dc-contact-grid">
            {/* LEFT COLUMN — INFO */}
            <div className="dc-info-col">
              {/* Visit */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="dc-info-card"
              >
                <div className="dc-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="dc-info-body">
                  <div className="dc-info-label">Visit Our Showroom</div>
                  <div className="dc-info-value">{ADDRESS}</div>
                  <div className="dc-info-hint">Mon – Sat · 8:00 AM – 6:00 PM</div>
                </div>
                <svg className="dc-info-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>

              {/* Call */}
              <a href={`tel:${PHONE_NUMBER}`} className="dc-info-card">
                <div className="dc-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="dc-info-body">
                  <div className="dc-info-label">Call Us</div>
                  <div className="dc-info-value">{PHONE_NUMBER}</div>
                  <div className="dc-info-hint">Tap to call — we answer fast</div>
                </div>
                <svg className="dc-info-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="dc-info-card"
              >
                <div className="dc-info-icon" style={{ background: 'rgba(37,211,102,0.12)', borderColor: 'rgba(37,211,102,0.25)', color: '#25D366' }}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="dc-info-body">
                  <div className="dc-info-label">Chat on WhatsApp</div>
                  <div className="dc-info-value">Message us instantly</div>
                  <div className="dc-info-hint">Usually replies within minutes</div>
                </div>
                <svg className="dc-info-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>

              {/* Email */}
              <a href={`mailto:${EMAIL}`} className="dc-info-card">
                <div className="dc-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="dc-info-body">
                  <div className="dc-info-label">Email Us</div>
                  <div className="dc-info-value">{EMAIL}</div>
                  <div className="dc-info-hint">We reply within 24 hours</div>
                </div>
                <svg className="dc-info-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>

              {/* Business Hours */}
              <div className="dc-hours-card">
                <h3>Business Hours</h3>
                <div className="dc-hours-row">
                  <span className="dc-hours-day">Monday – Friday</span>
                  <span className="dc-hours-time">8:00 AM – 6:00 PM</span>
                </div>
                <div className="dc-hours-row">
                  <span className="dc-hours-day">Saturday</span>
                  <span className="dc-hours-time">9:00 AM – 5:00 PM</span>
                </div>
                <div className="dc-hours-row">
                  <span className="dc-hours-day">Sunday</span>
                  <span className="dc-hours-time closed">Closed</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — FORM */}
            <div className="dc-form-col">
              <h2>Send Us a Message</h2>
              <p className="dc-form-intro">
                Fill this short form and we'll get back to you right away — usually
                via WhatsApp for the fastest response.
              </p>

              <form className="dc-form" onSubmit={handleSubmit}>
                <div className="dc-form-row">
                  <div className="dc-field">
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
                  <div className="dc-field">
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
                  <div className="dc-field">
                    <label>Email (optional)</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="dc-field">
                    <label>Car of Interest (optional)</label>
                    <select name="car" value={form.car} onChange={handleChange}>
                      <option value="">Select a car</option>
                      {carOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="dc-field">
                  <label>Message <span>*</span></label>
                  <textarea
                    name="message"
                    placeholder="Tell us what you're looking for — budget, timeline, questions, anything."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="dc-submit">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Send via WhatsApp
                </button>

                {sent && (
                  <div className="dc-success">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Thank you! WhatsApp is opening with your message — just hit send.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="dc-map-wrap">
          <h2 className="dc-map-heading">Find Us on the Map</h2>
          <p className="dc-map-sub">Come see the cars in person — we're easy to find.</p>
          <div className="dc-map-frame">
            <iframe
              title="Our Dealership Location"
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        {/* FAQ */}
        <div className="dc-faq-wrap">
          <h2 className="dc-faq-heading">Frequently Asked Questions</h2>
          <p className="dc-faq-sub">Quick answers before you reach out.</p>
          <div className="dc-faq-list">
            {faqs.map((faq, i) => (
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
        </div>
      </div>
    </>
  );
}
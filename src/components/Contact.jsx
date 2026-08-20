import { useState } from "react";

const faqs = [
  { q: "How long does a typical interior design project take?", a: "Depending on the scope, residential projects usually take 6–14 weeks from concept to completion. We provide a detailed timeline at the start of every engagement." },
  { q: "Do you offer services outside Nashik?", a: "Yes! We have completed projects across Maharashtra including Pune and Mumbai. For outstation projects, we handle everything remotely with site visits at key milestones." },
  { q: "Is the initial consultation really free?", a: "Absolutely. We believe great relationships start with a conversation. The first consultation — in-person or virtual — is completely complimentary." },
  { q: "What is your budget range?", a: "We work across a wide range of budgets and tailor our recommendations accordingly. Our goal is to deliver maximum value at every price point." },
];

const GOOGLE_MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3748.7571993549636!2d73.7857492!3d20.0187026!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDAxJzA3LjMiTiA3M8KwNDcnMDguNyJF!5e0!3m2!1sen!2sin!4v1234567890";
const WHATSAPP_LINK = "https://wa.me/918055587237";
const PHONE_LINK = "tel:+918055587237";
const MAPS_LINK = "https://maps.google.com/?q=Office+No+1+Deepjyot+Apartment+Hanumanwadi+Makhmalabad+Road+Panchavati+Nashik+422003";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ct-page {
          font-family: var(--font-sans);
          background: linear-gradient(160deg, #f5f0e8 0%, #ede8d8 40%, #e8e0cc 100%);
          color: #3d3d30;
          min-height: 100vh;
        }

        /* ── HERO ── */
        .ct-hero {
          position: relative; overflow: hidden;
          padding: 100px 60px 72px;
          border-bottom: 1px solid rgba(138,154,74,0.2);
        }
        .ct-hero-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 50% 60% at 90% 10%, rgba(138,154,74,0.1) 0%, transparent 70%),
            radial-gradient(ellipse 40% 50% at 5% 90%, rgba(200,184,154,0.2) 0%, transparent 70%);
        }
        .ct-hero-inner { max-width: 1300px; margin: 0 auto; position: relative; z-index: 1; }
        .ct-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 20px;
          background: rgba(138,154,74,0.1);
          border: 1px solid rgba(138,154,74,0.3);
          border-radius: 20px;
          font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: #4a5a1f;
          margin-bottom: 28px;
        }
        .ct-hero h1 {
          font-family: var(--font-sans);
          font-size: clamp(48px, 7vw, 84px);
          font-weight: 300; line-height: 1.05;
          color: #2a2a24; letter-spacing: -2px;
          margin-bottom: 20px; max-width: 700px;
        }
        .ct-hero h1 em { font-style: normal; font-weight: 600; color: #8a9a4a; }
        .ct-hero-sub {
          font-size: 14px; font-weight: 300; line-height: 1.9;
          color: #5a5a4a; max-width: 480px;
        }

        /* ── CONTACT CARDS ── */
        .ct-cards-row {
          max-width: 1300px; margin: 0 auto;
          padding: 64px 60px 0;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }
        .ct-card {
          padding: 32px 28px;
          background: rgba(255,252,245,0.7);
          border: 1px solid rgba(138,154,74,0.18);
          border-radius: 20px;
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .ct-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(42,42,36,0.1);
          border-color: rgba(138,154,74,0.35);
        }
        .ct-card-icon {
          width: 52px; height: 52px;
          background: linear-gradient(135deg, #2a2a24, #3d4a1f);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(42,42,36,0.2);
        }
        .ct-card-label {
          font-size: 10px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #8a9a4a; margin-bottom: 6px;
        }
        .ct-card-value {
          font-family: var(--font-sans);
          font-size: 19px; font-weight: 500;
          color: #2a2a24; line-height: 1.4;
        }
        .ct-card-sub {
          font-size: 11.5px; font-weight: 300;
          color: #8a8a6a; margin-top: 4px;
        }

        /* ── MAIN SECTION ── */
        .ct-main {
          max-width: 1300px; margin: 0 auto;
          padding: 64px 60px;
          display: grid; grid-template-columns: 1fr 1.2fr; gap: 64px; align-items: start;
        }

        /* ── LEFT ── */
        .ct-section-label {
          font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
          color: #8a9a4a; font-weight: 600; margin-bottom: 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .ct-section-label::before {
          content: ''; width: 32px; height: 1.5px;
          background: linear-gradient(90deg, #8a9a4a, transparent);
        }
        .ct-left h2 {
          font-family: var(--font-sans);
          font-size: clamp(32px, 3.5vw, 44px);
          font-weight: 400; color: #2a2a24;
          line-height: 1.15; letter-spacing: -0.5px;
          margin-bottom: 20px;
        }
        .ct-left h2 em { font-style: normal; font-weight: 600; color: #8a9a4a; }
        .ct-left p {
          font-size: 13.5px; font-weight: 300;
          color: #5a5a4a; line-height: 1.9; margin-bottom: 36px;
        }

        .ct-info-list { display: flex; flex-direction: column; gap: 20px; margin-bottom: 40px; }
        .ct-info-item { display: flex; align-items: flex-start; gap: 16px; }
        .ct-info-dot {
          width: 36px; height: 36px; flex-shrink: 0;
          background: rgba(138,154,74,0.1);
          border: 1px solid rgba(138,154,74,0.25);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; margin-top: 2px;
        }
        .ct-info-key {
          font-size: 9.5px; font-weight: 600; letter-spacing: 1.8px;
          text-transform: uppercase; color: #6a7a3a; margin-bottom: 3px;
        }
        .ct-info-val {
          font-size: 13px; font-weight: 400; color: #3a3a2c; line-height: 1.6;
          text-decoration: none;
        }
        a.ct-info-val:hover { color: #5a7a1a; }

        .ct-hours {
          padding: 24px 28px;
          background: rgba(42,42,36,0.04);
          border: 1px solid rgba(138,154,74,0.15);
          border-radius: 16px;
        }
        .ct-hours-title {
          font-size: 10px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #8a9a4a; margin-bottom: 16px;
        }
        .ct-hours-row {
          display: flex; justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid rgba(138,154,74,0.1);
          font-size: 12.5px; font-weight: 300; color: #5a5a4a;
        }
        .ct-hours-row:last-child { border-bottom: none; }
        .ct-hours-row span:last-child { color: #2a2a24; font-weight: 500; }

        /* ── FORM ── */
        .ct-form-wrap {
          background: rgba(255,252,245,0.85);
          border: 1px solid rgba(138,154,74,0.18);
          border-radius: 24px;
          padding: 44px 40px;
          box-shadow: 0 8px 40px rgba(42,42,36,0.07);
        }
        .ct-form-title {
          font-family: var(--font-sans);
          font-size: 28px; font-weight: 500; color: #2a2a24;
          margin-bottom: 6px; letter-spacing: -0.3px;
        }
        .ct-form-sub {
          font-size: 12px; font-weight: 300; color: #7a7a60;
          margin-bottom: 32px; line-height: 1.6;
        }
        .ct-form { display: flex; flex-direction: column; gap: 18px; }
        .ct-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .ct-field { display: flex; flex-direction: column; gap: 6px; }
        .ct-label {
          font-size: 9.5px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: #6a7a3a;
        }
        .ct-input, .ct-select, .ct-textarea {
          padding: 13px 16px;
          background: rgba(245,240,232,0.8);
          border: 1.5px solid rgba(138,154,74,0.2);
          border-radius: 10px;
          font-size: 13px; font-weight: 300;
          color: #2a2a24; font-family: var(--font-sans);
          outline: none; transition: all 0.2s ease;
          width: 100%;
        }
        .ct-input::placeholder, .ct-textarea::placeholder { color: #9a9a80; }
        .ct-input:focus, .ct-select:focus, .ct-textarea:focus {
          border-color: rgba(138,154,74,0.5);
          background: rgba(255,252,245,0.95);
          box-shadow: 0 0 0 3px rgba(138,154,74,0.08);
        }
        .ct-select { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%238a9a4a' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }
        .ct-textarea { resize: vertical; min-height: 110px; line-height: 1.7; }
        .ct-submit {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, #2a2a24 0%, #3d4a1f 100%);
          color: #e8d9b5; font-size: 11.5px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          border-radius: 12px; border: none; cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(42,42,36,0.2);
          font-family: var(--font-sans);
          margin-top: 4px;
        }
        .ct-submit:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(42,42,36,0.3); }
        .ct-success {
          text-align: center; padding: 48px 24px;
        }
        .ct-success-icon {
          width: 72px; height: 72px;
          background: rgba(138,154,74,0.12);
          border: 2px solid rgba(138,154,74,0.4);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 30px; margin: 0 auto 24px;
        }
        .ct-success h3 {
          font-family: var(--font-sans);
          font-size: 28px; color: #2a2a24; margin-bottom: 10px;
        }
        .ct-success p { font-size: 13px; font-weight: 300; color: #6a6a54; line-height: 1.8; }

        /* ── MAP SECTION ── */
        .ct-map-section {
          padding: 0 60px 64px;
          max-width: 1300px; margin: 0 auto;
        }
        .ct-map-card {
          background: rgba(255,252,245,0.97);
          border: 1px solid rgba(138,154,74,0.25);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(42,42,36,0.1);
          display: grid;
          grid-template-columns: 1fr 320px;
        }
        .ct-map-card iframe {
          width: 100%; height: 100%; min-height: 340px;
          border: 0; display: block;
        }
        .ct-map-info {
          padding: 36px 28px;
          display: flex; flex-direction: column;
          border-left: 1px solid rgba(138,154,74,0.18);
          background: rgba(255,252,245,0.98);
        }
        .ct-map-label-text {
          font-size: 9px; letter-spacing: 2.5px;
          text-transform: uppercase; color: #8a9a4a;
          font-weight: 600; margin-bottom: 10px;
        }
        .ct-map-addr-text {
          font-family: var(--font-sans);
          font-size: 17px; color: #2a2a24;
          line-height: 1.65; font-weight: 400;
          margin-bottom: 22px;
        }
        .ct-map-divider {
          height: 1px; background: rgba(138,154,74,0.15);
          margin-bottom: 18px;
        }
        .ct-map-hours-title {
          font-size: 9px; letter-spacing: 2px;
          text-transform: uppercase; color: #8a9a4a;
          font-weight: 600; margin-bottom: 10px;
        }
        .ct-map-hours-row {
          display: flex; justify-content: space-between;
          font-size: 12px; font-weight: 300; color: #5a5a4a;
          padding: 5px 0;
          border-bottom: 1px solid rgba(138,154,74,0.08);
        }
        .ct-map-hours-row:last-child { border-bottom: none; }
        .ct-map-hours-row span:last-child { font-weight: 500; color: #2a2a24; }
        .ct-map-hours-row.closed span:last-child { color: #b05a5a; }
        .ct-map-btn {
          display: block; margin-top: auto; padding-top: 20px;
        }
        .ct-map-btn a {
          display: block; padding: 12px;
          background: linear-gradient(135deg, #3d4a1f, #2a2a24);
          border-radius: 12px; color: #e8d9b5;
          font-size: 11px; letter-spacing: 1.5px;
          text-transform: uppercase; cursor: pointer;
          font-family: var(--font-sans); font-weight: 500;
          transition: all 0.25s ease; text-decoration: none;
          text-align: center;
          box-shadow: 0 4px 14px rgba(42,42,36,0.2);
        }
        .ct-map-btn a:hover {
          background: linear-gradient(135deg, #8a9a4a, #6a7a3a);
          color: #fff; transform: translateY(-2px);
        }
        @media (max-width: 860px) {
          .ct-map-card { grid-template-columns: 1fr; }
          .ct-map-card iframe { min-height: 260px; }
          .ct-map-info { border-left: none; border-top: 1px solid rgba(138,154,74,0.18); }
        }

        /* ── FAQ ── */
        .ct-faq-section {
          background: rgba(42,42,36,0.04);
          border-top: 1px solid rgba(138,154,74,0.15);
          padding: 72px 60px;
        }
        .ct-faq-inner { max-width: 900px; margin: 0 auto; }
        .ct-faq-header { text-align: center; margin-bottom: 48px; }
        .ct-faq-header h2 {
          font-family: var(--font-sans);
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 400; color: #2a2a24;
          letter-spacing: -0.5px; margin-top: 12px;
        }
        .ct-faq-header h2 em { font-style: normal; font-weight: 600; color: #8a9a4a; }
        .ct-faq-list { display: flex; flex-direction: column; gap: 2px; }
        .ct-faq-item {
          border: 1px solid rgba(138,154,74,0.15);
          border-radius: 14px; overflow: hidden;
          transition: all 0.2s ease;
          margin-bottom: 8px;
          background: rgba(255,252,245,0.6);
        }
        .ct-faq-item.open { border-color: rgba(138,154,74,0.35); }
        .ct-faq-q {
          width: 100%; display: flex; align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          background: none; border: none; cursor: pointer;
          font-family: var(--font-sans);
          font-size: 14px; font-weight: 500;
          color: #2a2a24; text-align: left;
          gap: 16px; transition: all 0.2s ease;
        }
        .ct-faq-item.open .ct-faq-q { color: #3d4a1f; }
        .ct-faq-chevron {
          width: 24px; height: 24px; flex-shrink: 0;
          background: rgba(138,154,74,0.1);
          border: 1px solid rgba(138,154,74,0.25);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; color: #8a9a4a;
          transition: transform 0.3s ease;
        }
        .ct-faq-item.open .ct-faq-chevron { transform: rotate(180deg); background: rgba(138,154,74,0.2); }
        .ct-faq-a {
          padding: 0 24px 20px;
          font-size: 13px; font-weight: 300;
          color: #5a5a4a; line-height: 1.9;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .ct-main { grid-template-columns: 1fr; gap: 40px; }
          .ct-cards-row { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .ct-hero, .ct-cards-row, .ct-main, .ct-map-section, .ct-faq-section { padding-left: 20px; padding-right: 20px; }
          .ct-cards-row { grid-template-columns: 1fr; }
          .ct-form-row { grid-template-columns: 1fr; }
          .ct-form-wrap { padding: 28px 20px; }
          .ct-map-inner iframe { height: 280px; }
          .ct-map-overlay { padding: 20px 20px 16px; }
        }
      `}</style>

      <div className="ct-page">

        {/* ── HERO ── */}
        <section className="ct-hero">
          <div className="ct-hero-bg" />
          <div className="ct-hero-inner">
            <div className="ct-eyebrow"><span>✦</span><span>Reach Out</span><span>✦</span></div>
            <h1>Let's Create Something <em>Beautiful</em> Together</h1>
            <p className="ct-hero-sub">
              Whether you have a project in mind or just want to explore possibilities — we'd love to hear from you. Your dream home starts with a conversation.
            </p>
          </div>
        </section>

        {/* ── QUICK CONTACT CARDS ── */}
        <div className="ct-cards-row">
          {/* Phone card — clickable tel: link */}
          <a href={PHONE_LINK} className="ct-card">
            <div className="ct-card-icon">📞</div>
            <div className="ct-card-label">Call Us</div>
            <div className="ct-card-value">+91 80555 87237</div>
            <div className="ct-card-sub">Mon–Sat, 9am – 6pm</div>
          </a>
          {/* Email card */}
          <a href="https://mail.google.com/mail/?view=cm&to=thesamarpaninteriors@gmail.com" className="ct-card">
            <div className="ct-card-icon">✉️</div>
            <div className="ct-card-label">Email Us</div>
            <div className="ct-card-value">thesamarpaninteriors@gmail.com</div>
            <div className="ct-card-sub">We respond within 24 hrs</div>
          </a>
          {/* WhatsApp card */}
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="ct-card">
            <div className="ct-card-icon">💬</div>
            <div className="ct-card-label">WhatsApp Us</div>
            <div className="ct-card-value">+91 80555 87237</div>
            <div className="ct-card-sub">Quick replies on WhatsApp</div>
          </a>
        </div>

        {/* ── MAIN ── */}
        <div className="ct-main">

          {/* LEFT */}
          <div className="ct-left">
            <div className="ct-section-label">Get In Touch</div>
            <h2>We're Here to <em>Help</em> You Design Your Life</h2>
            <p>
              From your first question to the final reveal, we're with you at every step. Reach us through any of the channels below, or stop by our Nashik studio for a cup of chai and a conversation about your space.
            </p>

            <div className="ct-info-list">
              {[
                { icon: "🏠", key: "Studio Address", val: "Office No. 1, Deepjyot Apartment,\nHanumanwadi, Makhmalabad Road,\nPanchavati, Nashik – 422003", href: MAPS_LINK },
                { icon: "📱", key: "WhatsApp & Call", val: "+91 80555 87237", href: WHATSAPP_LINK },
                { icon: "✉️", key: "Email", val: "thesamarpaninteriors@gmail.com", href: "https://mail.google.com/mail/?view=cm&to=thesamarpaninteriors@gmail.com" },
                { icon: "📸", key: "Instagram", val: "@Samarpan_Group_Interiors", href: "https://www.instagram.com/samarpan_group_interiors?igsh=dmlvb2R5YzRiNmhw" },
              ].map((item) => (
                <div key={item.key} className="ct-info-item">
                  <div className="ct-info-dot">{item.icon}</div>
                  <div>
                    <div className="ct-info-key">{item.key}</div>
                    <a
                      href={item.href}
                      className="ct-info-val"
                      style={{ whiteSpace: "pre-line" }}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >{item.val}</a>
                  </div>
                </div>
              ))}
            </div>

            <div className="ct-hours">
              <div className="ct-hours-title">Studio Hours</div>
              {[
                ["Monday – Friday", "9:00 AM – 5:00 PM"],
                ["Saturday", "9:00 AM – 3:00 PM"],
                ["Sunday", "Closed"],
              ].map(([day, time]) => (
                <div key={day} className="ct-hours-row">
                  <span>{day}</span>
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="ct-form-wrap">
            {submitted ? (
              <div className="ct-success">
                <div className="ct-success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>We've received your message and will get back to you within 24 hours. Looking forward to transforming your space!</p>
              </div>
            ) : (
              <>
                <div className="ct-form-title">Book a Free Consultation</div>
                <div className="ct-form-sub">Fill in your details and we'll be in touch within 24 hours.</div>
                <form className="ct-form" onSubmit={handleSubmit}>
                  <div className="ct-form-row">
                    <div className="ct-field">
                      <label className="ct-label">Your Name *</label>
                      <input className="ct-input" name="name" placeholder="Rahul Sharma" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="ct-field">
                      <label className="ct-label">Phone Number *</label>
                      <input className="ct-input" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">Email Address *</label>
                    <input className="ct-input" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">Service Interested In</label>
                    <select className="ct-select" name="service" value={form.service} onChange={handleChange}>
                      <option value="">Select a service...</option>
                      <optgroup label="Civil">
                        <option>Structural Excellence</option>
                        <option>Foundation to Finish</option>
                        <option>Engineered with Precision</option>
                        <option>Turnkey Construction</option>
                      </optgroup>
                      <optgroup label="Interior">
                        <option>Bespoke Interiors</option>
                        <option>Functional Elegance</option>
                        <option>3D Visualized Design</option>
                        <option>Crafted With Detail</option>
                      </optgroup>
                    </select>
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">Tell Us About Your Project</label>
                    <textarea className="ct-textarea" name="message" placeholder="Describe your space, style preferences, and what you're looking to achieve..." value={form.message} onChange={handleChange} />
                  </div>
                  <button type="submit" className="ct-submit">Send Message & Book Consultation →</button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* ── MAP — Card layout: map left, info right ── */}
        <div className="ct-map-section">
          <div className="ct-map-card">
            <iframe
              src={GOOGLE_MAPS_EMBED}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Samarpan Group Location"
            />
            <div className="ct-map-info">
              <div>
                <div className="ct-map-label-text">📍 Our Location</div>
                <div className="ct-map-addr-text">
                  Office No. 1, Deepjyot Apartment,<br />
                  Hanumanwadi, Makhmalabad Road,<br />
                  Panchavati, Nashik – 422003
                </div>
                <div className="ct-map-divider" />
                <div className="ct-map-hours-title">🕐 Studio Hours</div>
                {[
                  ["Monday",    "9 am – 5 pm"],
                  ["Tuesday",   "9 am – 5 pm"],
                  ["Wednesday", "9 am – 5 pm"],
                  ["Thursday",  "9 am – 5 pm"],
                  ["Friday",    "9 am – 5 pm"],
                  ["Saturday",  "9 am – 3 pm"],
                  ["Sunday",    "Closed", true],
                ].map(([day, time, closed]) => (
                  <div key={day} className={`ct-map-hours-row${closed ? " closed" : ""}`}>
                    <span>{day}</span>
                    <span>{time}</span>
                  </div>
                ))}
              </div>
              <div className="ct-map-btn">
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <section className="ct-faq-section">
          <div className="ct-faq-inner">
            <div className="ct-faq-header">
              <div className="ct-section-label" style={{ justifyContent: "center" }}>Quick Answers</div>
              <h2>Frequently Asked <em>Questions</em></h2>
            </div>
            <div className="ct-faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className={`ct-faq-item ${openFaq === i ? "open" : ""}`}>
                  <button className="ct-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <span className="ct-faq-chevron">▾</span>
                  </button>
                  {openFaq === i && <div className="ct-faq-a">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
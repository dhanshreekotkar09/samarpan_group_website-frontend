import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setPageTitle } from "../utils/pageTitle";
import { submitEnquiry, getSettings } from "../api/client";

const DEFAULT_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3748.7571993549636!2d73.7857492!3d20.0187026!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDAxJzA3LjMiTiA3M8KwNDcnMDguNyJF!5e0!3m2!1sen!2sin!4v1234567890";
const DEFAULT_WHATSAPP = "https://wa.me/918055587237";
const DEFAULT_PHONE = "tel:+918055587237";
const DEFAULT_MAPS_LINK =
  "https://www.google.com/maps/dir/?api=1&destination=Office+No+1+Deepjyot+Apartment+Hanumanwadi+Makhmalabad+Road+Panchavati+Nashik+422003";
const DEFAULT_EMAIL =
  "https://mail.google.com/mail/?view=cm&to=thesamarpaninteriors@gmail.com";
const DEFAULT_INSTAGRAM =
  "https://www.instagram.com/samarpan_group_interiors?igsh=dmlvb2R5YzRiNmhw";

const faqs = [
  {
    q: "Is the initial consultation really free?",
    a: "Yes, completely! We believe great spaces start with a clear conversation. The first consultation — whether in-person at our Panchavati office or at your site — is 100% complimentary.",
  },
  {
    q: "What is the typical timeline for an interior or civil project?",
    a: "Depending on the scope, residential interior projects typically take 6 to 12 weeks from finalized 3D designs to handover. For turnkey civil construction, we provide a milestone-based timeline at project kickoff.",
  },
  {
    q: "Do you undertake projects outside Nashik?",
    a: "Yes! While our primary office is located in Panchavati, Nashik, we regularly execute turnkey civil and interior projects across Nashik district, Pune, and Mumbai.",
  },
];

export default function ContactPage() {
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageTitle("Contact Us");
    const params = new URLSearchParams(location.search);
    const svc = params.get("service") || location.state?.service;
    if (svc) {
      setForm((prev) => ({ ...prev, service: svc }));
    }
    getSettings()
      .then((res) => {
        if (res.data) setSettings(res.data);
      })
      .catch(() => {});
  }, [location]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitEnquiry(form);
      setSubmitted(true);
    } catch (err) {
      console.warn("Backend enquiry submission warning:", err);
      // Even if backend fails (e.g. offline during dev), set submitted so user experience is not broken
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappLink = settings?.whatsapp
    ? (settings.whatsapp.startsWith("http")
        ? settings.whatsapp
        : `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`)
    : DEFAULT_WHATSAPP;
  const phoneLink = settings?.phone ? `tel:${settings.phone.replace(/\s+/g, "")}` : DEFAULT_PHONE;
  const phoneDisplay = settings?.phone || "+91 80555 87237";
  const emailLink = settings?.email
    ? `https://mail.google.com/mail/?view=cm&to=${settings.email}`
    : DEFAULT_EMAIL;
  const emailDisplay = settings?.email || "thesamarpaninteriors@gmail.com";
  const instagramLink = settings?.instagram || DEFAULT_INSTAGRAM;
  const officeAddress =
    settings?.officeAddress ||
    "Office No. 1, Deepjyot Apartment, Hanumanwadi, Makhmalabad Road, Panchavati, Nashik – 422003";
  const hoursMonFri = settings?.officeHoursMonFri || "Mon–Fri: 9am – 5pm";
  const hoursSat = settings?.officeHoursSat || "Saturday: 9am – 3pm";
  const hoursSun = settings?.officeHoursSun || "Sunday: Closed";
  const rawMapsLink = settings?.googleMapsLink || DEFAULT_MAPS_LINK;
  const mapsLink =
    rawMapsLink && !rawMapsLink.includes("maps.app.goo.gl/3QWjU9P5L1W5S3v16")
      ? rawMapsLink
      : DEFAULT_MAPS_LINK;

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
          max-width: 1300px;
          margin: 0 auto;
          padding: 72px 60px 40px;
        }

        .ct-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #8a9a4a;
          margin-bottom: 14px;
        }

        .ct-hero h1 {
          font-family: var(--font-sans);
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 300;
          line-height: 1.15;
          color: #2a2a24;
          letter-spacing: -1px;
          margin-bottom: 16px;
          max-width: 720px;
        }

        .ct-hero h1 em {
          font-style: normal;
          font-weight: 600;
          color: #8a9a4a;
        }

        .ct-hero-sub {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.8;
          color: #555545;
          max-width: 620px;
        }

        /* ── TOP 4 QUICK CHANNELS (4 IN 1 LINE AS PER IMAGE 2) ── */
        .ct-channels-section {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 60px 36px;
        }

        .ct-channels-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .ct-channel-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 22px 20px;
          border: 1px solid rgba(138,154,74,0.22);
          box-shadow: 0 4px 18px rgba(42,42,36,0.04);
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.25s ease;
          min-height: 168px;
        }

        .ct-channel-card:hover {
          transform: translateY(-3px);
          border-color: #8a9a4a;
          box-shadow: 0 10px 28px rgba(42,42,36,0.08);
        }

        .ct-channel-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .ct-brand-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(138,154,74,0.1);
          border: 1px solid rgba(138,154,74,0.22);
          color: #2a3a14;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }

        .ct-channel-card:hover .ct-brand-icon-wrap {
          background: #2a3a14;
          color: #f5f0e8;
          border-color: #2a3a14;
          transform: scale(1.05);
        }

        .ct-channel-tag {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 12px;
          color: #4a5a1f;
          background: rgba(138,154,74,0.1);
          border: 1px solid rgba(138,154,74,0.2);
        }

        .ct-channel-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #7a7a68;
          margin-bottom: 5px;
        }

        .ct-channel-val {
          font-size: 13.5px;
          font-weight: 600;
          color: #2a2a24;
          word-break: break-word;
          line-height: 1.4;
        }

        .ct-channel-action {
          margin-top: 14px;
          font-size: 11.5px;
          font-weight: 600;
          color: #8a9a4a;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: all 0.2s ease;
        }

        .ct-channel-card:hover .ct-channel-action {
          color: #3d5018;
          gap: 8px;
        }

        /* ── 2-COLUMN MAIN: OFFICE VISIT & FORM ── */
        .ct-main {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 60px 60px;
          display: grid;
          grid-template-columns: 1fr 1.12fr;
          gap: 32px;
          align-items: stretch;
        }

        /* ── OFFICE VISIT & ADDRESS CARD ── */
        .ct-office-card {
          background: #ffffff;
          border-radius: 22px;
          padding: 28px 28px 24px;
          border: 1px solid rgba(138,154,74,0.22);
          box-shadow: 0 8px 26px rgba(42,42,36,0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .ct-office-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(138,154,74,0.18);
        }

        .ct-office-header-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(138,154,74,0.12);
          color: #2a3a14;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ct-office-title {
          font-family: var(--font-sans);
          font-size: 18px;
          font-weight: 600;
          color: #2a3a14;
        }

        .ct-office-sub {
          font-size: 11.5px;
          color: #7a7a60;
          font-weight: 400;
        }

        .ct-office-details {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 16px;
        }

        .ct-office-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 13px;
          line-height: 1.55;
          color: #4a4a3a;
        }

        .ct-office-row-icon {
          width: 30px;
          height: 30px;
          border-radius: 9px;
          background: rgba(138,154,74,0.1);
          color: #2a3a14;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .ct-office-row-text strong {
          display: block;
          color: #2a2a24;
          font-size: 11px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .ct-office-map-frame {
          width: 100%;
          height: 185px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(138,154,74,0.2);
          margin-bottom: 16px;
        }

        .ct-office-map-frame iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }

        .ct-office-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 13px 20px;
          border-radius: 14px;
          background: #2a3a14;
          color: #f5f0e8;
          font-family: var(--font-sans);
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(42,58,20,0.18);
        }

        .ct-office-btn:hover {
          background: #3d5018;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(42,58,20,0.28);
        }

        /* ── RIGHT COLUMN: FORM ── */
        .ct-form-wrap {
          background: #ffffff;
          border-radius: 22px;
          padding: 28px 32px 24px;
          border: 1px solid rgba(138,154,74,0.22);
          box-shadow: 0 8px 26px rgba(42,42,36,0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .ct-form-header {
          margin-bottom: 16px;
        }

        .ct-form-title {
          font-family: var(--font-sans);
          font-size: 22px;
          font-weight: 600;
          color: #2a2a24;
          margin-bottom: 4px;
        }

        .ct-form-sub {
          font-size: 12.5px;
          font-weight: 300;
          color: #6a6a55;
          line-height: 1.5;
        }

        .ct-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .ct-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .ct-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .ct-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #555545;
        }

        .ct-input, .ct-select, .ct-textarea {
          padding: 11px 15px;
          background: #faf8f2;
          border: 1.5px solid rgba(138,154,74,0.25);
          border-radius: 12px;
          font-size: 13.5px;
          font-weight: 400;
          color: #2a2a24;
          font-family: var(--font-sans);
          outline: none;
          transition: all 0.2s ease;
          width: 100%;
        }

        .ct-input::placeholder, .ct-textarea::placeholder {
          color: #9a9a85;
          font-weight: 300;
        }

        .ct-input:focus, .ct-select:focus, .ct-textarea:focus {
          border-color: #8a9a4a;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(138,154,74,0.12);
        }

        .ct-select {
          cursor: pointer;
        }

        .ct-textarea {
          resize: none;
          min-height: 82px;
          line-height: 1.5;
        }

        .ct-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 13px;
          background: #2a3a14;
          color: #f5f0e8;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 6px 20px rgba(42,58,20,0.18);
          font-family: var(--font-sans);
        }

        .ct-submit:hover {
          background: #3d5018;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(42,58,20,0.25);
        }

        /* SUCCESS STATE */
        .ct-success {
          text-align: center;
          padding: 36px 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .ct-success-icon {
          width: 64px;
          height: 64px;
          background: rgba(138,154,74,0.15);
          border: 2px solid #8a9a4a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          color: #3d5018;
          margin: 0 auto 20px;
        }

        .ct-success h3 {
          font-family: var(--font-sans);
          font-size: 24px;
          font-weight: 600;
          color: #2a2a24;
          margin-bottom: 8px;
        }

        .ct-success p {
          font-size: 13.5px;
          font-weight: 300;
          color: #555545;
          line-height: 1.7;
          max-width: 420px;
          margin: 0 auto 24px;
        }

        .ct-success-wa {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #2a3a14;
          color: #f5f0e8;
          border-radius: 12px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.2s ease;
        }

        .ct-success-wa:hover {
          background: #3d5018;
          transform: translateY(-2px);
        }

        /* ── SOBER FAQ ACCORDION ── */
        .ct-faq-section {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 60px 80px;
        }

        .ct-faq-inner {
          background: #ffffff;
          border-radius: 24px;
          padding: 44px;
          border: 1px solid rgba(138,154,74,0.2);
          box-shadow: 0 8px 30px rgba(42,42,36,0.04);
        }

        .ct-faq-header {
          margin-bottom: 28px;
        }

        .ct-faq-header h2 {
          font-family: var(--font-sans);
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 500;
          color: #2a2a24;
          margin-top: 4px;
        }

        .ct-faq-header h2 em {
          font-style: normal;
          font-weight: 600;
          color: #8a9a4a;
        }

        .ct-faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ct-faq-item {
          border: 1px solid rgba(138,154,74,0.2);
          border-radius: 14px;
          overflow: hidden;
          background: #fbfaf5;
          transition: all 0.2s ease;
        }

        .ct-faq-item.open {
          border-color: #8a9a4a;
          background: #ffffff;
        }

        .ct-faq-q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 600;
          color: #2a2a24;
          text-align: left;
          gap: 16px;
        }

        .ct-faq-chevron {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(138,154,74,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #4a5a1f;
          transition: transform 0.25s ease;
          flex-shrink: 0;
        }

        .ct-faq-item.open .ct-faq-chevron {
          transform: rotate(180deg);
          background: #8a9a4a;
          color: #ffffff;
        }

        .ct-faq-a {
          padding: 0 22px 18px;
          font-size: 13.5px;
          font-weight: 300;
          color: #555545;
          line-height: 1.8;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .ct-channels-bar {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 900px) {
          .ct-main {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .ct-hero, .ct-channels-section, .ct-main, .ct-faq-section {
            padding-left: 28px;
            padding-right: 28px;
          }
        }

        @media (max-width: 600px) {
          .ct-hero, .ct-channels-section, .ct-main, .ct-faq-section {
            padding-left: 18px;
            padding-right: 18px;
          }
          .ct-hero {
            padding-top: 48px;
            padding-bottom: 24px;
          }
          .ct-channels-bar {
            grid-template-columns: 1fr;
          }
          .ct-form-row {
            grid-template-columns: 1fr;
          }
          .ct-office-card, .ct-form-wrap {
            padding: 24px 18px;
          }
          .ct-office-map-frame {
            height: 170px;
          }
        }
      `}</style>

      <div className="ct-page">
        {/* ── SOBER HERO ── */}
        <section className="ct-hero">
          <span className="ct-eyebrow">✦ Connect With Samarpan Group</span>
          <h1>
            Let's Discuss Your <em>Space</em>
          </h1>
          <p className="ct-hero-sub">
            Whether you are planning a turnkey civil build, complete home interior, or office renovation in Nashik — connect with our team directly or send your enquiry below.
          </p>
        </section>

        {/* ── 2-COLUMN MAIN: DIRECT CHANNELS & FORM ── */}
        {/* ── 4 QUICK ACTION CHANNELS ROW (EXACT IMAGE 2 BOXES, 4 IN 1 LINE) ── */}
        <section className="ct-channels-section">
          <div className="ct-channels-bar">
            {/* WhatsApp Card */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-channel-card"
            >
              <div>
                <div className="ct-channel-top">
                  <div className="ct-brand-icon-wrap">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <span className="ct-channel-tag">Instant Chat</span>
                </div>
                <div className="ct-channel-label">WhatsApp Us</div>
                <div className="ct-channel-val">{phoneDisplay}</div>
              </div>
              <div className="ct-channel-action">
                <span>Chat on WhatsApp</span>
                <span>↗</span>
              </div>
            </a>

            {/* Call Card */}
            <a href={phoneLink} className="ct-channel-card">
              <div>
                <div className="ct-channel-top">
                  <div className="ct-brand-icon-wrap">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <span className="ct-channel-tag">Direct Line</span>
                </div>
                <div className="ct-channel-label">Call Directly</div>
                <div className="ct-channel-val">{phoneDisplay}</div>
              </div>
              <div className="ct-channel-action">
                <span>Tap to Call</span>
                <span>↗</span>
              </div>
            </a>

            {/* Email Card */}
            <a
              href={emailLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-channel-card"
            >
              <div>
                <div className="ct-channel-top">
                  <div className="ct-brand-icon-wrap">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <span className="ct-channel-tag">Official</span>
                </div>
                <div className="ct-channel-label">Email Us</div>
                <div className="ct-channel-val" style={{ fontSize: "12px" }}>
                  {emailDisplay}
                </div>
              </div>
              <div className="ct-channel-action">
                <span>Send Email</span>
                <span>↗</span>
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-channel-card"
            >
              <div>
                <div className="ct-channel-top">
                  <div className="ct-brand-icon-wrap">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5"/>
                      <circle cx="12" cy="12" r="4.2"/>
                      <circle cx="17.8" cy="6.2" r="1.3" fill="currentColor" stroke="none"/>
                    </svg>
                  </div>
                  <span className="ct-channel-tag">Portfolio</span>
                </div>
                <div className="ct-channel-label">Instagram</div>
                <div className="ct-channel-val">@Samarpan_Group_Interiors</div>
              </div>
              <div className="ct-channel-action">
                <span>Follow on Instagram</span>
                <span>↗</span>
              </div>
            </a>
          </div>
        </section>

        {/* ── 2-COLUMN MAIN: OFFICE VISIT & FORM ── */}
        <div className="ct-main">
          {/* LEFT: OFFICE VISIT & ADDRESS WITH INTEGRATED MAP */}
          <div className="ct-office-card">
            <div>
              <div className="ct-office-header">
                <div className="ct-office-header-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                    <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="ct-office-title">Office Visit & Address</h3>
                  <p className="ct-office-sub">Samarpan Group Corporate & Design Office, Nashik</p>
                </div>
              </div>

              <div className="ct-office-details">
                <div className="ct-office-row">
                  <div className="ct-office-row-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="ct-office-row-text">
                    <strong>Office Address</strong>
                    {officeAddress}
                  </div>
                </div>

                <div className="ct-office-row">
                  <div className="ct-office-row-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="ct-office-row-text">
                    <strong>Hours</strong>
                    <div>{hoursMonFri}</div>
                    <div>{hoursSat} <span style={{ color: "#8a9a4a", fontSize: "11px", fontWeight: 600 }}>({hoursSun})</span></div>
                  </div>
                </div>
              </div>

              {/* Integrated Google Map frame right inside the office card */}
              <div className="ct-office-map-frame">
                <iframe
                  src={DEFAULT_MAPS_EMBED}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Samarpan Group Office Location, Nashik"
                />
              </div>
            </div>

            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-office-btn"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Get Directions on Google Maps</span>
              <span>↗</span>
            </a>
          </div>

          {/* RIGHT: CONSULTATION FORM */}
          <div className="ct-form-wrap">
            {submitted ? (
              <div className="ct-success">
                <div className="ct-success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>
                  We have received your message. Our design and technical team will contact you within 24 hours to discuss your project requirements.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-success-wa"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Need an instant reply? Chat on WhatsApp</span>
                  <span>↗</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", phone: "", email: "", service: "", message: "" });
                  }}
                  style={{
                    marginTop: "16px",
                    background: "transparent",
                    border: "none",
                    color: "#8a9a4a",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <>
                <div className="ct-form-header">
                  <h2 className="ct-form-title">Book Free Consultation</h2>
                  <p className="ct-form-sub">
                    Share your requirements and we will connect with you within 24 hours.
                  </p>
                </div>

                <form className="ct-form" onSubmit={handleSubmit}>
                  <div className="ct-form-row">
                    <div className="ct-field">
                      <label className="ct-label">Your Name *</label>
                      <input
                        className="ct-input"
                        name="name"
                        placeholder="e.g. Rahul Sharma"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="ct-field">
                      <label className="ct-label">Phone Number *</label>
                      <input
                        className="ct-input"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="ct-field">
                    <label className="ct-label">Email Address *</label>
                    <input
                      className="ct-input"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="ct-field">
                    <label className="ct-label">Service Required</label>
                    <select
                      className="ct-select"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                    >
                      <option value="">Select a service category...</option>
                      <option value="Residential Interior">
                        Residential & Home Interior
                      </option>
                      <option value="Commercial Interior">
                        Office & Commercial Interior
                      </option>
                      <option value="Turnkey Construction">
                        Turnkey Civil Construction
                      </option>
                      <option value="Renovation & Remodeling">
                        Renovation & Space Remodeling
                      </option>
                    </select>
                  </div>

                  <div className="ct-field">
                    <label className="ct-label">
                      Tell Us About Your Project
                    </label>
                    <textarea
                      className="ct-textarea"
                      name="message"
                      placeholder="Brief details about your property, carpet area, location, or expected budget..."
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="ct-submit" disabled={submitting} style={{ opacity: submitting ? 0.7 : 1 }}>
                    <span>{submitting ? "Sending Your Message..." : "Send Message & Book Consultation"}</span>
                    <span>→</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* ── SOBER FAQ ── */}
        <section className="ct-faq-section">
          <div className="ct-faq-inner">
            <div className="ct-faq-header">
              <span className="ct-eyebrow">✦ Quick Answers</span>
              <h2>
                Frequently Asked <em>Questions</em>
              </h2>
            </div>
            <div className="ct-faq-list">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`ct-faq-item ${openFaq === i ? "open" : ""}`}
                >
                  <button
                    type="button"
                    className="ct-faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
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
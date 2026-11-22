import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setPageTitle } from "../utils/pageTitle";
import { getSettings } from "../api/client";

const SERVICES_DATA = [
  {
    id: "civil",
    category: "Civil Construction",
    tag: "Foundation to Finish",
    title: "Turnkey Civil Construction",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M9 8h1" />
        <path d="M9 12h1" />
        <path d="M9 16h1" />
        <path d="M14 8h1" />
        <path d="M14 12h1" />
        <path d="M14 16h1" />
        <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
      </svg>
    ),
    description:
      "Complete end-to-end structural construction engineered with uncompromised material quality and rigorous on-site supervision. We manage every phase from earthwork to final lock-in.",
    deliverables: [
      "RCC Frame & Column Structural Casting",
      "Precision Brick Masonry & Plastering",
      "Chemical Waterproofing & Damp Proofing",
      "Sanitary, Plumbing & Electrical Conduits",
      "Architectural Supervision & Daily Site Reporting",
    ],
    idealFor: "New Bungalows, Row Houses, Commercial Buildings & Structural Extensions",
    contactServiceValue: "Turnkey Construction",
  },
  {
    id: "interior",
    category: "Residential Interiors",
    tag: "Bespoke Living Spaces",
    title: "Complete Home Interior Design",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    description:
      "Transforming blank spaces into sophisticated, warmly lit, and highly functional homes. Every ceiling, wall, and fixture is thoughtfully curated to match your lifestyle and family needs.",
    deliverables: [
      "False Ceiling Concepts with Warm Ambient Lighting",
      "Designer Accent Walls, Textures & Wall Paneling",
      "Premium Vitrified Flooring & Tile Synchronization",
      "Custom Curtains, Soft Furnishings & Hardware",
      "3D Realistic Render-to-Reality Execution",
    ],
    idealFor: "1BHK, 2BHK, 3BHK, Penthouses & Luxury Villa Interiors",
    contactServiceValue: "Residential Interior",
  },
  {
    id: "commercial",
    category: "Commercial Spaces",
    tag: "Professional Productivity",
    title: "Commercial & Office Architecture",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    description:
      "Workspaces that elevate brand authority and employee productivity. We balance ergonomics, acoustic privacy, and durable high-traffic materials tailored for business operations.",
    deliverables: [
      "Executive Cabins, MD Chambers & Boardrooms",
      "Modular Workstations with Cable Management",
      "Reception Backdrops, Signage & Client Lounges",
      "Acoustic Ceilings, Commercial HVAC & Lighting",
      "Medical Clinics, Salons & Boutique Retail Outlets",
    ],
    idealFor: "Corporate Offices, Doctor Clinics, Law Chambers & Retail Showrooms",
    contactServiceValue: "Commercial Interior",
  },
  {
    id: "renovation",
    category: "Renovation & Remodeling",
    tag: "Space Transformation",
    title: "Full Home & Space Renovation",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      </svg>
    ),
    description:
      "Breathe fresh life into older homes and commercial properties. We carry out civil structural modifications, modern bathroom revamps, and complete interior makeovers safely.",
    deliverables: [
      "Non-Load Bearing Wall Demolitions & Open Floorplans",
      "Complete Bathroom Modernization & Anti-Leakage Systems",
      "Electrical Rewiring, Concealed Piping & New Flooring",
      "Old Woodwork Restoration or Replacement",
      "Dust-Controlled, Clean Milestone-Based Execution",
    ],
    idealFor: "10-25 Year Old Flats, Heritage Properties & Rental Upgrades",
    contactServiceValue: "Renovation & Remodeling",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Site Visit & Consultation",
    mr: "प्रत्यक्ष साईट भेट व चर्चा",
    desc: "Our design lead visits your site in Nashik to understand your family requirements, measure exact carpet dimensions, and evaluate natural light and structural elements.",
  },
  {
    step: "02",
    title: "2D Layout & 3D Visualization",
    mr: "३D डिझाईन व व्हिज्युअलायझेशन",
    desc: "We generate photorealistic 3D concept renders. You see every color, texture, and furniture layout in 360-degree clarity before any construction begins.",
  },
  {
    step: "03",
    title: "Itemized Quotation & Selection",
    mr: "पारदर्शक बजेट व मटेरिअल निवड",
    desc: "Transparent, line-by-line itemized budget with exact brand specifications. No hidden costs or sudden mid-project budget escalations.",
  },
  {
    step: "04",
    title: "Execution & Site Supervision",
    mr: "ऑन-साईट काम व गुणवत्ता तपासणी",
    desc: "Our dedicated site engineers monitor carpentry, civil work, electrical, and finishing daily, ensuring zero deviation from the approved 3D plans.",
  },
  {
    step: "05",
    title: "Finishing & Milestone Handover",
    mr: "अंतिम फिनिशिंग व वेळेवर ताबा",
    desc: "Deep cleaning, thorough quality-check of all fittings and alignments, followed by celebratory handover with documented warranty assurance.",
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("civil");
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageTitle("Our Services");
    getSettings()
      .then((res) => {
        if (res.data) setSettings(res.data);
      })
      .catch(() => {});
  }, []);

  const handleInquire = (serviceValue) => {
    navigate(`/contact?service=${encodeURIComponent(serviceValue)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredServices = SERVICES_DATA.filter((s) => s.id === activeCategory);

  const phone = settings?.phone || "+91 80555 87237";
  const whatsappNumber = settings?.whatsapp
    ? settings.whatsapp.replace(/\D/g, "")
    : "918055587237";
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Samarpan Group, I am interested in your Civil & Interior services and would like to discuss my project."
  )}`;

  return (
    <div className="sv-page">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sv-page {
          font-family: var(--font-sans);
          background: linear-gradient(160deg, #f5f0e8 0%, #ede8d8 40%, #e8e0cc 100%);
          color: #3d3d30;
          min-height: 100vh;
        }

        /* ── HERO ── */
        .sv-hero {
          position: relative;
          padding: 80px 32px 50px;
          text-align: center;
          max-width: 960px;
          margin: 0 auto;
        }

        .sv-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          background: rgba(138,154,74,0.12);
          border: 1px solid rgba(138,154,74,0.3);
          border-radius: 20px;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #4a5a1f;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .sv-hero h1 {
          font-size: clamp(32px, 4.4vw, 52px);
          font-weight: 600;
          line-height: 1.18;
          color: #2a2a24;
          letter-spacing: -0.6px;
          margin-bottom: 12px;
        }

        .sv-hero h1 em {
          font-style: normal;
          color: #6b7c32;
        }

        .sv-hero-mr {
          font-size: 15.5px;
          font-weight: 500;
          color: #6a6a52;
          margin-bottom: 20px;
          display: block;
        }

        .sv-hero-desc {
          font-size: 15px;
          line-height: 1.8;
          color: #555545;
          max-width: 720px;
          margin: 0 auto 36px;
        }

        /* ── HIGHLIGHT CHIPS ── */
        .sv-chips-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }

        .sv-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(138,154,74,0.25);
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          color: #3d4a1f;
        }

        /* ── FILTER TABS ── */
        .sv-tabs-wrap {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          padding: 30px 20px 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .sv-tab-btn {
          padding: 9px 18px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          border: 1px solid rgba(138,154,74,0.25);
          background: rgba(255,255,255,0.65);
          color: #4a4a3a;
          transition: all 0.25s ease;
          font-family: inherit;
        }

        .sv-tab-btn:hover {
          background: #ffffff;
          border-color: #8a9a4a;
          color: #2a3a14;
        }

        .sv-tab-btn.active {
          background: #2a3a14;
          color: #f5f0e8;
          border-color: #2a3a14;
          box-shadow: 0 4px 14px rgba(42,58,20,0.25);
        }

        /* ── SERVICES CARDS CONTAINER ── */
        .sv-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px 70px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .sv-card {
          background: rgba(255, 252, 245, 0.9);
          border: 1px solid rgba(138,154,74,0.22);
          border-radius: 22px;
          padding: 36px 40px;
          box-shadow: 0 8px 30px rgba(42,42,36,0.04);
          transition: all 0.3s ease;
          display: grid;
          grid-template-columns: 1.2fr 1.3fr;
          gap: 40px;
          align-items: center;
        }

        .sv-card:hover {
          border-color: rgba(138,154,74,0.5);
          box-shadow: 0 14px 40px rgba(42,42,36,0.08);
          transform: translateY(-2px);
        }

        .sv-card-left {
          display: flex;
          flex-direction: column;
        }

        .sv-card-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .sv-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(138,154,74,0.14);
          color: #3d5018;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sv-badge-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #7b8e34;
          background: rgba(138,154,74,0.1);
          padding: 4px 10px;
          border-radius: 8px;
          border: 1px solid rgba(138,154,74,0.2);
        }

        .sv-card-title {
          font-size: 24px;
          font-weight: 600;
          color: #2a2a24;
          line-height: 1.25;
          margin-bottom: 14px;
        }

        .sv-card-mr-title {
          font-size: 14px;
          color: #6a6a50;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .sv-card-desc {
          font-size: 14px;
          line-height: 1.75;
          color: #555545;
          margin-bottom: 20px;
        }

        .sv-card-ideal {
          font-size: 12.5px;
          color: #4a5a1f;
          background: rgba(138,154,74,0.08);
          padding: 8px 14px;
          border-radius: 10px;
          border-left: 3px solid #8a9a4a;
          margin-bottom: 24px;
        }

        .sv-card-ideal strong {
          color: #2a3a14;
        }

        .sv-inquire-btn {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #2a3a14;
          color: #f5f0e8;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .sv-inquire-btn:hover {
          background: #3d5018;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(42,58,20,0.3);
        }

        .sv-card-right {
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(138,154,74,0.18);
          border-radius: 16px;
          padding: 24px 28px;
        }

        .sv-deliv-header {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #2a3a14;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .sv-deliv-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sv-deliv-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13.5px;
          color: #4a4a3a;
          line-height: 1.5;
        }

        .sv-check {
          color: #8a9a4a;
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* ── 5-STEP WORKFLOW ── */
        .sv-process-sec {
          background: rgba(42,42,36,0.04);
          border-top: 1px solid rgba(138,154,74,0.18);
          border-bottom: 1px solid rgba(138,154,74,0.18);
          padding: 70px 32px 80px;
        }

        .sv-process-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .sv-sec-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .sv-sec-pill {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #8a9a4a;
          margin-bottom: 10px;
          display: block;
        }

        .sv-sec-title {
          font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 600;
          color: #2a2a24;
          letter-spacing: -0.5px;
        }

        .sv-sec-title em {
          font-style: normal;
          color: #6b7c32;
        }

        .sv-process-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        .sv-step-card {
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(138,154,74,0.2);
          border-radius: 16px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.25s ease;
        }

        .sv-step-card:hover {
          background: #ffffff;
          transform: translateY(-3px);
          border-color: #8a9a4a;
          box-shadow: 0 10px 24px rgba(42,42,36,0.06);
        }

        .sv-step-num {
          font-size: 28px;
          font-weight: 800;
          color: rgba(138,154,74,0.35);
          line-height: 1;
          margin-bottom: 12px;
          font-family: Georgia, serif;
        }

        .sv-step-title {
          font-size: 15px;
          font-weight: 600;
          color: #2a2a24;
          margin-bottom: 4px;
        }

        .sv-step-mr {
          font-size: 11.5px;
          color: #7b8e34;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .sv-step-desc {
          font-size: 12.5px;
          line-height: 1.6;
          color: #666655;
        }

        /* ── WHY SAMARPAN TABLE ── */
        .sv-comparison-sec {
          max-width: 1080px;
          margin: 0 auto;
          padding: 70px 32px;
        }

        .sv-table-box {
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(138,154,74,0.22);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(42,42,36,0.04);
        }

        .sv-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13.5px;
          text-align: left;
        }

        .sv-table th {
          padding: 16px 20px;
          background: #2a3a14;
          color: #f5f0e8;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.5px;
        }

        .sv-table th:nth-child(2) {
          background: #3d5018;
          color: #e8d9b5;
        }

        .sv-table td {
          padding: 14px 20px;
          border-bottom: 1px solid rgba(138,154,74,0.12);
          color: #4a4a3a;
        }

        .sv-table tr:last-child td {
          border-bottom: none;
        }

        .sv-table tr:nth-child(even) {
          background: rgba(138,154,74,0.03);
        }

        .sv-td-highlight {
          color: #1e3a0a !important;
          font-weight: 600;
        }

        /* ── CTA BANNER ── */
        .sv-cta-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px 32px 80px;
        }

        .sv-cta-box {
          background: linear-gradient(135deg, #2a2a24 0%, #35441d 55%, #293516 100%);
          border-radius: 24px;
          padding: 50px 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 36px;
          box-shadow: 0 20px 50px rgba(42,42,36,0.18);
          border: 1px solid rgba(138,154,74,0.3);
          flex-wrap: wrap;
        }

        .sv-cta-text h2 {
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 600;
          color: #f5f0e8;
          margin-bottom: 8px;
        }

        .sv-cta-text h2 em {
          font-style: normal;
          color: #c8d890;
        }

        .sv-cta-text p {
          font-size: 14px;
          color: #c8b89a;
          max-width: 520px;
          line-height: 1.6;
        }

        .sv-cta-btns {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .sv-cta-btn-main {
          padding: 14px 28px;
          background: #8a9a4a;
          color: #1f2710;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .sv-cta-btn-main:hover {
          background: #9ab052;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(138,154,74,0.4);
        }

        .sv-cta-btn-wa {
          padding: 14px 24px;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(200,184,154,0.45);
          color: #e8d9b5;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border-radius: 12px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.25s ease;
        }

        .sv-cta-btn-wa:hover {
          background: rgba(255,255,255,0.18);
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .sv-card {
            grid-template-columns: 1fr;
            gap: 28px;
            padding: 30px 24px;
          }
          .sv-process-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .sv-hero {
            padding: 50px 20px 30px;
          }
          .sv-grid, .sv-process-sec, .sv-comparison-sec, .sv-cta-section {
            padding-left: 20px;
            padding-right: 20px;
          }
          .sv-process-grid {
            grid-template-columns: 1fr;
          }
          .sv-cta-box {
            padding: 36px 20px;
            flex-direction: column;
            text-align: center;
          }
          .sv-cta-btns {
            justify-content: center;
            width: 100%;
          }
          .sv-cta-btn-main, .sv-cta-btn-wa {
            width: 100%;
            justify-content: center;
          }
          .sv-table {
            font-size: 12px;
          }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="sv-hero">
        <div className="sv-eyebrow">
          <span>✦</span>
          <span>Samarpan Group Expertise</span>
          <span>✦</span>
        </div>
        <h1>
          Complete Civil & <em>Interior Solutions</em>
        </h1>
        <span className="sv-hero-mr">
          पायाभरणीपासून ते गृहप्रवेशापर्यंत — एकाच छताखाली सर्व सोल्यूशन्स
        </span>
        <p className="sv-hero-desc">
          We combine structural engineering integrity with bespoke interior artistry.
          From laying robust foundations to crafting bespoke interiors, we handle
          every phase of your residential or commercial project with total transparency and dedicated supervision.
        </p>

        <div className="sv-chips-row">
          <div className="sv-chip">
            <span>🏗️</span> Single-Roof Execution (Civil + Interior)
          </div>
          <div className="sv-chip">
            <span>📐</span> 100% 3D Visualized Design
          </div>
          <div className="sv-chip">
            <span>⏱️</span> Fixed Milestone Timelines
          </div>
          <div className="sv-chip">
            <span>🤝</span> Zero Hidden Cost Guarantee
          </div>
        </div>
      </section>

      {/* ── TABS ── */}
      <div className="sv-tabs-wrap">
        {[
          { id: "civil", label: "Civil Construction" },
          { id: "interior", label: "Residential Interior" },
          { id: "commercial", label: "Commercial & Office" },
          { id: "renovation", label: "Renovation" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`sv-tab-btn ${activeCategory === tab.id ? "active" : ""}`}
            onClick={() => setActiveCategory(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── SERVICE CARDS ── */}
      <div className="sv-grid">
        {filteredServices.map((svc) => (
          <div key={svc.id} className="sv-card">
            <div className="sv-card-left">
              <div className="sv-card-badge-row">
                <div className="sv-icon-wrap">{svc.icon}</div>
                <span className="sv-badge-tag">{svc.tag}</span>
              </div>

              <h2 className="sv-card-title">{svc.title}</h2>
              {svc.marathiTitle && (
                <div className="sv-card-mr-title">{svc.marathiTitle}</div>
              )}

              <p className="sv-card-desc">{svc.description}</p>

              <div className="sv-card-ideal">
                <strong>Ideal for:</strong> {svc.idealFor}
              </div>

              <button
                type="button"
                className="sv-inquire-btn"
                onClick={() => handleInquire(svc.contactServiceValue)}
              >
                <span>Consult for this Service</span>
                <span>→</span>
              </button>
            </div>

            <div className="sv-card-right">
              <div className="sv-deliv-header">
                <span>✦</span>
                <span>Key Scope & Deliverables:</span>
              </div>
              <ul className="sv-deliv-list">
                {svc.deliverables.map((item, idx) => (
                  <li key={idx} className="sv-deliv-item">
                    <svg className="sv-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* ── 5-STEP JOURNEY ── */}
      <section className="sv-process-sec">
        <div className="sv-process-inner">
          <div className="sv-sec-header">
            <span className="sv-sec-pill">✦ Our Working Process</span>
            <h2 className="sv-sec-title">
              How We Bring Your <em>Vision to Life</em>
            </h2>
            <p style={{ fontSize: "14px", color: "#6a6a55", marginTop: "6px" }}>
              व्यवस्थित नियोजन, पारदर्शक बजेट आणि वेळेवर परिपूर्ण काम
            </p>
          </div>

          <div className="sv-process-grid">
            {PROCESS_STEPS.map((p) => (
              <div key={p.step} className="sv-step-card">
                <div className="sv-step-num">{p.step}</div>
                <div className="sv-step-title">{p.title}</div>
                <div className="sv-step-mr">{p.mr}</div>
                <p className="sv-step-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="sv-comparison-sec">
        <div className="sv-sec-header" style={{ marginBottom: 32 }}>
          <span className="sv-sec-pill">✦ Why Choose Samarpan</span>
          <h2 className="sv-sec-title">
            Samarpan Group vs <em>Traditional Contractors</em>
          </h2>
        </div>

        <div className="sv-table-box">
          <table className="sv-table">
            <thead>
              <tr>
                <th style={{ width: "28%" }}>Aspect / घटक</th>
                <th style={{ width: "38%" }}>Samarpan Group Approach</th>
                <th style={{ width: "34%" }}>Multiple Separate Vendors</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Coordination</strong></td>
                <td className="sv-td-highlight">✓ Single dedicated point of contact for Civil & Interior</td>
                <td>❌ Constant blame games between mason, carpenter, painter</td>
              </tr>
              <tr>
                <td><strong>Design Pre-visualization</strong></td>
                <td className="sv-td-highlight">✓ 100% photorealistic 3D renders before work starts</td>
                <td>❌ Verbal explanations with unexpected final look</td>
              </tr>
              <tr>
                <td><strong>Budget & Pricing</strong></td>
                <td className="sv-td-highlight">✓ Detailed itemized quotation with zero hidden charges</td>
                <td>❌ Vague lump-sum quotes that escalate by 25-40%</td>
              </tr>
              <tr>
                <td><strong>Quality & Supervision</strong></td>
                <td className="sv-td-highlight">✓ Experienced civil engineers on-site daily</td>
                <td>❌ Unsupervised labor doing shortcut compromises</td>
              </tr>
              <tr>
                <td><strong>Handoff & Timeline</strong></td>
                <td className="sv-td-highlight">✓ Fixed milestone schedule with on-time delivery</td>
                <td>❌ Unpredictable delays of several months</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="sv-cta-section">
        <div className="sv-cta-box">
          <div className="sv-cta-text">
            <h2>Ready to discuss your <em>dream space?</em></h2>
            <p>
              Book a complimentary consultation with our Nashik team. We’ll discuss your floor plan,
              design ideas, and provide a clear milestone estimation.
            </p>
          </div>

          <div className="sv-cta-btns">
            <button
              type="button"
              className="sv-cta-btn-main"
              onClick={() => {
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Book Free Consultation →
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sv-cta-btn-wa"
            >
              <span>💬 WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

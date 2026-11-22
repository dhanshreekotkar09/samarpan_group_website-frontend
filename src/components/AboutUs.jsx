import { useNavigate } from "react-router-dom";
import Int1 from "../assets/Int-1.jpg.jpeg";
import TestimonialsSection from "./TestimonialsSection";

export default function AboutUs() {
  const navigate = useNavigate();

  const handleConsultation = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExploreProjects = () => {
    navigate("/projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ab-page {
          font-family: var(--font-sans);
          background: linear-gradient(160deg, #f5f0e8 0%, #ede8d8 40%, #e8e0cc 100%);
          color: #3d3d30;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── HERO SECTION ── */
        .ab-hero {
          position: relative;
          padding: 84px 32px 64px;
          overflow: hidden;
        }

        .ab-hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 55% 65% at 90% 10%, rgba(138,154,74,0.12) 0%, transparent 65%),
            radial-gradient(ellipse 45% 55% at 10% 90%, rgba(200,184,154,0.2) 0%, transparent 65%);
        }

        .ab-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 56px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .ab-eyebrow {
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

        .ab-hero h1 {
          font-size: clamp(34px, 4.4vw, 56px);
          font-weight: 600;
          line-height: 1.15;
          color: #2a2a24;
          letter-spacing: -0.8px;
          margin-bottom: 12px;
        }

        .ab-hero h1 em {
          font-style: normal;
          color: #6b7c32;
        }

        .ab-hero-tagline {
          font-size: 16px;
          font-weight: 500;
          color: #6a6a52;
          margin-bottom: 20px;
          display: block;
        }

        .ab-hero-desc {
          font-size: 15px;
          font-weight: 400;
          line-height: 1.8;
          color: #555545;
          max-width: 580px;
          margin-bottom: 32px;
        }

        .ab-hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .ab-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 28px;
          background: linear-gradient(135deg, #2a2a24 0%, #3d4a1f 100%);
          color: #e8d9b5;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(42,42,36,0.2);
          transition: all 0.3s ease;
          font-family: var(--font-sans);
        }

        .ab-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(42,42,36,0.3);
          color: #ffffff;
        }

        .ab-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: rgba(255,255,255,0.6);
          color: #3d3d30;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          border-radius: 10px;
          border: 1.5px solid rgba(42,42,36,0.25);
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-sans);
        }

        .ab-btn-secondary:hover {
          background: #ffffff;
          border-color: #3d4a1f;
          transform: translateY(-2px);
        }

        /* ── HERO IMAGE CARD ── */
        .ab-hero-image-wrap {
          position: relative;
        }

        .ab-hero-image-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 18px 45px rgba(42,42,36,0.12);
          border: 1px solid rgba(138,154,74,0.25);
        }

        .ab-hero-image-card img {
          width: 100%;
          height: 380px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .ab-hero-image-card:hover img {
          transform: scale(1.03);
        }

        .ab-floating-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          background: rgba(42,42,36,0.85);
          backdrop-filter: blur(10px);
          padding: 14px 20px;
          border-radius: 14px;
          border: 1px solid rgba(232,217,181,0.25);
          color: #f5f0e8;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ab-badge-title {
          font-size: 13px;
          font-weight: 600;
          color: #e8d9b5;
          letter-spacing: 0.3px;
        }

        .ab-badge-sub {
          font-size: 11px;
          color: #c8b89a;
          margin-top: 2px;
        }

        .ab-badge-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #8a9a4a;
          margin-right: 6px;
        }

        /* ── SECTION HEADER ── */
        .ab-sec-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .ab-sec-pill {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #8a9a4a;
          margin-bottom: 10px;
          display: block;
        }

        .ab-sec-title {
          font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 600;
          color: #2a2a24;
          letter-spacing: -0.5px;
        }

        .ab-sec-title em {
          font-style: normal;
          color: #6b7c32;
        }

        /* ── SERVICES / WHAT WE DO ── */
        .ab-services-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 32px 72px;
        }

        .ab-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .ab-service-card {
          background: rgba(255,252,245,0.85);
          border: 1px solid rgba(138,154,74,0.22);
          border-radius: 18px;
          padding: 32px 26px;
          box-shadow: 0 10px 25px rgba(42,42,36,0.04);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .ab-service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(42,42,36,0.08);
          border-color: rgba(138,154,74,0.45);
        }

        .ab-service-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(138,154,74,0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4a5a1f;
          margin-bottom: 20px;
        }

        .ab-service-title {
          font-size: 20px;
          font-weight: 600;
          color: #2a2a24;
          margin-bottom: 10px;
        }

        .ab-service-text {
          font-size: 13.5px;
          line-height: 1.7;
          color: #555545;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .ab-service-tags {
          list-style: none;
          padding: 0;
          margin: 0;
          border-top: 1px solid rgba(138,154,74,0.15);
          padding-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ab-service-tags li {
          font-size: 12px;
          color: #4a5a1f;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ab-check-icon {
          color: #8a9a4a;
          flex-shrink: 0;
        }

        /* ── WHY US STRIP ── */
        .ab-pillars-section {
          background: rgba(42,42,36,0.04);
          border-top: 1px solid rgba(138,154,74,0.18);
          border-bottom: 1px solid rgba(138,154,74,0.18);
          padding: 56px 32px;
        }

        .ab-pillars-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .ab-pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .ab-pillar-card {
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(138,154,74,0.18);
          border-radius: 14px;
          padding: 22px 20px;
        }

        .ab-pillar-num {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #8a9a4a;
          margin-bottom: 8px;
        }

        .ab-pillar-title {
          font-size: 16px;
          font-weight: 600;
          color: #2a2a24;
          margin-bottom: 6px;
        }

        .ab-pillar-desc {
          font-size: 12.5px;
          color: #666655;
          line-height: 1.6;
        }

        /* ── CTA BANNER ── */
        .ab-cta-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 32px 84px;
        }

        .ab-cta-box {
          background: linear-gradient(135deg, #2a2a24 0%, #35441d 55%, #293516 100%);
          border-radius: 24px;
          padding: 56px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(42,42,36,0.18);
          border: 1px solid rgba(138,154,74,0.3);
        }

        .ab-cta-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 50% 70% at 85% 45%, rgba(138,154,74,0.2) 0%, transparent 70%);
          pointer-events: none;
        }

        .ab-cta-content {
          position: relative;
          z-index: 1;
        }

        .ab-cta-tag {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #c8d890;
          font-weight: 600;
          margin-bottom: 12px;
          display: block;
        }

        .ab-cta-title {
          font-size: clamp(26px, 3vw, 38px);
          font-weight: 600;
          color: #f5f0e8;
          line-height: 1.25;
          letter-spacing: -0.5px;
          margin-bottom: 10px;
        }

        .ab-cta-title em {
          font-style: normal;
          color: #c8d890;
        }

        .ab-cta-sub {
          font-size: 14px;
          color: #c8b89a;
          line-height: 1.6;
          max-width: 520px;
        }

        .ab-cta-buttons {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        /* BOOK FREE CONSULTATION BUTTON WITH WORKING ARROW */
        .ab-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: #8a9a4a;
          color: #1f2710;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 6px 20px rgba(138,154,74,0.3);
          font-family: var(--font-sans);
          white-space: nowrap;
        }

        .ab-cta-btn:hover {
          background: #9ab052;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(138,154,74,0.45);
          color: #121908;
        }

        .ab-cta-btn:hover .ab-arrow-icon {
          transform: translateX(5px);
        }

        .ab-arrow-icon {
          display: inline-block;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .ab-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 26px;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(200,184,154,0.45);
          border-radius: 12px;
          color: #e8d9b5;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-sans);
          white-space: nowrap;
        }

        .ab-wa-btn:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(200,184,154,0.8);
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ab-hero-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .ab-services-grid {
            grid-template-columns: 1fr;
          }
          .ab-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .ab-cta-box {
            flex-direction: column;
            text-align: center;
            padding: 44px 32px;
            gap: 28px;
          }
          .ab-cta-buttons {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .ab-hero {
            padding: 60px 20px 44px;
          }
          .ab-services-section,
          .ab-pillars-section,
          .ab-cta-section {
            padding-left: 20px;
            padding-right: 20px;
          }
          .ab-hero-image-card img {
            height: 260px;
          }
          .ab-pillars-grid {
            grid-template-columns: 1fr;
          }
          .ab-cta-box {
            padding: 36px 20px;
          }
          .ab-cta-btn, .ab-wa-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="ab-page">
        {/* ── HERO SECTION ── */}
        <section className="ab-hero">
          <div className="ab-hero-bg" />
          <div className="ab-hero-inner">
            <div>
              <div className="ab-eyebrow">
                <span>✦</span>
                <span>About Samarpan Group</span>
                <span>✦</span>
              </div>
              <h1>
                Building Trust, <em>Crafting Spaces</em>
              </h1>
              <span className="ab-hero-tagline">
                स्वप्नातील घरासाठी एक समर्पित वास्तुनिर्मिती
              </span>
              <p className="ab-hero-desc">
                Samarpan Group is a Nashik-based design & construction practice providing
                comprehensive <strong>Civil & Interior solutions</strong> under one roof.
                From solid structural foundations to bespoke interior styling, we deliver
                every space with dedication, transparency, and lasting quality.
              </p>
              <div className="ab-hero-actions">
                <button
                  type="button"
                  className="ab-btn-primary"
                  onClick={handleConsultation}
                >
                  <span>Book Consultation</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="ab-btn-secondary"
                  onClick={handleExploreProjects}
                >
                  View Projects
                </button>
              </div>
            </div>

            <div className="ab-hero-image-wrap">
              <div className="ab-hero-image-card">
                <img src={Int1} alt="Samarpan Group Project Interior" />
                <div className="ab-floating-badge">
                  <div>
                    <div className="ab-badge-title">
                      <span className="ab-badge-dot" />
                      Civil & Interior Solutions
                    </div>
                    <div className="ab-badge-sub">Hanumanwadi, Panchavati, Nashik</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT WE DO (CONCISE 3-SERVICE CARDS) ── */}
        <section className="ab-services-section">
          <div className="ab-sec-header">
            <span className="ab-sec-pill">What We Do</span>
            <h2 className="ab-sec-title">
              Complete Solutions, <em>One Single Team</em>
            </h2>
          </div>

          <div className="ab-services-grid">
            {/* CARD 1: CIVIL */}
            <div className="ab-service-card">
              <div className="ab-service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M9 8h1" />
                  <path d="M9 12h1" />
                  <path d="M9 16h1" />
                  <path d="M14 8h1" />
                  <path d="M14 12h1" />
                  <path d="M14 16h1" />
                  <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                </svg>
              </div>
              <h3 className="ab-service-title">Civil Construction</h3>
              <p className="ab-service-text">
                From ground breaking to structural completion. We execute RCC framing,
                brickwork, plastering, and turnkey construction with meticulous engineering standards.
              </p>
              <ul className="ab-service-tags">
                <li>
                  <svg className="ab-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Turnkey Execution & Supervision
                </li>
                <li>
                  <svg className="ab-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Structural Integrity & Durability
                </li>
                <li>
                  <svg className="ab-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Foundation to Finish
                </li>
              </ul>
            </div>

            {/* CARD 2: INTERIORS */}
            <div className="ab-service-card">
              <div className="ab-service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 className="ab-service-title">Interior Design</h3>
              <p className="ab-service-text">
                Creating functional and aesthetically pleasing living & commercial environments.
                Tailored modular kitchens, woodwork, false ceiling, and lighting harmony.
              </p>
              <ul className="ab-service-tags">
                <li>
                  <svg className="ab-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Residential & Commercial Styling
                </li>
                <li>
                  <svg className="ab-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Bespoke Modular Kitchens & Storage
                </li>
                <li>
                  <svg className="ab-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Premium Finish & Material Quality
                </li>
              </ul>
            </div>

            {/* CARD 3: 3D PLANNING */}
            <div className="ab-service-card">
              <div className="ab-service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>
              <h3 className="ab-service-title">3D Visualization & Planning</h3>
              <p className="ab-service-text">
                Visualize every corner before construction begins. Realistic 3D concept renders,
                precise architectural floor plans, and transparent material estimation.
              </p>
              <ul className="ab-service-tags">
                <li>
                  <svg className="ab-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Photorealistic 3D Renders
                </li>
                <li>
                  <svg className="ab-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Detailed Space & Layout Planning
                </li>
                <li>
                  <svg className="ab-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Clear & Honest Budget Estimation
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── WHY SAMARPAN (4 SHORT PILLARS) ── */}
        <section className="ab-pillars-section">
          <div className="ab-pillars-inner">
            <div className="ab-pillars-grid">
              <div className="ab-pillar-card">
                <div className="ab-pillar-num">01 / INTEGRATED</div>
                <div className="ab-pillar-title">Single-Roof Solution</div>
                <p className="ab-pillar-desc">
                  No dealing with multiple disconnected vendors. Civil structure and interior finishing happen harmoniously.
                </p>
              </div>
              <div className="ab-pillar-card">
                <div className="ab-pillar-num">02 / TRANSPARENT</div>
                <div className="ab-pillar-title">Honest Pricing</div>
                <p className="ab-pillar-desc">
                  Detailed material specifications and open itemized budgets with zero hidden surprises.
                </p>
              </div>
              <div className="ab-pillar-card">
                <div className="ab-pillar-num">03 / DEDICATED</div>
                <div className="ab-pillar-title">Direct Supervision</div>
                <p className="ab-pillar-desc">
                  Consistent on-site quality checks ensuring construction precision and timely milestone handovers.
                </p>
              </div>
              <div className="ab-pillar-card">
                <div className="ab-pillar-num">04 / LOCAL</div>
                <div className="ab-pillar-title">Nashik & Maharashtra</div>
                <p className="ab-pillar-desc">
                  Headquartered at Panchavati, Nashik, serving residential & commercial clients with personal care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CLIENT TESTIMONIALS (DYNAMIC) ── */}
        <TestimonialsSection />

        {/* ── CTA BANNER ── */}
        <section className="ab-cta-section">
          <div className="ab-cta-box">
            <div className="ab-cta-content">
              <span className="ab-cta-tag">✦ Let's Connect</span>
              <h2 className="ab-cta-title">
                Ready to transform your <em>space?</em>
              </h2>
              <p className="ab-cta-sub">
                Connect with our team for a free consultation, layout discussion, and tailored project estimate.
              </p>
            </div>

            <div className="ab-cta-buttons">
              <button
                type="button"
                className="ab-cta-btn"
                onClick={handleConsultation}
              >
                <span>Book Free Consultation</span>
                <svg
                  className="ab-arrow-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </button>

              <a
                href="https://wa.me/918055587237"
                target="_blank"
                rel="noopener noreferrer"
                className="ab-wa-btn"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
import { useNavigate } from "react-router-dom";

export default function Home() {
  const font = "var(--font-sans)";
  const navigate = useNavigate();

  const styles = {
    hero: {
      minHeight: "88vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 40px",
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(160deg, #f5f0e8 0%, #ede8d8 40%, #e8e0cc 100%)",
    },

    heroBlob1: {
      position: "absolute",
      top: "-100px",
      right: "-100px",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(138,154,74,0.12) 0%, transparent 70%)",
      pointerEvents: "none",
    },

    heroBlob2: {
      position: "absolute",
      bottom: "-80px",
      left: "-60px",
      width: "400px",
      height: "400px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(200,184,154,0.2) 0%, transparent 70%)",
      pointerEvents: "none",
    },

    heroContent: {
      textAlign: "center",
      maxWidth: "860px",
      position: "relative",
      zIndex: 1,
    },

    heroLabel: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "6px 20px",
      background: "rgba(138,154,74,0.1)",
      border: "1px solid rgba(138,154,74,0.3)",
      borderRadius: "20px",
      fontSize: "10px",
      letterSpacing: "2.5px",
      textTransform: "uppercase",
      color: "#4a5a1f",
      marginBottom: "28px",
      fontFamily: font,
      fontWeight: 600,
    },

    heroHeadline: {
      fontFamily: font,
      fontSize: "clamp(34px, 5.2vw, 62px)",
      fontWeight: 700,
      lineHeight: 1.15,
      color: "#2a2a24",
      marginBottom: "12px",
      letterSpacing: "-0.6px",
    },

    heroAccent: {
      color: "#6b7c32",
    },

    heroMarathi: {
      fontFamily: font,
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: 1.7,
      color: "#6a6a52",
      marginBottom: "24px",
    },

    heroPara: {
      fontFamily: font,
      fontSize: "15.5px",
      lineHeight: 1.75,
      color: "#5a5a4a",
      maxWidth: "640px",
      margin: "0 auto 8px",
      fontWeight: 400,
    },

    heroParaMr: {
      fontFamily: font,
      fontSize: "14.5px",
      lineHeight: 1.8,
      color: "#6a6a52",
      maxWidth: "640px",
      margin: "0 auto 40px",
      fontWeight: 400,
    },

    heroBtns: {
      display: "flex",
      gap: "14px",
      justifyContent: "center",
      flexWrap: "wrap",
    },

    heroBtnPrimary: {
      padding: "14px 30px",
      background: "linear-gradient(135deg, #2a2a24 0%, #3d4a1f 100%)",
      color: "#e8d9b5",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "2px",
      textTransform: "uppercase",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 8px 24px rgba(42,42,36,0.25)",
      transition: "all 0.3s ease",
      fontFamily: font,
    },

    heroBtnSecondary: {
      padding: "14px 30px",
      background: "transparent",
      color: "#3d3d30",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "2px",
      textTransform: "uppercase",
      borderRadius: "10px",
      border: "1.5px solid rgba(42,42,36,0.3)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontFamily: font,
    },
  };

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/services");
    }
  };

  return (
    <>
      <style>{`
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(42,42,36,0.35) !important;
          color: #ffffff !important;
        }
        .hero-btn-secondary:hover {
          background: rgba(42,42,36,0.06) !important;
          border-color: #2a3a14 !important;
        }

        /* ── HOME SERVICES SECTION ── */
        .hm-services-sec {
          background: #f8f5ee;
          border-top: 1px solid rgba(138,154,74,0.18);
          border-bottom: 1px solid rgba(138,154,74,0.18);
          padding: 80px 32px;
          font-family: var(--font-sans);
        }

        .hm-sec-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .hm-sec-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 44px;
          gap: 20px;
          flex-wrap: wrap;
        }

        .hm-sec-header h2 {
          font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 600;
          color: #2a2a24;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .hm-sec-header h2 em {
          font-style: normal;
          color: #6b7c32;
        }

        .hm-sec-sub {
          font-size: 14.5px;
          color: #6a6a55;
          margin-top: 6px;
        }

        .hm-explore-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
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
          text-decoration: none;
        }

        .hm-explore-all-btn:hover {
          background: #3d5018;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(42,58,20,0.3);
        }

        .hm-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .hm-svc-card {
          background: rgba(255, 252, 245, 0.95);
          border: 1px solid rgba(138,154,74,0.22);
          border-radius: 20px;
          padding: 34px 28px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 6px 24px rgba(42,42,36,0.03);
          transition: all 0.3s ease;
        }

        .hm-svc-card:hover {
          transform: translateY(-4px);
          border-color: rgba(138,154,74,0.5);
          box-shadow: 0 14px 34px rgba(42,42,36,0.07);
        }

        .hm-svc-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(138,154,74,0.12);
          color: #3d5018;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .hm-svc-title {
          font-size: 20px;
          font-weight: 600;
          color: #2a2a24;
          margin-bottom: 12px;
        }

        .hm-svc-mr {
          font-size: 13px;
          color: #7b8e34;
          font-weight: 600;
          margin-bottom: 14px;
        }

        .hm-svc-desc {
          font-size: 13.5px;
          line-height: 1.7;
          color: #555545;
          margin-bottom: 22px;
          flex: 1;
        }

        .hm-svc-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 600;
          color: #3d5018;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .hm-svc-link:hover {
          color: #1a2a0a;
          text-decoration: underline;
        }

        @media (max-width: 960px) {
          .hm-cards-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .hero-section { padding: 60px 20px !important; }
          .hm-services-sec { padding: 50px 20px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section id="home" className="hero-section" style={styles.hero}>
        <div style={styles.heroBlob1} />
        <div style={styles.heroBlob2} />

        <div style={styles.heroContent}>
          <div style={styles.heroLabel}>
            <span>✦</span>
            <span>Civil & Interior Solutions</span>
            <span>✦</span>
          </div>

          <h1 style={styles.heroHeadline}>
            Spaces Crafted with{" "}
            <span style={styles.heroAccent}>Pure Samarpan</span>
          </h1>
          <p style={styles.heroMarathi}>
            अत्यंत निष्ठेने आणि समर्पणाने साकारलेली वास्तु
          </p>

          <p style={styles.heroPara}>
            From strong foundations to refined bespoke interiors, we dedicate our expertise
            to crafting spaces in Nashik that inspire and last a lifetime.
          </p>
          <p style={styles.heroParaMr}>
            भक्कम पायाभरणीपासून ते सुंदर इंटिरिअरपर्यंत, आम्ही तुमच्या स्वप्नातील
            वास्तू साकारण्यासाठी पूर्ण समर्पित आहोत.
          </p>

          <div style={styles.heroBtns}>
            <button
              className="hero-btn-primary"
              style={styles.heroBtnPrimary}
              onClick={() => {
                navigate("/projects");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Explore Projects →
            </button>
            <button
              className="hero-btn-secondary"
              style={styles.heroBtnSecondary}
              onClick={scrollToServices}
            >
              Our Services & Process
            </button>
          </div>
        </div>
      </section>

      {/* ── SERVICES SHOWCASE SECTION (ID: services) ── */}
      <section id="services" className="hm-services-sec">
        <div className="hm-sec-inner">
          <div className="hm-sec-top">
            <div className="hm-sec-header">
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#8a9a4a", display: "block", marginBottom: 6 }}>
                ✦ Core Offerings
              </span>
              <h2>
                Crafted with Engineering & <em>Artistry</em>
              </h2>
              <p className="hm-sec-sub">
                सिव्हिल बांधकाम आणि इंटिरिअर डिझायनिंग — एकाच अनुभवी टीमद्वारे
              </p>
            </div>

            <button
              type="button"
              className="hm-explore-all-btn"
              onClick={() => {
                navigate("/services");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span>View All Services</span>
              <span>→</span>
            </button>
          </div>

          <div className="hm-cards-grid">
            {/* CARD 1: CIVIL */}
            <div className="hm-svc-card">
              <div className="hm-svc-icon">
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
              <h3 className="hm-svc-title">Turnkey Civil Construction</h3>
              <p className="hm-svc-desc">
                From structural RCC framing, brick masonry, and waterproofing to plumbing.
                Executed with grade-A materials and daily engineer-level site supervision.
              </p>
              <span
                className="hm-svc-link"
                onClick={() => {
                  navigate("/services");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Learn more about Civil →
              </span>
            </div>

            {/* CARD 2: INTERIORS */}
            <div className="hm-svc-card">
              <div className="hm-svc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 className="hm-svc-title">Residential & Commercial Interior</h3>
              <p className="hm-svc-desc">
                Tailored 1BHK, 2BHK, 3BHK and luxury bungalow interiors. Ambient lighting,
                custom false ceilings, designer wall paneling, and photorealistic 3D visualization.
              </p>
              <span
                className="hm-svc-link"
                onClick={() => {
                  navigate("/services");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Learn more about Interiors →
              </span>
            </div>

            {/* CARD 3: RENOVATION */}
            <div className="hm-svc-card">
              <div className="hm-svc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </div>
              <h3 className="hm-svc-title">Renovation & Remodeling</h3>
              <p className="hm-svc-desc">
                Breathe fresh life into older homes, apartments, and commercial spaces with structural upgrades,
                modern layouts, and clean milestone-based execution.
              </p>
              <span
                className="hm-svc-link"
                onClick={() => {
                  navigate("/services");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Learn more about Renovation →
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

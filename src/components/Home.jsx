export default function Home() {
  const styles = {
    hero: {
      minHeight: "90vh",
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
      maxWidth: "700px",
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
      marginBottom: "32px",
      fontFamily: "'Jost', sans-serif",
    },

    heroHeadline: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(48px, 7vw, 80px)",
      fontWeight: 300,
      lineHeight: 1.1,
      color: "#2a2a24",
      marginBottom: "24px",
      letterSpacing: "-1px",
    },

    heroAccent: {
      fontStyle: "italic",
      color: "#8a9a4a",
    },

    heroPara: {
      fontFamily: "'Jost', sans-serif",
      fontSize: "14px",
      lineHeight: 1.8,
      color: "#5a5a4a",
      maxWidth: "500px",
      margin: "0 auto 48px",
      letterSpacing: "0.3px",
      fontWeight: 300,
    },

    heroBtns: {
      display: "flex",
      gap: "16px",
      justifyContent: "center",
      flexWrap: "wrap",
    },

    heroBtnPrimary: {
      padding: "14px 32px",
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
      fontFamily: "'Jost', sans-serif",
    },

    heroBtnSecondary: {
      padding: "14px 32px",
      background: "transparent",
      color: "#3d3d30",
      fontSize: "11px",
      fontWeight: 500,
      letterSpacing: "2px",
      textTransform: "uppercase",
      borderRadius: "10px",
      border: "1.5px solid rgba(42,42,36,0.3)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontFamily: "'Jost', sans-serif",
    },
  };

  const smoothScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(42,42,36,0.35) !important;
        }
        .hero-btn-secondary:hover {
          background: rgba(42,42,36,0.06) !important;
        }
        @media (max-width: 640px) {
          .hero-section { padding: 60px 20px !important; }
        }
      `}</style>

      <section id="home" className="hero-section" style={styles.hero}>
        <div style={styles.heroBlob1} />
        <div style={styles.heroBlob2} />

        <div style={styles.heroContent}>
          <div style={styles.heroLabel}>
            <span>✦</span>
            <span>Luxury Interior Design</span>
            <span>✦</span>
          </div>

          <h1 style={styles.heroHeadline}>
            Spaces that{" "}
            <span style={styles.heroAccent}>Breathe</span>
            {" & "}
            <span style={styles.heroAccent}>Inspire</span>
          </h1>

          <p style={styles.heroPara}>
            We craft timeless interiors that reflect your personality — where every corner
            tells a story of elegance and purpose.
          </p>

          <div style={styles.heroBtns}>
            <button
              className="hero-btn-primary"
              style={styles.heroBtnPrimary}
              onClick={() => smoothScroll("#projects")}
            >
              Explore Portfolio →
            </button>
            <button
              className="hero-btn-secondary"
              style={styles.heroBtnSecondary}
              onClick={() => smoothScroll("#about")}
            >
              Our Process
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
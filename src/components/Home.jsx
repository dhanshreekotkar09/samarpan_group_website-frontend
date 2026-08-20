export default function Home() {
  const font = "var(--font-sans)";

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
      marginBottom: "32px",
      fontFamily: font,
      fontWeight: 600,
    },

    heroHeadline: {
      fontFamily: font,
      fontSize: "clamp(36px, 5.4vw, 64px)",
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
      marginBottom: "28px",
    },

    heroPara: {
      fontFamily: font,
      fontSize: "16px",
      lineHeight: 1.75,
      color: "#5a5a4a",
      maxWidth: "640px",
      margin: "0 auto 8px",
      letterSpacing: "0.1px",
      fontWeight: 400,
    },

    heroParaMr: {
      fontFamily: font,
      fontSize: "15px",
      lineHeight: 1.8,
      color: "#6a6a52",
      maxWidth: "640px",
      margin: "0 auto 48px",
      fontWeight: 400,
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
      fontFamily: font,
    },

    heroBtnSecondary: {
      padding: "14px 32px",
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

  const smoothScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
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
            <span>Civil & Interior Solution</span>
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
            From strong foundations to refined interiors, we dedicate our expertise
            to crafting spaces that inspire and last a lifetime.
          </p>
          <p style={styles.heroParaMr}>
            भक्कम पायाभरणीपासून ते सुंदर इंटिरिअरपर्यंत, आम्ही तुमच्या स्वप्नातील
            वास्तू साकारण्यासाठी पूर्ण समर्पित आहोत.
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

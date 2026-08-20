import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/sg_logo.jpg";

// ── CONTACT CONSTANTS (shared across navbar) ──
const PHONE      = "+91 80555 87237";
const PHONE_LINK = "tel:+918055587237";
const EMAIL      = "thesamarpaninteriors@gmail.com";
const EMAIL_LINK = "https://mail.google.com/mail/?view=cm&to=thesamarpaninteriors@gmail.com";
const WHATSAPP   = "https://wa.me/918055587237";
const INSTAGRAM  = "https://www.instagram.com/samarpan_group_interiors?igsh=dmlvb2R5YzRiNmhw";
const FACEBOOK   = "https://www.facebook.com/share/1B978MBdLy/";

const NAV_LINKS = [
  { label: "Home",     href: "#home",     path: "/" },
  { label: "About Us", href: "#about",    path: "/about" },
  {
    label: "Services",
    href: "#services",
    path: "/",
    dropdown: [
      {
        title: "Civil",
        items: [
          "Structural Excellence",
          "Foundation to Finish",
          "Engineered with Precision",
          "Turnkey Construction",
        ],
      },
      {
        title: "Interior",
        items: [
          "Bespoke Interiors",
          "Functional Elegance",
          "3D Visualized Design",
          "Crafted With Detail",
        ],
      },
    ],
  },
  { label: "Projects", href: "#projects", path: "/projects" },
  { label: "Contact",  href: "#contact",  path: "/contact" },
];

const ChevronDown = ({ open }) => (
  <svg
    width="12" height="12" viewBox="0 0 12 12" fill="none"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", display: "inline-block", marginLeft: "4px" }}
  >
    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── SOCIAL ICONS ──
const IconInstagram = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);
const IconFacebook = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

export default function SamarpanNavbar() {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;
    const prev = {
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      htmlOverflow: html.style.overflow,
    };
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    html.style.overflow = "hidden";
    return () => {
      body.style.overflow = prev.bodyOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.width = prev.bodyWidth;
      html.style.overflow = prev.htmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  const handleNavClick = (link) => {
    setActiveDropdown(null);
    const isDedicatedPage = link.path && link.path !== "/";
    if (isDedicatedPage) {
      navigate(link.path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (location.pathname === "/") {
        const el = document.querySelector(link.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(link.href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }
    }
  };

  const handleMobileNavClick = (link) => {
    if (link.dropdown) {
      setMobileExpanded(mobileExpanded === link.label ? null : link.label);
      return;
    }
    setMobileOpen(false);
    setTimeout(() => handleNavClick(link), 300);
  };

  const s = {
    wrapper: { fontFamily: "var(--font-sans)" },

    topBar: {
      background: "#2a2a24",
      color: "#c8b89a",
      fontSize: "11px",
      letterSpacing: "1.5px",
      padding: "8px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all 0.4s ease",
      overflow: "hidden",
      maxHeight: scrolled ? "0" : "40px",
      opacity: scrolled ? 0 : 1,
      paddingTop: scrolled ? 0 : "8px",
      paddingBottom: scrolled ? 0 : "8px",
    },
    topBarLeft: {
      fontFamily: "var(--font-sans)",
      fontSize: "13px",
      letterSpacing: "0.5px",
      color: "#d4c4a0",
    },
    topBarRight: { display: "flex", gap: "20px", alignItems: "center" },
    topBarLink: {
      display: "flex", alignItems: "center", gap: "5px",
      color: "#c8b89a", textDecoration: "none", fontSize: "11px",
      letterSpacing: "0.8px", transition: "color 0.2s ease", cursor: "pointer",
    },
    topBarSocials: { display: "flex", gap: "10px", alignItems: "center", marginLeft: "4px" },
    topBarSocialIcon: {
      width: "26px", height: "26px",
      borderRadius: "6px",
      background: "rgba(200,184,154,0.1)",
      border: "1px solid rgba(200,184,154,0.2)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#c8b89a", cursor: "pointer", textDecoration: "none",
      transition: "all 0.2s ease",
    },
    accentLine: { height: "2px", background: "linear-gradient(90deg, #2a2a24 0%, #8a9a4a 30%, #c8b89a 60%, #2a2a24 100%)" },

    nav: {
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "rgba(255,252,245,0.97)" : "rgba(245,240,232,0.95)",
      backdropFilter: "blur(12px)",
      boxShadow: scrolled ? "0 4px 30px rgba(42,42,36,0.12)" : "0 2px 12px rgba(42,42,36,0.06)",
      transition: "all 0.4s ease",
    },
    navInner: {
      maxWidth: "1300px", margin: "0 auto", padding: "0 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: scrolled ? "64px" : "76px", transition: "height 0.4s ease",
      width: "100%", minWidth: 0, boxSizing: "border-box",
    },
    logoWrap: { display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", cursor: "pointer", minWidth: 0, flex: 1 },
    logoIconWrap: {
      width: scrolled ? "38px" : "46px",
      height: scrolled ? "38px" : "46px",
      borderRadius: "12px",
      background: "white",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.4s ease",
      boxShadow: "0 4px 12px rgba(42,42,36,0.2)",
      overflow: "hidden",
    },
    logoText: { display: "flex", flexDirection: "column", lineHeight: 1, minWidth: 0 },
    logoMain: {
      fontFamily: "var(--font-sans)",
      fontSize: scrolled ? "18px" : "22px", fontWeight: 600,
      color: "#2a2a24", letterSpacing: "0.5px", transition: "font-size 0.4s ease",
    },
    logoSub: { fontSize: "9px", letterSpacing: "2px", color: "#8a9a4a", textTransform: "uppercase", marginTop: "2px" },

    desktopLinks: { display: "flex", alignItems: "center", gap: "4px", listStyle: "none", margin: 0, padding: 0 },
    navLinkWrap: { position: "relative" },
    navLink: {
      display: "flex", alignItems: "center", gap: "4px",
      padding: "8px 14px", fontSize: "11.5px", fontWeight: 500,
      letterSpacing: "1.2px", textTransform: "uppercase",
      color: "#3d3d30", cursor: "pointer", borderRadius: "8px",
      transition: "all 0.2s ease", textDecoration: "none",
      border: "none", background: "none", whiteSpace: "nowrap",
    },
    dropdown: {
      position: "absolute", top: "calc(100% + 10px)", left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(255,252,245,0.98)", backdropFilter: "blur(16px)",
      borderRadius: "14px", padding: "16px", minWidth: "460px",
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px",
      boxShadow: "0 20px 50px rgba(42,42,36,0.15), 0 0 0 1px rgba(138,154,74,0.15)",
      zIndex: 100, animation: "dropIn 0.2s ease",
    },
    dropdownGroupTitle: {
      fontSize: "10px", fontWeight: 700, letterSpacing: "1.8px",
      textTransform: "uppercase", color: "#6b7c32",
      padding: "4px 12px 10px",
    },
    dropdownItem: {
      display: "block", padding: "8px 12px", fontSize: "12px",
      letterSpacing: "0.4px", color: "#3d3d30", borderRadius: "8px",
      cursor: "pointer", textDecoration: "none", transition: "all 0.15s ease",
    },
    navRight: { display: "flex", alignItems: "center", gap: "12px" },
    phonePill: {
      display: "flex", alignItems: "center", gap: "6px",
      padding: "6px 14px",
      background: "rgba(138,154,74,0.1)",
      border: "1px solid rgba(138,154,74,0.3)",
      borderRadius: "20px", fontSize: "11px", letterSpacing: "0.5px",
      color: "#4a5a1f", cursor: "pointer", transition: "all 0.2s ease",
      textDecoration: "none",
    },
    ctaBtn: {
      padding: "10px 22px",
      background: "linear-gradient(135deg, #2a2a24 0%, #3d4a1f 100%)",
      color: "#e8d9b5", fontSize: "11px", fontWeight: 600,
      letterSpacing: "1.5px", textTransform: "uppercase",
      borderRadius: "8px", border: "none", cursor: "pointer",
      transition: "all 0.3s ease", boxShadow: "0 4px 12px rgba(42,42,36,0.2)",
    },
    hamburger: {
      width: "40px", height: "40px", borderRadius: "10px",
      border: "1px solid rgba(138,154,74,0.3)", background: "transparent",
      cursor: "pointer", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "5px", padding: "8px",
    },
    hamLine: { width: "18px", height: "1.5px", background: "#2a2a24", borderRadius: "2px" },
    bottomAccent: { height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(138,154,74,0.4) 30%, rgba(200,184,154,0.6) 50%, rgba(138,154,74,0.4) 70%, transparent 100%)" },

    overlay: {
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(42,42,36,0.5)", backdropFilter: "blur(4px)",
      transition: "opacity 0.4s ease",
      opacity: mobileOpen ? 1 : 0,
      pointerEvents: mobileOpen ? "auto" : "none",
      touchAction: "none",
      overscrollBehavior: "none",
    },
    drawer: {
      position: "fixed", top: 0, right: 0, bottom: 0, width: "300px",
      background: "#faf7f0", zIndex: 2010,
      transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      display: "flex", flexDirection: "column", overflowY: "auto",
    },
    drawerHeader: {
      padding: "24px 20px", borderBottom: "1px solid rgba(138,154,74,0.2)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "#2a2a24",
    },
    drawerLogo: { fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 600, color: "#e8d9b5" },
    drawerSub:  { fontSize: "9px", letterSpacing: "2px", color: "#8a9a4a", textTransform: "uppercase", marginTop: "2px" },
    closeBtn: {
      width: "36px", height: "36px", borderRadius: "8px",
      border: "1px solid rgba(200,184,154,0.3)", background: "transparent",
      color: "#c8b89a", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
    },
    drawerLink: {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 24px", fontSize: "11px", fontWeight: 500,
      letterSpacing: "1.5px", textTransform: "uppercase",
      color: "#2a2a24", borderBottom: "1px solid rgba(138,154,74,0.15)", cursor: "pointer",
    },
    drawerAccordion: { background: "rgba(138,154,74,0.06)", overflow: "hidden" },
    drawerGroupTitle: {
      padding: "12px 24px 6px 40px",
      fontSize: "10px", fontWeight: 700, letterSpacing: "1.8px",
      textTransform: "uppercase", color: "#6b7c32",
    },
    drawerAccordionItem: {
      display: "block", padding: "12px 24px 12px 40px",
      fontSize: "11px", letterSpacing: "1px", color: "#4a5a2f",
      borderBottom: "1px solid rgba(138,154,74,0.1)", cursor: "pointer", textDecoration: "none",
    },
    drawerFooter: { marginTop: "auto", padding: "24px", borderTop: "1px solid rgba(138,154,74,0.2)" },
    drawerCta: {
      display: "block", width: "100%", padding: "14px",
      background: "linear-gradient(135deg, #2a2a24 0%, #3d4a1f 100%)",
      color: "#e8d9b5", fontSize: "11px", fontWeight: 600,
      letterSpacing: "2px", textTransform: "uppercase",
      borderRadius: "10px", border: "none", cursor: "pointer",
      textAlign: "center", marginBottom: "16px",
    },
    drawerContactRow: {
      display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px",
    },
    drawerContactLink: {
      display: "flex", alignItems: "center", gap: "8px",
      fontSize: "11.5px", color: "#5a5a4a", textDecoration: "none",
      padding: "8px 12px", borderRadius: "8px",
      background: "rgba(138,154,74,0.06)",
      border: "1px solid rgba(138,154,74,0.12)",
      transition: "all 0.2s ease",
    },
    drawerSocials: { display: "flex", gap: "10px", justifyContent: "center", marginTop: "4px" },
    drawerSocialIcon: {
      width: "36px", height: "36px", borderRadius: "10px",
      background: "rgba(138,154,74,0.1)",
      border: "1px solid rgba(138,154,74,0.22)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#5a7a2a", textDecoration: "none", transition: "all 0.2s ease",
    },
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .nav-link-item:hover        { background: rgba(138,154,74,0.1) !important; color: #2a2a24 !important; }
        .dropdown-item:hover         { background: rgba(138,154,74,0.12) !important; color: #3d4a1f !important; }
        .cta-btn:hover               { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(42,42,36,0.3) !important; }
        .phone-pill:hover            { background: rgba(138,154,74,0.2) !important; }
        .drawer-link-item:hover      { background: rgba(138,154,74,0.08); }
        .ham-btn:hover               { background: rgba(138,154,74,0.12) !important; }
        .close-btn:hover             { background: rgba(200,184,154,0.15) !important; }
        .topbar-link:hover           { color: #e8d9b5 !important; }
        .topbar-social:hover         { background: rgba(200,184,154,0.25) !important; border-color: rgba(200,184,154,0.4) !important; color: #e8d9b5 !important; }
        .drawer-contact-link:hover   { background: rgba(138,154,74,0.12) !important; color: #2a2a24 !important; }
        .drawer-social-icon:hover    { background: rgba(138,154,74,0.2) !important; color: #3a5a1a !important; }
        @media (max-width: 1024px) {
          .desktop-links    { display: none !important; }
          .phone-pill-xl    { display: none !important; }
          .cta-desktop      { display: none !important; }
          .hamburger-btn    { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .hamburger-btn    { display: none !important; }
        }
        @media (max-width: 640px) {
          .top-bar          { display: none !important; }
          .nav-inner        { padding: 0 16px !important; width: 100% !important; }
          .logo-sub         { letter-spacing: 0.4px !important; font-size: 8px !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; }
        }
      `}</style>

      <div style={s.wrapper}>

        {/* ── TOP BAR ── */}
        <div className="top-bar" style={s.topBar}>
          <div style={s.topBarLeft}>✦ Swapnatil Gharasathi Ek Samarpan</div>
          <div style={s.topBarRight}>

            {/* Phone — clickable */}
            <a href={PHONE_LINK} className="topbar-link" style={s.topBarLink}>
              📞 {PHONE}
            </a>

            {/* Email — opens Gmail / mail client */}
            <a href={EMAIL_LINK} className="topbar-link" style={s.topBarLink}>
              ✉ {EMAIL}
            </a>

            {/* Location */}
            <span style={{ ...s.topBarLink, cursor: "default" }}>📍 Nashik, India</span>

            {/* Social icons */}
            <div style={s.topBarSocials}>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="topbar-social" style={s.topBarSocialIcon} aria-label="Instagram">
                <IconInstagram />
              </a>
              <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="topbar-social" style={s.topBarSocialIcon} aria-label="Facebook">
                <IconFacebook />
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="topbar-social" style={s.topBarSocialIcon} aria-label="WhatsApp">
                <IconWhatsApp />
              </a>
            </div>

          </div>
        </div>

        {/* ACCENT LINE */}
        <div style={s.accentLine} />

        {/* ── MAIN NAV ── */}
        <nav style={s.nav}>
          <div className="nav-inner" style={s.navInner}>

            {/* LOGO */}
            <div style={s.logoWrap} onClick={() => navigate("/")}>
              <div style={s.logoIconWrap}>
                <img
                  src={logo}
                  alt="Samarpan Logo"
                  style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "10px" }}
                />
              </div>
              <div className="logo-text" style={s.logoText}>
                <span style={s.logoMain}>Samarpan Group</span>
                <span className="logo-sub" style={s.logoSub}>Swapnatil Gharasathi Ek Samarpan</span>
              </div>
            </div>

            {/* DESKTOP LINKS */}
            <ul className="desktop-links" style={s.desktopLinks}>
              {NAV_LINKS.map((link) => (
                <li
                  key={link.label}
                  style={s.navLinkWrap}
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="nav-link-item" style={s.navLink} onClick={() => handleNavClick(link)}>
                    {link.label}
                    {link.dropdown && <ChevronDown open={activeDropdown === link.label} />}
                  </button>

                  {link.dropdown && activeDropdown === link.label && (
                    <div style={s.dropdown}>
                      {link.dropdown.map((group) => (
                        <div key={group.title}>
                          <div style={s.dropdownGroupTitle}>{group.title}</div>
                          {group.items.map((item) => (
                            <a
                              key={item}
                              href="#"
                              className="dropdown-item"
                              style={s.dropdownItem}
                              onClick={(e) => { e.preventDefault(); setActiveDropdown(null); }}
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* RIGHT — phone pill + CTA */}
            <div style={s.navRight}>
              <a href={PHONE_LINK} className="phone-pill-xl phone-pill" style={s.phonePill}>
                <span>📞</span>
                <span>{PHONE}</span>
              </a>
              <button className="cta-desktop cta-btn" style={s.ctaBtn} onClick={() => navigate("/contact")}>
                Consultation →
              </button>
              <button
                className="hamburger-btn ham-btn" style={s.hamburger}
                onClick={() => setMobileOpen(true)} aria-label="Open menu"
              >
                <span style={s.hamLine} />
                <span style={{ ...s.hamLine, width: "13px", alignSelf: "flex-start" }} />
                <span style={s.hamLine} />
              </button>
            </div>
          </div>

          <div style={s.bottomAccent} />
        </nav>

        {/* OVERLAY */}
        <div style={s.overlay} onClick={() => setMobileOpen(false)} />

        {/* ── MOBILE DRAWER ── */}
        <div style={s.drawer}>
          <div style={s.drawerHeader}>
            <div>
              <div style={s.drawerLogo}>Samarpan Group</div>
              <div style={s.drawerSub}>Swapnatil Gharasathi Ek Samarpan</div>
            </div>
            <button className="close-btn" style={s.closeBtn} onClick={() => setMobileOpen(false)}>✕</button>
          </div>

          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              <div className="drawer-link-item" style={s.drawerLink} onClick={() => handleMobileNavClick(link)}>
                <span>{link.label}</span>
                {link.dropdown && <ChevronDown open={mobileExpanded === link.label} />}
              </div>
              {link.dropdown && mobileExpanded === link.label && (
                <div style={s.drawerAccordion}>
                  {link.dropdown.map((group) => (
                    <div key={group.title}>
                      <div style={s.drawerGroupTitle}>{group.title}</div>
                      {group.items.map((item) => (
                        <a
                          key={item}
                          href="#"
                          style={s.drawerAccordionItem}
                          onClick={(e) => { e.preventDefault(); setMobileOpen(false); }}
                        >
                          — {item}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div style={s.drawerFooter}>
            <button style={s.drawerCta} onClick={() => { setMobileOpen(false); navigate("/contact"); }}>
              Get Free Consultation →
            </button>

            {/* Clickable contact links in drawer */}
            <div style={s.drawerContactRow}>
              <a href={PHONE_LINK} className="drawer-contact-link" style={s.drawerContactLink}>
                📞 {PHONE}
              </a>
              <a href={EMAIL_LINK} className="drawer-contact-link" style={s.drawerContactLink}>
                ✉️ {EMAIL}
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="drawer-contact-link" style={s.drawerContactLink}>
                💬 WhatsApp Us
              </a>
            </div>

            {/* Social icons */}
            <div style={s.drawerSocials}>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="drawer-social-icon" style={s.drawerSocialIcon} aria-label="Instagram">
                <IconInstagram />
              </a>
              <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="drawer-social-icon" style={s.drawerSocialIcon} aria-label="Facebook">
                <IconFacebook />
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="drawer-social-icon" style={s.drawerSocialIcon} aria-label="WhatsApp">
                <IconWhatsApp />
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
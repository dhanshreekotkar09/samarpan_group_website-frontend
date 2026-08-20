import logo from "../assets/sg_logo.jpg";

const FooterLinks = {
  Services: {
    Civil: [
      "Structural Excellence",
      "Foundation to Finish",
      "Engineered with Precision",
      "Turnkey Construction",
    ],
    Interior: [
      "Bespoke Interiors",
      "Functional Elegance",
      "3D Visualized Design",
      "Crafted With Detail",
    ],
  },
  Portfolio: ["Residential", "Commercial", "Hospitality", "Office Spaces"],
  Company: ["About Us", "Our Process", "Meet The Team", "Careers", "Press & Media", "Contact Us"],
};

const SocialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/samarpan_group_interiors?igsh=dmlvb2R5YzRiNmhw",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1B978MBdLy/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/918055587237",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
];

const contactItems = [
  { icon: "📍", label: "Office", value: "Office No. 1, Deepjyot Apartment,\nHanumanwadi, Makhmalabad Road,\nPanchavati, Nashik – 422003" },
  { icon: "📞", label: "Phone", value: "+91 80555 87237", href: "tel:+918055587237" },
  { icon: "✉️", label: "Email", value: "thesamarpaninteriors@gmail.com", href: "https://mail.google.com/mail/?view=cm&to=thesamarpaninteriors@gmail.com" },
  { icon: "📸", label: "Instagram", value: "@Samarpan_Group_Interiors", href: "https://www.instagram.com/samarpan_group_interiors?igsh=dmlvb2R5YzRiNmhw" },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="#b8cc6a">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    label: "Facebook",
    value: "Samarpan Group Interiors",
    href: "https://www.facebook.com/share/1B978MBdLy/",
  },
  { icon: "🕐", label: "Hours", value: "Mon–Fri: 9am – 5pm\nSaturday: 9am – 3pm\nSunday: Closed" },
];

const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"];

export default function SamarpanFooter() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sg-footer {
          background: #3a4a20;
          font-family: var(--font-sans);
          color: #c8d898;
        }

        /* ── TOP BANNER ── */
        .sg-banner {
          background: linear-gradient(135deg, #46582a 0%, #3a4a20 50%, #46582a 100%);
          border-bottom: 1px solid rgba(184,204,106,0.2);
          padding: 48px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .sg-banner-text h2 {
          font-family: var(--font-sans);
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 400;
          color: #eef2e0;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }
        .sg-banner-text h2 em { font-style: normal; font-weight: 600; color: #c8dc80; }
        .sg-banner-text p { font-size: 13px; font-weight: 300; color: #a8bc78; letter-spacing: 0.3px; }
        .sg-banner-btn {
          padding: 14px 32px;
          background: linear-gradient(135deg, #7a9a3a, #92b048);
          color: #f0ede0;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 8px 24px rgba(122,154,58,0.35);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .sg-banner-btn:hover {
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          color: #2a2a1a;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(201,168,76,0.3);
        }

        /* ── MAIN GRID ── */
        .sg-main { max-width: 1320px; margin: 0 auto; padding: 64px 60px 0; }

        .sg-grid {
          display: grid;
          grid-template-columns: minmax(380px, 2.4fr) 1fr 1fr 1fr 1.3fr;
          gap: 48px;
          padding-bottom: 56px;
          border-bottom: 1px solid rgba(184,204,106,0.15);
        }

        /* ── BRAND COL ── */
        .sg-logo { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .sg-logo-icon {
          width: 56px; height: 56px;
          background: #ffffff;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow:
            0 0 0 1px rgba(184,204,106,0.3),
            0 4px 16px rgba(0,0,0,0.3),
            0 0 24px rgba(184,204,106,0.15);
          overflow: hidden;
        }
        .sg-logo-name {
          font-family: var(--font-sans);
          font-size: 22px;
          font-weight: 600;
          color: #eef2e0;
          display: block;
          letter-spacing: 0.3px;
        }
        .sg-logo-tagline {
          font-size: 9px;
          letter-spacing: 2px;
          color: #b8cc6a;
          text-transform: uppercase;
          display: block;
          margin-top: 3px;
        }
        .sg-desc {
          font-size: 12.5px;
          line-height: 1.9;
          color: #b0c488;
          font-weight: 300;
          margin-bottom: 24px;
          max-width: 420px;
        }
        .sg-badges {
          display: grid;
          grid-template-columns: max-content max-content;
          justify-content: start;
          gap: 8px 10px;
          margin-bottom: 28px;
        }
        .sg-badge {
          padding: 5px 12px;
          background: rgba(184,204,106,0.12);
          border: 1px solid rgba(184,204,106,0.28);
          border-radius: 20px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #b8cc6a;
          white-space: nowrap;
          width: fit-content;
        }
        .sg-socials { display: flex; gap: 10px; }
        .sg-social {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: rgba(184,204,106,0.12);
          border: 1px solid rgba(184,204,106,0.22);
          display: flex; align-items: center; justify-content: center;
          color: #a8bc78;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .sg-social:hover {
          background: rgba(184,204,106,0.25);
          color: #ddf0a0;
          border-color: rgba(184,204,106,0.5);
          transform: translateY(-2px);
        }

        /* ── LINK COLS ── */
        .sg-col-title {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #b8cc6a;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sg-col-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(184,204,106,0.25);
        }
        .sg-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .sg-link {
          font-size: 12.5px;
          font-weight: 300;
          color: #b8c890;
          text-decoration: none;
          transition: all 0.2s ease;
          display: inline-block;
          position: relative;
          padding-left: 0;
        }
        .sg-link:hover { color: #ddf0a0; padding-left: 10px; }
        .sg-link::before {
          content: '→';
          position: absolute;
          left: -2px;
          opacity: 0;
          font-size: 10px;
          transition: all 0.2s ease;
          color: #b8cc6a;
        }
        .sg-link:hover::before { opacity: 1; }
        .sg-service-group {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: #b8cc6a;
          margin: 4px 0 10px;
        }
        .sg-service-group:not(:first-child) { margin-top: 18px; }

        /* ── CONTACT COL ── */
        .sg-contacts { display: flex; flex-direction: column; gap: 16px; }
        .sg-contact-item { display: flex; align-items: flex-start; gap: 12px; }
        .sg-contact-icon {
          width: 30px; height: 30px;
          background: rgba(184,204,106,0.12);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .sg-contact-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: #b8cc6a;
          margin-bottom: 3px;
        }
        .sg-contact-value {
          font-size: 12px;
          font-weight: 300;
          color: #b8c890;
          line-height: 1.6;
          white-space: pre-line;
          text-decoration: none;
        }
        a.sg-contact-value:hover { color: #ddf0a0; }

        /* ── NEWSLETTER ── */
        .sg-newsletter {
          max-width: 1320px;
          margin: 0 auto;
          padding: 36px 60px;
          border-bottom: 1px solid rgba(184,204,106,0.12);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .sg-nl-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #b8cc6a;
          margin-bottom: 5px;
        }
        .sg-nl-desc { font-size: 12.5px; font-weight: 300; color: #a8bc78; }
        .sg-nl-form {
          display: flex;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(184,204,106,0.3);
          background: rgba(70,88,42,0.6);
          min-width: 0;
          width: 100%;
        }
        .sg-nl-input {
          flex: 1;
          padding: 13px 18px;
          font-size: 12.5px;
          font-weight: 300;
          background: transparent;
          border: none;
          outline: none;
          color: #ddf0a0;
          font-family: var(--font-sans);
        }
        .sg-nl-input::placeholder { color: #7a9060; }
        .sg-nl-btn {
          padding: 13px 22px;
          background: linear-gradient(135deg, #7a9a3a, #92b048);
          color: #f0ede0;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-sans);
          white-space: nowrap;
        }
        .sg-nl-btn:hover { background: linear-gradient(135deg, #c9a84c, #e8c97a); color: #2a2a1a; }

        /* ── BOTTOM BAR ── */
        .sg-bottom {
          max-width: 1320px;
          margin: 0 auto;
          padding: 24px 60px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .sg-copyright { font-size: 11.5px; font-weight: 300; color: #7a9060; }
        .sg-copyright span { color: #b8cc6a; }
        .sg-legal { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .sg-legal-link {
          font-size: 11px;
          font-weight: 300;
          color: #7a9060;
          text-decoration: none;
          padding: 2px 8px;
          transition: color 0.2s ease;
        }
        .sg-legal-link:hover { color: #b8cc6a; }
        .sg-legal-sep { width: 1px; height: 12px; background: rgba(184,204,106,0.2); }

        /* RESPONSIVE */
        @media (max-width: 1100px) {
          .sg-grid { grid-template-columns: 1fr 1fr 1fr; gap: 36px; }
          .sg-brand { grid-column: 1 / -1; }
          .sg-banner { padding: 40px 32px; }
          .sg-main { padding: 48px 32px 0; }
          .sg-newsletter { padding: 32px; }
          .sg-bottom { padding: 20px 32px 28px; }
        }
        @media (max-width: 700px) {
          .sg-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
          .sg-brand { grid-column: 1 / -1; }
          .sg-banner { padding: 32px 20px; }
          .sg-main { padding: 40px 20px 0; }
          .sg-newsletter { padding: 28px 20px; flex-direction: column; }
          .sg-nl-form { min-width: unset; width: 100%; }
          .sg-bottom { padding: 20px 20px 28px; flex-direction: column; text-align: center; }
          .sg-legal { justify-content: center; }
        }
        @media (max-width: 420px) {
          .sg-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <footer className="sg-footer">

        {/* ── MAIN CONTENT ── */}
        <div className="sg-main">
          <div className="sg-grid">

            {/* BRAND */}
            <div className="sg-brand">
              <div className="sg-logo">
                <div className="sg-logo-icon">
                  <img
                    src={logo}
                    alt="Samarpan Group Logo"
                    style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "12px" }}
                  />
                </div>
                <div>
                  <span className="sg-logo-name">Samarpan Group</span>
                  <span className="sg-logo-tagline">Swapnatil Gharasathi Ek Samarpan</span>
                </div>
              </div>

              <p className="sg-desc">
                True to our name, Samarpan is our commitment to your dream space —
                transforming every corner through thoughtful engineering and elegant interior design.
              </p>

              <div className="sg-badges">
                {["Trusted Since 2016", "End to End Solutions", "Civil & Interior Experts", "Samarpan Assured Quality", "Nashik's Finest"].map((b) => (
                  <span key={b} className="sg-badge">✦ {b}</span>
                ))}
              </div>

              <div className="sg-socials">
                {SocialLinks.map((s) => (
                  <a key={s.name} href={s.href} className="sg-social" aria-label={s.name} target="_blank" rel="noopener noreferrer">{s.icon}</a>
                ))}
              </div>
            </div>

            {/* LINK COLUMNS */}
            {Object.entries(FooterLinks).map(([title, links]) => (
              <div key={title}>
                <div className="sg-col-title">{title}</div>
                {Array.isArray(links) ? (
                  <ul className="sg-links">
                    {links.map((link) => (
                      <li key={link}>
                        <a href="#" className="sg-link">{link}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  Object.entries(links).map(([group, items]) => (
                    <div key={group}>
                      <p className="sg-service-group">{group}</p>
                      <ul className="sg-links">
                        {items.map((link) => (
                          <li key={link}>
                            <a href="#" className="sg-link">{link}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            ))}

            {/* CONTACT */}
            <div className="sg-contact-col">
              <div className="sg-col-title">Get In Touch</div>
              <div className="sg-contacts">
                {contactItems.map((item) => (
                  <div key={item.label} className="sg-contact-item">
                    <div className="sg-contact-icon">{item.icon}</div>
                    <div>
                      <p className="sg-contact-label">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="sg-contact-value" target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{item.value}</a>
                      ) : (
                        <p className="sg-contact-value">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── NEWSLETTER ── */}
        <div className="sg-newsletter">
          <div>
            <p className="sg-nl-label">✦ Newsletter</p>
            <p className="sg-nl-desc">Design tips, trends & project reveals — straight to your inbox.</p>
          </div>
          <div className="sg-nl-form">
            <input className="sg-nl-input" type="email" placeholder="your@email.com" />
            <button className="sg-nl-btn">Subscribe →</button>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="sg-bottom">
          <p className="sg-copyright">
            © 2026 Samarpan Group. All rights reserved. Crafted with <span>♥</span> in Nashik.
          </p>
          <div className="sg-legal">
            {legalLinks.map((item, i) => (
              <span key={item} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <a href="#" className="sg-legal-link">{item}</a>
                {i < legalLinks.length - 1 && <span className="sg-legal-sep" />}
              </span>
            ))}
          </div>
        </div>

      </footer>
    </>
  );
}
import { useNavigate } from "react-router-dom";
import logo from "../assets/sg_logo.jpg";

const CompanyLinks = [
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

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
  {
    icon: "📍",
    label: "Office",
    value: "Office No. 1, Deepjyot Apartment, Hanumanwadi, Makhmalabad Road, Panchavati, Nashik – 422003",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+91 80555 87237",
    href: "tel:+918055587237",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "thesamarpaninteriors@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&to=thesamarpaninteriors@gmail.com",
  },
  {
    icon: "📸",
    label: "Instagram",
    value: "@Samarpan_Group_Interiors",
    href: "https://www.instagram.com/samarpan_group_interiors?igsh=dmlvb2R5YzRiNmhw",
  },
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
  {
    icon: "🕐",
    label: "Hours",
    value: "Mon–Fri: 9am – 5pm | Sat: 9am – 3pm",
  },
];

const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"];

export default function SamarpanFooter() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sg-footer {
          background: linear-gradient(180deg, #35441d 0%, #293516 100%);
          font-family: var(--font-sans);
          color: #c8d898;
          border-top: 1px solid rgba(184,204,106,0.22);
          position: relative;
        }

        .sg-footer::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(184,204,106,0.6) 50%, transparent 100%);
        }

        /* ── MAIN CONTENT ── */
        .sg-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 40px 48px;
        }

        .sg-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.9fr 1.6fr;
          gap: 60px;
          align-items: start;
        }

        /* ── BRAND COL (Same Logo as Header) ── */
        .sg-logo-wrap {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
          cursor: pointer;
          margin-bottom: 20px;
        }

        .sg-logo-icon {
          width: 52px;
          height: 52px;
          background: #ffffff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 3px;
          box-shadow:
            0 0 0 1px rgba(184,204,106,0.35),
            0 6px 18px rgba(0,0,0,0.3);
          overflow: hidden;
        }

        .sg-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }

        .sg-logo-main {
          font-family: var(--font-sans);
          font-size: 21px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.3px;
        }

        .sg-logo-sub {
          font-size: 9px;
          letter-spacing: 1.8px;
          color: #b8cc6a;
          text-transform: uppercase;
          margin-top: 4px;
        }

        .sg-socials {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .sg-social {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(184,204,106,0.12);
          border: 1px solid rgba(184,204,106,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b8cc6a;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .sg-social:hover {
          background: rgba(184,204,106,0.25);
          color: #ffffff;
          border-color: rgba(184,204,106,0.6);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        }

        /* ── SECTION TITLE ── */
        .sg-col-title {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #c8dc80;
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sg-col-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(184,204,106,0.22);
        }

        /* ── COMPANY LINKS ── */
        .sg-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .sg-link-btn {
          font-size: 14px;
          font-weight: 400;
          color: #b8c890;
          text-decoration: none;
          transition: all 0.22s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          background: none;
          border: none;
          text-align: left;
          font-family: var(--font-sans);
          padding: 0;
        }

        .sg-link-btn::before {
          content: '→';
          font-size: 12px;
          color: #b8cc6a;
          opacity: 0.6;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .sg-link-btn:hover {
          color: #ffffff;
        }

        .sg-link-btn:hover::before {
          opacity: 1;
          transform: translateX(4px);
        }

        /* ── CONTACT ITEMS ── */
        .sg-contacts {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sg-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .sg-contact-icon {
          width: 30px;
          height: 30px;
          background: rgba(184,204,106,0.12);
          border: 1px solid rgba(184,204,106,0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .sg-contact-body {
          display: flex;
          flex-direction: column;
        }

        .sg-contact-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: #c8dc80;
          margin-bottom: 3px;
        }

        .sg-contact-value {
          font-size: 12.5px;
          font-weight: 300;
          color: #d0deaa;
          line-height: 1.6;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        a.sg-contact-value:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        /* ── BOTTOM BAR ── */
        .sg-bottom {
          border-top: 1px solid rgba(184,204,106,0.14);
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 40px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .sg-copyright {
          font-size: 12px;
          font-weight: 300;
          color: #8a9a68;
        }

        .sg-copyright span {
          color: #c8dc80;
        }

        .sg-legal {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .sg-legal-link {
          font-size: 11.5px;
          font-weight: 300;
          color: #8a9a68;
          text-decoration: none;
          padding: 2px 6px;
          transition: color 0.2s ease;
        }

        .sg-legal-link:hover {
          color: #c8dc80;
        }

        .sg-legal-sep {
          width: 1px;
          height: 11px;
          background: rgba(184,204,106,0.22);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .sg-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          .sg-brand {
            grid-column: 1 / -1;
          }
          .sg-main {
            padding: 48px 28px 36px;
          }
          .sg-bottom {
            padding: 20px 28px 28px;
          }
        }

        @media (max-width: 640px) {
          .sg-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .sg-main {
            padding: 40px 20px 32px;
          }
          .sg-bottom {
            padding: 20px 20px 28px;
            flex-direction: column;
            text-align: center;
          }
          .sg-legal {
            justify-content: center;
          }
        }
      `}</style>

      <footer className="sg-footer">
        <div className="sg-main">
          <div className="sg-grid">

            {/* BRAND COL (Same Logo as Header) */}
            <div className="sg-brand">
              <div
                className="sg-logo-wrap"
                onClick={() => {
                  navigate("/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div className="sg-logo-icon">
                  <img
                    src={logo}
                    alt="Samarpan Logo"
                    style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "10px" }}
                  />
                </div>
                <div className="sg-logo-text">
                  <span className="sg-logo-main">Samarpan Group</span>
                  <span className="sg-logo-sub">Swapnatil Gharasathi Ek Samarpan</span>
                </div>
              </div>

              <div className="sg-socials">
                {SocialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    className="sg-social"
                    aria-label={s.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* COMPANY COL */}
            <div className="sg-company">
              <div className="sg-col-title">Company</div>
              <ul className="sg-links">
                {CompanyLinks.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      className="sg-link-btn"
                      onClick={() => {
                        navigate(item.path);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* GET IN TOUCH COL */}
            <div className="sg-contact">
              <div className="sg-col-title">Get In Touch</div>
              <div className="sg-contacts">
                {contactItems.map((item) => (
                  <div key={item.label} className="sg-contact-item">
                    <div className="sg-contact-icon">{item.icon}</div>
                    <div className="sg-contact-body">
                      <span className="sg-contact-label">{item.label}</span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="sg-contact-value"
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="sg-contact-value">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM BAR */}
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
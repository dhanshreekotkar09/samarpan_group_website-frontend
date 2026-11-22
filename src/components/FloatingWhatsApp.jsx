import { useEffect, useState } from "react";
import { getSettings } from "../api/client";

export default function FloatingWhatsApp() {
  const [phone, setPhone] = useState("+91 80555 87237");
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    getSettings()
      .then((res) => {
        if (res.data?.whatsapp) {
          setPhone(res.data.whatsapp);
        } else if (res.data?.phone) {
          setPhone(res.data.phone);
        }
      })
      .catch(() => {
        // Fallback default
      });

    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const cleanPhone = phone ? phone.replace(/\D/g, "") : "918055587237";
  const waNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const message = encodeURIComponent(
    "Hello Samarpan Group, I visited your website and would like to inquire about interior & civil consultation."
  );
  const waUrl = `https://wa.me/${waNumber}?text=${message}`;

  return (
    <div className="wa-floating-container">
      <style>{`
        .wa-floating-container {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-direction: row-reverse;
          pointer-events: none;
        }

        .wa-floating-btn {
          pointer-events: auto;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #25d366;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4), 0 4px 12px rgba(0, 0, 0, 0.12);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }

        .wa-floating-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 30px rgba(37, 211, 102, 0.5), 0 6px 16px rgba(0, 0, 0, 0.18);
        }

        .wa-floating-btn::before {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid #25d366;
          opacity: 0.6;
          animation: wa-pulse 2s infinite ease-out;
          pointer-events: none;
        }

        @keyframes wa-pulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.22);
            opacity: 0;
          }
          100% {
            transform: scale(1.22);
            opacity: 0;
          }
        }

        .wa-badge-tooltip {
          pointer-events: auto;
          background: #2a3a14;
          color: #f5f0e8;
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 12.5px;
          font-weight: 500;
          font-family: var(--font-sans);
          box-shadow: 0 4px 18px rgba(0,0,0,0.18);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
          border: 1px solid rgba(138, 154, 74, 0.3);
        }

        .wa-badge-tooltip span.dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ade80;
          display: inline-block;
          animation: blink 1.4s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @media (max-width: 600px) {
          .wa-floating-container {
            bottom: 20px;
            right: 20px;
          }
          .wa-floating-btn {
            width: 52px;
            height: 52px;
          }
          .wa-badge-tooltip {
            display: none;
          }
        }
      `}</style>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-floating-btn"
        aria-label="Chat with Samarpan Group on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.97.57 3.81 1.56 5.37L2 22l4.77-1.53A9.957 9.957 0 0012.004 22c5.523 0 10-4.48 10-10s-4.477-10-10-10zm5.83 14.15c-.24.68-1.2 1.3-1.68 1.38-.45.08-1.04.11-3.37-.86-2.54-1.06-4.17-3.66-4.3-3.83-.12-.17-1.04-1.39-1.04-2.65 0-1.26.66-1.88.89-2.14.24-.26.52-.33.7-.33.17 0 .35 0 .5.01.16.01.38-.06.59.45.23.55.78 1.9.85 2.04.07.15.11.32.02.51-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.31.31-.13.62.17.31.78 1.28 1.67 2.07 1.15 1.02 2.12 1.34 2.42 1.49.3.15.48.13.66-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.15.29.11 1.83.86 2.14 1.02.32.15.53.23.61.36.08.13.08.76-.16 1.44z" />
        </svg>
      </a>

      {showTooltip && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-badge-tooltip"
          style={{ textDecoration: "none" }}
        >
          <span className="dot"></span>
          <span>Chat with Samarpan Team</span>
        </a>
      )}
    </div>
  );
}

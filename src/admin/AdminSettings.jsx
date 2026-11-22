import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../api/client";

export default function AdminSettings() {
  const [form, setForm] = useState({
    companyName: "Samarpan Group",
    tagline: "Civil & Interior Solutions",
    phone: "+91 80555 87237",
    whatsapp: "+91 80555 87237",
    email: "thesamarpaninteriors@gmail.com",
    instagram: "https://www.instagram.com/samarpan_group_interiors?igsh=dmlvb2R5YzRiNmhw",
    facebook: "https://www.facebook.com/share/1B978MBdLy/",
    officeAddress:
      "Office No. 1, Deepjyot Apartment, Hanumanwadi, Makhmalabad Road, Panchavati, Nashik – 422003",
    officeHoursMonFri: "Mon–Fri: 9am – 5pm",
    officeHoursSat: "Saturday: 9am – 3pm",
    officeHoursSun: "Sunday: Closed",
    googleMapsLink:
      "https://www.google.com/maps/dir/?api=1&destination=Office+No+1+Deepjyot+Apartment+Hanumanwadi+Makhmalabad+Road+Panchavati+Nashik+422003",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await getSettings();
      if (res.data) {
        setForm((prev) => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await updateSettings(form);
      if (res.data) {
        setForm((prev) => ({ ...prev, ...res.data }));
      }
      setMessage({ type: "success", text: "Website settings saved successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 4000);
    } catch (err) {
      setMessage({
        type: "error",
        text: "Failed to save settings: " + (err.response?.data?.error || err.message),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="adm-settings-page">
      <style>{`
        .adm-settings-page {
          padding: 32px 40px;
          max-width: 1000px;
          margin: 0 auto;
          font-family: var(--font-sans);
          color: #2a2a24;
        }

        .adm-settings-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .adm-settings-header h1 {
          font-size: 24px;
          font-weight: 600;
          color: #2a3a14;
        }

        .adm-settings-header p {
          font-size: 13px;
          color: #6a6a55;
          margin-top: 4px;
        }

        .adm-settings-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .adm-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 24px 28px;
          border: 1px solid rgba(138,154,74,0.2);
          box-shadow: 0 4px 16px rgba(42,42,36,0.03);
        }

        .adm-card-title {
          font-size: 16px;
          font-weight: 600;
          color: #2a3a14;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .adm-card-desc {
          font-size: 12.5px;
          color: #7a7a65;
          margin-bottom: 20px;
        }

        .adm-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .adm-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 18px;
        }

        .adm-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .adm-field label {
          font-size: 12px;
          font-weight: 600;
          color: #4a4a3a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .adm-field input, .adm-field textarea {
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid rgba(138,154,74,0.25);
          font-size: 13.5px;
          outline: none;
          background: #faf8f2;
          font-family: inherit;
          color: #2a2a24;
          transition: border-color 0.2s;
        }

        .adm-field input:focus, .adm-field textarea:focus {
          border-color: #8a9a4a;
          background: #ffffff;
        }

        .adm-alert {
          padding: 12px 18px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 500;
        }

        .adm-alert.success {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #86efac;
        }

        .adm-alert.error {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        }

        .adm-actions-sticky {
          position: sticky;
          bottom: 20px;
          background: #ffffff;
          border-radius: 16px;
          padding: 16px 24px;
          border: 1px solid rgba(138,154,74,0.25);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
        }

        .adm-save-btn {
          background: #2a3a14;
          color: #f5f0e8;
          border: none;
          padding: 12px 28px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.5px;
          transition: all 0.2s;
        }

        .adm-save-btn:hover:not(:disabled) {
          background: #3d5018;
          transform: translateY(-1px);
        }

        .adm-save-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .adm-settings-page { padding: 20px 16px; }
          .adm-grid-2, .adm-grid-3 { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="adm-settings-header">
        <div>
          <h1>Website Settings & Business Info</h1>
          <p>Update contact information, office address, opening hours, and social media links.</p>
        </div>
        <button
          type="button"
          onClick={loadSettings}
          style={{
            padding: "8px 16px",
            background: "#ffffff",
            border: "1px solid rgba(138,154,74,0.3)",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "12px",
            color: "#2a3a14",
          }}
        >
          🔄 Reload
        </button>
      </div>

      {message.text && (
        <div style={{ marginBottom: 20 }} className={`adm-alert ${message.type}`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "#6a6a55" }}>Loading settings...</div>
      ) : (
        <form className="adm-settings-form" onSubmit={handleSubmit}>
          {/* General & Contact */}
          <div className="adm-card">
            <h3 className="adm-card-title">📞 Contact & Identity</h3>
            <p className="adm-card-desc">
              These details appear across the website header, contact page, floating actions, and footer.
            </p>
            <div className="adm-grid-2" style={{ marginBottom: 18 }}>
              <div className="adm-field">
                <label>Company / Brand Name</label>
                <input
                  name="companyName"
                  value={form.companyName || ""}
                  onChange={handleChange}
                  placeholder="e.g. Samarpan Group"
                />
              </div>
              <div className="adm-field">
                <label>Tagline</label>
                <input
                  name="tagline"
                  value={form.tagline || ""}
                  onChange={handleChange}
                  placeholder="e.g. Civil & Interior Solutions"
                />
              </div>
            </div>

            <div className="adm-grid-3">
              <div className="adm-field">
                <label>Phone Number</label>
                <input
                  name="phone"
                  value={form.phone || ""}
                  onChange={handleChange}
                  placeholder="+91 80555 87237"
                />
              </div>
              <div className="adm-field">
                <label>WhatsApp Number</label>
                <input
                  name="whatsapp"
                  value={form.whatsapp || ""}
                  onChange={handleChange}
                  placeholder="+91 80555 87237"
                />
              </div>
              <div className="adm-field">
                <label>Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={form.email || ""}
                  onChange={handleChange}
                  placeholder="thesamarpaninteriors@gmail.com"
                />
              </div>
            </div>
          </div>

          {/* Office Address & Map */}
          <div className="adm-card">
            <h3 className="adm-card-title">📍 Office Address & Google Map</h3>
            <p className="adm-card-desc">
              Your physical Nashik office location displayed on the contact card and map link.
            </p>
            <div className="adm-field" style={{ marginBottom: 18 }}>
              <label>Complete Office Address</label>
              <textarea
                name="officeAddress"
                rows={2}
                value={form.officeAddress || ""}
                onChange={handleChange}
                placeholder="Office No. 1, Deepjyot Apartment..."
              />
            </div>
            <div className="adm-field">
              <label>Google Maps Directions URL</label>
              <input
                name="googleMapsLink"
                value={form.googleMapsLink || ""}
                onChange={handleChange}
                placeholder="https://www.google.com/maps/dir/?api=1&destination=..."
              />
            </div>
          </div>

          {/* Office Hours */}
          <div className="adm-card">
            <h3 className="adm-card-title">⏰ Office Working Timings</h3>
            <p className="adm-card-desc">
              Office visiting and phone consultation hours shown in the contact section.
            </p>
            <div className="adm-grid-3">
              <div className="adm-field">
                <label>Monday – Friday</label>
                <input
                  name="officeHoursMonFri"
                  value={form.officeHoursMonFri || ""}
                  onChange={handleChange}
                  placeholder="Mon–Fri: 9am – 5pm"
                />
              </div>
              <div className="adm-field">
                <label>Saturday</label>
                <input
                  name="officeHoursSat"
                  value={form.officeHoursSat || ""}
                  onChange={handleChange}
                  placeholder="Saturday: 9am – 3pm"
                />
              </div>
              <div className="adm-field">
                <label>Sunday</label>
                <input
                  name="officeHoursSun"
                  value={form.officeHoursSun || ""}
                  onChange={handleChange}
                  placeholder="Sunday: Closed"
                />
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="adm-card">
            <h3 className="adm-card-title">🌐 Social Media Links</h3>
            <p className="adm-card-desc">
              Direct URLs to your Instagram and Facebook profiles.
            </p>
            <div className="adm-grid-2">
              <div className="adm-field">
                <label>Instagram URL</label>
                <input
                  name="instagram"
                  value={form.instagram || ""}
                  onChange={handleChange}
                  placeholder="https://www.instagram.com/..."
                />
              </div>
              <div className="adm-field">
                <label>Facebook URL</label>
                <input
                  name="facebook"
                  value={form.facebook || ""}
                  onChange={handleChange}
                  placeholder="https://www.facebook.com/..."
                />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="adm-actions-sticky">
            <span style={{ fontSize: 13, color: "#6a6a55" }}>
              Changes will update live across the website.
            </span>
            <button type="submit" className="adm-save-btn" disabled={saving}>
              {saving ? "Saving Changes..." : "Save Settings"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

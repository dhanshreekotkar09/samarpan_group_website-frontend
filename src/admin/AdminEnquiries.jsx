import { useEffect, useState } from "react";
import { getEnquiries, updateEnquiry, deleteEnquiry } from "../api/client";

const STATUS_CONFIG = {
  new: { label: "New Lead", bg: "rgba(138,154,74,0.18)", color: "#2a3a14", border: "#8a9a4a" },
  contacted: { label: "Contacted", bg: "#fef3c7", color: "#92400e", border: "#f59e0b" },
  site_visit: { label: "Site Visit", bg: "#ede9fe", color: "#5b21b6", border: "#8b5cf6" },
  converted: { label: "Converted / Won", bg: "#dcfce7", color: "#166534", border: "#22c55e" },
  closed: { label: "Closed", bg: "#f1f5f9", color: "#475569", border: "#94a3b8" },
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, converted: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [editingNotes, setEditingNotes] = useState({});

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await getEnquiries({ status: activeTab, search: search.trim() });
      if (res.data) {
        setEnquiries(res.data.enquiries || []);
        if (res.data.stats) setStats(res.data.stats);
      }
    } catch (err) {
      console.error("Failed to load enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [activeTab]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await updateEnquiry(id, { status: newStatus });
      setEnquiries((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
      if (activeTab !== "all" && activeTab !== newStatus) {
        setEnquiries((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      alert("Failed to update status: " + (err.response?.data?.error || err.message));
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async (id) => {
    const noteText = editingNotes[id];
    if (noteText === undefined) return;
    setUpdatingId(id);
    try {
      await updateEnquiry(id, { notes: noteText });
      setEnquiries((prev) =>
        prev.map((item) => (item._id === id ? { ...item, notes: noteText } : item))
      );
      alert("Note saved successfully!");
    } catch (err) {
      alert("Failed to save note: " + (err.response?.data?.error || err.message));
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the enquiry from "${name}"?`)) return;
    try {
      await deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert("Failed to delete enquiry: " + (err.response?.data?.error || err.message));
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="adm-enq-page">
      <style>{`
        .adm-enq-page {
          padding: 32px 40px;
          max-width: 1300px;
          margin: 0 auto;
          font-family: var(--font-sans);
          color: #2a2a24;
        }

        .adm-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .adm-header h1 {
          font-size: 24px;
          font-weight: 600;
          color: #2a3a14;
        }

        .adm-header p {
          font-size: 13px;
          color: #6a6a55;
          margin-top: 4px;
        }

        /* ── STATS ROW ── */
        .adm-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        .adm-stat-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 20px 22px;
          border: 1px solid rgba(138,154,74,0.2);
          box-shadow: 0 4px 16px rgba(42,42,36,0.03);
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .adm-stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .adm-stat-info h4 {
          font-size: 22px;
          font-weight: 700;
          color: #2a2a24;
          line-height: 1.1;
        }

        .adm-stat-info span {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #7a7a65;
        }

        /* ── FILTER & SEARCH BAR ── */
        .adm-controls {
          background: #ffffff;
          border-radius: 16px;
          padding: 16px 20px;
          border: 1px solid rgba(138,154,74,0.2);
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .adm-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .adm-tab-btn {
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid rgba(138,154,74,0.2);
          background: #faf8f2;
          color: #555545;
          transition: all 0.2s ease;
        }

        .adm-tab-btn.active {
          background: #2a3a14;
          color: #f5f0e8;
          border-color: #2a3a14;
        }

        .adm-search-form {
          display: flex;
          gap: 8px;
        }

        .adm-search-input {
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid rgba(138,154,74,0.25);
          font-size: 13px;
          outline: none;
          min-width: 220px;
          font-family: inherit;
        }

        .adm-search-input:focus {
          border-color: #8a9a4a;
        }

        .adm-search-btn {
          padding: 8px 14px;
          background: #2a3a14;
          color: #fff;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
        }

        /* ── ENQUIRIES LIST ── */
        .adm-enq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .adm-enq-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 22px 26px;
          border: 1px solid rgba(138,154,74,0.2);
          box-shadow: 0 4px 16px rgba(42,42,36,0.03);
          transition: all 0.2s ease;
        }

        .adm-enq-card:hover {
          box-shadow: 0 8px 24px rgba(42,42,36,0.06);
          border-color: #8a9a4a;
        }

        .adm-enq-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .adm-enq-client h3 {
          font-size: 17px;
          font-weight: 600;
          color: #2a2a24;
          margin-bottom: 4px;
        }

        .adm-enq-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 13px;
          color: #6a6a55;
          flex-wrap: wrap;
        }

        .adm-enq-service-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 8px;
          background: rgba(138,154,74,0.12);
          color: #3d5018;
          border: 1px solid rgba(138,154,74,0.25);
        }

        .adm-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 12px;
          border: 1px solid;
        }

        .adm-status-select {
          padding: 5px 10px;
          border-radius: 8px;
          border: 1px solid rgba(138,154,74,0.3);
          font-size: 12px;
          font-weight: 600;
          background: #faf8f2;
          cursor: pointer;
          outline: none;
          font-family: inherit;
        }

        .adm-enq-message {
          background: #faf8f2;
          border-radius: 12px;
          padding: 14px 18px;
          font-size: 13.5px;
          line-height: 1.6;
          color: #4a4a3a;
          margin-bottom: 16px;
          border-left: 3px solid #8a9a4a;
        }

        .adm-enq-actions-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding-top: 14px;
          border-top: 1px solid rgba(138,154,74,0.14);
        }

        .adm-quick-links {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .adm-act-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .adm-btn-wa {
          background: #25d366;
          color: #ffffff;
          border: none;
        }

        .adm-btn-wa:hover {
          background: #20ba59;
          transform: translateY(-1px);
        }

        .adm-btn-call {
          background: #2a3a14;
          color: #f5f0e8;
          border: none;
        }

        .adm-btn-call:hover {
          background: #3d5018;
          transform: translateY(-1px);
        }

        .adm-btn-del {
          background: none;
          border: 1px solid rgba(220,38,38,0.3);
          color: #dc2626;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 11px;
          cursor: pointer;
        }

        .adm-btn-del:hover {
          background: #dc2626;
          color: #ffffff;
        }

        /* ── NOTES SECTION ── */
        .adm-notes-box {
          margin-top: 12px;
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .adm-notes-input {
          flex: 1;
          padding: 7px 12px;
          border-radius: 8px;
          border: 1px solid rgba(138,154,74,0.22);
          font-size: 12px;
          background: #faf8f2;
          outline: none;
          font-family: inherit;
        }

        .adm-notes-btn {
          padding: 7px 14px;
          border-radius: 8px;
          border: 1px solid #8a9a4a;
          background: rgba(138,154,74,0.12);
          color: #2a3a14;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }

        .adm-notes-btn:hover {
          background: #2a3a14;
          color: #ffffff;
        }

        .adm-empty {
          background: #ffffff;
          border-radius: 18px;
          padding: 60px 20px;
          text-align: center;
          color: #7a7a60;
          border: 1px dashed rgba(138,154,74,0.3);
        }

        @media (max-width: 900px) {
          .adm-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .adm-enq-page {
            padding: 20px 16px;
          }
          .adm-stats-grid {
            grid-template-columns: 1fr;
          }
          .adm-controls {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>

      {/* HEADER */}
      <div className="adm-header">
        <div>
          <h1>Client Enquiries & Consultation Leads</h1>
          <p>View and manage all customer inquiries received from the website contact form.</p>
        </div>
        <button
          onClick={fetchLeads}
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
          🔄 Refresh
        </button>
      </div>

      {/* STATS ROW */}
      <div className="adm-stats-grid">
        <div className="adm-stat-card">
          <div className="adm-stat-icon" style={{ background: "rgba(138,154,74,0.12)", color: "#2a3a14" }}>
            📋
          </div>
          <div className="adm-stat-info">
            <h4>{stats.total}</h4>
            <span>Total Enquiries</span>
          </div>
        </div>

        <div className="adm-stat-card">
          <div className="adm-stat-icon" style={{ background: "#dcfce7", color: "#166534" }}>
            ✨
          </div>
          <div className="adm-stat-info">
            <h4 style={{ color: "#166534" }}>{stats.new}</h4>
            <span>New Leads</span>
          </div>
        </div>

        <div className="adm-stat-card">
          <div className="adm-stat-icon" style={{ background: "#fef3c7", color: "#92400e" }}>
            📞
          </div>
          <div className="adm-stat-info">
            <h4>{stats.contacted}</h4>
            <span>Contacted</span>
          </div>
        </div>

        <div className="adm-stat-card">
          <div className="adm-stat-icon" style={{ background: "#ede9fe", color: "#5b21b6" }}>
            🏆
          </div>
          <div className="adm-stat-info">
            <h4>{stats.converted}</h4>
            <span>Converted / Won</span>
          </div>
        </div>
      </div>

      {/* CONTROLS (TABS & SEARCH) */}
      <div className="adm-controls">
        <div className="adm-tabs">
          {[
            { id: "all", label: "All" },
            { id: "new", label: `New (${stats.new})` },
            { id: "contacted", label: "Contacted" },
            { id: "site_visit", label: "Site Visit" },
            { id: "converted", label: "Converted" },
            { id: "closed", label: "Closed" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`adm-tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form className="adm-search-form" onSubmit={handleSearchSubmit}>
          <input
            className="adm-search-input"
            placeholder="Search name, phone, service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="adm-search-btn">
            Search
          </button>
        </form>
      </div>

      {/* LEADS LIST */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "#6a6a55" }}>Loading enquiries...</div>
      ) : enquiries.length === 0 ? (
        <div className="adm-empty">
          <div style={{ fontSize: 36, marginBottom: 12 }}>📬</div>
          <h3 style={{ fontSize: 18, marginBottom: 6 }}>No enquiries found</h3>
          <p style={{ fontSize: 13 }}>
            {activeTab !== "all"
              ? `There are currently no enquiries marked as "${activeTab}".`
              : "When customers submit the consultation form on the website, they will appear here."}
          </p>
        </div>
      ) : (
        <div className="adm-enq-list">
          {enquiries.map((lead) => {
            const rawPhone = lead.phone ? lead.phone.replace(/\D/g, "") : "";
            const waPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
            const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
              `Hello ${lead.name}, this is Samarpan Group Nashik regarding your consultation enquiry for ${lead.service || "interior/civil"}.`
            )}`;
            const currentNote =
              editingNotes[lead._id] !== undefined ? editingNotes[lead._id] : lead.notes || "";
            const statusStyle = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;

            return (
              <div key={lead._id} className="adm-enq-card">
                <div className="adm-enq-top">
                  <div className="adm-enq-client">
                    <h3>{lead.name}</h3>
                    <div className="adm-enq-meta">
                      <span>📞 {lead.phone}</span>
                      {lead.email && <span>✉️ {lead.email}</span>}
                      <span className="adm-enq-service-badge">{lead.service}</span>
                      <span>🕒 {formatDate(lead.createdAt)}</span>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      className="adm-status-badge"
                      style={{
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        borderColor: statusStyle.border,
                      }}
                    >
                      ● {statusStyle.label}
                    </span>
                    <select
                      className="adm-status-select"
                      value={lead.status}
                      disabled={updatingId === lead._id}
                      onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                    >
                      <option value="new">Mark New</option>
                      <option value="contacted">Mark Contacted</option>
                      <option value="site_visit">Mark Site Visit</option>
                      <option value="converted">Mark Converted</option>
                      <option value="closed">Mark Closed</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                {lead.message && (
                  <div className="adm-enq-message">
                    <strong>Project Requirements:</strong> {lead.message}
                  </div>
                )}

                {/* Internal Notes */}
                <div className="adm-notes-box">
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#7a7a65", textTransform: "uppercase" }}>
                    Internal Note:
                  </span>
                  <input
                    className="adm-notes-input"
                    placeholder="Add private note (e.g. Budget 15L, visit scheduled on Sunday)..."
                    value={currentNote}
                    onChange={(e) =>
                      setEditingNotes({ ...editingNotes, [lead._id]: e.target.value })
                    }
                  />
                  {currentNote !== (lead.notes || "") && (
                    <button
                      type="button"
                      className="adm-notes-btn"
                      onClick={() => handleSaveNotes(lead._id)}
                    >
                      Save Note
                    </button>
                  )}
                </div>

                {/* Quick Action Buttons */}
                <div className="adm-enq-actions-row">
                  <div className="adm-quick-links">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="adm-act-btn adm-btn-wa"
                    >
                      <span>💬 Chat on WhatsApp</span>
                    </a>

                    <a href={`tel:${lead.phone}`} className="adm-act-btn adm-btn-call">
                      <span>📞 Call Client</span>
                    </a>

                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}?subject=Samarpan%20Group%20Consultation`}
                        className="adm-act-btn"
                        style={{
                          background: "#faf8f2",
                          color: "#3d3d30",
                          border: "1px solid rgba(138,154,74,0.3)",
                        }}
                      >
                        <span>✉️ Email</span>
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    className="adm-btn-del"
                    onClick={() => handleDelete(lead._id, lead.name)}
                  >
                    Delete Lead
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

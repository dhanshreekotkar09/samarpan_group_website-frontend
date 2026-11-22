import { useEffect, useState } from "react";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../api/client";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const initialForm = {
    clientName: "",
    location: "Nashik",
    projectType: "Residential Interior",
    rating: 5,
    comment: "",
    isFeatured: true,
    order: 0,
  };

  const [form, setForm] = useState(initialForm);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await getTestimonials({ all: "true" });
      if (res.data) {
        setTestimonials(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openNewModal = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (t) => {
    setForm({
      clientName: t.clientName || "",
      location: t.location || "",
      projectType: t.projectType || "",
      rating: t.rating || 5,
      comment: t.comment || "",
      isFeatured: t.isFeatured !== undefined ? t.isFeatured : true,
      order: t.order || 0,
    });
    setEditingId(t._id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.clientName.trim() || !form.comment.trim()) {
      alert("Client name and testimonial comment are required.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const res = await updateTestimonial(editingId, form);
        setTestimonials((prev) =>
          prev.map((item) => (item._id === editingId ? res.data : item))
        );
      } else {
        const res = await createTestimonial(form);
        setTestimonials((prev) => [res.data, ...prev]);
      }
      closeModal();
    } catch (err) {
      alert("Failed to save testimonial: " + (err.response?.data?.error || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the review by "${name}"?`)) return;
    try {
      await deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert("Failed to delete testimonial: " + (err.response?.data?.error || err.message));
    }
  };

  const toggleFeatured = async (id, currentStatus) => {
    try {
      const res = await updateTestimonial(id, { isFeatured: !currentStatus });
      setTestimonials((prev) =>
        prev.map((item) => (item._id === id ? { ...item, isFeatured: res.data.isFeatured } : item))
      );
    } catch (err) {
      alert("Failed to update status: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="adm-test-page">
      <style>{`
        .adm-test-page {
          padding: 32px 40px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: var(--font-sans);
          color: #2a2a24;
        }

        .adm-test-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .adm-test-header h1 {
          font-size: 24px;
          font-weight: 600;
          color: #2a3a14;
        }

        .adm-test-header p {
          font-size: 13px;
          color: #6a6a55;
          margin-top: 4px;
        }

        .adm-btn-primary {
          background: #2a3a14;
          color: #f5f0e8;
          border: none;
          padding: 10px 20px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .adm-btn-primary:hover {
          background: #3d5018;
          transform: translateY(-1px);
        }

        .adm-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }

        .adm-test-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 22px 24px;
          border: 1px solid rgba(138,154,74,0.2);
          box-shadow: 0 4px 16px rgba(42,42,36,0.03);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.2s ease;
        }

        .adm-test-card:hover {
          box-shadow: 0 8px 24px rgba(42,42,36,0.06);
          border-color: #8a9a4a;
        }

        .adm-test-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .adm-client-name {
          font-size: 16px;
          font-weight: 600;
          color: #2a2a24;
        }

        .adm-client-meta {
          font-size: 12px;
          color: #7a7a60;
          margin-top: 2px;
        }

        .adm-stars {
          color: #eab308;
          font-size: 15px;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }

        .adm-comment {
          font-size: 13.5px;
          line-height: 1.6;
          color: #4a4a3a;
          margin-bottom: 18px;
          font-style: italic;
          background: #faf8f2;
          padding: 12px 16px;
          border-radius: 12px;
          border-left: 3px solid #8a9a4a;
          flex: 1;
        }

        .adm-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid rgba(138,154,74,0.14);
          gap: 8px;
        }

        .adm-feat-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
          cursor: pointer;
          border: 1px solid;
          transition: all 0.2s;
        }

        .adm-feat-badge.active {
          background: #dcfce7;
          color: #166534;
          border-color: #86efac;
        }

        .adm-feat-badge.inactive {
          background: #f1f5f9;
          color: #64748b;
          border-color: #cbd5e1;
        }

        .adm-action-btns {
          display: flex;
          gap: 8px;
        }

        .adm-btn-sm {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 11.5px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid rgba(138,154,74,0.3);
          background: #faf8f2;
          color: #2a3a14;
          transition: all 0.2s;
        }

        .adm-btn-sm:hover {
          background: #2a3a14;
          color: #ffffff;
        }

        .adm-btn-sm.del {
          color: #dc2626;
          border-color: rgba(220,38,38,0.3);
        }

        .adm-btn-sm.del:hover {
          background: #dc2626;
          color: #ffffff;
        }

        /* MODAL */
        .adm-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 9999;
        }

        .adm-modal-box {
          background: #ffffff;
          border-radius: 20px;
          width: 100%;
          max-width: 540px;
          padding: 28px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          border: 1px solid rgba(138,154,74,0.2);
        }

        .adm-modal-box h2 {
          font-size: 19px;
          font-weight: 600;
          color: #2a3a14;
          margin-bottom: 20px;
        }

        .adm-form-group {
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .adm-form-group label {
          font-size: 12px;
          font-weight: 600;
          color: #4a4a3a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .adm-form-group input, .adm-form-group textarea, .adm-form-group select {
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid rgba(138,154,74,0.25);
          font-size: 13.5px;
          outline: none;
          background: #faf8f2;
          font-family: inherit;
        }

        .adm-form-group input:focus, .adm-form-group textarea:focus, .adm-form-group select:focus {
          border-color: #8a9a4a;
          background: #ffffff;
        }

        .adm-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }

        .adm-btn-cancel {
          padding: 10px 18px;
          border-radius: 10px;
          background: #f1f5f9;
          border: none;
          color: #475569;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .adm-empty {
          background: #ffffff;
          border-radius: 18px;
          padding: 60px 20px;
          text-align: center;
          color: #7a7a60;
          border: 1px dashed rgba(138,154,74,0.3);
        }

        @media (max-width: 600px) {
          .adm-test-page { padding: 20px 16px; }
          .adm-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* HEADER */}
      <div className="adm-test-header">
        <div>
          <h1>Client Reviews & Testimonials</h1>
          <p>Manage positive customer testimonials and reviews displayed on the website.</p>
        </div>
        <button type="button" className="adm-btn-primary" onClick={openNewModal}>
          <span>+ Add New Review</span>
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "#6a6a55" }}>
          Loading testimonials...
        </div>
      ) : testimonials.length === 0 ? (
        <div className="adm-empty">
          <div style={{ fontSize: 36, marginBottom: 12 }}>⭐</div>
          <h3 style={{ fontSize: 18, marginBottom: 6 }}>No Testimonials Added Yet</h3>
          <p style={{ fontSize: 13, marginBottom: 18 }}>
            Click "+ Add New Review" above to add your first customer review or testimonial.
          </p>
          <button type="button" className="adm-btn-primary" onClick={openNewModal}>
            + Add First Review
          </button>
        </div>
      ) : (
        <div className="adm-cards-grid">
          {testimonials.map((t) => (
            <div key={t._id} className="adm-test-card">
              <div>
                <div className="adm-test-card-top">
                  <div>
                    <div className="adm-client-name">{t.clientName}</div>
                    <div className="adm-client-meta">
                      {t.projectType} • {t.location}
                    </div>
                  </div>
                </div>

                <div className="adm-stars">
                  {"★".repeat(t.rating)}
                  {"☆".repeat(5 - t.rating)}
                </div>

                <div className="adm-comment">"{t.comment}"</div>
              </div>

              <div className="adm-card-footer">
                <button
                  type="button"
                  className={`adm-feat-badge ${t.isFeatured ? "active" : "inactive"}`}
                  onClick={() => toggleFeatured(t._id, t.isFeatured)}
                  title="Click to toggle featured on home"
                >
                  {t.isFeatured ? "✓ Featured" : "Hidden"}
                </button>

                <div className="adm-action-btns">
                  <button type="button" className="adm-btn-sm" onClick={() => openEditModal(t)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="adm-btn-sm del"
                    onClick={() => handleDelete(t._id, t.clientName)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="adm-modal-overlay" onClick={closeModal}>
          <div className="adm-modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? "Edit Testimonial" : "Add New Testimonial"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="adm-form-group">
                <label>Client Name *</label>
                <input
                  required
                  placeholder="e.g. Rahul Deshmukh"
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="adm-form-group">
                  <label>Location / City</label>
                  <input
                    placeholder="e.g. Gangapur Road, Nashik"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
                <div className="adm-form-group">
                  <label>Project Type</label>
                  <input
                    placeholder="e.g. 3BHK Luxury Interior"
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="adm-form-group">
                  <label>Rating (1 to 5 Stars)</label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Status</label>
                  <select
                    value={form.isFeatured ? "yes" : "no"}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.value === "yes" })}
                  >
                    <option value="yes">Visible / Featured</option>
                    <option value="no">Hidden / Draft</option>
                  </select>
                </div>
              </div>

              <div className="adm-form-group">
                <label>Review / Client Quote *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write the client review or feedback here..."
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                />
              </div>

              <div className="adm-modal-actions">
                <button type="button" className="adm-btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="adm-btn-primary" disabled={saving}>
                  {saving ? "Saving..." : editingId ? "Save Changes" : "Create Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

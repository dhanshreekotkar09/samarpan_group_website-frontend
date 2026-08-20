import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAdminProject,
  createProject,
  updateProject,
  uploadHeroImage,
  uploadMediaImages,
  deleteMediaImage,
  updateMediaImage,
  uploadBeforeAfterSide,
  deleteBeforeAfter,
  getImageSrc,
} from "../api/client";
import { buildHighlights } from "../utils/projectHighlights";
import { isVideoMedia } from "../utils/media";

const CATEGORIES = ["Residential", "Commercial", "Hospitality", "Office Spaces"];

const emptyArchitect = { name: "", role: "", experience: "", specialization: "", quote: "" };
const emptyTestimonial = { text: "", author: "", role: "", rating: 5 };

function uploadErrorMessage(err, fallback = "Upload failed") {
  if (err.response?.data?.error) return err.response.data.error;
  if (err.response?.status === 401) return "Login expired — please log in again";
  if (err.code === "ERR_NETWORK") return "Backend server is not running. In terminal: cd backend → npm start";
  return err.message || fallback;
}

function emptyTimeline(i) {
  return { phase: String(i + 1).padStart(2, "0"), title: "", duration: "", desc: "", status: "done" };
}
function emptyPhilosophy() {
  return { title: "", desc: "" };
}

export default function AdminProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "new";
  const isValidId = !!id && id !== "new" && id !== "undefined" && /^[a-f0-9]{24}$/i.test(id);
  const heroImageRef = useRef();
  const mediaRef = useRef();

  const [basic, setBasic] = useState({
    title: "", subtitle: "", category: "Residential", location: "",
    year: new Date().getFullYear().toString(), area: "", duration: "",
    budget: "", status: "Completed", clientName: "", overview: "",
    accentColor: "#8a9a4a", darkColor: "#2a3a14",
  });
  const [architect, setArchitect] = useState(emptyArchitect);
  const [testimonial, setTestimonial] = useState(emptyTestimonial);
  const [designPhilosophy, setDesignPhilosophy] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [beforeAfter, setBeforeAfter] = useState([]);
  const [media, setMedia] = useState([]);
  const [heroImage, setHeroImage] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNew || !isValidId) return;
    setLoading(true);
    getAdminProject(id)
      .then(({ data }) => {
        setBasic({
          title: data.title || "", subtitle: data.subtitle || "",
          category: data.category || "Residential", location: data.location || "",
          year: data.year || "", area: data.area || "", duration: data.duration || "",
          budget: data.budget || "", status: data.status || "Completed",
          clientName: data.clientName || "", overview: data.overview || "",
          accentColor: data.accentColor || "#8a9a4a", darkColor: data.darkColor || "#2a3a14",
        });
        setArchitect(data.architect || emptyArchitect);
        setTestimonial({ ...emptyTestimonial, ...(data.testimonial || {}) });
        setDesignPhilosophy(data.designPhilosophy || []);
        setTimeline(data.timeline || []);
        setBeforeAfter(data.beforeAfter || []);
        setTagsInput((data.tags || []).join(", "));
        setHeroImage(data.heroImage || "");
        setMedia(data.media || []);
      })
      .catch(() => setError("Project not found"))
      .finally(() => setLoading(false));
  }, [id, isNew, isValidId]);

  const setB = (key, val) => setBasic((f) => ({ ...f, [key]: val }));
  const setA = (key, val) => setArchitect((f) => ({ ...f, [key]: val }));
  const setT = (key, val) => setTestimonial((f) => ({ ...f, [key]: val }));

  const buildPayload = () => {
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    return {
      ...basic,
      tags,
      highlights: buildHighlights({ ...basic, tags }),
      architect,
      testimonial: {
        ...testimonial,
        author: testimonial.author || basic.clientName,
        rating: Number(testimonial.rating) || 5,
      },
      designPhilosophy,
      timeline,
      beforeAfter,
    };
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (isNew) {
        const { data } = await createProject(buildPayload());
        if (!data?._id) {
          setError("Project create failed. Are you logged in as admin?");
          return;
        }
      } else if (!isValidId) {
        setError("Invalid project.");
        return;
      } else {
        await updateProject(id, buildPayload());
      }
      navigate("/admin/projects");
    } catch (err) {
      setError(err.response?.data?.error || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleHeroImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !isValidId) { alert("Please save the project first."); return; }
    setUploading(true);
    try {
      const { data } = await uploadHeroImage(id, file);
      setHeroImage(data.heroImage);
    } catch (err) {
      alert(uploadErrorMessage(err));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleMediaUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !isValidId) return;

    const maxBytes = 500 * 1024 * 1024;
    const tooLarge = files.filter((f) => f.size > maxBytes);
    if (tooLarge.length) {
      alert(`File is too large (max 500MB per file):\n${tooLarge.map((f) => f.name).join("\n")}`);
      e.target.value = "";
      return;
    }

    setUploading(true);
    setUploadProgress(`Uploading ${files.length} file${files.length > 1 ? "s" : ""}...`);
    try {
      const { data } = await uploadMediaImages(id, files);
      setMedia(data.media || []);
      setUploadProgress(`✓ ${files.length} uploaded`);
      setTimeout(() => setUploadProgress(""), 3000);
    } catch (err) {
      alert(uploadErrorMessage(err));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const syncToServer = async () => {
    const { data } = await updateProject(id, buildPayload());
    if (data.beforeAfter) setBeforeAfter(data.beforeAfter);
    return data;
  };

  const handleBaUpload = async (index, side, e) => {
    const file = e.target.files?.[0];
    if (!file || !isValidId) {
      alert("Please save the project first, then upload images.");
      return;
    }
    setUploading(true);
    try {
      // Save beforeAfter pairs to DB first so index exists on server
      await syncToServer();
      const { data } = await uploadBeforeAfterSide(id, index, side, file);
      setBeforeAfter(data.beforeAfter || []);
    } catch (err) {
      alert(uploadErrorMessage(err, "Upload failed — is the backend running?"));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDeleteBa = async (index) => {
    if (!confirm("Delete this Before/After pair?")) return;
    if (isValidId) {
      const { data } = await deleteBeforeAfter(id, index);
      setBeforeAfter(data.beforeAfter || []);
    } else {
      setBeforeAfter((arr) => arr.filter((_, i) => i !== index));
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="admin-page-head">
        <button type="button" className="admin-back" onClick={() => navigate("/admin/projects")}>← Back to Projects</button>
        <h1 className="admin-page-title">{isNew ? "New Project" : basic.title || "Edit Project"}</h1>
        <p className="admin-page-sub">{isNew ? "Create a project, then upload photos after saving." : "Update details, photos, and gallery."}</p>
      </div>

      {error && <p className="admin-form-error">{error}</p>}

      <form onSubmit={handleSave} className="admin-form">
        {/* ── BASIC INFO ── */}
        <section className="admin-form-section">
          <h2>Basic Info</h2>
          <div className="admin-form-grid">
            <label>Title *<input value={basic.title} onChange={(e) => setB("title", e.target.value)} required /></label>
            <label>Category *
              <select value={basic.category} onChange={(e) => setB("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label>Client Name<input value={basic.clientName} onChange={(e) => setB("clientName", e.target.value)} placeholder="Rajesh & Sunita Kapoor" /></label>
            <label>Subtitle<input value={basic.subtitle} onChange={(e) => setB("subtitle", e.target.value)} /></label>
            <label>Location<input value={basic.location} onChange={(e) => setB("location", e.target.value)} placeholder="Nashik, Maharashtra" /></label>
            <label>Year<input value={basic.year} onChange={(e) => setB("year", e.target.value)} /></label>
            <label>Area<input value={basic.area} onChange={(e) => setB("area", e.target.value)} placeholder="2,400 sq ft" /></label>
            <label>Duration<input value={basic.duration} onChange={(e) => setB("duration", e.target.value)} placeholder="5 months" /></label>
            <label>Budget<input value={basic.budget} onChange={(e) => setB("budget", e.target.value)} placeholder="Premium" /></label>
            <label>Status<input value={basic.status} onChange={(e) => setB("status", e.target.value)} /></label>
          </div>
          <label>Overview (About this Project)
            <textarea value={basic.overview} onChange={(e) => setB("overview", e.target.value)} rows={4} />
          </label>
          <label>Tags (comma separated)
            <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="Full Home Interior, 3D Visualization" />
          </label>
        </section>

        {/* ── ARCHITECT ── */}
        <section className="admin-form-section">
          <h2>Architect / Designer</h2>
          <div className="admin-form-grid">
            <label>Name<input value={architect.name} onChange={(e) => setA("name", e.target.value)} placeholder="Ar. Priya Samarpan" /></label>
            <label>Role<input value={architect.role} onChange={(e) => setA("role", e.target.value)} placeholder="Principal Designer" /></label>
            <label>Experience<input value={architect.experience} onChange={(e) => setA("experience", e.target.value)} placeholder="12 Years Experience" /></label>
            <label>Specialization<input value={architect.specialization} onChange={(e) => setA("specialization", e.target.value)} /></label>
          </div>
          <label>Quote
            <textarea value={architect.quote} onChange={(e) => setA("quote", e.target.value)} rows={2} placeholder="Every home has a soul..." />
          </label>
        </section>

        {/* ── CLIENT REVIEW ── */}
        <section className="admin-form-section">
          <h2>Client Review</h2>
          <label>Review Text
            <textarea value={testimonial.text} onChange={(e) => setT("text", e.target.value)} rows={4} placeholder="Samarpan Group transformed our empty house..." />
          </label>
          <div className="admin-form-grid">
            <label>Author Name<input value={testimonial.author} onChange={(e) => setT("author", e.target.value)} placeholder={basic.clientName || "Client name"} /></label>
            <label>Author Role<input value={testimonial.role} onChange={(e) => setT("role", e.target.value)} placeholder="Homeowners, Nashik" /></label>
            <label>Rating (1-5)
              <input type="number" min={1} max={5} value={testimonial.rating} onChange={(e) => setT("rating", e.target.value)} />
            </label>
          </div>
        </section>

        {/* ── DESIGN PHILOSOPHY ── */}
        <section className="admin-form-section">
          <div className="admin-section-head">
            <h2>Design Philosophy</h2>
            <button type="button" className="admin-btn-sm" onClick={() => setDesignPhilosophy((p) => [...p, emptyPhilosophy()])}>+ Add</button>
          </div>
          {designPhilosophy.map((item, i) => (
            <div key={i} className="admin-list-item">
              <input value={item.title} onChange={(e) => { const n = [...designPhilosophy]; n[i] = { ...n[i], title: e.target.value }; setDesignPhilosophy(n); }} placeholder="Title (e.g. Vastu Harmony)" />
              <textarea value={item.desc} onChange={(e) => { const n = [...designPhilosophy]; n[i] = { ...n[i], desc: e.target.value }; setDesignPhilosophy(n); }} rows={2} placeholder="Description" />
              <button type="button" className="admin-btn-remove" onClick={() => setDesignPhilosophy((p) => p.filter((_, j) => j !== i))}>Remove</button>
            </div>
          ))}
        </section>

        {/* ── TIMELINE ── */}
        <section className="admin-form-section">
          <div className="admin-section-head">
            <h2>Project Journey (Timeline)</h2>
            <button type="button" className="admin-btn-sm" onClick={() => setTimeline((t) => [...t, emptyTimeline(t.length)])}>+ Add Step</button>
          </div>
          {timeline.map((step, i) => (
            <div key={i} className="admin-list-item">
              <div className="admin-form-grid">
                <label>Phase<input value={step.phase} onChange={(e) => { const n = [...timeline]; n[i] = { ...n[i], phase: e.target.value }; setTimeline(n); }} /></label>
                <label>Duration<input value={step.duration} onChange={(e) => { const n = [...timeline]; n[i] = { ...n[i], duration: e.target.value }; setTimeline(n); }} placeholder="Week 1–2" /></label>
              </div>
              <input value={step.title} onChange={(e) => { const n = [...timeline]; n[i] = { ...n[i], title: e.target.value }; setTimeline(n); }} placeholder="Step title" />
              <textarea value={step.desc} onChange={(e) => { const n = [...timeline]; n[i] = { ...n[i], desc: e.target.value }; setTimeline(n); }} rows={2} placeholder="Description" />
              <button type="button" className="admin-btn-remove" onClick={() => setTimeline((t) => t.filter((_, j) => j !== i))}>Remove</button>
            </div>
          ))}
        </section>

        {/* ── BEFORE / AFTER ── */}
        <section className="admin-form-section">
          <div className="admin-section-head">
            <h2>Before & After</h2>
            <button type="button" className="admin-btn-sm" onClick={async () => {
              const next = [...beforeAfter, { label: "", before: "", after: "" }];
              setBeforeAfter(next);
              if (isValidId) {
                try {
                  const { data } = await updateProject(id, { ...buildPayload(), beforeAfter: next });
                  setBeforeAfter(data.beforeAfter || next);
                } catch { /* saved on next upload */ }
              }
            }}>+ Add Pair</button>
          </div>
          <p className="admin-hint">Click + Add Pair → enter a label → upload Before/After images (auto-saves).</p>
          {beforeAfter.map((ba, i) => (
            <div key={i} className="admin-ba-item">
              <input value={ba.label} onChange={(e) => { const n = [...beforeAfter]; n[i] = { ...n[i], label: e.target.value }; setBeforeAfter(n); }} placeholder="Label (e.g. Living Room Transformation)" />
              <div className="admin-ba-images">
                <div className="admin-ba-side">
                  <span>Before</span>
                  {ba.before && <img src={getImageSrc(ba.before)} alt="Before" />}
                  {isValidId && (
                    <label className="admin-upload-label">
                      Upload Before
                      <input type="file" accept="image/*" hidden onChange={(e) => handleBaUpload(i, "before", e)} />
                    </label>
                  )}
                </div>
                <div className="admin-ba-side">
                  <span>After</span>
                  {ba.after && <img src={getImageSrc(ba.after)} alt="After" />}
                  {isValidId && (
                    <label className="admin-upload-label">
                      Upload After
                      <input type="file" accept="image/*" hidden onChange={(e) => handleBaUpload(i, "after", e)} />
                    </label>
                  )}
                </div>
              </div>
              <button type="button" className="admin-btn-remove" onClick={() => handleDeleteBa(i)}>Remove Pair</button>
            </div>
          ))}
        </section>

        {/* ── IMAGES (edit only) ── */}
        {isValidId && (
          <>
            <section className="admin-form-section">
              <h2>Hero Image</h2>
              {heroImage && <img src={getImageSrc(heroImage)} alt="Hero" className="admin-main-preview" />}
              <input ref={heroImageRef} type="file" accept="image/*" hidden onChange={handleHeroImage} />
              <button type="button" className="admin-btn-secondary" onClick={() => heroImageRef.current?.click()} disabled={uploading}>
                {heroImage ? "Change Hero Image" : "Upload Hero Image"}
              </button>
            </section>

            <section className="admin-form-section">
              <h2>Gallery Photos & Videos ({media.length})</h2>
              <input ref={mediaRef} type="file" accept="image/*,video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov" multiple hidden onChange={handleMediaUpload} />
              <button type="button" className="admin-btn-primary" onClick={() => mediaRef.current?.click()} disabled={uploading}>
                {uploading ? "Uploading..." : "+ Upload Photos & Videos"}
              </button>
              <p className="admin-hint">Photos: JPG, PNG, WebP · Videos: MP4, WebM, MOV (max 500MB each)</p>
              {uploadProgress && <p className="admin-upload-status">{uploadProgress}</p>}
              {media.length > 0 && (
                <div className="admin-gallery-grid">
                  {media.map((item, i) => (
                    <div key={item._id || i} className="admin-gallery-item">
                      {isVideoMedia(item) ? (
                        <video src={getImageSrc(item.url)} muted preload="metadata" className="admin-gallery-media" />
                      ) : (
                        <img src={getImageSrc(item.url)} alt="" className="admin-gallery-media" />
                      )}
                      {isVideoMedia(item) && <span className="admin-gallery-badge">▶ Video</span>}
                      <input value={item.caption || ""} placeholder="Caption" onChange={(e) => { setMedia((g) => g.map((x) => x._id === item._id ? { ...x, caption: e.target.value } : x)); updateMediaImage(id, item._id, { caption: e.target.value }); }} />
                      <button type="button" className="admin-gallery-delete" onClick={async () => { if (!confirm("Delete?")) return; const { data } = await deleteMediaImage(id, item._id); setMedia(data.media || []); }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {isNew && (
          <p className="admin-hint" style={{ background: "#fff8e6", padding: 16, borderRadius: 8 }}>
            After saving, you will go to the Projects list. Then edit the project to upload Hero, Gallery, and Before/After images.
          </p>
        )}

        <div className="admin-form-actions">
          <button type="button" className="admin-btn-secondary" onClick={() => navigate("/admin/projects")}>Cancel</button>
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save & Go to Projects"}
          </button>
        </div>
      </form>

      <style>{`
        .admin-page-head {
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 2px solid rgba(61, 74, 31, 0.12);
        }
        .admin-back {
          background: #eef3e0;
          border: 1px solid rgba(61, 74, 31, 0.18);
          color: #3d4a1f;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 8px;
          font-family: inherit;
        }
        .admin-back:hover { background: #e2ebcc; }
        .admin-page-title { font-family: var(--font-sans); font-size: 30px; font-weight: 700; color: #2a3a14; margin: 14px 0 6px; letter-spacing: -0.4px; }
        .admin-page-sub { margin: 0; color: #6a6a52; font-size: 14px; }
        .admin-form-section {
          background: #fff;
          border-radius: 14px;
          padding: 28px;
          margin-bottom: 20px;
          border: 1.5px solid rgba(61, 74, 31, 0.12);
          box-shadow: 0 1px 0 rgba(42,58,20,0.04);
        }
        .admin-form-section h2 {
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 700;
          color: #2a3a14;
          margin: 0 0 20px;
          padding: 0 0 12px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          border-bottom: 2px solid #dfe8c4;
        }
        .admin-section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; gap: 12px; }
        .admin-section-head h2 { margin-bottom: 0; flex: 1; }
        .admin-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 20px; margin-bottom: 8px; }
        .admin-form label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: #3d4a1f;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .admin-form input, .admin-form select, .admin-form textarea {
          display: block;
          width: 100%;
          margin-top: 8px;
          padding: 12px 14px;
          border: 1.5px solid #d4d0c4;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #2a2a24;
          background: #fbfaf6;
          font-family: inherit;
          box-sizing: border-box;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
        }
        .admin-form input::placeholder, .admin-form textarea::placeholder { color: #9a9a88; font-weight: 400; }
        .admin-form input:hover, .admin-form select:hover, .admin-form textarea:hover {
          border-color: #b8c48a;
          background: #fff;
        }
        .admin-form input:focus, .admin-form select:focus, .admin-form textarea:focus {
          outline: none;
          border-color: #6b7c32;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(107, 124, 50, 0.16);
        }
        .admin-form select { cursor: pointer; appearance: none; background-image: linear-gradient(45deg, transparent 50%, #3d4a1f 50%), linear-gradient(135deg, #3d4a1f 50%, transparent 50%); background-position: calc(100% - 18px) 55%, calc(100% - 12px) 55%; background-size: 6px 6px, 6px 6px; background-repeat: no-repeat; padding-right: 36px; }
        .admin-hint { color: #5a5a48; font-size: 13px; margin: 8px 0 16px; line-height: 1.5; }
        .admin-form-error {
          color: #8c2f24;
          background: #fdecea;
          border: 1px solid rgba(192, 57, 43, 0.25);
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 16px;
          font-weight: 600;
        }
        .admin-list-item { border: 1.5px solid #e4e0d4; background: #fbfaf6; border-radius: 12px; padding: 16px; margin-bottom: 12px; display: flex; flex-direction: column; gap: 8px; }
        .admin-ba-item { border: 1.5px solid #e4e0d4; background: #fbfaf6; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
        .admin-ba-images { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 12px 0; }
        .admin-ba-side { text-align: center; }
        .admin-ba-side span { font-size: 11px; font-weight: 700; color: #5a6a2a; letter-spacing: 1px; text-transform: uppercase; }
        .admin-ba-side img { width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin: 8px 0; display: block; border: 1px solid #e4e0d4; }
        .admin-upload-label { display: inline-block; padding: 8px 16px; background: #eef3e0; border: 1px solid rgba(61,74,31,0.18); border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; margin-top: 4px; color: #3d4a1f; }
        .admin-btn-sm { padding: 8px 16px; background: #3d4a1f; color: #fff; border: none; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit; }
        .admin-btn-sm:hover { background: #2a3a14; }
        .admin-btn-remove { align-self: flex-start; padding: 7px 14px; background: #fff; border: 1.5px solid #c0392b; color: #c0392b; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit; }
        .admin-main-preview { width: 100%; max-width: 400px; height: 240px; object-fit: cover; border-radius: 12px; margin-bottom: 16px; display: block; border: 1.5px solid #e4e0d4; }
        .admin-btn-primary { padding: 13px 26px; background: #3d4a1f; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
        .admin-btn-primary:hover { background: #2a3a14; }
        .admin-btn-secondary { padding: 12px 22px; background: #fff; color: #3d4a1f; border: 1.5px solid #3d4a1f; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
        .admin-form-actions { display: flex; gap: 12px; margin-top: 8px; padding: 20px 0 8px; }
        .admin-upload-status { color: #3d4a1f; font-size: 13px; margin-top: 12px; font-weight: 600; }
        .admin-gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; margin-top: 16px; max-height: 400px; overflow-y: auto; }
        .admin-gallery-item { position: relative; border-radius: 8px; overflow: hidden; background: #f0ede6; border: 1px solid #e4e0d4; }
        .admin-gallery-item img, .admin-gallery-item video, .admin-gallery-media { width: 100%; height: 90px; object-fit: cover; display: block; }
        .admin-gallery-badge { position: absolute; bottom: 28px; left: 4px; background: rgba(0,0,0,0.65); color: #fff; font-size: 9px; padding: 2px 6px; border-radius: 4px; pointer-events: none; }
        .admin-gallery-item input { width: 100%; border: none; border-top: 1px solid #e0ddd6; padding: 4px 6px; font-size: 10px; margin: 0; }
        .admin-gallery-delete { position: absolute; top: 4px; right: 4px; width: 22px; height: 22px; border-radius: 50%; background: rgba(0,0,0,0.6); color: #fff; border: none; cursor: pointer; font-size: 11px; }
        @media (max-width: 640px) { .admin-form-grid, .admin-ba-images { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects, getImageSrc } from "../api/client";

// ── Import project images from assets ──
import Int1 from "../assets/Int-1.jpg.jpeg";
import Int2 from "../assets/Int-2.jpg.jpeg";
import Int3 from "../assets/Int-3.jpg.jpeg";
import Int4 from "../assets/Int-4.jpg.jpeg";
import Int5 from "../assets/Int-5.jpg.jpeg";
import Int6 from "../assets/Int-6.jpg.jpeg";

const categories = ["All", "Residential", "Commercial", "Office Spaces", "Hospitality"];

const staticProjects = [
  {
    id: 1,
    title: "The Kapoor Residence",
    category: "Residential",
    location: "Nashik",
    year: "2024",
    area: "2,400 sq ft",
    desc: "A warm, earthy family home blending traditional Maharashtrian elements with contemporary luxury.",
    tags: ["Full Home Interior", "3D Visualization", "Custom Furniture"],
    color: "#4a5a1f",
    accent: "#c8d890",
    image: Int1,
  },
  {
    id: 2,
    title: "Verdant Café & Lounge",
    category: "Hospitality",
    location: "Nashik",
    year: "2023",
    area: "980 sq ft",
    desc: "A botanical-inspired café where greenery meets warm wood tones and soft ambient lighting.",
    tags: ["Lighting Design", "Space Planning", "Custom Woodwork"],
    color: "#3d4a1f",
    accent: "#b8cc6a",
    image: Int2,
  },
  {
    id: 3,
    title: "TechNashik HQ",
    category: "Office Spaces",
    location: "Nashik",
    year: "2024",
    area: "3,200 sq ft",
    desc: "A modern creative workspace that fosters collaboration through open zones and focused alcoves.",
    tags: ["Commercial Interior", "Modular Stations", "Acoustics"],
    color: "#2a3a14",
    accent: "#d4e090",
    image: Int3,
  },
  {
    id: 4,
    title: "The Mehta Villa",
    category: "Residential",
    location: "Panchavati, Nashik",
    year: "2023",
    area: "4,100 sq ft",
    desc: "A palatial bungalow interior — ivory marble, dark walnut, and curated art pieces throughout.",
    tags: ["Full Villa Interior", "False Ceiling", "Italian Marble"],
    color: "#46582a",
    accent: "#c0d880",
    image: Int4,
  },
  {
    id: 5,
    title: "Bloom Boutique Hotel",
    category: "Hospitality",
    location: "Nashik",
    year: "2022",
    area: "6,500 sq ft",
    desc: "12 uniquely themed rooms, a rooftop bar, and a lobby that channels old-world Nashik charm.",
    tags: ["Hospitality Design", "Lighting Design", "Turnkey Execution"],
    color: "#3a4a20",
    accent: "#bcd078",
    image: Int5,
  },
  {
    id: 6,
    title: "Sunrise Commercial Plaza",
    category: "Commercial",
    location: "Nashik",
    year: "2023",
    area: "5,800 sq ft",
    desc: "A multi-tenant commercial space designed for maximum footfall, functionality, and brand impact.",
    tags: ["Civil & Interior", "Turnkey Commercial", "Facade Design"],
    color: "#2d3d18",
    accent: "#c8dc80",
    image: Int6,
  },
];

const staticImageMap = { 1: Int1, 2: Int2, 3: Int3, 4: Int4, 5: Int5, 6: Int6 };

function getProjectImage(project) {
  const legacyId = project.legacyId || project.id;
  const apiImage = project.heroImage || project.mainImage;
  const staticImage = staticImageMap[legacyId] || project.image;
  return getImageSrc(apiImage) || staticImage || "";
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProjects()
      .then(({ data }) => {
        setProjects(data?.length > 0 ? data : staticProjects);
      })
      .catch(() => setProjects(staticProjects))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const handleConsultation = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pj-page {
          font-family: var(--font-sans);
          background: linear-gradient(160deg, #f5f0e8 0%, #ede8d8 40%, #e8e0cc 100%);
          color: #3d3d30;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .pj-hero {
          position: relative;
          padding: 80px 32px 56px;
          border-bottom: 1px solid rgba(138,154,74,0.2);
          overflow: hidden;
        }

        .pj-hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 55% 65% at 90% 10%, rgba(138,154,74,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 35% 45% at 10% 90%, rgba(200,184,154,0.2) 0%, transparent 70%);
        }

        .pj-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .pj-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          background: rgba(138,154,74,0.12);
          border: 1px solid rgba(138,154,74,0.3);
          border-radius: 20px;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #4a5a1f;
          font-weight: 600;
          margin-bottom: 18px;
        }

        .pj-hero h1 {
          font-size: clamp(34px, 4.4vw, 54px);
          font-weight: 600;
          line-height: 1.15;
          color: #2a2a24;
          letter-spacing: -0.6px;
          margin-bottom: 10px;
          max-width: 820px;
        }

        .pj-hero h1 em {
          font-style: normal;
          color: #6b7c32;
        }

        .pj-hero-tagline {
          font-size: 15px;
          font-weight: 500;
          color: #6a6a52;
          margin-bottom: 16px;
          display: block;
        }

        .pj-hero-sub {
          font-size: 15px;
          font-weight: 400;
          line-height: 1.8;
          color: #555545;
          max-width: 600px;
        }

        /* ── FILTER TABS ── */
        .pj-filters-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 36px 32px 0;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .pj-filter-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #6b7c32;
          margin-right: 4px;
        }

        .pj-filter-btn {
          padding: 8px 20px;
          border-radius: 20px;
          border: 1.5px solid rgba(138,154,74,0.28);
          background: rgba(255,255,255,0.7);
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: #4a5a30;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .pj-filter-btn:hover {
          border-color: rgba(138,154,74,0.6);
          background: #ffffff;
          color: #2a2a24;
          transform: translateY(-1px);
        }

        .pj-filter-btn.active {
          background: linear-gradient(135deg, #2a2a24, #3d4a1f);
          border-color: transparent;
          color: #e8d9b5;
          box-shadow: 0 4px 14px rgba(42,42,36,0.18);
        }

        /* ── PROJECTS GRID ── */
        .pj-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 32px 64px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* ── CLEAN, SOBRE CARD ── */
        .pj-card {
          background: rgba(255,252,245,0.85);
          border: 1px solid rgba(138,154,74,0.2);
          border-radius: 18px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 20px rgba(42,42,36,0.05);
        }

        .pj-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(42,42,36,0.12);
          border-color: rgba(138,154,74,0.45);
        }

        .pj-card-thumb {
          height: 230px;
          position: relative;
          overflow: hidden;
          background: #1a1a16;
        }

        .pj-card-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .pj-card:hover .pj-card-thumb img {
          transform: scale(1.04);
        }

        .pj-card-cat-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          padding: 5px 12px;
          background: rgba(255,252,245,0.92);
          backdrop-filter: blur(4px);
          border-radius: 12px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #3d4a1f;
          border: 1px solid rgba(138,154,74,0.2);
        }

        .pj-card-year-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 2;
          padding: 5px 12px;
          background: rgba(42,42,36,0.8);
          backdrop-filter: blur(4px);
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
          color: #c8d890;
        }

        .pj-card-body {
          padding: 22px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .pj-card-title {
          font-size: 20px;
          font-weight: 600;
          color: #2a2a24;
          margin-bottom: 6px;
          letter-spacing: -0.3px;
        }

        .pj-card-meta {
          font-size: 12px;
          color: #6b7c32;
          font-weight: 500;
          margin-bottom: 12px;
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .pj-card-desc {
          font-size: 13px;
          font-weight: 400;
          color: #555545;
          line-height: 1.7;
          margin-bottom: 16px;
          flex-grow: 1;
        }

        .pj-card-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: auto;
        }

        .pj-card-tag {
          padding: 3px 10px;
          background: rgba(138,154,74,0.1);
          border: 1px solid rgba(138,154,74,0.22);
          border-radius: 10px;
          font-size: 10.5px;
          font-weight: 500;
          color: #4a5a1f;
        }

        .pj-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 22px;
          border-top: 1px solid rgba(138,154,74,0.14);
          background: rgba(255,255,255,0.4);
          font-size: 12px;
          color: #4a5a1f;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .pj-card:hover .pj-card-footer {
          background: rgba(138,154,74,0.08);
          color: #2a3a14;
        }

        .pj-card-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(138,154,74,0.14);
          color: #4a5a1f;
          transition: all 0.3s ease;
        }

        .pj-card:hover .pj-card-arrow {
          background: #8a9a4a;
          color: #1f2710;
          transform: translateX(4px);
        }

        /* ── CTA BANNER ── */
        .pj-cta-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 32px 84px;
        }

        .pj-cta-box {
          background: linear-gradient(135deg, #2a2a24 0%, #35441d 55%, #293516 100%);
          border-radius: 24px;
          padding: 56px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(42,42,36,0.18);
          border: 1px solid rgba(138,154,74,0.3);
        }

        .pj-cta-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 50% 70% at 85% 45%, rgba(138,154,74,0.2) 0%, transparent 70%);
          pointer-events: none;
        }

        .pj-cta-content {
          position: relative;
          z-index: 1;
        }

        .pj-cta-tag {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #c8d890;
          font-weight: 600;
          margin-bottom: 12px;
          display: block;
        }

        .pj-cta-title {
          font-size: clamp(26px, 3vw, 38px);
          font-weight: 600;
          color: #f5f0e8;
          line-height: 1.25;
          letter-spacing: -0.5px;
          margin-bottom: 10px;
        }

        .pj-cta-title em {
          font-style: normal;
          color: #c8d890;
        }

        .pj-cta-sub {
          font-size: 14px;
          color: #c8b89a;
          line-height: 1.6;
          max-width: 520px;
        }

        .pj-cta-buttons {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        .pj-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: #8a9a4a;
          color: #1f2710;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 6px 20px rgba(138,154,74,0.3);
          font-family: var(--font-sans);
          white-space: nowrap;
        }

        .pj-cta-btn:hover {
          background: #9ab052;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(138,154,74,0.45);
          color: #121908;
        }

        .pj-cta-btn:hover .pj-arrow-icon {
          transform: translateX(5px);
        }

        .pj-arrow-icon {
          display: inline-block;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .pj-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 26px;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(200,184,154,0.45);
          border-radius: 12px;
          color: #e8d9b5;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-sans);
          white-space: nowrap;
        }

        .pj-wa-btn:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(200,184,154,0.8);
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .pj-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 28px 24px 56px;
          }
          .pj-cta-box {
            flex-direction: column;
            text-align: center;
            padding: 44px 32px;
            gap: 28px;
          }
          .pj-cta-buttons {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .pj-hero {
            padding: 60px 20px 40px;
          }
          .pj-filters-wrap,
          .pj-cta-section {
            padding-left: 20px;
            padding-right: 20px;
          }
          .pj-grid {
            grid-template-columns: 1fr;
            padding: 24px 20px 48px;
          }
          .pj-cta-box {
            padding: 36px 20px;
          }
          .pj-cta-btn, .pj-wa-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="pj-page">

        {/* ── HERO ── */}
        <section className="pj-hero">
          <div className="pj-hero-bg" />
          <div className="pj-hero-inner">
            <div className="pj-eyebrow">
              <span>✦</span>
              <span>Our Portfolio</span>
              <span>✦</span>
            </div>
            <h1>
              Featured Projects & <em>Sites</em>
            </h1>
            <span className="pj-hero-tagline">
              अत्यंत निष्ठेने आणि समर्पणाने साकारलेली वास्तुनिर्मिती
            </span>
            <p className="pj-hero-sub">
              Explore our completed residential, commercial, and turnkey construction works across Nashik and Maharashtra. Each space is tailored with precision, durable materials, and modern craftsmanship.
            </p>
          </div>
        </section>

        {/* ── FILTERS ── */}
        <div className="pj-filters-wrap">
          <span className="pj-filter-label">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`pj-filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── PROJECTS GRID ── */}
        <div className="pj-grid">
          {loading ? (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", padding: 48, color: "#6b7c32", fontSize: 14 }}>
              Loading projects...
            </p>
          ) : filtered.length === 0 ? (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", padding: 48, color: "#6b7c32", fontSize: 14 }}>
              No projects found in this category.
            </p>
          ) : (
            filtered.map((project) => {
              const projectId = project.legacyId || project._id || project.id;
              return (
                <div
                  key={projectId}
                  className="pj-card"
                  onClick={() => {
                    navigate(`/projects/${projectId}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <div className="pj-card-thumb">
                    <img
                      src={getProjectImage(project)}
                      alt={project.title}
                      loading="lazy"
                    />
                    <div className="pj-card-cat-badge">{project.category}</div>
                    {project.year && (
                      <div className="pj-card-year-badge">{project.year}</div>
                    )}
                  </div>
                  <div className="pj-card-body">
                    <h2 className="pj-card-title">{project.title}</h2>
                    <div className="pj-card-meta">
                      <span>📍 {project.location}</span>
                      {project.area && (
                        <>
                          <span>·</span>
                          <span>📐 {project.area}</span>
                        </>
                      )}
                    </div>
                    <p className="pj-card-desc">
                      {project.desc || (project.overview || "").slice(0, 110)}
                      {(project.desc || project.overview || "").length > 110 ? "..." : ""}
                    </p>
                    {project.tags?.length > 0 && (
                      <div className="pj-card-tags">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="pj-card-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="pj-card-footer">
                    <span>View Project Details</span>
                    <span className="pj-card-arrow">→</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── CTA BANNER ── */}
        <section className="pj-cta-section">
          <div className="pj-cta-box">
            <div className="pj-cta-content">
              <span className="pj-cta-tag">✦ Let's Connect</span>
              <h2 className="pj-cta-title">
                Ready to build or renovate your <em>space?</em>
              </h2>
              <p className="pj-cta-sub">
                Connect with our team for a free site consultation, layout planning, and customized cost estimate.
              </p>
            </div>

            <div className="pj-cta-buttons">
              <button
                type="button"
                className="pj-cta-btn"
                onClick={handleConsultation}
              >
                <span>Book Free Consultation</span>
                <svg
                  className="pj-arrow-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </button>

              <a
                href="https://wa.me/918055587237"
                target="_blank"
                rel="noopener noreferrer"
                className="pj-wa-btn"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
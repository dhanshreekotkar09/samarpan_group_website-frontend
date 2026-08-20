import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects, getImageSrc } from "../api/client";

// ── Import all images from assets ──
import Int1 from "../assets/Int-1.jpg.jpeg";
import Int2 from "../assets/Int-2.jpg.jpeg";
import Int3 from "../assets/Int-3.jpg.jpeg";
import Int4 from "../assets/Int-4.jpg.jpeg";
import Int5 from "../assets/Int-5.jpg.jpeg";
import Int6 from "../assets/Int-6.jpg.jpeg";
import Int7 from "../assets/Int-7.jpg.jpeg";
import Int8 from "../assets/Int-8.jpg.jpeg";
import Int9 from "../assets/Int-9.jpg.jpeg";
import Int10 from "../assets/Int-10.jpg.jpeg";
import Int11 from "../assets/Int-11.jpg.jpeg";
import Int12 from "../assets/Int-12.jpg.jpeg";
import Int13 from "../assets/Int-13.jpg.jpeg";
import Int14 from "../assets/Int-14.jpg.jpeg";
import Int15 from "../assets/Int-15.jpg.jpeg";

const categories = ["All", "Residential", "Commercial", "Hospitality", "Office Spaces"];

const staticProjects = [
  {
    id: 1,
    title: "The Kapoor Residence",
    category: "Residential",
    location: "Nashik",
    year: "2024",
    area: "2,400 sq ft",
    desc: "A warm, earthy family home blending traditional Maharashtrian elements with contemporary luxury.",
    tags: ["Full Home Interior", "3D Visualization", "Furniture Styling"],
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
    tags: ["Lighting Design", "Space Planning"],
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
    tags: ["Interior Design", "Space Planning"],
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
    tags: ["Full Home Interior", "Color Consultation"],
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
    tags: ["Interior Design", "Lighting Design", "3D Visualization"],
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
    tags: ["Space Planning", "Interior Design"],
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

const galleryItems = [
  { type: "image", label: "Living Room – Kapoor Residence", span: "wide", image: Int7 },
  { type: "image", label: "Bedroom – Mehta Villa", span: "normal", image: Int8 },
  { type: "image", label: "Café Interiors – Verdant", span: "normal", image: Int9 },
  { type: "image", label: "Walk-through: Kapoor Residence", span: "normal", image: Int10 },
  { type: "image", label: "Kitchen – Mehta Villa", span: "normal", image: Int11 },
  { type: "image", label: "Office Lobby – TechNashik", span: "wide", image: Int12 },
  { type: "image", label: "Time-lapse: Verdant Café Build", span: "normal", image: Int13 },
  { type: "image", label: "Rooftop Bar – Bloom Hotel", span: "normal", image: Int14 },
  { type: "image", label: "Bloom Boutique Hotel Suite", span: "normal", image: Int15 },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);
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

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pj-page {
          font-family: var(--font-sans);
          background: linear-gradient(160deg, #f5f0e8 0%, #ede8d8 40%, #e8e0cc 100%);
          color: #3d3d30;
          min-height: 100vh;
        }

        /* ── HERO ── */
        .pj-hero {
          position: relative;
          padding: 100px 60px 72px;
          border-bottom: 1px solid rgba(138,154,74,0.2);
          overflow: hidden;
        }
        .pj-hero-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 65% at 92% 5%, rgba(138,154,74,0.1) 0%, transparent 70%),
            radial-gradient(ellipse 35% 45% at 5% 95%, rgba(200,184,154,0.2) 0%, transparent 70%);
        }
        .pj-hero-inner { max-width: 1300px; margin: 0 auto; position: relative; z-index: 1; }

        .pj-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 20px;
          background: rgba(138,154,74,0.1);
          border: 1px solid rgba(138,154,74,0.3);
          border-radius: 20px;
          font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: #4a5a1f;
          margin-bottom: 28px;
        }
        .pj-hero h1 {
          font-family: var(--font-sans);
          font-size: clamp(48px, 7vw, 84px);
          font-weight: 300; line-height: 1.05;
          color: #2a2a24; letter-spacing: -2px;
          margin-bottom: 20px; max-width: 780px;
        }
        .pj-hero h1 em { font-style: normal; font-weight: 600; color: #8a9a4a; }
        .pj-hero-sub {
          font-size: 14px; font-weight: 300; line-height: 1.9;
          color: #5a5a4a; max-width: 520px;
        }

        /* STATS ROW */
        .pj-stats {
          display: flex; gap: 48px; margin-top: 56px;
          flex-wrap: wrap;
        }
        .pj-stat { display: flex; flex-direction: column; gap: 4px; }
        .pj-stat-num {
          font-family: var(--font-sans);
          font-size: 42px; font-weight: 300; color: #2a2a24;
          line-height: 1;
        }
        .pj-stat-num span { color: #8a9a4a; }
        .pj-stat-label {
          font-size: 9.5px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #7a8a5a;
        }
        .pj-stat-sep {
          width: 1px; background: rgba(138,154,74,0.3);
          align-self: stretch; margin: 4px 0;
        }

        /* ── FILTER TABS ── */
        .pj-filters {
          max-width: 1300px; margin: 0 auto;
          padding: 48px 60px 0;
          display: flex; gap: 10px; flex-wrap: wrap;
          align-items: center;
        }
        .pj-filter-label {
          font-size: 9.5px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #8a9a4a; margin-right: 8px;
        }
        .pj-filter-btn {
          padding: 9px 20px;
          border-radius: 24px;
          border: 1.5px solid rgba(138,154,74,0.28);
          background: transparent;
          font-family: var(--font-sans);
          font-size: 11.5px; font-weight: 500; letter-spacing: 0.8px;
          color: #5a5a4a; cursor: pointer;
          transition: all 0.25s ease;
        }
        .pj-filter-btn:hover {
          border-color: rgba(138,154,74,0.5);
          color: #2a2a24;
          background: rgba(138,154,74,0.08);
        }
        .pj-filter-btn.active {
          background: linear-gradient(135deg, #2a2a24, #3d4a1f);
          border-color: transparent;
          color: #e8d9b5;
          box-shadow: 0 4px 14px rgba(42,42,36,0.2);
        }

        /* ── PROJECTS GRID ── */
        .pj-grid {
          max-width: 1300px; margin: 0 auto;
          padding: 36px 60px 64px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* ── CLICKABLE CARD ── */
        .pj-card {
          background: rgba(255,252,245,0.8);
          border: 1px solid rgba(138,154,74,0.16);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.35s ease;
          cursor: pointer;
          position: relative;
        }
        .pj-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 28px 64px rgba(42,42,36,0.16);
          border-color: rgba(138,154,74,0.4);
        }

        /* Click ripple hint */
        .pj-card::after {
          content: 'View Project →';
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(42,58,20,0.75);
          color: #c8d890;
          font-family: var(--font-sans);
          font-size: 13px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 10;
          border-radius: 20px;
          backdrop-filter: blur(4px);
        }
        .pj-card:hover::after { opacity: 1; }

        .pj-card-thumb {
          height: 220px;
          position: relative;
          overflow: hidden;
        }
        .pj-card-thumb img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .pj-card:hover .pj-card-thumb img { transform: scale(1.08); }

        .pj-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%);
          z-index: 2;
        }
        .pj-card-cat-badge {
          position: absolute; top: 16px; left: 16px; z-index: 3;
          padding: 5px 12px;
          background: rgba(255,252,245,0.92);
          border-radius: 20px;
          font-size: 9px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: #3d4a1f;
        }
        .pj-card-year-badge {
          position: absolute; top: 16px; right: 16px; z-index: 3;
          padding: 5px 12px;
          background: rgba(42,42,36,0.7);
          border-radius: 20px;
          font-size: 9px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: #c8d890;
        }

        .pj-card-body { padding: 24px; }
        .pj-card-title {
          font-family: var(--font-sans);
          font-size: 22px; font-weight: 500; color: #2a2a24;
          margin-bottom: 6px; letter-spacing: -0.3px;
        }
        .pj-card-meta {
          font-size: 11px; color: #8a9a4a; font-weight: 400;
          letter-spacing: 0.5px; margin-bottom: 12px;
          display: flex; gap: 10px; align-items: center;
        }
        .pj-card-meta span { display: flex; align-items: center; gap: 4px; }
        .pj-card-desc {
          font-size: 12.5px; font-weight: 300;
          color: #5a5a4a; line-height: 1.8; margin-bottom: 18px;
        }
        .pj-card-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .pj-card-tag {
          padding: 4px 10px;
          background: rgba(138,154,74,0.1);
          border: 1px solid rgba(138,154,74,0.22);
          border-radius: 12px;
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.8px;
          color: #4a5a1f;
        }
        .pj-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 24px;
          border-top: 1px solid rgba(138,154,74,0.12);
          font-size: 11px; color: #8a9a6a; font-weight: 400;
        }
        .pj-card-arrow {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(138,154,74,0.12);
          border: 1px solid rgba(138,154,74,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: #4a5a1f;
          transition: all 0.25s ease;
        }
        .pj-card:hover .pj-card-arrow {
          background: linear-gradient(135deg, #2a2a24, #3d4a1f);
          border-color: transparent;
          color: #c8d890;
          transform: rotate(45deg);
        }

        /* ── GALLERY SECTION ── */
        .pj-gallery-section {
          background: #f5f0e8;
          padding: 80px 60px;
          position: relative; overflow: hidden;
          border-top: 1px solid rgba(196,169,106,0.2);
          border-bottom: 1px solid rgba(196,169,106,0.2);
        }
        .pj-gallery-section::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 50% 60% at 10% 20%, rgba(196,169,106,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 90% 80%, rgba(196,169,106,0.08) 0%, transparent 70%);
        }

        .pj-gallery-header {
          max-width: 1300px; margin: 0 auto 48px;
          display: flex; align-items: flex-end; justify-content: space-between;
          flex-wrap: wrap; gap: 20px;
          position: relative; z-index: 1;
        }
        .pj-gallery-section-label {
          font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
          color: #8a6a3a; font-weight: 600; margin-bottom: 12px;
          display: flex; align-items: center; gap: 12px;
        }
        .pj-gallery-section-label::before {
          content: ''; width: 32px; height: 1.5px;
          background: linear-gradient(90deg, #c4a96a, transparent);
        }
        .pj-gallery-title {
          font-family: var(--font-sans);
          font-size: clamp(32px, 4vw, 50px);
          font-weight: 300; color: #2a2010;
          letter-spacing: -1px; line-height: 1.1;
        }
        .pj-gallery-title em { font-style: normal; font-weight: 600; color: #c4a96a; }
        .pj-gallery-subtitle {
          font-size: 12.5px; font-weight: 300; color: #7a6a4a;
          max-width: 300px; line-height: 1.8;
        }

        .pj-gallery-grid {
          max-width: 1300px; margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 220px;
          gap: 16px;
          position: relative; z-index: 1;
        }
        .pj-gallery-item {
          border-radius: 16px; overflow: hidden;
          cursor: pointer; position: relative;
          transition: all 0.35s ease;
          border: 1px solid rgba(196,169,106,0.15);
          background: #2a2010;
        }
        .pj-gallery-item.wide { grid-column: span 2; }
        .pj-gallery-item:hover {
          transform: scale(1.02); z-index: 2;
          box-shadow: 0 20px 50px rgba(42,32,16,0.22);
          border-color: rgba(196,169,106,0.35);
        }
        .pj-gallery-item img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }
        .pj-gallery-item:hover img { transform: scale(1.07); }
        .pj-gallery-item-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(42,32,16,0.78) 0%, rgba(42,32,16,0.08) 55%, transparent 100%);
          opacity: 0; transition: opacity 0.3s ease; z-index: 2;
        }
        .pj-gallery-item:hover .pj-gallery-item-overlay { opacity: 1; }
        .pj-gallery-item-label {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 3;
          padding: 16px 18px 18px;
          transform: translateY(8px); opacity: 0;
          transition: all 0.3s ease;
        }
        .pj-gallery-item:hover .pj-gallery-item-label { transform: translateY(0); opacity: 1; }
        .pj-gallery-item-label span {
          font-size: 11.5px; font-weight: 500;
          color: #f0e8d0; letter-spacing: 0.5px; display: block;
        }
        .pj-gallery-item-type {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 9px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: #e8c97a; margin-bottom: 5px;
        }

        .pj-gallery-cta {
          max-width: 1300px; margin: 40px auto 0;
          display: flex; align-items: center; justify-content: center;
          gap: 20px; position: relative; z-index: 1; flex-wrap: wrap;
        }
        .pj-gallery-cta-text {
          font-size: 13px; font-weight: 300; color: #7a6a4a;
        }
        .pj-gallery-cta-btn {
          padding: 12px 28px;
          background: transparent;
          border: 1.5px solid rgba(196,169,106,0.45);
          border-radius: 24px;
          font-family: var(--font-sans);
          font-size: 11px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: #8a6a3a;
          cursor: pointer; transition: all 0.25s ease;
        }
        .pj-gallery-cta-btn:hover {
          background: rgba(196,169,106,0.12);
          border-color: rgba(196,169,106,0.75); color: #5a4020;
        }

        /* ── LIGHTBOX ── */
        .pj-lightbox {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(22,18,8,0.95);
          backdrop-filter: blur(16px);
          display: flex; align-items: center; justify-content: center;
          padding: 40px; animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .pj-lightbox-box {
          background: #2a2010; border-radius: 24px; overflow: hidden;
          max-width: 860px; width: 100%;
          border: 1px solid rgba(196,169,106,0.25);
          box-shadow: 0 40px 100px rgba(0,0,0,0.7);
          animation: slideUp 0.3s ease; position: relative;
        }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .pj-lightbox-thumb { height: 400px; overflow: hidden; }
        .pj-lightbox-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .pj-lightbox-body { padding: 28px 32px 32px; }
        .pj-lightbox-type {
          font-size: 9px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #e8c97a; margin-bottom: 10px;
        }
        .pj-lightbox-title {
          font-family: var(--font-sans);
          font-size: 26px; font-weight: 400; color: #f0e8d0;
          margin-bottom: 8px;
        }
        .pj-lightbox-close {
          position: absolute; top: 16px; right: 16px; z-index: 10;
          width: 40px; height: 40px;
          background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50%; color: #f0e8d0; font-size: 18px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease; backdrop-filter: blur(6px);
        }
        .pj-lightbox-close:hover { background: rgba(255,255,255,0.2); }
        .pj-lightbox-actions { display: flex; gap: 12px; margin-top: 20px; }
        .pj-lightbox-btn-primary {
          flex: 1; padding: 12px;
          background: linear-gradient(135deg, #c4a96a, #d4b97a);
          color: #2a2010; font-family: var(--font-sans);
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; border: none; border-radius: 10px; cursor: pointer;
        }
        .pj-lightbox-btn-secondary {
          padding: 12px 20px;
          background: rgba(196,169,106,0.1);
          border: 1px solid rgba(196,169,106,0.3);
          color: #c4a96a; font-family: var(--font-sans);
          font-size: 11px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; border-radius: 10px; cursor: pointer;
        }

        /* ── CTA BAND ── */
        .pj-cta-band {
          background: linear-gradient(135deg, #3a4a20 0%, #46582a 50%, #3a4a20 100%);
          padding: 72px 60px; text-align: center;
          position: relative; overflow: hidden;
        }
        .pj-cta-band::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 60% 80% at 50% 50%, rgba(184,204,106,0.08) 0%, transparent 70%);
        }
        .pj-cta-band-label {
          font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
          color: #b8cc6a; margin-bottom: 20px;
        }
        .pj-cta-band h2 {
          font-family: var(--font-sans);
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 300; color: #eef2e0;
          margin-bottom: 20px; letter-spacing: -1px;
        }
        .pj-cta-band h2 em { font-style: normal; font-weight: 600; color: #b8cc6a; }
        .pj-cta-band p {
          font-size: 13.5px; font-weight: 300; color: #8aaa60;
          max-width: 500px; margin: 0 auto 40px; line-height: 1.9;
        }
        .pj-cta-band-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .pj-cta-primary {
          padding: 16px 40px;
          background: linear-gradient(135deg, #b8cc6a, #c8dc80);
          color: #2a2a24; font-family: var(--font-sans);
          font-size: 11px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; border: none; border-radius: 12px;
          cursor: pointer; box-shadow: 0 8px 24px rgba(184,204,106,0.3);
          transition: all 0.3s ease;
        }
        .pj-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(184,204,106,0.4); }
        .pj-cta-secondary {
          padding: 16px 40px; background: transparent;
          border: 1.5px solid rgba(184,204,106,0.4);
          color: #b8cc6a; font-family: var(--font-sans);
          font-size: 11px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; border-radius: 12px;
          cursor: pointer; transition: all 0.3s ease;
        }
        .pj-cta-secondary:hover { border-color: rgba(184,204,106,0.7); background: rgba(184,204,106,0.08); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .pj-grid { grid-template-columns: repeat(2,1fr); padding: 36px 32px 56px; }
          .pj-gallery-grid { grid-template-columns: repeat(3,1fr); }
          .pj-hero, .pj-filters, .pj-gallery-section, .pj-cta-band { padding-left: 32px; padding-right: 32px; }
        }
        @media (max-width: 720px) {
          .pj-grid { grid-template-columns: 1fr; }
          .pj-gallery-grid { grid-template-columns: repeat(2,1fr); }
          .pj-gallery-item.wide { grid-column: span 2; }
          .pj-hero, .pj-filters, .pj-grid, .pj-gallery-section, .pj-cta-band { padding-left: 20px; padding-right: 20px; }
          .pj-stats { gap: 28px; }
        }
        @media (max-width: 480px) {
          .pj-gallery-grid { grid-template-columns: 1fr; }
          .pj-gallery-item.wide { grid-column: span 1; }
        }
      `}</style>

      <div className="pj-page">

        {/* ── HERO ── */}
        <section className="pj-hero">
          <div className="pj-hero-bg" />
          <div className="pj-hero-inner">
            <div className="pj-eyebrow"><span>✦</span><span>Our Work</span><span>✦</span></div>
            <h1>Where Every Space Tells a <em>Story</em></h1>
            <p className="pj-hero-sub">
              From intimate homes to expansive commercial spaces — each project is a unique canvas where design, function, and soul come together.
            </p>
            <div className="pj-stats">
              <div className="pj-stat">
                <div className="pj-stat-num">120<span>+</span></div>
                <div className="pj-stat-label">Projects Completed</div>
              </div>
              <div className="pj-stat-sep" />
              <div className="pj-stat">
                <div className="pj-stat-num">8<span>+</span></div>
                <div className="pj-stat-label">Years Experience</div>
              </div>
              <div className="pj-stat-sep" />
              <div className="pj-stat">
                <div className="pj-stat-num">98<span>%</span></div>
                <div className="pj-stat-label">Client Satisfaction</div>
              </div>
              <div className="pj-stat-sep" />
              <div className="pj-stat">
                <div className="pj-stat-num">4</div>
                <div className="pj-stat-label">Cities Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FILTERS ── */}
        <div className="pj-filters">
          <span className="pj-filter-label">Filter by</span>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pj-filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── PROJECTS GRID — each card navigates to detail page ── */}
        <div className="pj-grid">
          {loading ? (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", padding: 48, color: "#8a9a6a" }}>Loading projects...</p>
          ) : filtered.length === 0 ? (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", padding: 48, color: "#8a9a6a" }}>No projects found.</p>
          ) : filtered.map((project) => (
            <div
              key={project.legacyId || project._id || project.id}
              className="pj-card"
              onClick={() => navigate(`/projects/${project.legacyId || project._id || project.id}`)}
            >
              <div className="pj-card-thumb">
                <img src={getProjectImage(project)} alt={project.title} />
                <div className="pj-card-overlay" />
                <div className="pj-card-cat-badge">{project.category}</div>
                <div className="pj-card-year-badge">{project.year}</div>
              </div>
              <div className="pj-card-body">
                <div className="pj-card-title">{project.title}</div>
                <div className="pj-card-meta">
                  <span>📍 {project.location}</span>
                  <span>·</span>
                  <span>📐 {project.area}</span>
                </div>
                <div className="pj-card-desc">{project.desc || (project.overview || "").slice(0, 120)}{(project.overview || "").length > 120 ? "..." : ""}</div>
                <div className="pj-card-tags">
                  {(project.tags || []).map((tag) => (
                    <span key={tag} className="pj-card-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="pj-card-footer">
                <span>View Project</span>
                <div className="pj-card-arrow">→</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── GALLERY SECTION ── */}
        <section className="pj-gallery-section">
          <div className="pj-gallery-header">
            <div>
              <div className="pj-gallery-section-label">Visual Showcase</div>
              <h2 className="pj-gallery-title">Our <em>Gallery</em></h2>
            </div>
            <p className="pj-gallery-subtitle">
              A curated collection of photos from our most beloved projects.
            </p>
          </div>
          <div className="pj-gallery-grid">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className={`pj-gallery-item ${item.span === "wide" ? "wide" : ""}`}
                onClick={() => setLightbox(item)}
              >
                <img src={item.image} alt={item.label} />
                <div className="pj-gallery-item-overlay" />
                <div className="pj-gallery-item-label">
                  <div className="pj-gallery-item-type">📷 Photo</div>
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="pj-gallery-cta">
            <p className="pj-gallery-cta-text">Follow us for daily inspiration.</p>
            <button className="pj-gallery-cta-btn">@Samarpan_Group_Interiors ↗</button>
          </div>
        </section>

        {/* ── CTA BAND ── */}
        <section className="pj-cta-band">
          <div className="pj-cta-band-label">✦ Start Your Journey ✦</div>
          <h2>Ready to Transform Your <em>Space</em>?</h2>
          <p>Let's sit together, understand your vision, and bring it to life — beautifully and on budget.</p>
          <div className="pj-cta-band-btns">
            <button className="pj-cta-primary">Book Free Consultation →</button>
            <button className="pj-cta-secondary">Explore Services</button>
          </div>
        </section>

      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="pj-lightbox" onClick={() => setLightbox(null)}>
          <div className="pj-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <div className="pj-lightbox-thumb">
              <img src={lightbox.image} alt={lightbox.label} />
              <button className="pj-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            </div>
            <div className="pj-lightbox-body">
              <div className="pj-lightbox-type">📷 Photo</div>
              <div className="pj-lightbox-title">{lightbox.label}</div>
              <div className="pj-lightbox-actions">
                <button className="pj-lightbox-btn-primary">View Full Image</button>
                <button className="pj-lightbox-btn-secondary" onClick={() => setLightbox(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
import { useState, useEffect, useCallback } from "react";
import { getImageSrc } from "../api/client";
import { isVideoMedia } from "../utils/media";

const PAGE_SIZE = 36;

export default function ProjectGallery({ media = [], gallery, accentColor = "#8a9a4a" }) {
  const items = media.length ? media : (gallery || []);
  const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const getUrl = (item) => item.url || item.image || "";
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);

  const goNext = useCallback(() => {
    setLightboxIdx((i) => (i !== null && i < sorted.length - 1 ? i + 1 : i));
  }, [sorted.length]);

  const goPrev = useCallback(() => {
    setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, goNext, goPrev]);

  if (!sorted.length) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0", color: "#8a9a6a", fontSize: 14 }}>
        No gallery photos or videos yet.
      </div>
    );
  }

  const photoCount = sorted.filter((item) => !isVideoMedia(item)).length;
  const videoCount = sorted.length - photoCount;
  const countLabel = [
    photoCount ? `${photoCount} photo${photoCount !== 1 ? "s" : ""}` : "",
    videoCount ? `${videoCount} video${videoCount !== 1 ? "s" : ""}` : "",
  ].filter(Boolean).join(" · ");

  return (
    <>
      <div className="pg-grid">
        {visible.map((item, i) => (
          <button
            key={item._id || i}
            type="button"
            className="pg-item"
            onClick={() => openLightbox(i)}
            style={{ "--accent": accentColor }}
          >
            {isVideoMedia(item) ? (
              <>
                <video src={getImageSrc(getUrl(item))} muted preload="metadata" playsInline />
                <span className="pg-play-badge">▶</span>
              </>
            ) : (
              <img src={getImageSrc(getUrl(item))} alt={item.caption || `Photo ${i + 1}`} loading="lazy" />
            )}
            {item.caption && <span className="pg-caption">{item.caption}</span>}
          </button>
        ))}
      </div>

      {hasMore && (
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button
            type="button"
            className="pg-load-more"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            style={{ "--accent": accentColor }}
          >
            Load More ({sorted.length - visibleCount} remaining)
          </button>
        </div>
      )}

      <p style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "#8a9a6a", letterSpacing: 1 }}>
        {countLabel} in this project
      </p>

      {lightboxIdx !== null && (
        <div className="pg-lightbox" onClick={closeLightbox}>
          <button type="button" className="pg-lightbox-close" onClick={closeLightbox}>✕</button>
          {lightboxIdx > 0 && (
            <button type="button" className="pg-lightbox-nav pg-lightbox-prev" onClick={(e) => { e.stopPropagation(); goPrev(); }}>‹</button>
          )}
          {lightboxIdx < sorted.length - 1 && (
            <button type="button" className="pg-lightbox-nav pg-lightbox-next" onClick={(e) => { e.stopPropagation(); goNext(); }}>›</button>
          )}
          <div className="pg-lightbox-content" onClick={(e) => e.stopPropagation()}>
            {isVideoMedia(sorted[lightboxIdx]) ? (
              <video
                key={getUrl(sorted[lightboxIdx])}
                src={getImageSrc(getUrl(sorted[lightboxIdx]))}
                controls
                autoPlay
                playsInline
                className="pg-lightbox-video"
              />
            ) : (
              <img src={getImageSrc(getUrl(sorted[lightboxIdx]))} alt={sorted[lightboxIdx].caption || ""} />
            )}
            {sorted[lightboxIdx].caption && (
              <p className="pg-lightbox-caption">{sorted[lightboxIdx].caption}</p>
            )}
            <p className="pg-lightbox-count">{lightboxIdx + 1} / {sorted.length}</p>
          </div>
        </div>
      )}

      <style>{`
        .pg-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 6px;
        }
        .pg-item {
          position: relative;
          border: none;
          padding: 0;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 1;
          background: #1a2810;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .pg-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(42,58,20,0.15);
        }
        .pg-item img, .pg-item video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pg-play-badge {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          pointer-events: none;
        }
        .pg-caption {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 8px 12px;
          background: linear-gradient(to top, rgba(20,28,10,0.85), transparent);
          font-size: 11px;
          color: rgba(245,240,232,0.9);
          text-align: left;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .pg-item:hover .pg-caption { opacity: 1; }
        .pg-load-more {
          padding: 12px 32px;
          border-radius: 24px;
          border: 1.5px solid var(--accent);
          background: transparent;
          color: var(--accent);
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pg-load-more:hover {
          background: var(--accent);
          color: #fff;
        }
        .pg-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(10,14,6,0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .pg-lightbox-content {
          max-width: 90vw;
          max-height: 90vh;
          text-align: center;
        }
        .pg-lightbox-content img, .pg-lightbox-video {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 8px;
        }
        .pg-lightbox-content img {
          display: block;
        }
        .pg-lightbox-caption {
          color: rgba(245,240,232,0.85);
          font-size: 13px;
          margin-top: 12px;
        }
        .pg-lightbox-count {
          color: rgba(138,154,106,0.7);
          font-size: 11px;
          margin-top: 8px;
          letter-spacing: 1px;
        }
        .pg-lightbox-close {
          position: absolute;
          top: 20px; right: 24px;
          background: none;
          border: none;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          opacity: 0.7;
        }
        .pg-lightbox-close:hover { opacity: 1; }
        .pg-lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.1);
          border: none;
          color: #fff;
          font-size: 36px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pg-lightbox-nav:hover { background: rgba(255,255,255,0.2); }
        .pg-lightbox-prev { left: 20px; }
        .pg-lightbox-next { right: 20px; }
        @media (max-width: 1400px) {
          .pg-grid { grid-template-columns: repeat(10, 1fr); }
        }
        @media (max-width: 1100px) {
          .pg-grid { grid-template-columns: repeat(8, 1fr); }
        }
        @media (max-width: 768px) {
          .pg-grid { grid-template-columns: repeat(5, 1fr); gap: 5px; }
        }
        @media (max-width: 640px) {
          .pg-grid { grid-template-columns: repeat(3, 1fr); gap: 4px; }
        }
      `}</style>
    </>
  );
}

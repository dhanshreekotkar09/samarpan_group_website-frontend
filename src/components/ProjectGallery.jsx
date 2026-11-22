import { useState, useEffect, useCallback, useRef } from "react";
import { getImageSrc } from "../api/client";
import { isVideoMedia } from "../utils/media";

export default function ProjectGallery({ media = [], gallery, accentColor = "#8a9a4a" }) {
  const items = media.length ? media : (gallery || []);
  const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const getUrl = (item) => item.url || item.image || (typeof item === "string" ? item : "");

  const [filter, setFilter] = useState("all"); // "all" | "photos" | "videos"
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState("cinema"); // "cinema" | "grid"
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const filmstripRef = useRef(null);

  // Filtered items
  const displayItems = sorted.filter((item) => {
    if (filter === "photos") return !isVideoMedia(item);
    if (filter === "videos") return isVideoMedia(item);
    return true;
  });

  // Keep activeIndex within bounds when filter changes
  useEffect(() => {
    if (activeIndex >= displayItems.length) {
      setActiveIndex(0);
    }
  }, [filter, displayItems.length, activeIndex]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i < displayItems.length - 1 ? i + 1 : 0));
  }, [displayItems.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i > 0 ? i - 1 : displayItems.length - 1));
  }, [displayItems.length]);

  const goLightboxNext = useCallback(() => {
    setLightboxIdx((i) => (i !== null && i < displayItems.length - 1 ? i + 1 : 0));
  }, [displayItems.length]);

  const goLightboxPrev = useCallback(() => {
    setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : displayItems.length - 1));
  }, [displayItems.length]);

  const closeLightbox = () => setLightboxIdx(null);

  // Auto-scroll filmstrip to active thumbnail
  useEffect(() => {
    if (filmstripRef.current && filmstripRef.current.children[activeIndex]) {
      filmstripRef.current.children[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (lightboxIdx !== null) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") goLightboxNext();
        if (e.key === "ArrowLeft") goLightboxPrev();
      } else if (viewMode === "cinema") {
        if (e.key === "ArrowRight") goNext();
        if (e.key === "ArrowLeft") goPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, viewMode, goNext, goPrev, goLightboxNext, goLightboxPrev]);

  if (!sorted.length) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0", color: "#8a9a6a", fontSize: 14 }}>
        No walkthrough photos or videos uploaded for this project yet.
      </div>
    );
  }

  const currentItem = displayItems[activeIndex] || displayItems[0];
  const isCurrentVideo = isVideoMedia(currentItem);
  const photoCount = sorted.filter((item) => !isVideoMedia(item)).length;
  const videoCount = sorted.filter((item) => isVideoMedia(item)).length;

  return (
    <div className="pg-container">
      {/* ── TOP CONTROLS: VIEW SWITCHER & FILTER TABS ── */}
      <div className="pg-toolbar">
        {/* Mode Switcher */}
        <div className="pg-mode-switch">
          <button
            type="button"
            className={`pg-mode-btn ${viewMode === "cinema" ? "active" : ""}`}
            onClick={() => setViewMode("cinema")}
          >
            <span>🎬</span> Cinema Walkthrough
          </button>
          <button
            type="button"
            className={`pg-mode-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <span>▦</span> All Grid View
          </button>
        </div>

        {/* Media Filter Tabs */}
        <div className="pg-filter-group">
          {photoCount > 0 && videoCount > 0 ? (
            <>
              <button
                type="button"
                className={`pg-filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All ({sorted.length})
              </button>
              <button
                type="button"
                className={`pg-filter-btn ${filter === "photos" ? "active" : ""}`}
                onClick={() => setFilter("photos")}
              >
                📸 Photos ({photoCount})
              </button>
              <button
                type="button"
                className={`pg-filter-btn video-pill ${filter === "videos" ? "active" : ""}`}
                onClick={() => setFilter("videos")}
              >
                🎥 Videos ({videoCount})
              </button>
            </>
          ) : videoCount > 0 ? (
            <div className="pg-meta-pill video-only">
              <span>🎥 {videoCount} Walkthrough Videos</span>
            </div>
          ) : (
            <div className="pg-meta-pill">
              <span>📸 {photoCount} Project Photos</span>
            </div>
          )}
        </div>
      </div>

      {/* ── VIEW MODE 1: CINEMA STAGE ── */}
      {viewMode === "cinema" ? (
        <div className="pg-cinema-box">
          {/* Main Stage Viewport */}
          <div className="pg-stage">
            <div className="pg-stage-header">
              <span className={`pg-stage-counter ${isCurrentVideo ? "is-video" : ""}`}>
                {isCurrentVideo ? "🎥 Video Clip" : "✦ Photo"} {activeIndex + 1} of {displayItems.length}
              </span>
              <button
                type="button"
                className="pg-zoom-pill"
                onClick={() => setLightboxIdx(activeIndex)}
              >
                {isCurrentVideo ? "🔍 Watch Fullscreen" : "🔍 Click to Zoom"}
              </button>
            </div>

            <div className="pg-stage-viewport">
              {isCurrentVideo ? (
                <div
                  className="pg-stage-video-wrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    key={getUrl(currentItem)}
                    src={getImageSrc(getUrl(currentItem))}
                    controls
                    playsInline
                    preload="metadata"
                    className="pg-stage-video-elem"
                  />
                </div>
              ) : (
                <img
                  src={getImageSrc(getUrl(currentItem))}
                  alt={currentItem.caption || `Project View ${activeIndex + 1}`}
                  className="pg-stage-media"
                  onClick={() => setLightboxIdx(activeIndex)}
                />
              )}

              {/* Prev / Next Stage Arrows */}
              {displayItems.length > 1 && (
                <>
                  <button
                    type="button"
                    className="pg-arrow-btn pg-arrow-prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    aria-label="Previous media"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="pg-arrow-btn pg-arrow-next"
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    aria-label="Next media"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Stage Caption Bar */}
            <div className="pg-stage-caption-bar">
              <span className="pg-stage-caption-text">
                {isCurrentVideo ? "🎥 " : "📸 "}
                {currentItem.caption ||
                  (isCurrentVideo
                    ? `Site Video Walkthrough Clip #${activeIndex + 1}`
                    : `Site Detail View #${activeIndex + 1}`)}
              </span>
              <span className="pg-stage-hint">
                {isCurrentVideo
                  ? "▶ प्ले बटणावर क्लिक करून व्हिडिओ सुरू करा"
                  : "💡 बाण (‹ / ›) किंवा कीबोर्ड वापरून पुढील फोटो पहा"}
              </span>
            </div>
          </div>

          {/* Filmstrip Strip */}
          <div className="pg-filmstrip-outer">
            <div className="pg-filmstrip" ref={filmstripRef}>
              {displayItems.map((item, idx) => {
                const isVideo = isVideoMedia(item);
                return (
                  <button
                    key={item._id || idx}
                    type="button"
                    className={`pg-filmstrip-thumb ${idx === activeIndex ? "active" : ""} ${isVideo ? "is-video-thumb" : ""}`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    {isVideo ? (
                      /* ── PROPER VIDEO THUMBNAIL (NO BROKEN IMG) ── */
                      <div className="pg-thumb-video-box">
                        <video
                          src={`${getImageSrc(getUrl(item))}#t=0.5`}
                          muted
                          preload="metadata"
                          playsInline
                          className="pg-thumb-video-elem"
                        />
                        <div className="pg-thumb-video-overlay">
                          <span className="pg-thumb-play-icon">▶</span>
                          <span className="pg-thumb-video-label">VIDEO</span>
                        </div>
                      </div>
                    ) : (
                      /* ── PHOTO THUMBNAIL ── */
                      <img
                        src={getImageSrc(getUrl(item))}
                        alt=""
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.opacity = "0.3";
                        }}
                      />
                    )}

                    <span className="pg-thumb-badge">
                      {isVideo ? "🎥 " : ""}{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ── VIEW MODE 2: MASONRY / EDITORIAL GRID ── */
        <div className="pg-masonry-grid">
          {displayItems.map((item, i) => {
            const isVideo = isVideoMedia(item);
            return (
              <div
                key={item._id || i}
                className={`pg-grid-card ${isVideo ? "is-video-card" : ""}`}
                onClick={() => setLightboxIdx(i)}
              >
                <div className="pg-grid-img-wrap">
                  {isVideo ? (
                    <div className="pg-grid-video-preview">
                      <video
                        src={`${getImageSrc(getUrl(item))}#t=0.5`}
                        muted
                        preload="metadata"
                        playsInline
                        className="pg-grid-video-elem"
                      />
                      <div className="pg-grid-video-tag-pill">
                        <span>🎥 Video Walkthrough</span>
                      </div>
                      <div className="pg-grid-center-play">
                        <span className="pg-grid-play-icon">▶</span>
                        <span className="pg-grid-play-txt">Play Video</span>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={getImageSrc(getUrl(item))}
                      alt={item.caption || `Photo ${i + 1}`}
                      loading="lazy"
                    />
                  )}

                  <div className="pg-grid-overlay">
                    <span className="pg-grid-zoom-pill">
                      {isVideo ? "▶ Play Fullscreen" : "🔍 Zoom"}
                    </span>
                    {item.caption && (
                      <span className="pg-grid-caption">{item.caption}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── FULLSCREEN LIGHTBOX ── */}
      {lightboxIdx !== null && (
        <div className="pg-lightbox" onClick={closeLightbox}>
          <button
            type="button"
            className="pg-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ✕
          </button>

          {displayItems.length > 1 && (
            <>
              <button
                type="button"
                className="pg-lightbox-nav pg-lightbox-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  goLightboxPrev();
                }}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                className="pg-lightbox-nav pg-lightbox-next"
                onClick={(e) => {
                  e.stopPropagation();
                  goLightboxNext();
                }}
                aria-label="Next"
              >
                ›
              </button>
            </>
          )}

          <div
            className="pg-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideoMedia(displayItems[lightboxIdx]) ? (
              <video
                key={getUrl(displayItems[lightboxIdx])}
                src={getImageSrc(getUrl(displayItems[lightboxIdx]))}
                controls
                autoPlay
                playsInline
                className="pg-lightbox-media pg-lightbox-video"
              />
            ) : (
              <img
                src={getImageSrc(getUrl(displayItems[lightboxIdx]))}
                alt={displayItems[lightboxIdx].caption || ""}
                className="pg-lightbox-media"
              />
            )}
            <div className="pg-lightbox-footer">
              <span className="pg-lightbox-caption">
                {isVideoMedia(displayItems[lightboxIdx]) ? "🎥 " : "📸 "}
                {displayItems[lightboxIdx].caption ||
                  (isVideoMedia(displayItems[lightboxIdx])
                    ? `Video Walkthrough (${lightboxIdx + 1} of ${displayItems.length})`
                    : `Photo ${lightboxIdx + 1} of ${displayItems.length}`)}
              </span>
              <span className="pg-lightbox-count">
                {lightboxIdx + 1} / {displayItems.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── SCOPED GALLERY STYLES ── */}
      <style>{`
        .pg-container {
          margin-top: 12px;
        }

        /* TOOLBAR */
        .pg-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 22px;
        }

        .pg-mode-switch {
          display: inline-flex;
          align-items: center;
          background: #ffffff;
          padding: 4px;
          border-radius: 20px;
          border: 1px solid rgba(138,154,74,0.25);
          box-shadow: 0 4px 14px rgba(42,42,36,0.04);
          gap: 4px;
        }

        .pg-mode-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 16px;
          border: none;
          background: transparent;
          font-family: var(--font-sans);
          font-size: 11.5px;
          font-weight: 600;
          color: #555545;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pg-mode-btn.active {
          background: #2a3a14;
          color: #f5f0e8;
          box-shadow: 0 4px 10px rgba(42,58,20,0.18);
        }

        /* FILTER TABS */
        .pg-filter-group {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .pg-filter-btn {
          padding: 6px 14px;
          border-radius: 18px;
          border: 1.5px solid rgba(138,154,74,0.28);
          background: #ffffff;
          color: #4a5a2f;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pg-filter-btn:hover {
          border-color: #8a9a4a;
          background: rgba(138,154,74,0.08);
        }

        .pg-filter-btn.active {
          background: #8a9a4a;
          color: #1a2408;
          border-color: #8a9a4a;
          font-weight: 700;
        }

        .pg-filter-btn.video-pill.active {
          background: #a43825;
          color: #ffffff;
          border-color: #a43825;
        }

        .pg-meta-pill {
          font-size: 11.5px;
          font-weight: 600;
          color: #4a5a1f;
          background: rgba(138,154,74,0.12);
          border: 1px solid rgba(138,154,74,0.25);
          padding: 6px 14px;
          border-radius: 20px;
        }

        .pg-meta-pill.video-only {
          background: rgba(164,56,37,0.1);
          border-color: rgba(164,56,37,0.3);
          color: #a43825;
        }

        /* ── CINEMA STAGE ── */
        .pg-cinema-box {
          background: #ffffff;
          border-radius: 24px;
          padding: 24px;
          border: 1px solid rgba(138,154,74,0.22);
          box-shadow: 0 12px 36px rgba(42,42,36,0.06);
        }

        .pg-stage {
          position: relative;
          background: #0f120d;
          border-radius: 18px;
          overflow: hidden;
        }

        .pg-stage-header {
          position: absolute;
          top: 14px;
          left: 16px;
          right: 16px;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          pointer-events: none;
        }

        .pg-stage-counter {
          background: rgba(20,28,12,0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15);
          color: #e8d9b5;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 6px 14px;
          border-radius: 20px;
        }

        .pg-stage-counter.is-video {
          background: rgba(164,56,37,0.85);
          color: #ffffff;
          border-color: rgba(255,255,255,0.3);
        }

        .pg-zoom-pill {
          pointer-events: auto;
          background: rgba(20,28,12,0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          color: #ffffff;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .pg-zoom-pill:hover {
          background: #2a3a14;
          transform: translateY(-1px);
        }

        .pg-stage-viewport {
          position: relative;
          width: 100%;
          min-height: 480px;
          max-height: 540px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000000;
          overflow: hidden;
        }

        .pg-stage-media {
          width: 100%;
          height: 520px;
          object-fit: cover;
          display: block;
          cursor: zoom-in;
          transition: transform 0.4s ease;
        }

        .pg-stage-media:hover {
          transform: scale(1.015);
        }

        /* STAGE VIDEO PLAYER */
        .pg-stage-video-wrap {
          width: 100%;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000000;
        }

        .pg-stage-video-elem {
          width: 100%;
          height: 100%;
          max-height: 520px;
          object-fit: contain;
          outline: none;
        }

        /* ARROWS */
        .pg-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(20,28,12,0.7);
          backdrop-filter: blur(10px);
          color: #ffffff;
          font-size: 26px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          transition: all 0.25s ease;
        }

        .pg-arrow-btn:hover {
          background: #8a9a4a;
          color: #1a2408;
          transform: translateY(-50%) scale(1.1);
        }

        .pg-arrow-prev { left: 16px; }
        .pg-arrow-next { right: 16px; }

        /* CAPTION BAR */
        .pg-stage-caption-bar {
          background: #fbf9f4;
          border-top: 1px solid rgba(138,154,74,0.18);
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        .pg-stage-caption-text {
          font-size: 13px;
          font-weight: 600;
          color: #2a3a14;
        }

        .pg-stage-hint {
          font-size: 11px;
          color: #7a8a60;
        }

        /* FILMSTRIP */
        .pg-filmstrip-outer {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px dashed rgba(138,154,74,0.2);
        }

        .pg-filmstrip {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: thin;
          scrollbar-color: rgba(138,154,74,0.3) transparent;
        }

        .pg-filmstrip::-webkit-scrollbar {
          height: 6px;
        }
        .pg-filmstrip::-webkit-scrollbar-thumb {
          background: rgba(138,154,74,0.35);
          border-radius: 10px;
        }

        .pg-filmstrip-thumb {
          position: relative;
          flex: 0 0 115px;
          height: 78px;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid rgba(138,154,74,0.18);
          background: #181d12;
          cursor: pointer;
          padding: 0;
          transition: all 0.25s ease;
        }

        .pg-filmstrip-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          opacity: 0.75;
          transition: opacity 0.2s ease;
        }

        .pg-filmstrip-thumb:hover img {
          opacity: 1;
        }

        .pg-filmstrip-thumb.active {
          border-color: #8a9a4a;
          box-shadow: 0 0 0 3px rgba(138,154,74,0.38);
          transform: translateY(-2px);
        }

        .pg-filmstrip-thumb.active img {
          opacity: 1;
        }

        /* VIDEO THUMBNAIL CARD */
        .pg-thumb-video-box {
          position: relative;
          width: 100%;
          height: 100%;
          background: #141810;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pg-thumb-video-elem {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.55;
          transition: opacity 0.2s ease;
        }

        .pg-filmstrip-thumb:hover .pg-thumb-video-elem,
        .pg-filmstrip-thumb.active .pg-thumb-video-elem {
          opacity: 0.85;
        }

        .pg-thumb-video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(14,18,10,0.85) 0%, rgba(14,18,10,0.4) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }

        .pg-thumb-play-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #8a9a4a;
          color: #1a2408;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 2px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.5);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .pg-filmstrip-thumb:hover .pg-thumb-play-icon,
        .pg-filmstrip-thumb.active .pg-thumb-play-icon {
          background: #d4e090;
          transform: scale(1.15);
        }

        .pg-thumb-video-label {
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #e8d9b5;
          text-shadow: 0 1px 3px rgba(0,0,0,0.8);
        }

        .pg-thumb-badge {
          position: absolute;
          bottom: 4px;
          right: 4px;
          background: rgba(0,0,0,0.7);
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 6px;
          letter-spacing: 0.3px;
        }

        /* ── MASONRY / EDITORIAL GRID ── */
        .pg-masonry-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .pg-grid-card {
          background: #ffffff;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(138,154,74,0.2);
          box-shadow: 0 8px 24px rgba(42,42,36,0.05);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .pg-grid-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(42,42,36,0.12);
        }

        .pg-grid-img-wrap {
          position: relative;
          height: 260px;
          background: #141712;
          overflow: hidden;
        }

        .pg-grid-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .pg-grid-card:hover .pg-grid-img-wrap img {
          transform: scale(1.04);
        }

        /* GRID VIDEO CARD */
        .pg-grid-video-preview {
          position: relative;
          width: 100%;
          height: 100%;
          background: #000000;
        }

        .pg-grid-video-elem {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.65;
          transition: transform 0.4s ease, opacity 0.3s ease;
        }

        .pg-grid-card:hover .pg-grid-video-elem {
          transform: scale(1.03);
          opacity: 0.85;
        }

        .pg-grid-video-tag-pill {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(164,56,37,0.9);
          backdrop-filter: blur(6px);
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 4px 10px;
          border-radius: 12px;
        }

        .pg-grid-center-play {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          pointer-events: none;
        }

        .pg-grid-play-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #8a9a4a;
          color: #1a2408;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 3px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.4);
          transition: transform 0.25s ease, background 0.25s ease;
        }

        .pg-grid-card:hover .pg-grid-play-icon {
          background: #d4e090;
          transform: scale(1.15);
        }

        .pg-grid-play-txt {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #ffffff;
          text-shadow: 0 2px 6px rgba(0,0,0,0.8);
        }

        .pg-grid-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(20,28,12,0.85) 0%, transparent 60%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 16px;
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }

        .pg-grid-card:hover .pg-grid-overlay {
          opacity: 1;
        }

        .pg-grid-zoom-pill {
          align-self: flex-end;
          background: rgba(255,255,255,0.25);
          backdrop-filter: blur(6px);
          color: #ffffff;
          font-size: 10.5px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 12px;
        }

        .pg-grid-caption {
          color: #f5f0e8;
          font-size: 12px;
          font-weight: 500;
        }

        /* ── LIGHTBOX ── */
        .pg-lightbox {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(10,14,8,0.95);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .pg-lightbox-close {
          position: absolute;
          top: 24px;
          right: 28px;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 30px;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s ease;
          line-height: 1;
          z-index: 100;
        }

        .pg-lightbox-close:hover {
          opacity: 1;
        }

        .pg-lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          color: #ffffff;
          font-size: 34px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          z-index: 100;
        }

        .pg-lightbox-nav:hover {
          background: #8a9a4a;
          color: #1a2408;
          transform: translateY(-50%) scale(1.08);
        }

        .pg-lightbox-prev { left: 24px; }
        .pg-lightbox-next { right: 24px; }

        .pg-lightbox-content {
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .pg-lightbox-media {
          max-width: 88vw;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.6);
        }

        .pg-lightbox-footer {
          margin-top: 14px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .pg-lightbox-caption {
          color: #f5f0e8;
          font-size: 14px;
          font-weight: 500;
        }

        .pg-lightbox-count {
          color: #8aaa60;
          font-size: 12px;
          font-weight: 600;
        }

        /* RESPONSIVE */
        @media (max-width: 960px) {
          .pg-stage-viewport, .pg-stage-video-wrap, .pg-stage-media { height: 380px; min-height: 380px; }
          .pg-masonry-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .pg-cinema-box { padding: 16px; }
          .pg-filmstrip-thumb { flex: 0 0 95px; height: 68px; }
        }

        @media (max-width: 640px) {
          .pg-stage-viewport, .pg-stage-video-wrap, .pg-stage-media { height: 260px; min-height: 260px; }
          .pg-masonry-grid { grid-template-columns: 1fr; }
          .pg-arrow-btn { width: 38px; height: 38px; font-size: 20px; }
          .pg-lightbox-nav { width: 42px; height: 42px; font-size: 26px; }
          .pg-lightbox-prev { left: 10px; }
          .pg-lightbox-next { right: 10px; }
          .pg-stage-caption-bar { flex-direction: column; align-items: flex-start; }
          .pg-filter-group { width: 100%; justify-content: flex-start; }
        }
      `}</style>
    </div>
  );
}

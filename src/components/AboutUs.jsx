import { useState } from "react";

const VALUES = [
  {
    icon: "✦",
    title: "Craftsmanship",
    desc: "Every detail is deliberately chosen — from the curve of a cornice to the grain of a wood finish. We believe beauty lives in precision.",
  },
  {
    icon: "◈",
    title: "Collaboration",
    desc: "Your home should tell your story. We listen deeply before we design, ensuring every space is a genuine reflection of who you are.",
  },
  {
    icon: "◉",
    title: "Timelessness",
    desc: "We design spaces that outlast trends — rooted in classical proportion but alive with contemporary sensibility.",
  },
  {
    icon: "◇",
    title: "Integrity",
    desc: "Transparent pricing, honest timelines, and a commitment to delivering exactly what we promise — every single time.",
  },
];

const STATS = [
  { number: "120+", label: "Projects Completed" },
  { number: "8+", label: "Years of Excellence" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "3", label: "States Served" },
];

const TEAM = [
  {
    name: "Ar. Priya Samarpan",
    role: "Founder & Principal Designer",
    bio: "With a degree from Sir J.J. College of Architecture and over a decade of practice, Priya brings a rare blend of classical training and contemporary vision.",
    initials: "PS",
    accent: "#8a9a4a",
  },
  {
    name: "Rohan Kulkarni",
    role: "Senior Interior Architect",
    bio: "Rohan's spatial intelligence and love for material honesty have shaped some of our most celebrated residential projects across Maharashtra.",
    initials: "RK",
    accent: "#c8b89a",
  },
  {
    name: "Sneha Deshpande",
    role: "3D Visualization & Styling Lead",
    bio: "Sneha translates concepts into photorealistic renders that help clients fall in love with their future homes before a single nail is driven.",
    initials: "SD",
    accent: "#6a7a8a",
  },
];

const MILESTONES = [
  { year: "2016", event: "Founded in Nashik with a single residential project" },
  { year: "2018", event: "Expanded to commercial interiors; first hospitality project" },
  { year: "2020", event: "Launched 3D visualization studio; went fully digital" },
  { year: "2022", event: "Completed 75th project; opened Panchavati design studio" },
  { year: "2024", event: "Crossed 120 projects across Maharashtra" },
];

export default function AboutUs() {
  const [activeTeam, setActiveTeam] = useState(null);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ab-page {
          font-family: var(--font-sans);
          background: linear-gradient(160deg, #f5f0e8 0%, #ede8d8 40%, #e8e0cc 100%);
          color: #3d3d30;
          min-height: 100vh;
        }

        /* ── HERO ── */
        .ab-hero {
          position: relative;
          padding: 100px 60px 80px;
          overflow: hidden;
          border-bottom: 1px solid rgba(138,154,74,0.2);
        }
        .ab-hero-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 65% at 100% 0%, rgba(138,154,74,0.1) 0%, transparent 65%),
            radial-gradient(ellipse 45% 55% at 0% 100%, rgba(200,184,154,0.18) 0%, transparent 65%);
        }
        .ab-hero-inner {
          max-width: 1300px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center;
          position: relative; z-index: 1;
        }
        .ab-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 20px;
          background: rgba(138,154,74,0.1);
          border: 1px solid rgba(138,154,74,0.3);
          border-radius: 20px;
          font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
          color: #4a5a1f; margin-bottom: 28px;
        }
        .ab-hero h1 {
          font-family: var(--font-sans);
          font-size: clamp(44px, 5.5vw, 72px);
          font-weight: 300; line-height: 1.08;
          color: #2a2a24; letter-spacing: -1.5px;
          margin-bottom: 24px;
        }
        .ab-hero h1 em { font-style: normal; font-weight: 600; color: #8a9a4a; }
        .ab-hero-desc {
          font-size: 14px; font-weight: 300; line-height: 1.9;
          color: #5a5a4a; max-width: 420px; margin-bottom: 40px;
        }
        .ab-hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 28px;
          background: linear-gradient(135deg, #2a2a24 0%, #3d4a1f 100%);
          color: #e8d9b5; font-size: 11px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          border-radius: 10px; border: none; cursor: pointer;
          box-shadow: 0 6px 20px rgba(42,42,36,0.2);
          transition: all 0.3s ease; font-family: var(--font-sans);
        }
        .ab-hero-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(42,42,36,0.3); }

        /* RIGHT SIDE DECORATIVE PANEL */
        .ab-hero-panel {
          position: relative;
        }
        .ab-panel-card {
          background: rgba(255,252,245,0.75);
          border: 1px solid rgba(138,154,74,0.2);
          border-radius: 28px;
          padding: 48px 40px;
          box-shadow: 0 20px 60px rgba(42,42,36,0.1);
          position: relative; overflow: hidden;
        }
        .ab-panel-card::before {
          content: '';
          position: absolute; top: 0; right: 0;
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(138,154,74,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .ab-panel-quote {
          font-family: var(--font-sans);
          font-size: 22px; font-weight: 400;
          color: #2a2a24; line-height: 1.6;
          margin-bottom: 24px; position: relative;
        }
        .ab-panel-quote::before {
          content: '"';
          font-size: 80px; line-height: 0;
          color: rgba(138,154,74,0.2);
          position: absolute; top: 20px; left: -10px;
        }
        .ab-panel-attr {
          font-size: 11px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: #8a9a4a;
        }
        .ab-panel-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(138,154,74,0.3), transparent);
          margin: 28px 0;
        }
        .ab-panel-fact {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 16px;
        }
        .ab-panel-fact:last-child { margin-bottom: 0; }
        .ab-panel-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #8a9a4a; flex-shrink: 0;
        }
        .ab-panel-fact-text {
          font-size: 13px; font-weight: 300; color: #4a4a38; line-height: 1.5;
        }

        /* ── STATS ── */
        .ab-stats {
          background: linear-gradient(135deg, #2a2a24 0%, #3d4a1f 60%, #2a3214 100%);
          padding: 56px 60px;
        }
        .ab-stats-inner {
          max-width: 1300px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .ab-stat {
          padding: 20px 40px;
          border-right: 1px solid rgba(200,184,154,0.15);
          text-align: center;
        }
        .ab-stat:last-child { border-right: none; }
        .ab-stat-num {
          font-family: var(--font-sans);
          font-size: 52px; font-weight: 300;
          color: #e8d9b5; line-height: 1; letter-spacing: -2px;
          margin-bottom: 8px;
        }
        .ab-stat-num span { color: #8a9a4a; }
        .ab-stat-label {
          font-size: 10px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #6a6a58;
        }

        /* ── STORY ── */
        .ab-story {
          max-width: 1300px; margin: 0 auto;
          padding: 96px 60px;
          display: grid; grid-template-columns: 1fr 1.4fr;
          gap: 80px; align-items: start;
        }
        .ab-section-label {
          font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
          color: #8a9a4a; font-weight: 600; margin-bottom: 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .ab-section-label::before {
          content: ''; width: 32px; height: 1.5px;
          background: linear-gradient(90deg, #8a9a4a, transparent);
        }
        .ab-story-left h2 {
          font-family: var(--font-sans);
          font-size: clamp(34px, 3.5vw, 48px);
          font-weight: 400; color: #2a2a24;
          line-height: 1.15; letter-spacing: -0.5px;
          margin-bottom: 8px;
        }
        .ab-story-left h2 em { font-style: normal; font-weight: 600; color: #8a9a4a; }
        .ab-story-left p {
          font-size: 13px; font-weight: 300;
          color: #6a6a54; line-height: 1.9; margin-bottom: 20px;
        }

        /* TIMELINE */
        .ab-timeline { position: relative; padding-left: 28px; }
        .ab-timeline::before {
          content: '';
          position: absolute; left: 7px; top: 6px; bottom: 6px;
          width: 1.5px;
          background: linear-gradient(180deg, #8a9a4a 0%, rgba(138,154,74,0.1) 100%);
        }
        .ab-milestone {
          position: relative; margin-bottom: 32px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(138,154,74,0.1);
        }
        .ab-milestone:last-child { border-bottom: none; margin-bottom: 0; }
        .ab-milestone::before {
          content: '';
          position: absolute; left: -24px; top: 6px;
          width: 10px; height: 10px; border-radius: 50%;
          background: #8a9a4a;
          box-shadow: 0 0 0 3px rgba(138,154,74,0.15);
        }
        .ab-milestone-year {
          font-size: 10px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #8a9a4a; margin-bottom: 6px;
        }
        .ab-milestone-event {
          font-size: 13.5px; font-weight: 400; color: #2a2a24; line-height: 1.6;
        }

        /* ── VALUES ── */
        .ab-values-section {
          background: rgba(42,42,36,0.04);
          border-top: 1px solid rgba(138,154,74,0.15);
          border-bottom: 1px solid rgba(138,154,74,0.15);
          padding: 88px 60px;
        }
        .ab-values-inner { max-width: 1300px; margin: 0 auto; }
        .ab-values-header {
          text-align: center; margin-bottom: 60px;
        }
        .ab-values-header h2 {
          font-family: var(--font-sans);
          font-size: clamp(34px, 4vw, 52px);
          font-weight: 400; color: #2a2a24;
          letter-spacing: -0.5px; margin-top: 12px;
        }
        .ab-values-header h2 em { font-style: normal; font-weight: 600; color: #8a9a4a; }
        .ab-values-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
        }
        .ab-value-card {
          padding: 36px 28px;
          background: rgba(255,252,245,0.7);
          border: 1px solid rgba(138,154,74,0.18);
          border-radius: 20px;
          transition: all 0.3s ease;
          position: relative; overflow: hidden;
        }
        .ab-value-card::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #8a9a4a, #c8b89a);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s ease;
        }
        .ab-value-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(42,42,36,0.1); border-color: rgba(138,154,74,0.35); }
        .ab-value-card:hover::after { transform: scaleX(1); }
        .ab-value-icon {
          font-size: 24px; color: #8a9a4a;
          margin-bottom: 20px; display: block;
        }
        .ab-value-title {
          font-family: var(--font-sans);
          font-size: 22px; font-weight: 500;
          color: #2a2a24; margin-bottom: 12px;
        }
        .ab-value-desc {
          font-size: 12.5px; font-weight: 300;
          color: #5a5a4a; line-height: 1.85;
        }

        /* ── TEAM ── */
        .ab-team-section {
          max-width: 1300px; margin: 0 auto;
          padding: 96px 60px;
        }
        .ab-team-header { margin-bottom: 56px; }
        .ab-team-header h2 {
          font-family: var(--font-sans);
          font-size: clamp(34px, 4vw, 52px);
          font-weight: 400; color: #2a2a24;
          letter-spacing: -0.5px; margin-top: 12px;
        }
        .ab-team-header h2 em { font-style: normal; font-weight: 600; color: #8a9a4a; }
        .ab-team-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;
        }
        .ab-team-card {
          background: rgba(255,252,245,0.8);
          border: 1px solid rgba(138,154,74,0.18);
          border-radius: 24px;
          padding: 40px 32px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative; overflow: hidden;
        }
        .ab-team-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 56px rgba(42,42,36,0.12);
          border-color: rgba(138,154,74,0.4);
        }
        .ab-team-avatar {
          width: 72px; height: 72px; border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-sans);
          font-size: 26px; font-weight: 500; color: #fff;
          margin-bottom: 24px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        .ab-team-name {
          font-family: var(--font-sans);
          font-size: 22px; font-weight: 500; color: #2a2a24;
          margin-bottom: 4px;
        }
        .ab-team-role {
          font-size: 10px; font-weight: 600; letter-spacing: 1.8px;
          text-transform: uppercase; color: #8a9a4a; margin-bottom: 18px;
        }
        .ab-team-bio {
          font-size: 12.5px; font-weight: 300;
          color: #5a5a4a; line-height: 1.85;
        }
        .ab-team-divider {
          width: 40px; height: 1.5px;
          background: linear-gradient(90deg, #8a9a4a, transparent);
          margin-bottom: 18px;
        }

        /* ── CTA BANNER ── */
        .ab-cta-section {
          padding: 0 60px 96px;
          max-width: 1300px; margin: 0 auto;
        }
        .ab-cta-inner {
          background: linear-gradient(135deg, #2a2a24 0%, #3d4a1f 60%, #2a3214 100%);
          border-radius: 28px;
          padding: 72px 80px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 40px;
          position: relative; overflow: hidden;
        }
        .ab-cta-inner::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 70% at 80% 50%, rgba(138,154,74,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .ab-cta-left { position: relative; z-index: 1; }
        .ab-cta-tag {
          font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
          color: #8a9a4a; font-weight: 600; margin-bottom: 16px;
        }
        .ab-cta-title {
          font-family: var(--font-sans);
          font-size: clamp(28px, 3vw, 42px);
          font-weight: 400; color: #e8d9b5;
          line-height: 1.2; letter-spacing: -0.3px;
        }
        .ab-cta-title em { font-style: normal; font-weight: 600; color: #c8d890; }
        .ab-cta-right { position: relative; z-index: 1; flex-shrink: 0; }
        .ab-cta-btn {
          padding: 16px 36px;
          background: rgba(255,252,245,0.1);
          border: 1.5px solid rgba(200,184,154,0.4);
          border-radius: 12px;
          color: #e8d9b5; font-size: 11.5px; font-weight: 600;
          letter-spacing: 1.8px; text-transform: uppercase;
          cursor: pointer; font-family: var(--font-sans);
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .ab-cta-btn:hover {
          background: rgba(255,252,245,0.18);
          border-color: rgba(200,184,154,0.7);
          transform: translateY(-2px);
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .ab-hero-inner { grid-template-columns: 1fr; gap: 48px; }
          .ab-stats-inner { grid-template-columns: repeat(2, 1fr); }
          .ab-stat { border-right: none; border-bottom: 1px solid rgba(200,184,154,0.15); }
          .ab-stat:nth-child(odd) { border-right: 1px solid rgba(200,184,154,0.15); }
          .ab-story { grid-template-columns: 1fr; gap: 48px; }
          .ab-values-grid { grid-template-columns: repeat(2, 1fr); }
          .ab-team-grid { grid-template-columns: repeat(2, 1fr); }
          .ab-cta-inner { flex-direction: column; text-align: center; padding: 48px 40px; }
        }
        @media (max-width: 640px) {
          .ab-hero, .ab-story, .ab-values-section,
          .ab-team-section, .ab-cta-section { padding-left: 20px; padding-right: 20px; }
          .ab-stats { padding-left: 20px; padding-right: 20px; }
          .ab-stats-inner { grid-template-columns: repeat(2, 1fr); }
          .ab-values-grid { grid-template-columns: 1fr; }
          .ab-team-grid { grid-template-columns: 1fr; }
          .ab-hero-panel { display: none; }
        }
      `}</style>

      <div className="ab-page">

        {/* ── HERO ── */}
        <section className="ab-hero">
          <div className="ab-hero-bg" />
          <div className="ab-hero-inner">
            <div>
              <div className="ab-eyebrow"><span>✦</span><span>Our Story</span><span>✦</span></div>
              <h1>
                Designing with <em>Soul,</em><br />
                Building with <em>Purpose</em>
              </h1>
              <p className="ab-hero-desc">
                Samarpan Group was born from a simple belief — that every home deserves to be
                a sanctuary. Since 2016, we have been transforming spaces across Nashik and
                Maharashtra with an unwavering commitment to craft, beauty, and meaning.
              </p>
              <button
                className="ab-hero-cta"
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Start Your Journey →
              </button>
            </div>

            <div className="ab-hero-panel">
              <div className="ab-panel-card">
                <div className="ab-panel-quote">
                  A home is not just a structure. It is the physical expression of a family's
                  dreams, values, and love.
                </div>
                <div className="ab-panel-attr">— Ar. Priya Samarpan, Founder</div>
                <div className="ab-panel-divider" />
                <div className="ab-panel-fact">
                  <div className="ab-panel-dot" />
                  <div className="ab-panel-fact-text">Based in Nashik, serving all of Maharashtra</div>
                </div>
                <div className="ab-panel-fact">
                  <div className="ab-panel-dot" />
                  <div className="ab-panel-fact-text">Full-service: design, execution, and styling</div>
                </div>
                <div className="ab-panel-fact">
                  <div className="ab-panel-dot" />
                  <div className="ab-panel-fact-text">Free initial consultation for every project</div>
                </div>
                <div className="ab-panel-fact">
                  <div className="ab-panel-dot" />
                  <div className="ab-panel-fact-text">Certified architects and interior designers on team</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="ab-stats">
          <div className="ab-stats-inner">
            {STATS.map((s) => (
              <div key={s.label} className="ab-stat">
                <div className="ab-stat-num">
                  {s.number.replace(/[+%]/g, "")}
                  <span>{s.number.replace(/[^+%]/g, "")}</span>
                </div>
                <div className="ab-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── STORY + TIMELINE ── */}
        <div className="ab-story">
          <div className="ab-story-left">
            <div className="ab-section-label">Our Journey</div>
            <h2>From One Dream<br />to <em>Hundreds of Homes</em></h2>
            <p>
              What began as a single-room redesign project in Nashik in 2016 has grown into
              one of Maharashtra's most trusted interior design practices. We started with
              a belief that good design shouldn't be a luxury — it should be a right.
            </p>
            <p>
              Over the years, we have cultivated a team of passionate architects, designers,
              and artisans who share one goal: to create spaces that genuinely improve the
              lives of the people within them.
            </p>
            <p>
              Today, Samarpan Group operates from our Panchavati studio in Nashik, with
              projects spanning residential, commercial, and hospitality segments across
              Nashik, Pune, and Mumbai.
            </p>
          </div>

          <div>
            <div className="ab-section-label">Milestones</div>
            <div className="ab-timeline">
              {MILESTONES.map((m) => (
                <div key={m.year} className="ab-milestone">
                  <div className="ab-milestone-year">{m.year}</div>
                  <div className="ab-milestone-event">{m.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── VALUES ── */}
        <section className="ab-values-section">
          <div className="ab-values-inner">
            <div className="ab-values-header">
              <div className="ab-section-label" style={{ justifyContent: "center" }}>What We Stand For</div>
              <h2>The Principles Behind <em>Every Space</em></h2>
            </div>
            <div className="ab-values-grid">
              {VALUES.map((v) => (
                <div key={v.title} className="ab-value-card">
                  <span className="ab-value-icon">{v.icon}</span>
                  <div className="ab-value-title">{v.title}</div>
                  <div className="ab-value-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="ab-team-section">
          <div className="ab-team-header">
            <div className="ab-section-label">The People</div>
            <h2>Meet the <em>Creative Minds</em></h2>
          </div>
          <div className="ab-team-grid">
            {TEAM.map((member) => (
              <div key={member.name} className="ab-team-card"
                onMouseEnter={() => setActiveTeam(member.name)}
                onMouseLeave={() => setActiveTeam(null)}>
                <div
                  className="ab-team-avatar"
                  style={{ background: `linear-gradient(135deg, #2a2a24, ${member.accent})` }}
                >
                  {member.initials}
                </div>
                <div className="ab-team-name">{member.name}</div>
                <div className="ab-team-role">{member.role}</div>
                <div className="ab-team-divider" />
                <div className="ab-team-bio">{member.bio}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <div className="ab-cta-section">
          <div className="ab-cta-inner">
            <div className="ab-cta-left">
              <div className="ab-cta-tag">✦ Let's Create Together</div>
              <div className="ab-cta-title">
                Ready to transform<br />your <em>space into a story?</em>
              </div>
            </div>
            <div className="ab-cta-right">
              <button
                className="ab-cta-btn"
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Book Free Consultation →
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
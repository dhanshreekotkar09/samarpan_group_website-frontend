import { useEffect, useState } from "react";
import { getTestimonials } from "../api/client";

const DEFAULT_TESTIMONIALS = [
  {
    _id: "default-1",
    clientName: "Rahul & Snehal Deshmukh",
    location: "Gangapur Road, Nashik",
    projectType: "3BHK Full Residential Interior",
    rating: 5,
    comment:
      "Samarpan Group made our dream home a reality. The 3D concepts matched the final execution 100%. Highly satisfied with their carpentry and finish quality!",
  },
  {
    _id: "default-2",
    clientName: "Dr. Nilesh Kulkarni",
    location: "College Road, Nashik",
    projectType: "Clinic & Office Renovation",
    rating: 5,
    comment:
      "Very professional team. They completed the civil modifications and modern interior styling on time without any budget escalation.",
  },
  {
    _id: "default-3",
    clientName: "Sachin Patil",
    location: "Panchavati, Nashik",
    projectType: "Bungalow Civil Construction",
    rating: 5,
    comment:
      "From foundation RCC work to final painting, the on-site supervision was top notch. Ekdum transparent ani dedicated team ahe!",
  },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);

  useEffect(() => {
    getTestimonials()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTestimonials(res.data);
        }
      })
      .catch(() => {
        // use default fallback
      });
  }, []);

  return (
    <section className="sg-test-sec">
      <style>{`
        .sg-test-sec {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 32px 80px;
          font-family: var(--font-sans);
        }

        .sg-test-header {
          text-align: center;
          margin-bottom: 44px;
        }

        .sg-test-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 18px;
          background: rgba(138,154,74,0.12);
          border: 1px solid rgba(138,154,74,0.3);
          border-radius: 20px;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #4a5a1f;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .sg-test-title {
          font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 600;
          color: #2a2a24;
          letter-spacing: -0.5px;
        }

        .sg-test-title em {
          font-style: normal;
          color: #6b7c32;
        }

        .sg-test-sub {
          font-size: 14.5px;
          color: #6a6a55;
          margin-top: 8px;
        }

        .sg-test-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .sg-test-card {
          background: rgba(255, 252, 245, 0.9);
          border: 1px solid rgba(138,154,74,0.22);
          border-radius: 20px;
          padding: 30px 26px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 10px 30px rgba(42,42,36,0.04);
          transition: all 0.3s ease;
          position: relative;
        }

        .sg-test-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(42,42,36,0.08);
          border-color: rgba(138,154,74,0.45);
        }

        .sg-quote-icon {
          font-size: 38px;
          color: rgba(138,154,74,0.25);
          line-height: 1;
          font-family: Georgia, serif;
          margin-bottom: 8px;
        }

        .sg-test-stars {
          color: #eab308;
          font-size: 15px;
          letter-spacing: 2px;
          margin-bottom: 14px;
        }

        .sg-test-text {
          font-size: 14px;
          line-height: 1.7;
          color: #4a4a3a;
          margin-bottom: 22px;
          font-style: italic;
          flex: 1;
        }

        .sg-test-footer {
          border-top: 1px solid rgba(138,154,74,0.16);
          padding-top: 16px;
        }

        .sg-test-author {
          font-size: 15px;
          font-weight: 600;
          color: #2a2a24;
        }

        .sg-test-meta {
          font-size: 12px;
          color: #7a7a60;
          margin-top: 3px;
        }

        @media (max-width: 900px) {
          .sg-test-grid {
            grid-template-columns: 1fr;
          }
          .sg-test-sec {
            padding: 40px 20px 60px;
          }
        }
      `}</style>

      <div className="sg-test-header">
        <span className="sg-test-pill">✦ Client Stories</span>
        <h2 className="sg-test-title">
          What Our Clients <em>Say About Us</em>
        </h2>
        <p className="sg-test-sub">
          विश्वास, गुणवत्ता आणि वेळेवर काम — ग्राहकांचे मनोगत
        </p>
      </div>

      <div className="sg-test-grid">
        {testimonials.slice(0, 3).map((item) => (
          <div key={item._id} className="sg-test-card">
            <div>
              <div className="sg-quote-icon">“</div>
              <div className="sg-test-stars">
                {"★".repeat(item.rating || 5)}
                {"☆".repeat(5 - (item.rating || 5))}
              </div>
              <p className="sg-test-text">{item.comment}</p>
            </div>

            <div className="sg-test-footer">
              <div className="sg-test-author">{item.clientName}</div>
              <div className="sg-test-meta">
                {item.projectType} • {item.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

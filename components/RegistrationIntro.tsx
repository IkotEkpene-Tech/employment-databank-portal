import { Target, Users, Briefcase } from "lucide-react";

export const RegistrationIntro = () => {
  return (
    <div
      className="mb-6"
      style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 2px 16px rgba(0,60,30,0.07)",
        border: "1px solid #e4ede8",
        overflow: "hidden",
        animation: "introFadeIn 0.4s ease both",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes introFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .intro-card-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 640px) {
          .intro-card-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .intro-feature-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px;
          background: #f5f9f6;
          border: 1px solid #deeae3;
          border-radius: 12px;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .intro-feature-card:hover {
          box-shadow: 0 4px 16px rgba(0,87,47,0.1);
          border-color: #b3d4c1;
        }

        .intro-icon-ring {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00572f, #007a44);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,87,47,0.25);
        }
      `}</style>

      {/* Top accent bar */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, #00572f, #007a44, #ec7913)" }} />

      <div style={{ padding: "24px 26px 26px" }}>

        {/* Heading */}
        <div style={{ marginBottom: "10px" }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            color: "#ec7913",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            margin: "0 0 6px",
          }}>
            Ikot Ekpene LGA — Chairman Hon. Elder Aniefiok Nkom
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(17px, 2.8vw, 21px)",
            fontWeight: 700,
            color: "#00572f",
            margin: 0,
            lineHeight: 1.3,
          }}>
            We want to help you build a future
          </h2>
        </div>

        {/* Body text */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          color: "#4a6355",
          lineHeight: 1.7,
          margin: "0 0 22px",
        }}>
          If you live in Ikot Ekpene and you need a job — or you want a better one — this is for you.
          Fill in your details below. Our office will use your information to find the right support,
          training, or job opportunity for you. It is <strong style={{ color: "#1a3d2b" }}>free</strong>, 
          {" "}and it only takes a few minutes.
        </p>

        {/* Feature cards */}
        <div className="intro-card-grid">
          {[
            {
              icon: <Target className="w-4 h-4" style={{ color: "#fff" }} />,
              title: "Get a Job",
              desc: "We will connect you with employers who are hiring in your area.",
            },
            {
              icon: <Users className="w-4 h-4" style={{ color: "#fff" }} />,
              title: "Learn New Skills",
              desc: "Join free training programmes to help you do better work.",
            },
            {
              icon: <Briefcase className="w-4 h-4" style={{ color: "#fff" }} />,
              title: "More Opportunities",
              desc: "Be first to hear about government support and work schemes.",
            },
          ].map(({ icon, title, desc }) => (
            <div className="intro-feature-card" key={title}>
              <div className="intro-icon-ring">{icon}</div>
              <div>
                <h3 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#0f2e1c",
                  margin: "0 0 3px",
                }}>
                  {title}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  color: "#5c7166",
                  margin: 0,
                  lineHeight: 1.5,
                }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
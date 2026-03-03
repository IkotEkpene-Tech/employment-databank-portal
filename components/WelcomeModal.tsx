"use client";
import Image from "next/image";
import { useEffect } from "react";

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

export const WelcomeModal = ({ open, onClose }: WelcomeModalProps) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{
          animation: "modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
          maxHeight: "92vh",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500&display=swap');

          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.92) translateY(16px); }
            to   { opacity: 1; transform: scale(1)    translateY(0); }
          }

          .modal-btn {
            background: #00572f;
            color: #fff;
            border: none;
            border-radius: 10px;
            padding: 13px 32px;
            font-family: 'DM Sans', sans-serif;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s, transform 0.15s;
            letter-spacing: 0.01em;
          }
          .modal-btn:hover {
            background: #004525;
            transform: translateY(-1px);
          }
          .close-btn {
            position: absolute;
            top: 14px;
            right: 14px;
            z-index: 20;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: none;
            background: rgba(255,255,255,0.9);
            color: #555;
            font-size: 20px;
            line-height: 1;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 1px 6px rgba(0,0,0,0.12);
            transition: background 0.15s, color 0.15s;
          }
          .close-btn:hover { background: #fff; color: #111; }

          /* Stacked on mobile, side-by-side on desktop */
          .modal-body {
            display: flex;
            flex-direction: column;
          }
          @media (min-width: 640px) {
            .modal-body {
              flex-direction: row;
            }
          }

          /* Full-width tall image on mobile, fixed sidebar on desktop */
          .modal-photo {
            position: relative;
            width: 100%;
            height: 280px;
            flex-shrink: 0;
            background: #e8f0ec;
          }
          @media (min-width: 640px) {
            .modal-photo {
              width: 180px;
              height: auto;
              min-height: 320px;
            }
          }
        `}</style>

        {/* Close button */}
        <button onClick={onClose} className="close-btn" aria-label="Close">
          ×
        </button>

        {/* Top green banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #00572f 0%, #007a44 100%)",
            padding: "22px 28px 18px",
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              margin: "0 0 6px",
            }}
          >
            Ikot Ekpene Local Government Area
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(17px, 3.5vw, 22px)",
              fontWeight: 700,
              color: "#fff",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Job &amp; Support Registration Portal
          </h2>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto" style={{ flexShrink: 1 }}>
          <div className="modal-body">

            {/* Photo — top on mobile, left column on desktop */}
            <div className="modal-photo">
              <Image
                src="/hon-nkom.jpeg"
                alt="Hon. Elder Aniefiok Nkom – Chairman, Ikot Ekpene LGA"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Caption strip */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "rgba(0,55,30,0.82)",
                  padding: "8px 10px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.9)",
                    margin: 0,
                    lineHeight: 1.4,
                    fontWeight: 500,
                  }}
                >
                  Hon. Elder Aniefiok Nkom
                  <br />
                  <span style={{ opacity: 0.7, fontWeight: 400 }}>Chairman, Ikot Ekpene LGA</span>
                </p>
              </div>
            </div>

            {/* Text column */}
            <div
              style={{
                flex: 1,
                minWidth: "200px",
                padding: "24px 26px",
                fontFamily: "'DM Sans', sans-serif",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  color: "#1a1a1a",
                  lineHeight: 1.65,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                👋 Welcome! 
                {/* This is the right place if you need a job or want to grow your work. */}
              </p>

              <div style={{ borderTop: "1.5px solid #e4ede8" }} />

              <ul
                style={{
                  margin: 0,
                  paddingLeft: "0",
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {[
                  { icon: "✅", text: "Fill in your name and details — it is free and easy." },
                  { icon: "🤝", text: "Our office will use your information to connect you to jobs and training." },
                  { icon: "🔒", text: "Your information is safe with us." },
                ].map(({ icon, text }) => (
                  <li
                    key={text}
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                      fontSize: "14px",
                      color: "#333",
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ fontSize: "15px", marginTop: "1px", flexShrink: 0 }}>{icon}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  background: "#f0f7f3",
                  border: "1px solid #c6dfd0",
                  borderRadius: "8px",
                  padding: "11px 14px",
                  fontSize: "13px",
                  color: "#2d6247",
                  lineHeight: 1.55,
                }}
              >
                <strong>For Ikot Ekpene people only.</strong> This programme is under the leadership of Hon. Elder Aniefiok Nkom to help our people find work and support.
              </div>

              <div style={{ marginTop: "4px" }}>
                <button className="modal-btn" onClick={onClose}>
                  Start Registration →
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
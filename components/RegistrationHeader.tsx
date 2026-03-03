import Image from "next/image";

export const RegistrationHeader = () => {
  return (
    <header style={{ background: "linear-gradient(135deg, #003d20 0%, #00572f 55%, #006b39 100%)", position: "relative", overflow: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .reg-header-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          z-index: 2;
        }
        @media (min-width: 640px) {
          .reg-header-inner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
          }
        }

        /* Subtle geometric background pattern */
        .reg-header-bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 60%),
                            radial-gradient(circle at 10% 80%, rgba(0,0,0,0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        /* Identity block */
        .reg-identity {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .reg-logo-ring {
          flex-shrink: 0;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          border: 1.5px solid rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .reg-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(15px, 2.4vw, 20px);
          font-weight: 700;
          color: #fff;
          margin: 0;
          line-height: 1.2;
          letter-spacing: 0.01em;
        }

        .reg-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(11px, 1.5vw, 13px);
          color: rgba(255,255,255,0.65);
          margin: 4px 0 0;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* Divider dot — hidden on mobile */
        .reg-divider {
          display: none;
          width: 1px;
          height: 48px;
          background: rgba(255,255,255,0.15);
          flex-shrink: 0;
        }
        @media (min-width: 640px) {
          .reg-divider { display: block; }
        }

        /* Partner logos */
        .reg-partners {
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: flex-start;
        }
        @media (min-width: 640px) {
          .reg-partners { justify-content: flex-end; }
        }

        .reg-partner-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-right: 4px;
          white-space: nowrap;
        }

        .reg-partner-logo {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: background 0.2s, border-color 0.2s;
          overflow: hidden;
        }
        .reg-partner-logo:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.4);
        }

        /* Bottom accent bar */
        .reg-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, #ec7913 0%, #f5a64d 50%, #ec7913 100%);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 0%; }
          50%       { background-position: 100% 0%; }
        }
      `}</style>

      {/* Background effect */}
      <div className="reg-header-bg" />

      <div className="reg-header-inner">

        {/* Left: Identity */}
        <div className="reg-identity">
          <div className="reg-logo-ring">
            <Image
              src="/logo/ik-logo-2.png"
              alt="Ikot Ekpene Local Government Logo"
              width={44}
              height={44}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="reg-title">Ikot Ekpene Local Government Area</h1>
            <p className="reg-subtitle">Job &amp; Support Registration Portal</p>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="reg-divider" />

        {/* Right: Partner logos */}
        <div className="reg-partners">
          <span className="reg-partner-label">In partnership with</span>

          <div className="reg-partner-logo" title="Akwa Ibom State Government">
            <Image
              src="/logo/akwa-ibom-logo-main.png"
              alt="Akwa Ibom State Government Logo"
              width={34}
              height={34}
              className="object-contain"
              priority
            />
          </div>

          <div className="reg-partner-logo" title="Arise Initiative">
            <Image
              src="/logo/arise-white.jpeg"
              alt="Arise Initiative Logo"
              width={30}
              height={30}
              className="object-contain"
              priority
            />
          </div>
        </div>

      </div>

      {/* Shimmer accent bar */}
      <div className="reg-accent-bar" />
    </header>
  );
};
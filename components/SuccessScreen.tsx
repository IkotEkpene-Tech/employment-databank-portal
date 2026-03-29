import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/Button";

interface SuccessScreenProps {
  onReset: () => void;
}

export const SuccessScreen = ({ onReset }: SuccessScreenProps) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes successFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes checkPop {
          0%   { transform: scale(0.4); opacity: 0; }
          70%  { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); }
        }

        @keyframes ripple {
          0%   { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .ss-wrapper {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          animation: successFadeUp 0.5s ease both;
        }

        .ss-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #e4ede8;
          box-shadow: 0 4px 32px rgba(0,60,30,0.08);
          max-width: 460px;
          width: 100%;
          overflow: hidden;
          text-align: center;
        }

        /* Green top banner */
        .ss-banner {
          background: linear-gradient(135deg, #003d20 0%, #00572f 55%, #006b39 100%);
          padding: 36px 32px 28px;
          position: relative;
          overflow: hidden;
        }
        .ss-banner::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #ec7913, #f5a64d, #ec7913);
        }

        /* Icon ring with ripple */
        .ss-icon-wrap {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
        }
        .ss-ripple {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          animation: ripple 2s ease-out infinite;
        }
        .ss-ripple-2 {
          animation-delay: 0.6s;
        }
        .ss-icon-ring {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 2px solid rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;
        }

        .ss-banner-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 6px;
          line-height: 1.2;
        }

        .ss-banner-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.65);
          margin: 0;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Body */
        .ss-body {
          padding: 28px 28px 32px;
        }

        .ss-message {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #4a6355;
          line-height: 1.7;
          margin: 0 0 20px;
        }

        /* Next steps box */
        .ss-next-box {
          background: #f0f7f3;
          border: 1px solid #c6dfd0;
          border-radius: 12px;
          padding: 16px 18px;
          text-align: left;
          margin-bottom: 24px;
        }

        .ss-next-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #00572f;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0 0 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ss-next-steps {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ss-next-step {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #3a5a47;
          line-height: 1.5;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .ss-step-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00572f, #007a44);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
      `}</style>

      <div className="ss-wrapper">
        <div className="ss-card">
          {/* Green banner */}
          <div className="ss-banner">
            <div className="ss-icon-wrap">
              <div className="ss-ripple" />
              <div className="ss-ripple ss-ripple-2" />
              <div className="ss-icon-ring">
                <CheckCircle2
                  style={{ width: "36px", height: "36px", color: "#fff" }}
                />
              </div>
            </div>
            <h2 className="ss-banner-title">Registration Successful!</h2>
            <p className="ss-banner-sub">Ikot Ekpene LGA Job & Support Registration Portal</p>
          </div>

          {/* Body */}
          <div className="ss-body">
            <p className="ss-message">
              Well done! Your details have been saved. We will reach out to you
              when there is a job, training, or support programme that matches
              your profile. Please keep your phone nearby.
            </p>

            {/* What happens next */}
            <div className="ss-next-box">
              <p className="ss-next-title">
                <span>📋</span> What happens next?
              </p>
              <ul className="ss-next-steps">
                <li className="ss-next-step">
                  <span className="ss-step-dot">1</span>
                  Our team will check and save your information.
                </li>
                <li className="ss-next-step">
                  <span className="ss-step-dot">2</span>
                  Your village head may be contacted to confirm you are from
                  Ikot Ekpene LGA.
                </li>
                <li className="ss-next-step">
                  <span className="ss-step-dot">3</span>
                  We will call you when a job or programme is available for you.
                </li>
              </ul>
            </div>

            <Button onClick={onReset} variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Register Another Person
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

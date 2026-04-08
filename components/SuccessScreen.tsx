import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/Button";

interface SuccessScreenProps {
  onReset: () => void;
}

export const SuccessScreen = ({ onReset }: SuccessScreenProps) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-white rounded-2xl border border-[#e4ede8] shadow-lg max-w-md w-full overflow-hidden text-center">
        {/* Green banner */}
        <div className="relative bg-linear-to-br from-[#003d20] via-[#00572f] to-[#006b39] pt-9 pb-7 px-8 overflow-hidden">
          {/* Bottom border line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#ec7913] via-[#f5a64d] to-[#ec7913]" />

          {/* Icon with ripple effects */}
          <div className="relative w-20 h-20 mx-auto mb-5">
            {/* Ripple animations */}
            <div className="absolute inset-0 rounded-full bg-white/20 animate-[ripple_2s_ease-out_infinite]" />
            <div className="absolute inset-0 rounded-full bg-white/20 animate-[ripple_2s_ease-out_infinite] animation-delay-600" />
            <div className="relative w-20 h-20 rounded-full bg-white/15 border-2 border-white/40 flex items-center justify-center animate-[checkPop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.2s_both]">
              <CheckCircle2 className="w-9 h-9 text-white" />
            </div>
          </div>

          <h2 className="font-['Playfair_Display'] text-[22px] font-bold text-white mb-1.5 leading-tight">
            Registration Successful!
          </h2>
          <p className="font-['DM_Sans'] text-xs text-white/65 tracking-wide uppercase">
            Ikot Ekpene LGA Job & Support Registration Portal
          </p>
        </div>

        {/* Body */}
        <div className="p-7">
          <p className="font-['DM_Sans'] text-sm text-[#4a6355] leading-relaxed mb-5">
            Well done! Your details have been saved. We will reach out to you
            when there is a job, training, or support programme that matches
            your profile. Please keep your phone nearby.
          </p>

          {/* What happens next */}
          <div className="bg-[#f0f7f3] border border-[#c6dfd0] rounded-xl p-4 text-left mb-6">
            <p className="font-['DM_Sans'] text-xs font-bold text-[#00572f] tracking-wide uppercase mb-2.5 flex items-center gap-1.5">
              <span>📋</span> What happens next?
            </p>
            <ul className="space-y-2">
              <li className="font-['DM_Sans'] text-xs text-[#3a5a47] leading-relaxed flex items-start gap-2">
                <span className="w-4.5 h-4.5 rounded-full bg-linear-to-br from-[#00572f] to-[#007a44] text-white text-[10px] font-bold font-['DM_Sans'] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                Our team will check and save your information.
              </li>
              <li className="font-['DM_Sans'] text-xs text-[#3a5a47] leading-relaxed flex items-start gap-2">
                <span className="w-4.5 h-4.5 rounded-full bg-linear-to-br from-[#00572f] to-[#007a44] text-white text-[10px] font-bold font-['DM_Sans'] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                Your village head may be contacted to confirm you are from Ikot
                Ekpene LGA.
              </li>
              <li className="font-['DM_Sans'] text-xs text-[#3a5a47] leading-relaxed flex items-start gap-2">
                <span className="w-4.5 h-4.5 rounded-full bg-linear-to-br from-[#00572f] to-[#007a44] text-white text-[10px] font-bold font-['DM_Sans'] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                We will call you when a job or programme is available for you.
              </li>
            </ul>
          </div>

          <Button
            onClick={onReset}
            variant="outline"
            className="gap-2 border-[#d3ded9] text-[#5c7a69] hover:border-[#00572f] hover:text-[#00572f]"
          >
            <ArrowLeft className="w-4 h-4" />
            Register Another Person
          </Button>
        </div>
      </div>

      {/* Add custom keyframes for animations */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        @keyframes checkPop {
          0% {
            transform: scale(0.4);
            opacity: 0;
          }
          70% {
            transform: scale(1.15);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

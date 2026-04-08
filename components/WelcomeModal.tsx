/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { useEffect } from "react";
import { X } from "lucide-react";

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 cursor-pointer w-8 h-8 rounded-full bg-white/90 text-gray-600 flex items-center justify-center shadow-md hover:bg-white hover:text-gray-900 transition-all duration-150"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top green banner */}
        <div className="bg-linear-to-br from-[#00572f] to-[#007a44] px-7 py-5 shrink-0">
          <p className="font-['DM_Sans'] text-[11px] font-medium text-white/70 tracking-wider uppercase mb-1.5">
            Ikot Ekpene Local Government Area
          </p>
          <h2 className="font-['Playfair_Display'] text-lg sm:text-xl md:text-[22px] font-bold text-white leading-tight">
            Job &amp; Support Registration Portal
          </h2>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          <div className="flex flex-col sm:flex-row">
            {/* Photo — top on mobile, left column on desktop */}
            <div className="relative w-full h-72 sm:w-45 sm:h-auto sm:min-h-80 shrink-0 bg-[#e8f0ec]">
              <Image
                src="/hon-nkom.jpeg"
                alt="Hon. Elder Aniefiok Nkom – Chairman, Ikot Ekpene LGA"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Caption strip */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#00371e]/80 px-2.5 py-2">
                <p className="font-['DM_Sans'] text-[10px] text-white/90 leading-tight font-medium">
                  Hon. Elder Aniefiok Nkom
                  <br />
                  <span className="opacity-70 font-normal">
                    Executive Chairman
                  </span>
                  <br />
                  <span className="opacity-70 font-normal">
                    Ikot Ekpene LGA
                  </span>
                </p>
              </div>
            </div>

            {/* Text column */}
            <div className="flex-1 min-w-50 p-6 sm:p-7 font-['DM_Sans'] flex flex-col gap-3.5">
              <p className="text-[15px] text-gray-800 leading-relaxed font-medium">
                👋 Welcome! The Ikot Ekpene LGA Job & Support Registration
                Portal is now open.
              </p>

              <div className="border-t border-[#e4ede8]" />

              <div className="space-y-2.5">
                <p className="text-sm font-semibold text-[#00572f]">
                  To complete your registration, you'll need to:
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-2.5 text-sm text-gray-700 leading-relaxed">
                    <span className="text-[#ec7913] font-bold mt-0.5">1.</span>
                    <span>
                      Pay a one-time registration fee of{" "}
                      <strong className="text-[#00572f]">₦500</strong>
                    </span>
                  </li>
                  <li className="flex gap-2.5 text-sm text-gray-700 leading-relaxed">
                    <span className="text-[#ec7913] font-bold mt-0.5">2.</span>
                    <span>Enter your valid 11-digit NIN for verification</span>
                  </li>
                  <li className="flex gap-2.5 text-sm text-gray-700 leading-relaxed">
                    <span className="text-[#ec7913] font-bold mt-0.5">3.</span>
                    <span>
                      Complete the registration form with your personal details
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#f0f7f3] border border-[#c6dfd0] rounded-lg p-3 text-[13px] text-[#2d6247] leading-relaxed">
                <strong>For Ikot Ekpene indigenes only.</strong> This programme
                is under the leadership of Hon. Elder Aniefiok Nkom to help our
                people find sustainable employment and skills development
                opportunities.
              </div>

              <div className="space-y-2 mt-1">
                <p className="text-xs text-gray-500">
                  ⚡ <strong>Note:</strong> The ₦500 fee helps cover
                  verification and processing costs.
                </p>
                <button
                  className="bg-[#ec7913] hover:bg-[#d46a0f] text-white font-['DM_Sans'] text-[15px] font-medium rounded-xl px-8 py-3 transition-all duration-200 hover:-translate-y-px cursor-pointer shadow-md hover:shadow-lg"
                  onClick={onClose}
                >
                  Proceed to Registration →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

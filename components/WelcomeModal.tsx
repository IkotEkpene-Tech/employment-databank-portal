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
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-500 hover:text-gray-800 text-2xl bg-white/80 rounded-full w-8 h-8 flex items-center justify-center"
          aria-label="Close"
        >
          ×
        </button>

        {/* Scrollable content wrapper */}
        <div className="overflow-y-auto">
          <div className="flex flex-col md:flex-row">
            {/* Image - fixed height on mobile, auto on desktop */}
            <div className="relative w-full md:w-1/3 h-64 md:h-auto md:min-h-[400px] bg-[#f1f5f3] flex-shrink-0">
              <Image
                src="/hon-nkom.jpeg"
                alt="Chairman of Ikot Ekpene LGA"
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Text */}
            <div className="p-6 md:p-8 md:w-2/3 flex flex-col">
              <h2 className="text-xl md:text-2xl font-semibold text-[#00572f] mb-4">
                Welcome to the Indigene Employment Databank
              </h2>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                Under the Chairmanship of{" "}
                <strong>Hon. Elder Aniefiok Nkom</strong>, this portal is
                designed to collect structured and reliable data of eligible
                indigenes of Ikot Ekpene Local Government Area who are
                unemployed, underemployed, or actively seeking better job
                opportunities.
              </p>

              <p className="text-gray-700 text-sm md:text-base mb-6">
                The information provided will support workforce planning,
                empowerment programs, and inclusive economic development.
              </p>

              {/* <button
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-[#00572f] px-6 py-3 text-white text-sm font-medium hover:bg-[#004425] transition mt-auto"
              >
                Proceed to Registration
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

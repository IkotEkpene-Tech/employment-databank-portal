"use client";
import Image from "next/image";
import { useEffect } from "react";

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

export const WelcomeModal = ({ open, onClose }: WelcomeModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row">
          
          {/* Left: Chairman image */}
          <div className="relative md:w-1/3 w-full h-80 md:h-auto bg-[#f1f5f3]">
            <Image
              src="/hon-nkom.jpeg"
              alt="Chairman of Ikot Ekpene LGA"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Right: Text */}
          <div className="p-6 md:w-2/3">
            <h2 className="text-xl md:text-2xl font-semibold text-[#00572f]">
              Welcome to the Indigene Employment Databank
            </h2>

            <p className="mt-3 text-gray-700 leading-relaxed text-sm md:text-base">
              Under the Chairmanship of{" "}
              <strong>Hon. Elder Aniefiok Nkom</strong>, this portal is designed to
              collect structured and reliable data of eligible indigenes of
              Ikot Ekpene Local Government Area who are unemployed,
              underemployed, or actively seeking better job opportunities.
            </p>

            <p className="mt-3 text-gray-700 text-sm md:text-base">
              The information provided will support workforce planning,
              empowerment programs, and inclusive economic development.
            </p>

            <button
              onClick={onClose}
              className="mt-6 mb-6 inline-flex items-center justify-center rounded-md bg-[#00572f] px-6 py-5 text-white text-sm font-medium hover:bg-[#004425] transition"
            >
              Proceed to Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "./Button";


interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

export const WelcomeModal = ({ open, onClose }: WelcomeModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            onClose();
            setStep(1);
          }}
          className="absolute top-3.5 right-3.5 z-20 cursor-pointer w-8 h-8 rounded-full bg-white/90 text-gray-600 flex items-center justify-center shadow-md hover:bg-white hover:text-gray-900 transition-all duration-150"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-linear-to-br from-[#00572f] to-[#007a44] px-7 py-5 shrink-0">
          <p className="font-['DM_Sans'] text-[11px] font-medium text-white/70 tracking-wider uppercase mb-1.5">
            Ikot Ekpene Local Government Area
          </p>
          <h2 className="font-['Playfair_Display'] text-lg sm:text-xl md:text-[22px] font-bold text-white leading-tight">
            Job &amp; Support Registration Portal
          </h2>

          <div className="mt-4 flex items-center gap-2">
            <div
              className={`h-1.5 flex-1 rounded-full transition-all ${
                step >= 1 ? "bg-[#ec7913]" : "bg-white/20"
              }`}
            />
            <div
              className={`h-1.5 flex-1 rounded-full transition-all ${
                step >= 2 ? "bg-[#ec7913]" : "bg-white/20"
              }`}
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {step === 1 && (
            <div className="flex flex-col sm:flex-row">
              <div className="relative w-full h-72 sm:w-45 sm:h-auto sm:min-h-80 shrink-0 bg-[#e8f0ec]">
                <Image
                  src="/hon-nkom.jpeg"
                  alt="Hon. (Eld) Aniefiok Nkom – Chairman, Ikot Ekpene LGA"
                  fill
                  className="object-cover object-top"
                  priority
                />

                <div className="absolute bottom-0 left-0 right-0 bg-[#00371e]/80 px-3 py-2.5">
                  <p className="font-['DM_Sans'] text-[11px] text-white/90 leading-tight font-medium">
                    Hon. (Eld) Aniefiok Nkom
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

              <div className="flex-1 min-w-0 p-6 sm:p-7 font-['DM_Sans'] flex flex-col justify-center gap-4">
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-wide text-[#ec7913] mb-2">
                    Welcome Message
                  </p>
                  <p className="text-[15px] text-gray-700 leading-relaxed">
                    This programme is under the leadership of{" "}
                    <span className="font-bold text-[#00572f] leading-tight mb-3">
                      Hon. Elder Aniefiok Nkom
                    </span>{" "}
                    to help our people find sustainable employment and skills
                    development opportunities.{" "}
                    <span className="font-bold text-[#00572f] leading-tight mb-3">
                      It is for Ikot Ekpene Indigenes Only
                    </span>
                  </p>
                </div>

                <div className="bg-[#f4f8f5] border border-[#d5e6db] rounded-xl p-4">
                  <p className="text-sm text-[#2d6247] leading-relaxed">
                    The registration portal is designed to support qualified
                    indigenes with job opportunities, vocational training, and
                    empowerment initiatives.
                  </p>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="mt-2 bg-[#ec7913] hover:bg-[#d46a0f] text-white font-['DM_Sans'] text-[15px] font-medium rounded-xl px-8 py-3 transition-all duration-200 hover:-translate-y-px cursor-pointer shadow-md hover:shadow-lg"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-6 sm:p-7 font-['DM_Sans']">
              <Button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#00572f] hover:text-[#007a44] mb-5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <div className="bg-[#fff6ed] border border-[#ffd7b0] rounded-2xl p-5 mb-5">
                <p className="text-xs uppercase tracking-wide text-[#c96a12] font-semibold mb-2">
                  Registration Fee
                </p>
                <p className="text-3xl font-bold text-[#ec7913]">₦500</p>
                <p className="text-sm text-[#8a5a2b] mt-2 leading-relaxed">
                  This fee covers verification and processing costs.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#00572f] mb-3">
                    Registration Requirements
                  </h3>
                  <p className="text-bold text-gray-600 leading-relaxed">
                    Before proceeding, please make sure you have the following
                    information and documents ready.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="border border-[#e4ede8] rounded-xl p-4 bg-[#fafcfb]">
                    <p className="font-semibold text-[#1a3d2b] mb-2">
                      Personal Information
                    </p>
                    <ul className="space-y-1.5 text-sm text-gray-700 leading-relaxed">
                      <li>• Valid NIN for verification</li>
                      <li>• Full name</li>
                      <li>• Date of birth</li>
                      <li>• Gender</li>
                      <li>• Phone number</li>
                      <li>• Email address</li>
                      <li>• Voter Identification Number (VIN)</li>
                    </ul>
                  </div>

                  <div className="border border-[#e4ede8] rounded-xl p-4 bg-[#fafcfb]">
                    <p className="font-semibold text-[#1a3d2b] mb-2">
                      Location Information
                    </p>
                    <ul className="space-y-1.5 text-sm text-gray-700 leading-relaxed">
                      <li>• Ward selection</li>
                      <li>• Village selection</li>
                      <li>• Village head's name</li>
                      <li>• Village head's phone number</li>
                    </ul>
                  </div>

                  <div className="border border-[#e4ede8] rounded-xl p-4 bg-[#fafcfb]">
                    <p className="font-semibold text-[#1a3d2b] mb-2">
                      Education & Skills Information
                    </p>
                    <ul className="space-y-1.5 text-sm text-gray-700 leading-relaxed">
                      <li>• Educational qualification details</li>
                      <li>• Discipline or course of study</li>
                      <li>• Primary vocational skill</li>
                      <li>• Skill you would like to learn</li>
                    </ul>
                  </div>

                  <div className="border border-[#e4ede8] rounded-xl p-4 bg-[#fafcfb]">
                    <p className="font-semibold text-[#1a3d2b] mb-2">
                      Required Documents
                    </p>
                    <ul className="space-y-1.5 text-sm text-gray-700 leading-relaxed">
                      <li>• Certificate of Origin</li>
                      <li>• Educational certificate (if available)</li>
                      <li>• Documents must be PDF, JPG, or PNG</li>
                      <li>• Maximum file size: 5MB</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => {
                    onClose();
                    setStep(1);
                  }}
                  className="flex-1 bg-[#ec7913] hover:bg-[#d46a0f] text-white font-['DM_Sans'] text-[15px] font-medium rounded-xl px-8 py-3 transition-all duration-200 hover:-translate-y-px cursor-pointer shadow-md hover:shadow-lg"
                >
                  Proceed to Registration
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

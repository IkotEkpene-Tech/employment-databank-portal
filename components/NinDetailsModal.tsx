/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  X,
  //   User,
  Calendar,
  Phone,
  // MapPin,
  Users,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "./Button";
import { formatPhoneNumber } from "@/utilities/utils";

interface NinRecord {
  firstname: string;
  surname: string;
  middlename?: string;
  birthdate: string;
  gender: string;
  phone: string;
  nin?: string;
  photo?: string;
}

interface NinDetailsModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onRetry: () => void;
  ninData: NinRecord | null;
}

export const NinDetailsModal = ({
  open,
  onClose,
  onConfirm,
  onRetry,
  ninData,
}: NinDetailsModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") return;
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!open || !ninData) return null;

  const getFullName = () => {
    return [ninData.surname, ninData.firstname, ninData.middlename]
      .filter(Boolean)
      .join(" ");
  };

  const getInitials = () => {
    return `${ninData.firstname[0]}${ninData.surname[0]}`.toUpperCase();
  };

  const maskNin = (nin: string) => {
    if (!nin) return "●●●●●●●●●●●";
    return `●●●●●●●${nin.slice(-4)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        // onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 cursor-pointer right-3 z-20 w-8 h-8 rounded-full bg-white/90 text-gray-600 flex items-center justify-center shadow-md hover:bg-white hover:text-gray-900 transition-all duration-150"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="bg-linear-to-br from-[#f5f9f6] to-[#edf4ef] border-b border-[#e0ebe4] px-6 py-5 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 bg-linear-to-br from-[#00572f] to-[#007a44] shadow-lg">
            {ninData?.photo ? (
              <img
                src={ninData.photo}
                alt={getFullName()}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-white font-['Playfair_Display']">
                {getInitials()}
              </span>
            )}
          </div>
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#00572f]">
            {getFullName()}
          </h2>
          <p className="text-xs font-mono text-[#8aab98] mt-1 tracking-wide">
            NIN: {maskNin(ninData.nin || "")}
          </p>
          <div className="inline-flex items-center gap-1.5 mt-2 rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-[#e6f5ed] border border-[#b8deca] text-[#00572f]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00a855]" />
            Identity Verified
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="space-y-3 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-3 bg-[#f8fbf9] border border-[#e0ebe4]">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3 h-3 text-[#8aab98]" />
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8aab98]">
                    Date of Birth
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#1a3d2b]">
                  {ninData?.birthdate}
                </p>
              </div>
              <div className="rounded-xl p-3 bg-[#f8fbf9] border border-[#e0ebe4]">
                <div className="flex items-center gap-1.5 mb-1">
                  <Users className="w-3 h-3 text-[#8aab98]" />
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8aab98]">
                    Gender
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#1a3d2b] capitalize">
                  {ninData?.gender}
                </p>
              </div>
            </div>

            <div className="rounded-xl p-3 bg-[#f8fbf9] border border-[#e0ebe4]">
              <div className="flex items-center gap-1.5 mb-1">
                <Phone className="w-3 h-3 text-[#8aab98]" />
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8aab98]">
                  Phone Number
                </p>
              </div>
              <p className="text-sm font-semibold text-[#1a3d2b]">
                {formatPhoneNumber(ninData.phone)}
              </p>
            </div>

            {/* <div className="rounded-xl p-3 bg-[#f8fbf9] border border-[#e0ebe4]">
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin className="w-3 h-3 text-[#8aab98]" />
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8aab98]">
                  State of Origin
                </p>
              </div>
              <p className="text-sm font-semibold text-[#1a3d2b]">
                {ninData.stateOfOrigin}
              </p>
            </div> */}
          </div>

          <div className="flex gap-2.5 rounded-xl p-3 mb-6 bg-[#f0f8f4] border border-[#c8e4d4]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#00572f]" />
            <p className="text-xs leading-relaxed text-[#3d6b52]">
              Please confirm these are your correct details before proceeding.
              If this is not you, click "Enter Different NIN" to try again.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onRetry}
              className="py-3 rounded-xl cursor-pointer text-sm font-semibold transition-all flex items-center justify-center gap-2 border-[1.5px] border-[#d3ded9] text-[#053a1c] hover:border-[#00572f] hover:text-[white] font-['DM_Sans']"
            >
              <RefreshCw className="w-4 h-4" />
              Enter Different NIN
            </Button>
            <Button
              onClick={onConfirm}
              className="py-3 rounded-xl cursor-pointer text-sm font-semibold flex items-center justify-center gap-2 transition-all bg-[#ec7913] text-white hover:bg-[#d46a0f] font-['DM_Sans'] shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

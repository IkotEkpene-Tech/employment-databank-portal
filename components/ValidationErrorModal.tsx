"use client";
import { AlertCircle, X } from "lucide-react";

interface ValidationErrorModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export const ValidationErrorModal = ({
  open,
  message,
  onClose,
}: ValidationErrorModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-9998 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-7 max-w-105 w-full shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-[#9cb8a8] hover:text-[#5c7a69] p-1 rounded-md flex items-center justify-center transition-colors"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-[#ef4343]/10 flex items-center justify-center mb-4">
          <AlertCircle className="w-6 h-6 text-[#ef4343]" />
        </div>

        {/* Title */}
        <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#1a3d2b] mb-2">
          Something went wrong
        </h3>

        {/* Message */}
        <p className="font-['DM_Sans'] text-sm text-[#5c7166] leading-relaxed mb-5">
          {message}
        </p>

        {/* Dismiss button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#ef4343] hover:bg-[#dc2626] text-white rounded-xl font-['DM_Sans'] text-sm font-semibold cursor-pointer transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

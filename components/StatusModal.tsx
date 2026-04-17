"use client";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "./Button";

interface StatusModalProps {
  open: boolean;
  clickOutsideToClose?: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: "success" | "error";
}

export const StatusModal = ({
  open,
  onClose,
  title,
  message,
  type,
  clickOutsideToClose = true,
}: StatusModalProps) => {
  if (!open) return null;

  const isSuccess = type === "success";
  const colors = isSuccess
    ? {
        bg: "bg-gradient-to-br from-[#e8f5ed] to-[#d4ecdf]",
        border: "border-[#b8deca]",
        iconBg: "bg-[#00572f]",
        icon: <CheckCircle2 className="w-6 h-6 text-white" />,
        titleColor: "text-[#00572f]",
        messageColor: "text-[#2d6a4f]",
        buttonBg: "bg-[#00572f] hover:bg-[#004525]",
      }
    : {
        bg: "bg-gradient-to-br from-[#fee] to-[#fdd]",
        border: "border-[#fcc]",
        iconBg: "bg-[#ef4343]",
        icon: <AlertCircle className="w-6 h-6 text-white" />,
        titleColor: "text-[#c0392b]",
        messageColor: "text-[#c0392b]",
        buttonBg: "bg-[#ef4343] hover:bg-[#d63031]",
      };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={clickOutsideToClose ? onClose : undefined}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
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
        <div
          className={`${colors.bg} border-b ${colors.border} px-6 py-5 text-center`}
        >
          <div
            className={`w-14 h-14 ${colors.iconBg} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}
          >
            {colors.icon}
          </div>
          <h2
            className={`font-['Playfair_Display'] text-xl font-bold ${colors.titleColor}`}
          >
            {title}
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p
            className={`text-center font-['DM_Sans'] text-sm ${colors.messageColor} leading-relaxed`}
          >
            {message}
          </p>
          <Button
            onClick={onClose}
            className={`w-full mt-6 ${colors.buttonBg} text-white font-['DM_Sans'] cursor-pointer font-semibold py-3 rounded-xl transition-all duration-200 hover:-translate-y-px shadow-md`}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

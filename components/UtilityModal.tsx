"use client";
import {
  X,
  AlertTriangle,
  Info,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "./Button";

interface UtilityModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  message?: string;
  children?: React.ReactNode;
  type?: "info" | "success" | "error" | "warning" | "confirm";

  // Button controls
  showButtons?: boolean;
  showOneButton?: boolean;
  proceedText?: string;
  cancelText?: string;
  onProceed?: () => void;
  onCancel?: () => void;

  // Behavior
  clickOutsideToClose?: boolean;
  showCloseIcon?: boolean;
  closeOnProceed?: boolean;
  closeOnCancel?: boolean;

  // Loading state
  isProceeding?: boolean;
  isCancelling?: boolean;

  // Styling
  customIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

const typeConfig = {
  info: {
    bg: "bg-gradient-to-br from-[#e8f0fe] to-[#d4e4fc]",
    border: "border-[#b8d0f0]",
    iconBg: "bg-[#3b82f6]",
    icon: <Info className="w-6 h-6 text-white" />,
    titleColor: "text-[#1e40af]",
    messageColor: "text-[#1e3a8a]",
    proceedBtnBg: "bg-[#3b82f6] hover:bg-[#2563eb]",
    cancelBtnBg: "bg-gray-200 hover:bg-gray-300 text-gray-700",
  },
  success: {
    bg: "bg-gradient-to-br from-[#e8f5ed] to-[#d4ecdf]",
    border: "border-[#b8deca]",
    iconBg: "bg-[#00572f]",
    icon: <CheckCircle2 className="w-6 h-6 text-white" />,
    titleColor: "text-[#00572f]",
    messageColor: "text-[#2d6a4f]",
    proceedBtnBg: "bg-[#00572f] hover:bg-[#004525]",
    cancelBtnBg: "bg-gray-200 hover:bg-gray-300 text-gray-700",
  },
  error: {
    bg: "bg-gradient-to-br from-[#fee] to-[#fdd]",
    border: "border-[#fcc]",
    iconBg: "bg-[#ef4343]",
    icon: <AlertCircle className="w-6 h-6 text-white" />,
    titleColor: "text-[#c0392b]",
    messageColor: "text-[#c0392b]",
    proceedBtnBg: "bg-[#ef4343] hover:bg-[#d63031]",
    cancelBtnBg: "bg-gray-200 hover:bg-gray-300 text-gray-700",
  },
  warning: {
    bg: "bg-gradient-to-br from-[#fef3e8] to-[#fde8d4]",
    border: "border-[#fcd4b8]",
    iconBg: "bg-[#f59e0b]",
    icon: <AlertTriangle className="w-6 h-6 text-white" />,
    titleColor: "text-[#b45309]",
    messageColor: "text-[#92400e]",
    proceedBtnBg: "bg-[#f59e0b] hover:bg-[#d97706]",
    cancelBtnBg: "bg-gray-200 hover:bg-gray-300 text-gray-700",
  },
  confirm: {
    bg: "bg-gradient-to-br from-[#f0f4f8] to-[#e4eaf1]",
    border: "border-[#d0dae6]",
    iconBg: "bg-[#6b7280]",
    icon: <AlertTriangle className="w-6 h-6 text-white" />,
    titleColor: "text-[#374151]",
    messageColor: "text-[#4b5563]",
    proceedBtnBg: "bg-[#ef4343] hover:bg-[#d63031]",
    cancelBtnBg: "bg-gray-200 hover:bg-gray-300 text-gray-700",
  },
};

export const UtilityModal = ({
  open,
  onClose,
  title,
  subtitle,
  message,
  children,
  type = "info",
  showButtons = true,
  showOneButton = false,
  proceedText = "Proceed",
  cancelText = "Cancel",
  onProceed,
  onCancel,
  clickOutsideToClose = true,
  showCloseIcon = true,
  closeOnProceed = true,
  closeOnCancel = true,
  isProceeding = false,
  isCancelling = false,
  customIcon,
  size = "md",
}: UtilityModalProps) => {
  if (!open) return null;

  const config = typeConfig[type];
  const finalIcon = customIcon || config.icon;

  const handleProceed = () => {
    if (onProceed) onProceed();
    if (closeOnProceed) onClose();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    if (closeOnCancel) onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (clickOutsideToClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        {showCloseIcon && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 text-gray-600 flex items-center justify-center shadow-md hover:bg-white hover:text-gray-900 transition-all duration-150 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Header */}
        <div
          className={`${config.bg} border-b ${config.border} px-6 py-5 text-center`}
        >
          <div
            className={`w-14 h-14 ${config.iconBg} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}
          >
            {finalIcon}
          </div>
          <h2
            className={`font-['Playfair_Display'] text-xl font-bold ${config.titleColor}`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`font-['DM_Sans'] text-sm ${config.messageColor} mt-1 opacity-75`}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {message && (
            <p
              className={`text-center font-['DM_Sans'] text-sm ${config.messageColor} leading-relaxed`}
            >
              {message}
            </p>
          )}
          {children && <div className="mt-2">{children}</div>}

          {/* Buttons */}
          {showButtons && (
            <div
              className={`flex gap-3 mt-6 ${showOneButton ? "justify-center" : ""}`}
            >
              {!showOneButton && (
                <Button
                  onClick={handleCancel}
                  disabled={isProceeding || isCancelling}
                  className={`flex-1 ${config.cancelBtnBg} font-['DM_Sans'] cursor-pointer font-semibold py-3 rounded-xl transition-all duration-200 hover:-translate-y-px shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
                >
                  {isCancelling ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Cancelling...
                    </span>
                  ) : (
                    cancelText
                  )}
                </Button>
              )}
              <Button
                onClick={handleProceed}
                disabled={isProceeding || isCancelling}
                className={`flex-1 ${config.proceedBtnBg} text-white font-['DM_Sans'] cursor-pointer font-semibold py-3 rounded-xl transition-all duration-200 hover:-translate-y-px shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
              >
                {isProceeding ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  proceedText
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

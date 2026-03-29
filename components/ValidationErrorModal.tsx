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
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(2px)",
        zIndex: 9998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "28px 24px 24px",
          maxWidth: "420px",
          width: "100%",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#9cb8a8",
            padding: "4px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X style={{ width: "18px", height: "18px" }} />
        </button>

        {/* Icon */}
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(239,67,67,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <AlertCircle
            style={{ width: "26px", height: "26px", color: "#ef4343" }}
          />
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "18px",
            fontWeight: 700,
            color: "#1a3d2b",
            margin: "0 0 8px",
          }}
        >
          Something went wrong
        </h3>

        {/* Message */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            color: "#5c7166",
            margin: "0 0 20px",
            lineHeight: 1.6,
          }}
        >
          {message}
        </p>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "10px",
            background: "#ef4343",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
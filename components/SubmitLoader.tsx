"use client";
import { Loader2 } from "lucide-react";

export const SubmitLoader = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(2px)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      <div style={{ position: "relative" }}>
        <Loader2
          style={{ width: "52px", height: "52px", color: "#ec7913" }}
          className="animate-spin"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid #ec7913",
            opacity: 0.3,
          }}
          className="animate-ping"
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <h3
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "18px",
            fontWeight: 600,
            color: "#ffffff",
            margin: "0 0 4px",
          }}
        >
          Submitting your application...
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "16px",
            color: "rgba(255,255,255,0.75)",
            margin: 0,
          }}
        >
          Please wait, do not close this page.
        </p>
      </div>
    </div>
  );
};
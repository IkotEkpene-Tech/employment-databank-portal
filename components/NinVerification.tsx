/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useRef } from "react";
import {
  ShieldCheck,
  CreditCard,
  Loader2,
  X,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NinRecord {
  firstName: string;
  surname: string;
  otherName?: string;
  dob: string;
  gender: string;
  phone: string;
  stateOfOrigin: string;
}

interface NinVerificationProps {
  onVerified: (nin: string, record: NinRecord) => void;
}

// ─── Dummy data (replace with real Lumiid API call) ───────────────────────────

const DUMMY_RECORDS: Record<string, NinRecord> = {
  "12345678901": {
    firstName: "Uduak",
    surname: "Akpan",
    otherName: "Tom",
    dob: "14 Mar 1995",
    gender: "Male",
    phone: "080●●●●●015",
    stateOfOrigin: "Akwa Ibom",
  },
  "09876543210": {
    firstName: "Blessing",
    surname: "Ekanem",
    otherName: "Ime",
    dob: "22 Jul 1990",
    gender: "Female",
    phone: "070●●●●●332",
    stateOfOrigin: "Akwa Ibom",
  },
  "11122233344": {
    firstName: "Emmanuel",
    surname: "Okon",
    otherName: "Effiong",
    dob: "05 Nov 1988",
    gender: "Male",
    phone: "081●●●●●774",
    stateOfOrigin: "Akwa Ibom",
  },
};

// Simulates your real Lumiid API call
async function verifyNinWithLumiid(nin: string): Promise<NinRecord> {
  // TODO: Replace this block with your actual Lumiid API call:
  // const response = await fetch("/api/verify-nin", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ nin }),
  // });
  // if (!response.ok) throw new Error("NIN not found or verification failed.");
  // return response.json();

  await new Promise((res) => setTimeout(res, 1800)); // simulate network delay
  const record = DUMMY_RECORDS[nin];
  if (!record) {
    // Fallback dummy for any 11-digit NIN not in the map
    return {
      firstName: "Nsikak",
      surname: "Idongesit",
      otherName: "Akan",
      dob: "10 Jan 1992",
      gender: "Male",
      phone: "090●●●●●819",
      stateOfOrigin: "Akwa Ibom",
    };
  }
  return record;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(record: NinRecord): string {
  return `${record.firstName[0]}${record.surname[0]}`.toUpperCase();
}

function maskNin(nin: string): string {
  return `●●●●●●●${nin.slice(-4)}`;
}

function getFullName(record: NinRecord): string {
  return [record.surname, record.firstName, record.otherName]
    .filter(Boolean)
    .join(" ");
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────

interface ConfirmModalProps {
  nin: string;
  record: NinRecord;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({ nin, record, onConfirm, onCancel }: ConfirmModalProps) {
  const fields: { label: string; value: string }[] = [
    { label: "Date of Birth", value: record.dob },
    { label: "Gender", value: record.gender },
    { label: "Phone", value: record.phone },
    { label: "State of Origin", value: record.stateOfOrigin },
  ];

  return (
    <>
      <style>{`
        @keyframes rf-fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes rf-slideUp { from { transform: translateY(24px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .rf-overlay { animation: rf-fadeIn 0.2s ease; }
        .rf-modal { animation: rf-slideUp 0.25s ease; }
      `}</style>

      {/* Backdrop */}
      <div
        className="rf-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.5)" }}
        onClick={onCancel}
      >
        {/* Modal */}
        <div
          className="rf-modal w-full max-w-md rounded-2xl overflow-hidden"
          style={{
            background: "#fff",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{
              background: "linear-gradient(135deg,#f5f9f6,#edf4ef)",
              borderColor: "#e0ebe4",
            }}
          >
            <div>
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold mb-1"
                style={{
                  background: "#e6f5ed",
                  border: "1px solid #b8deca",
                  color: "#00572f",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#00a855" }}
                />
                Identity Verified
              </div>
              <p
                className="text-[15px] font-bold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#00572f",
                }}
              >
                Confirm Your Details
              </p>
            </div>
            <button
              onClick={onCancel}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "#e8f0ec", color: "#5c7a69" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal body */}
          <div className="p-5">
            {/* Avatar + name */}
            <div className="text-center mb-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold"
                style={{
                  background: "linear-gradient(135deg,#00572f,#007a44)",
                  color: "#fff",
                  fontFamily: "'Playfair Display', serif",
                  boxShadow: "0 4px 14px rgba(0,87,47,0.3)",
                }}
              >
                {getInitials(record)}
              </div>
              <p
                className="text-lg font-bold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#0d2b1c",
                }}
              >
                {getFullName(record)}
              </p>
              <p
                className="text-xs mt-0.5 font-mono"
                style={{ color: "#8aab98", letterSpacing: "0.08em" }}
              >
                NIN: {maskNin(nin)}
              </p>
            </div>

            {/* Detail grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {fields.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl p-3"
                  style={{ background: "#f8fbf9", border: "1px solid #e0ebe4" }}
                >
                  <p
                    className="text-[10px] font-semibold uppercase tracking-wider mb-1"
                    style={{ color: "#8aab98" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#1a3d2b" }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Info box */}
            <div
              className="flex gap-2.5 rounded-xl p-3 mb-5"
              style={{ background: "#f0f8f4", border: "1px solid #c8e4d4" }}
            >
              <AlertCircle
                className="w-4 h-4 shrink-0 mt-0.5"
                style={{ color: "#00572f" }}
              />
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#3d6b52" }}
              >
                Please confirm these are your correct details before proceeding.
                If anything looks wrong, close this and contact the NIMC office
                to update your records.
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={onCancel}
                className="py-3 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  background: "#fff",
                  border: "1.5px solid #d3ded9",
                  color: "#5c7a69",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                That's Not Me
              </button>
              <button
                onClick={onConfirm}
                className="py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                style={{
                  background: "#ec7913",
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Continue to Form
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export const NinVerification = ({ onVerified }: NinVerificationProps) => {
  const [nin, setNin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalData, setModalData] = useState<{
    nin: string;
    record: NinRecord;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const charCount = nin.length;
  const isReady = charCount === 11;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 11);
    setNin(val);
    setError("");
  }

  function handleClear() {
    setNin("");
    setError("");
    inputRef.current?.focus();
  }

  async function handleVerify() {
    if (charCount !== 11) {
      setError("NIN must be exactly 11 digits.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const record = await verifyNinWithLumiid(nin);
      setModalData({ nin, record });
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Verification failed. Please check your NIN and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleConfirm() {
    if (!modalData) return;
    setModalData(null);
    setIsSuccess(true);
    setTimeout(() => {
      onVerified(modalData.nin, modalData.record);
    }, 1000);
  }

  function handleCancel() {
    setModalData(null);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes rf-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes rf-fadeSlide { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .rf-page { font-family: 'DM Sans', sans-serif; }
        .rf-animate { animation: rf-fadeSlide 0.4s ease both; }
        .rf-badge-dot { animation: rf-blink 2s infinite; }
        .rf-nin-input { font-family: 'DM Sans', sans-serif; font-size: 20px; font-weight: 600; letter-spacing: 0.12em; }
        .rf-nin-input::placeholder { font-size: 15px; letter-spacing: 0.05em; color: #b0c8bc; }
        .rf-nin-input:focus { border-color: #00572f !important; box-shadow: 0 0 0 3px rgba(0,87,47,0.1) !important; }
        .rf-nin-input.has-error { border-color: #ef4343 !important; box-shadow: 0 0 0 3px rgba(239,67,67,0.1) !important; }
      `}</style>

      <div
        className="rf-page min-h-screen flex flex-col items-center px-4 py-8"
        style={{ background: "linear-gradient(160deg,#f0f6f2,#e8f2ec)" }}
      >
        {/* Portal header */}
        <div className="text-center mb-9 rf-animate">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider mb-4"
            style={{
              background: "#fff",
              border: "1px solid #d0e6da",
              color: "#00572f",
            }}
          >
            <span
              className="rf-badge-dot w-2 h-2 rounded-full"
              style={{ background: "#00572f" }}
            />
            Ikot Ekpene LGA — Employment Portal
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#0d2b1c",
              lineHeight: 1.2,
            }}
          >
            Applicant Registration
          </h1>
          <p
            className="text-sm max-w-sm mx-auto leading-relaxed"
            style={{ color: "#5c7a69" }}
          >
            Verify your identity with your National Identification Number to
            begin.
          </p>
        </div>

        {/* Card */}
        <div
          className="rf-animate w-full max-w-md rounded-2xl overflow-hidden"
          style={{
            background: "#fff",
            border: "1px solid #ddeee5",
            boxShadow: "0 4px 24px rgba(0,60,30,0.08)",
            animationDelay: "0.1s",
          }}
        >
          {/* Card header */}
          <div
            className="flex items-center gap-3 px-6 py-5 border-b"
            style={{
              background: "linear-gradient(135deg,#f5f9f6,#edf4ef)",
              borderColor: "#e0ebe4",
            }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg,#00572f,#007a44)",
                boxShadow: "0 3px 10px rgba(0,87,47,0.3)",
              }}
            >
              <CreditCard className="w-5 h-5" style={{ color: "#fff" }} />
            </div>
            <div>
              <p
                className="text-[17px] font-bold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#00572f",
                }}
              >
                NIN Verification
              </p>
              <p className="text-xs" style={{ color: "#6b8a78" }}>
                Enter your 11-digit National ID Number
              </p>
            </div>
          </div>

          {/* Card body */}
          <div className="px-6 py-7">
            {isSuccess ? (
              /* ── Success state ── */
              <div className="text-center py-4 rf-animate">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#e6f5ed", border: "2px solid #b8deca" }}
                >
                  <CheckCircle2
                    className="w-8 h-8"
                    style={{ color: "#00572f" }}
                  />
                </div>
                <p
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#0d2b1c",
                  }}
                >
                  NIN Verified!
                </p>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "#5c7a69" }}
                >
                  Your identity has been confirmed. Redirecting you to the
                  registration form…
                </p>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                  style={{
                    background: "#e6f5ed",
                    border: "1px solid #b8deca",
                    color: "#00572f",
                  }}
                >
                  <span
                    className="rf-badge-dot w-1.5 h-1.5 rounded-full"
                    style={{ background: "#00a855" }}
                  />
                  Proceeding to registration…
                </div>
              </div>
            ) : (
              /* ── Input state ── */
              <>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "#1a3d2b" }}
                >
                  National Identification Number (NIN){" "}
                  <span style={{ color: "#ef4343" }}>*</span>
                </label>

                {/* Input row */}
                <div className="relative mb-1.5">
                  <input
                    ref={inputRef}
                    type="tel"
                    inputMode="numeric"
                    placeholder="e.g. 12345678901"
                    value={nin}
                    onChange={handleChange}
                    maxLength={11}
                    className={`rf-nin-input w-full pr-11 pl-4 py-3 rounded-xl outline-none transition-all ${error ? "has-error" : ""}`}
                    style={{
                      border: "1.5px solid #d3ded9",
                      background: "#fafcfb",
                      color: "#112219",
                    }}
                  />
                  {nin.length > 0 && (
                    <button
                      onClick={handleClear}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                      style={{ background: "#e8f0ec", color: "#6b8a78" }}
                      tabIndex={-1}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Counter */}
                <p
                  className="text-right text-[11px] mb-3 font-medium"
                  style={{
                    color:
                      charCount === 11
                        ? "#00572f"
                        : charCount > 0
                          ? "#8aab98"
                          : "#b0c8bc",
                  }}
                >
                  {charCount} / 11 digits
                </p>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-1.5 mb-3">
                    <AlertCircle
                      className="w-3.5 h-3.5 shrink-0"
                      style={{ color: "#ef4343" }}
                    />
                    <p className="text-xs" style={{ color: "#ef4343" }}>
                      {error}
                    </p>
                  </div>
                )}

                {/* Info box */}
                <div
                  className="flex gap-2.5 rounded-xl p-3 mb-6"
                  style={{ background: "#f0f8f4", border: "1px solid #c8e4d4" }}
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold"
                    style={{ background: "#00572f", color: "#fff" }}
                  >
                    i
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "#3d6b52" }}
                  >
                    Your NIN is an 11-digit number found on your National ID
                    card, voter card, or NIMC slip. Your details will be fetched
                    securely from the NIMC database.
                  </p>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleVerify}
                  disabled={!isReady || isLoading}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                  style={{
                    background: isReady && !isLoading ? "#00572f" : "#9ec4b0",
                    color: "#fff",
                    cursor: isReady && !isLoading ? "pointer" : "not-allowed",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying…
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Verify NIN
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      {modalData && (
        <ConfirmModal
          nin={modalData.nin}
          record={modalData.record}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default NinVerification;

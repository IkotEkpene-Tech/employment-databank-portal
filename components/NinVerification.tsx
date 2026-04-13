/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import {
  CreditCard,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { StatusModal } from "./StatusModal";
import { NinDetailsModal } from "./NinDetailsModal";
import { Button } from "./Button";

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

interface NinInputProps {
  onChange: (nin: string, isValid: boolean, record?: NinRecord) => void;
  initialNin?: string;
  isVerifying?: boolean;
  ninRecord?: NinRecord | null | any;
  verificationError?: string;
  onVerify?: () => void;
}

export const NinInput = ({
  onChange,
  initialNin = "",
  isVerifying = false,
  ninRecord = null,
  verificationError = "",
  onVerify,
}: NinInputProps) => {
  const [nin, setNin] = useState(initialNin);
  const [isValid, setIsValid] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Refs to track previous values
  const prevNinRecord = useRef<NinRecord | null>(null);
  const prevError = useRef("");

  const ninCharCount = nin.length;
  const isNinReady = ninCharCount === 11;

  // Handle ninRecord changes - open modal when new valid record arrives
  useEffect(() => {
    const isNewRecord =
      ninRecord && ninRecord !== prevNinRecord.current && !isVerifying;

    if (isNewRecord) {
      prevNinRecord.current = ninRecord;
      // Only open modal if it's not already open
      if (!showDetailsModal) {
        setShowDetailsModal(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ninRecord, isVerifying]); // Remove showDetailsModal from dependencies

  // Handle verificationError changes - open error modal when new error arrives
  useEffect(() => {
    const isNewError =
      verificationError &&
      verificationError !== prevError.current &&
      !isVerifying;

    if (isNewError) {
      prevError.current = verificationError;
      // Only open modal if it's not already open
      if (!showErrorModal) {
        setShowErrorModal(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationError, isVerifying]); // Remove showErrorModal from dependencies

  const handleConfirmDetails = () => {
    setShowDetailsModal(false);
    setIsValid(true);
    if (ninRecord) onChange(nin, true, ninRecord);
  };

  const handleRetryNin = () => {
    setShowDetailsModal(false);
    setIsValid(false);
    prevNinRecord.current = null;
    setNin("");
    onChange("", false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    prevError.current = "";
    setNin("");
    onChange("", false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  function handleNinChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 11);
    setNin(val);
    if (isValid) {
      setIsValid(false);
      prevNinRecord.current = null;
    }
    onChange(val, false);
  }

  function handleClearNin() {
    setNin("");
    setIsValid(false);
    prevNinRecord.current = null;
    onChange("", false);
    inputRef.current?.focus();
  }

  return (
    <>
      <div>
        <label className="block text-sm font-semibold mb-2 text-[#1a3d2b]">
          NIN (National Identification Number){" "}
          <span className="text-[#ef4343]">*</span>
        </label>

        <div className="relative">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <CreditCard className="w-4 h-4 text-[#8aab98]" />
            </div>
            <input
              ref={inputRef}
              type="tel"
              inputMode="numeric"
              placeholder="Enter 11-digit NIN"
              value={nin}
              onChange={handleNinChange}
              maxLength={11}
              className={`w-full pl-9 pr-11 py-3 rounded-xl outline-none transition-all font-['DM_Sans'] text-base border-[1.5px] bg-[#fafcfb] text-[#112219] focus:border-[#00572f] focus:ring-4 focus:ring-[#00572f]/10 ${
                isValid
                  ? "border-[#00a855] bg-[#f0faf5]"
                  : verificationError
                    ? "border-[#ef4343] ring-4 ring-[#ef4343]/10"
                    : "border-[#d3ded9]"
              }`}
            />
            {nin.length > 0 && !isVerifying && (
              <Button
                onClick={handleClearNin}
                className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-colors bg-[#e8f0ec] text-[#6b8a78] hover:bg-[#dce8e2]"
                tabIndex={-1}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
            {isVerifying && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 animate-spin text-[#00572f]" />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-1.5">
          <p
            className={`text-[11px] font-medium ${
              ninCharCount === 11
                ? "text-[#00572f]"
                : ninCharCount > 0
                  ? "text-[#8aab98]"
                  : "text-[#b0c8bc]"
            }`}
          >
            {ninCharCount} / 11 digits
          </p>
          {isValid && (
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00a855]" />
              <span className="text-[11px] font-medium text-[#00a855]">
                NIN verified
              </span>
            </div>
          )}
        </div>

        {verificationError && !showErrorModal && (
          <div className="flex items-center gap-1.5 mt-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#ef4343]" />
            <p className="text-xs text-[#ef4343]">{verificationError}</p>
          </div>
        )}

        <Button
          onClick={onVerify}
          disabled={!isNinReady || isVerifying || isValid}
          className="w-full mt-3 py-2.5 cursor-pointer rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all font-['DM_Sans'] disabled:cursor-not-allowed"
          style={{
            background:
              isNinReady && !isVerifying && !isValid ? "#00572f" : "#9ec4b0",
            color: "#fff",
          }}
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Verifying NIN...
            </>
          ) : isValid ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              NIN Verified
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              Verify NIN
            </>
          )}
        </Button>
      </div>

      <NinDetailsModal
        open={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onConfirm={handleConfirmDetails}
        onRetry={handleRetryNin}
        ninData={ninRecord}
      />

      <StatusModal
        open={showErrorModal}
        onClose={handleCloseErrorModal}
        title="Verification Failed"
        message={
          verificationError || "Please check your details and try again."
        }
        type="error"
      />
    </>
  );
};

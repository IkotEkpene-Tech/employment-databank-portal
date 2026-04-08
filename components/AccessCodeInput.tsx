"use client";

import { useState, useRef, useEffect } from "react";
import { Key, X, CheckCircle2, AlertCircle } from "lucide-react";

interface AccessCodeInputProps {
  onChange: (code: string, isValid: boolean) => void;
  initialCode?: string;
}

export const AccessCodeInput = ({
  onChange,
  initialCode = "",
}: AccessCodeInputProps) => {
  const [accessCode, setAccessCode] = useState(initialCode);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const codeCharCount = accessCode.length;
  const isComplete = codeCharCount === 12;

  useEffect(() => {
    if (initialCode && initialCode.length === 12) {
      onChange(initialCode, true);
    }
  }, [initialCode]);

  function handleAccessCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 12);
    setAccessCode(val);
    setError("");
    onChange(val, val.length === 12);
  }

  function handleClearAccessCode() {
    setAccessCode("");
    setError("");
    onChange("", false);
    inputRef.current?.focus();
  }

  return (
    <div>
      <label className="block text-sm font-semibold mb-2 text-[#1a3d2b]">
        Access Code <span className="text-[#ef4343]">*</span>
      </label>

      <div className="relative">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Key className="w-4 h-4 text-[#8aab98]" />
          </div>
          <input
            ref={inputRef}
            type="tel"
            inputMode="numeric"
            placeholder="Enter 12-digit code"
            value={accessCode}
            onChange={handleAccessCodeChange}
            maxLength={12}
            className={`w-full pl-9 pr-11 py-3 rounded-xl outline-none transition-all font-['DM_Sans'] text-base border-[1.5px] bg-[#fafcfb] text-[#112219] focus:border-[#00572f] focus:ring-4 focus:ring-[#00572f]/10 ${
              isComplete
                ? "border-[#00a855] bg-[#f0faf5]"
                : error
                  ? "border-[#ef4343] ring-4 ring-[#ef4343]/10"
                  : "border-[#d3ded9]"
            }`}
          />
          {accessCode.length > 0 && (
            <button
              onClick={handleClearAccessCode}
              className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-colors bg-[#e8f0ec] text-[#6b8a78] hover:bg-[#dce8e2]"
              tabIndex={-1}
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-1.5">
        <p
          className={`text-[11px] font-medium ${
            codeCharCount === 12
              ? "text-[#00572f]"
              : codeCharCount > 0
                ? "text-[#8aab98]"
                : "text-[#b0c8bc]"
          }`}
        >
          {codeCharCount} / 12 digits
        </p>
        {isComplete && (
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00a855]" />
            <span className="text-[11px] font-medium text-[#00a855]">
              Code entered
            </span>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 mt-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#ef4343]" />
          <p className="text-xs text-[#ef4343]">{error}</p>
        </div>
      )}
    </div>
  );
};

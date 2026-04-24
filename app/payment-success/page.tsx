/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Copy,
  ClipboardCheck,
  ArrowRight,
  Shield,
  AlertCircle,
} from "lucide-react";
// import { RegistrationHeader } from "@/components/RegistrationHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { formatPhoneNumber, getDaysUntilExpiry } from "@/utilities/utils";
import { usePageLoader } from "@/contexts/useLoader";
import { useCheckApplicant } from "@/services/tanstack";
import { StatusModal } from "@/components/StatusModal";

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone");
  const codeFromUrl = searchParams.get("code");
  const { showLoader, hideLoader } = usePageLoader();
  let errorMessage = "";
  const [showErrorModal, setShowErrorModal] = useState(false);
  const {
    mutateAsync: checkPhoneNumberExists,
    isPending: isCheckingPhoneNumber,
  } = useCheckApplicant();

  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [codeExpiry, setCodeExpiry] = useState(null);
  const [codeUsage, setCodeUsage] = useState({
    maxUsage: 0,
    usageCount: 0,
  });

  useEffect(() => {
    if (codeFromUrl) {
      setGeneratedCode(codeFromUrl);
    }
  }, [codeFromUrl]);

  useEffect(() => {
    const verify = async () => {
      if (!phoneNumber) {
        router.replace("/");
        return;
      }
      showLoader("Verifying your payment...", "Please wait a moment.", true);
      try {
        await checkPhoneNumberExists(
          {
            phoneNumber: formatPhoneNumber(phoneNumber),
            isFetchFull: true,
          },
          {
            onSuccess: (data) => {
              setCodeExpiry(getDaysUntilExpiry(data.data.expiresAt));
              setCodeUsage({
                maxUsage: data.data.maxUsage,
                usageCount: data.data.usageCount,
              });
            },
          },
        );
      } catch (error: any) {
        setShowErrorModal(true);
        errorMessage =
          error?.message ||
          "An error occured while verifying your payment, please contact admin to verify your payment";
      } finally {
        hideLoader();
      }
    };

    verify();
  }, []);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceedToVerification = () => {
    router.push(`/nin-check?phone=${encodeURIComponent(phoneNumber || "")}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* <RegistrationHeader /> */}

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#e4ede8] shadow-lg overflow-hidden">
          {/* Success Banner */}
          <div className="bg-linear-to-r from-[#e8f5ed] to-[#d4ecdf] border-b border-[#b8deca] px-6 py-5 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00572f] rounded-full flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-['DM_Sans'] text-sm font-bold text-[#00572f] mb-0.5">
                Payment Successful!
              </p>
              <p className="font-['DM_Sans'] text-xs text-[#2d6a4f]">
                Your registration fee of ₦500 has been received
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="bg-linear-to-br from-[#f5f9f6] to-[#edf4ef] border-b border-[#e0ebe4] px-6 py-7 text-center">
            <div className="w-18 h-18 bg-linear-to-br from-[#00572f] to-[#007a44] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#00572f] mb-2">
              Access Code Generated
            </h1>
            <p className="font-['DM_Sans'] text-sm text-[#6b8a78]">
              Use this code to complete your registration
            </p>
          </div>

          {/* Body */}
          <div className="px-7 py-8">
            {/* Code Display Box */}
            <div className="bg-linear-to-br from-[#f0f8f4] to-[#e8f3ec] rounded-xl p-6 text-center mb-6 border border-[#cde2d4]">
              <div className="font-['DM_Sans'] text-xs font-semibold text-[#5c7a69] uppercase tracking-wide mb-3">
                Your 12-Digit Access Code
              </div>
              <div className="font-mono text-3xl md:text-4xl font-bold text-[#00572f] tracking-wider bg-white py-4 px-3 rounded-lg border border-[#cde2d4] shadow-sm mb-4 break-all">
                {generatedCode || "••••••••••••"}
              </div>

              <Button
                onClick={handleCopyCode}
                disabled={isCheckingPhoneNumber}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#d3ded9] rounded-lg text-[black] font-['DM_Sans'] text-sm font-semibold hover:bg-[#f8fbf9] hover:border-[#00572f] transition-all"
              >
                {isCheckingPhoneNumber ? (
                  <>Verifying Code...</>
                ) : copied ? (
                  <>
                    <ClipboardCheck className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>

            {codeExpiry && (
              <div className="bg-[#fff5e6] rounded-xl p-4 mb-6 border border-[#ffdfb8]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#ec7913]" />
                    <span className="font-['DM_Sans'] text-sm font-medium text-[#a65300]">
                      Code expires in:
                    </span>
                  </div>
                  <div className="font-mono text-xl font-bold text-[#ec7913]">
                    {codeExpiry} Days
                  </div>
                </div>

                {/* ✅ ADDED USAGE COUNT */}
                <div className="flex items-center justify-between mt-3">
                  <span className="font-['DM_Sans'] text-sm font-medium text-[#a65300]">
                    Usage:
                  </span>
                  <div className="font-mono text-lg font-bold text-[#ec7913]">
                    {codeUsage.usageCount} / {codeUsage.maxUsage}
                  </div>
                </div>

                <p className="font-['DM_Sans'] text-xs text-[#b35f00] mt-2">
                  This code will expire after {codeExpiry} days. Please use it
                  to complete your registration before then. <br />
                  <br />
                  This code cannot is tied to your phone number, therefore it
                  cannot be used by another phone number
                </p>
              </div>
            )}

            {/* Instructions */}
            <div className="mb-6">
              <div className="font-['DM_Sans'] text-sm font-bold text-[#1a3d2b] mb-3">
                What to do next:
              </div>
              <ol className="font-['DM_Sans'] text-sm text-[#4a6741] space-y-2 pl-5 list-decimal">
                <li>Copy your 12-digit access code above</li>
                <li>Click "Proceed to Verification" below</li>
                <li>Enter your phone number and access code</li>
                <li>Complete your NIN verification and registration</li>
              </ol>
            </div>

            {/* Phone Number Display */}
            {phoneNumber && (
              <div className="bg-[#f8fbf9] rounded-xl p-3 border border-[#e0ebe4] mb-6">
                <div className="font-['DM_Sans'] text-[11px] font-semibold text-[#8aab98] uppercase mb-1">
                  Registered Phone Number
                </div>
                <div className="font-['DM_Sans'] text-base font-semibold text-[#00572f]">
                  {formatPhoneNumber(phoneNumber)}
                </div>
              </div>
            )}

            {/* Proceed Button */}
            <Button
              onClick={handleProceedToVerification}
              disabled={isCheckingPhoneNumber}
              className="w-full bg-[#ec7913] hover:bg-[#ec7913]/90 text-white font-semibold py-3.5 text-base flex items-center justify-center gap-2"
            >
              {isCheckingPhoneNumber ? (
                <>Verifying Code...</>
              ) : (
                <>
                  Proceed to Verification
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            {/* Note */}
            <p className="font-['DM_Sans'] text-xs text-center text-[#8aab98] mt-4">
              Keep this code safe. You'll need it to complete your registration.
            </p>
          </div>
        </div>
      </main>

      <Footer />

      <StatusModal
        open={showErrorModal}
        onClose={() => {
          setShowErrorModal(false);
          router.replace("/");
        }}
        title={"Error"}
        message={errorMessage}
        type={"error"}
      />
    </div>
  );
};

export default PaymentSuccessPage;

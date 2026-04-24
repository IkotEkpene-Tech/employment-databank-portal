/* eslint-disable react/no-unescaped-entities */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  XCircle,
  Copy,
  ClipboardCheck,
  Home,
  RefreshCw,
  HeadphonesIcon,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { useState } from "react";

const PaymentFailedPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason =
    searchParams.get("reason") ||
    "An unexpected error occurred during payment.";
  const reference = searchParams.get("reference");
  //   const phone = searchParams.get("phone");

  const [copied, setCopied] = useState(false);

  const handleCopyReference = async () => {
    if (!reference) return;
    await navigator.clipboard.writeText(reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  //   const handleRetry = () => {
  //     if (phone) {
  //       router.push(`/payment-notification?phone=${encodeURIComponent(phone)}`);
  //     } else {
  //       router.push("/");
  //     }
  //   };

  const handleRetry = () => {
    router.push("/");
  };

  const handleGoHome = () => {
    router.replace("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#e4ede8] shadow-lg overflow-hidden">
          {/* Failure Banner */}
          <div className="bg-linear-to-r from-[#fef2f2] to-[#fde8e8] border-b border-[#fca5a5] px-6 py-5 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#dc2626] rounded-full flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-['DM_Sans'] text-sm font-bold text-[#dc2626] mb-0.5">
                Payment Failed
              </p>
              <p className="font-['DM_Sans'] text-xs text-[#b91c1c]">
                Your payment could not be processed
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="bg-linear-to-br from-[#fff5f5] to-[#fef2f2] border-b border-[#fde8e8] px-6 py-7 text-center">
            <div className="w-18 h-18 bg-linear-to-br from-[#dc2626] to-[#b91c1c] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <XCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#dc2626] mb-2">
              Transaction Unsuccessful
            </h1>
            <p className="font-['DM_Sans'] text-md text-[#9b7070]">
              Don't worry — even if you have been debited, it will be reversed.
            </p>
            <p className="font-['DM_Sans'] text-md text-[#9b7070]">
              If it is not reversed, please click on the chat icon and place a
              complain and we will reach out to you as soon as possible. Please
              include the payment reference in the message. Thank you
            </p>
          </div>

          {/* Body */}
          <div className="px-7 py-8">
            {/* Reason */}
            <div className="bg-[#fff5f5] rounded-xl p-4 mb-6 border border-[#fca5a5]">
              <div className="font-['DM_Sans'] text-xs font-semibold text-[#9b7070] uppercase tracking-wide mb-1">
                Reason
              </div>
              <p className="font-['DM_Sans'] text-sm text-[#7f1d1d]">
                {decodeURIComponent(reason)}
              </p>
            </div>

            {/* Reference Box */}
            {reference && (
              <div className="bg-[#f8fbf9] rounded-xl p-5 mb-6 border border-[#e0ebe4]">
                <div className="font-['DM_Sans'] text-xs font-semibold text-[#8aab98] uppercase tracking-wide mb-3">
                  Payment Reference
                </div>
                <div className="flex items-center justify-between gap-3 bg-white py-3 px-4 rounded-lg border border-[#d3ded9]">
                  <span className="font-mono text-sm font-semibold text-[#1a3d2b] break-all">
                    {reference}
                  </span>
                  <button
                    onClick={handleCopyReference}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f0f8f4] border border-[#cde2d4] rounded-lg text-[#00572f] font-['DM_Sans'] text-xs font-semibold hover:bg-[#e8f3ec] transition-all"
                  >
                    {copied ? (
                      <>
                        <ClipboardCheck className="w-3.5 h-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="font-['DM_Sans'] text-xs text-[#8aab98] mt-2.5">
                  Keep this reference number for any payment disputes or
                  enquiries.
                </p>
              </div>
            )}

            {/* What to do */}
            <div className="mb-6">
              <div className="font-['DM_Sans'] text-sm font-bold text-[#1a3d2b] mb-3">
                What you can do:
              </div>
              <ol className="font-['DM_Sans'] text-sm text-[#4a6741] space-y-2 pl-5 list-decimal">
                <li>Check your internet connection and try again</li>
                <li>Ensure your card has sufficient funds</li>
                <li>Try a different payment method</li>
                <li>
                  Contact support with your reference number if the issue
                  persists
                </li>
              </ol>
            </div>

            {/* Support note */}
            <div className="bg-[#f5f9f6] rounded-xl p-4 mb-6 border border-[#d4e8db] flex items-start gap-3">
              <HeadphonesIcon className="w-4 h-4 text-[#00572f] mt-0.5 shrink-0" />
              <p className="font-['DM_Sans'] text-xs text-[#4a6741]">
                For payment disputes, contact support and provide your reference
                number above. We'll resolve it within 24 hours.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleRetry}
                className="w-full bg-[#ec7913] hover:bg-[#ec7913]/90 text-white font-semibold py-3.5 text-base flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>

              <Button
                onClick={handleGoHome}
                className="w-full bg-white hover:bg-[#f5f9f6] text-[#00572f] font-semibold py-3.5 text-base border border-[#00572f] flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go Back Home
              </Button>
            </div>

            <p className="font-['DM_Sans'] text-xs text-center text-[#8aab98] mt-4">
              No charges were made to your account for this transaction.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentFailedPage;

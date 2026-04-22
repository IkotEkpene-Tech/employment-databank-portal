"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Lock,
  Mail,
  Wallet,
  Loader2,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { useInitializePayment } from "@/services/tanstack";
import { StatusModal } from "@/components/StatusModal";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const NewCodePaymentNotificationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone");

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [errorModal, setErrorModal] = useState<{
    open: boolean;
    error: string;
  }>({
    open: false,
    error: "",
  });
  const showErrorModal = (error: string) =>
    setErrorModal({ open: true, error });

  const closeErrorModal = () => setErrorModal({ open: false, error: "" });
  const emailError =
    emailTouched && !email.trim()
      ? "Email address is required."
      : emailTouched && !isValidEmail(email)
        ? "Please enter a valid email address."
        : "";

  const { mutateAsync: startPayment, isPending: isInitializingPayment } =
    useInitializePayment();

  const handlePayment = async () => {
    // Force-touch so errors surface immediately
    setEmailTouched(true);

    if (!email.trim() || !isValidEmail(email)) return;

    await startPayment(
      { phoneNumber, email: email.trim(), isNotNew: true },
      {
        onSuccess: (data) => {
          console.log("Payment initialized successfully:", data);
          window.location.href = data.data.authorization_url;
        },
        onError: (error) => {
          console.error("Payment initialization error:", error);
          showErrorModal(error.message || "failed to initialize payment");
        },
      },
    );
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-[#e4ede8] shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-br from-[#f5f9f6] to-[#edf4ef] border-b border-[#e0ebe4] px-6 py-7 text-center">
            <div className="w-18 h-18 bg-linear-to-br from-[#00572f] to-[#007a44] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#00572f] mb-2">
              New Access Code Required
            </h1>
            <p className="font-['DM_Sans'] text-sm text-[#6b8a78]">
              Pay for a new access code to complete your registration
            </p>
          </div>

          {/* Body */}
          <div className="px-7 py-8">
            {/* Amount Box */}
            <div className="bg-linear-to-br from-[#f0f8f4] to-[#e8f3ec] rounded-xl p-5 text-center mb-7 border border-[#cde2d4]">
              <div className="font-['DM_Sans'] text-xs font-semibold text-[#5c7a69] uppercase tracking-wide mb-2">
                Fee
              </div>
              <div className="font-['Playfair_Display'] text-5xl font-bold text-[#00572f] leading-none">
                <span className="text-3xl align-top">₦</span>500
              </div>
            </div>

            <div className="h-px bg-linear-to-r from-transparent via-[#e0ebe4] to-transparent my-5" />

            {/* Payment Information */}
            <div className="mb-6">
              <div className="font-['DM_Sans'] text-sm font-bold text-[#1a3d2b] mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#00572f]" />
                Payment Information:
              </div>
              <p className="font-['DM_Sans'] text-sm text-[#4a6741] leading-relaxed">
                Payment is securely processed through our payment gateway. You
                will receive a confirmation email once your payment is
                successful.
              </p>
            </div>

            {/* Phone Number Display */}
            {phoneNumber && (
              <div className="bg-[#f8fbf9] rounded-xl p-3 border border-[#e0ebe4] mb-4">
                <div className="font-['DM_Sans'] text-[11px] font-semibold text-[#8aab98] uppercase mb-1">
                  Phone Number
                </div>
                <div className="font-['DM_Sans'] text-base font-semibold text-[#00572f]">
                  {phoneNumber}
                </div>
              </div>
            )}

            {/* Email Address Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="font-['DM_Sans'] text-[11px] font-semibold text-[#8aab98] uppercase tracking-wide mb-1.5 flex items-center gap-1.5"
              >
                <Mail className="w-3 h-3" />
                Email Address <span className="text-[#ec7913]">*</span>
              </label>
              <div className="font-['DM_Sans'] text-sm font-semibold text-[#00572f]">
                Please note that the email you use here cannot be changed. This
                will be used for all sensitive communications. Please use a
                valid email address.
              </div>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  placeholder="you@example.com"
                  disabled={isInitializingPayment}
                  className={`w-full font-['DM_Sans'] text-sm text-[#1a3d2b] bg-[#f8fbf9] border rounded-xl px-4 py-3 outline-none transition-all placeholder:text-[#b0c8bb] disabled:opacity-50 disabled:cursor-not-allowed
                    ${
                      emailError
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-[#e0ebe4] focus:border-[#00572f] focus:ring-2 focus:ring-[#00572f]/10"
                    }`}
                />
              </div>
              {emailError && (
                <p className="font-['DM_Sans'] text-xs text-red-500 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {emailError}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 mt-7">
              <Button
                onClick={handlePayment}
                disabled={isInitializingPayment}
                className="w-full bg-[#ec7913] hover:bg-[#ec7913]/90 text-white font-semibold py-3.5 text-base flex items-center justify-center gap-2.5"
              >
                {isInitializingPayment ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4" />
                    Proceed to Payment (₦500)
                  </>
                )}
              </Button>

              <Button
                onClick={handleGoBack}
                disabled={isInitializingPayment}
                className="w-full bg-transparent border-[1.5px] border-[#d3ded9] text-[grey] font-bold py-3 text-sm rounded-xl flex items-center justify-center gap-2 hover:border-[#00572f] hover:text-[#00572f] hover:bg-[#f8fbf9] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            </div>

            {/* Secure Badge */}
            <div className="flex items-center justify-center gap-1.5 mt-5 font-['DM_Sans'] text-xs text-[#8aab98]">
              <Lock className="w-3 h-3" />
              Secured by Paystack
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <StatusModal
        open={errorModal.open}
        onClose={closeErrorModal}
        title={"Error"}
        message={errorModal.error}
        type={"error"}
      />
    </div>
  );
};

export default NewCodePaymentNotificationPage;

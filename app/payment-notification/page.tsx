"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  CreditCard,
  Lock,
  Wallet,
  Loader2,
} from "lucide-react";
// import { RegistrationHeader } from "@/components/RegistrationHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { useInitializePayment } from "@/services/tanstack";
import { StatusModal } from "@/components/StatusModal";

const PaymentNotificationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { mutateAsync: startPayment, isPending: isInitializingPayment } =
    useInitializePayment();

  const handlePayment = async () => {
    try {
      await startPayment(phoneNumber, {
        onSuccess: (data) => {
          console.log("Payment initialized successfully:", data);
          window.location.href = data.data.authorization_url;
        },
        onError: (error) => {
          console.error("Payment initialization error:", error);
          setShowErrorModal(true);
        },
      });
      // Redirect user to Paystack's hosted payment page
      // window.location.href = result.data.authorization_url;
    } catch (err) {
      console.log("Payment initialization error:", err);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* <RegistrationHeader /> */}

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-[#e4ede8] shadow-lg overflow-hidden">
          {/* Alert Banner */}
          <div className="bg-linear-to-r from-[#fff5e6] to-[#ffe8d4] border-b border-[#ffdfb8] px-6 py-5 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ec7913] rounded-full flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-['DM_Sans'] text-sm font-bold text-[#a65300] mb-0.5">
                Phone Number Not Registered
              </p>
              <p className="font-['DM_Sans'] text-xs text-[#b35f00]">
                {phoneNumber
                  ? `The number ${phoneNumber} was not found in our records.`
                  : "Your phone number is not registered in our system."}
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="bg-linear-to-br from-[#f5f9f6] to-[#edf4ef] border-b border-[#e0ebe4] px-6 py-7 text-center">
            <div className="w-18 h-18 bg-linear-to-br from-[#00572f] to-[#007a44] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#00572f] mb-2">
              Registration Fee Required
            </h1>
            <p className="font-['DM_Sans'] text-sm text-[#6b8a78]">
              Complete your registration by paying the processing fee
            </p>
          </div>

          {/* Body */}
          <div className="px-7 py-8">
            {/* Amount Box */}
            <div className="bg-linear-to-br from-[#f0f8f4] to-[#e8f3ec] rounded-xl p-5 text-center mb-7 border border-[#cde2d4]">
              <div className="font-['DM_Sans'] text-xs font-semibold text-[#5c7a69] uppercase tracking-wide mb-2">
                Registration Fee
              </div>
              <div className="font-['Playfair_Display'] text-5xl font-bold text-[#00572f] leading-none">
                <span className="text-3xl align-top">₦</span>500
              </div>
            </div>

            {/* What you get section */}
            <div className="mb-6">
              <div className="font-['DM_Sans'] text-sm font-bold text-[#1a3d2b] mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#00572f]" />
                What you get:
              </div>
              <ul className="font-['DM_Sans'] text-sm text-[#4a6741] space-y-1.5 pl-5 list-disc">
                <li>Access to complete registration form</li>
                <li>Submission of your application</li>
                <li>Processing and verification of your details</li>
                {/* <li>Certificate of registration (upon completion)</li> */}
              </ul>
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
              <div className="bg-[#f8fbf9] rounded-xl p-3 border border-[#e0ebe4] mb-6">
                <div className="font-['DM_Sans'] text-[11px] font-semibold text-[#8aab98] uppercase mb-1">
                  Phone Number
                </div>
                <div className="font-['DM_Sans'] text-base font-semibold text-[#00572f]">
                  {phoneNumber}
                </div>
              </div>
            )}

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
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title={"Error"}
        message={
          "An error occurred while initializing the payment. Please try again"
        }
        type={"error"}
      />
    </div>
  );
};

export default PaymentNotificationPage;

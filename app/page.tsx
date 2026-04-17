/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, ArrowRight, Loader2, ClipboardList } from "lucide-react";
import { RegistrationHeader } from "@/components/RegistrationHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { WelcomeModal } from "@/components/WelcomeModal";
import { useCheckApplicant } from "@/services/tanstack";
import { on } from "events";
import { usePageLoader } from "@/contexts/useLoader";

const HomePage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { showLoader, hideLoader } = usePageLoader();

  const {
    mutateAsync: checkPhoneNumberExists,
    isPending: isCheckingPhoneNumber,
  } = useCheckApplicant();

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^0[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phoneNumber.trim()) {
      setError("Phone number is required");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError(
        "Enter a valid 11-digit phone number starting with 0 (e.g., 08062898015)",
      );
      return;
    }

    showLoader(
      "Verifying phone number...",
      "Please wait while we check your registration status.",
      true,
    );

    try {
      const exists = await checkPhoneNumberExists(
        { phoneNumber },
        {
          onSuccess: (data) => {
            // console.log("Phone number exists:", data);
            router.push(
              `/nin-check?phone=${encodeURIComponent(phoneNumber || "")}`,
            );
          },
          onError: (error: any) => {
            if (error.message === "Applicant not found") {
              router.push(
                `/payment-notification?phone=${encodeURIComponent(phoneNumber)}`,
              );
            } else {
              setError(
                "An error occurred while checking the phone number. Please try again.",
              );
            }
          },
        },
      );
    } catch (err: any) {
      // setError("Something went wrong. Please try again.");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* <RegistrationHeader /> */}
      <WelcomeModal open={showModal} onClose={() => setShowModal(false)} />

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#e4ede8] shadow-lg overflow-hidden">
          <div className="bg-linear-to-br from-[#f5f9f6] to-[#edf4ef] border-b border-[#e0ebe4] px-6 py-7 text-center">
            <div className="w-16 h-16 bg-linear-to-br from-[#00572f] to-[#007a44] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <Phone className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#00572f] mb-2">
              Get Started
            </h1>
            <div className="font-['DM_Sans'] font-semibold text-[15px] text-[#6b8a78]">
              Enter your phone number to begin or continue with your
              registration
            </div>
          </div>

          <div className="px-7 py-8">
            <form onSubmit={handleSubmit}>
              <div className="font-['DM_Sans'] font-bold text-sm text-[#00572f] mt-1.5">
                 Your phone number will be tied to your NIN and your access code
                through out this process. If you change your phone number, you
                may lose access to your registration and any updates regarding
                job opportunities. Please make sure to use a phone number that
                you will have access to for the foreseeable future.
              </div>
              <br />
              <label
                htmlFor="phone"
                className="block font-['DM_Sans'] text-sm font-semibold text-[#1a3d2b] mb-2"
              >
                Phone Number <span className="text-[#ef4343]">*</span>
              </label>
              <div className="relative mb-2">
                <Phone
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#8aab98]"
                  size={18}
                />
                <input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setError("");
                  }}
                  placeholder="08012345678"
                  disabled={isCheckingPhoneNumber}
                  className="w-full pl-11 pr-3.5 py-3.5 border-[1.5px] border-[#d3ded9] rounded-xl bg-[#fafcfb] font-['DM_Sans'] text-base text-[#112219] outline-none focus:border-[#00572f] focus:ring-4 focus:ring-[#00572f]/10 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-[#f3f8f5]"
                  autoFocus
                />
              </div>
              {error && (
                <div className="font-['DM_Sans'] text-xs text-[#ef4343] mt-1.5 mb-3">
                  {error}
                </div>
              )}
              <div className="font-['DM_Sans'] font-bold text-xs text-[#00572f] mt-1.5">
                Enter the 11-digit phone number associated with your NIN <br />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isCheckingPhoneNumber}
                className="w-full mt-5 bg-[#ec7913] hover:bg-[#ec7913]/90 text-white font-semibold py-3 text-base flex items-center justify-center gap-2"
              >
                {isCheckingPhoneNumber ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
            <Button
              type="button"
              onClick={() => setShowModal(true)}
              className="w-full mt-5 rounded-2xl border border-[#f3c79d] bg-linear-to-r from-[#fff7ef] via-[#fff3e5] to-[#ffe9d1] px-5 py-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center justify-center gap-6 w-full">
                <div className="text-left">
                  <p className="text-sm font-bold text-[#7a3f08] mt-0.5">
                    View Requirements
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#ec7913] flex items-center justify-center shrink-0 shadow-md">
                  <ClipboardList className="w-5 h-5 text-white" />
                </div>
              </div>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;

/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import { RegistrationIntro } from "@/components/RegistrationIntro";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Footer } from "@/components/Footer";
import { PageLoader } from "@/components/PageLoader";
import { useGetAllDatabaseWards } from "@/services/tanstack";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { handleClearStorage } from "@/utilities/utils";
import { usePageLoader } from "@/contexts/useLoader";
import { UtilityModal } from "@/components/UtilityModal";

export interface NinRecord {
  firstName: string;
  surname: string;
  otherName?: string;
  dob: string;
  gender: string;
  phone: string;
  email:string;
  stateOfOrigin: string;
  accessCode: string;
}

const RegistrationPage = () => {
  const [verifiedNin, setVerifiedNin] = useState<string | null>(null);
  const [ninData, setNinData] = useState<NinRecord | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isPending: isDataFetching } = useGetAllDatabaseWards();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { showLoader } = usePageLoader();

  const handleGoHomeClick = () => {
    setShowConfirmModal(true);
  };

  const handleProceedHome = () => {
    setShowConfirmModal(false);
    showLoader(
      "Redirecting to Home...",
      "Please wait while we take you back to the homepage to change your NIN.",
      true,
    );
    handleClearStorage();
    router.push("/");
  };

  const handleCancelHome = () => {
    setShowConfirmModal(false);
  };

  // Set mounted state on client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const nin = searchParams.get("nin");
    const code = searchParams.get("code");
    const raw = sessionStorage.getItem("nin_verification_data");

    if (!nin || !code || !raw) {
      router.push("/");
      toast.error("Missing NIN verification data. Please restart process.");
      return;
    }

    try {
      const record = JSON.parse(raw) as NinRecord;
      setVerifiedNin(nin);
      setNinData(record);
      setIsReady(true);
    } catch {
      sessionStorage.removeItem("nin_verification_data");
      toast.error("An error occured, please try again.");
      router.push("/");
    }
  }, [isMounted, searchParams, router]);

  const handleSuccess = () => {
    router.push("/success-screen");
    handleClearStorage();
  };

  if (isDataFetching) {
    return (
      <div className="flex bg-[#fafafa] justify-center items-center min-h-screen">
        <PageLoader
          title="Loading Data"
          subtitle="Fetching data for registration."
        />
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="flex bg-[#fafafa] justify-center items-center min-h-screen">
        <PageLoader
          title="Verifying Session"
          subtitle="Please wait while we verify your NIN session..."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div id="registration-form">
          <RegistrationIntro />
          {isReady && (
            <RegistrationForm
              onSuccess={handleSuccess}
              nin={verifiedNin!}
              ninData={ninData!}
              onChangeNin={handleGoHomeClick}
            />
          )}
        </div>
      </main>

      <Footer />

      <UtilityModal
        open={showConfirmModal}
        onClose={handleCancelHome}
        title="Leave Registration Process?"
        subtitle="Warning: Changing NIN will take you back to the home page and unsaved progress will be lost"
        message="Are you sure you want to go back to the home page?"
        type="warning"
        proceedText="Yes, Go Home"
        cancelText="Stay Here"
        onProceed={handleProceedHome}
        onCancel={handleCancelHome}
        closeOnProceed={false}
        closeOnCancel={true}
        clickOutsideToClose={false}
      />
    </div>
  );
};

export default RegistrationPage;

/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import { RegistrationHeader } from "@/components/RegistrationHeader";
import { RegistrationIntro } from "@/components/RegistrationIntro";
import { RegistrationForm } from "@/components/RegistrationForm";
import { SuccessScreen } from "@/components/SuccessScreen";
import { Footer } from "@/components/Footer";
import { WelcomeModal } from "@/components/WelcomeModal";
import { PageLoader } from "@/components/PageLoader";
import { useGetAllDatabaseWards } from "@/services/tanstack";
import { NinVerification } from "@/components/NinVerification";

// Define the NinRecord type (should match the one in NinVerification component)
export interface NinRecord {
  firstName: string;
  surname: string;
  otherName?: string;
  dob: string;
  gender: string;
  phone: string;
  stateOfOrigin: string;
}

const Index = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isNinVerified, setIsNinVerified] = useState(false);
  const [verifiedNin, setVerifiedNin] = useState<string | null>(null);
  const [ninData, setNinData] = useState<NinRecord | null>(null);
  const { isPending: isDataFetching } = useGetAllDatabaseWards();

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleNinVerified = (nin: string, record: NinRecord) => {
    setVerifiedNin(nin);
    setIsNinVerified(true);
    setNinData(record);
    setTimeout(() => {
      const formElement = document.getElementById("registration-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  /**
   * Called when the user clicks "Change NIN" inside RegistrationForm.
   * Returns to the NIN verification step and wipes any partially entered form data
   * (the form is unmounted, so Formik state is destroyed automatically).
   */
  const handleChangeNin = () => {
    setIsNinVerified(false);
    setVerifiedNin(null);
    setNinData(null);
  };

  const handleSuccess = () => {
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setIsNinVerified(false);
    setVerifiedNin(null);
    setNinData(null);
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

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <RegistrationHeader />

      <WelcomeModal open={showModal} onClose={() => setShowModal(false)} />

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        {!isSubmitted ? (
          <>
            {/* Step 1: NIN Verification */}
            {!isNinVerified ? (
              <NinVerification onVerified={handleNinVerified} />
            ) : (
              <>
                {/* Step 2: Registration Intro and Form */}
                <div id="registration-form">
                  <RegistrationIntro />
                  <RegistrationForm
                    onSuccess={handleSuccess}
                    nin={verifiedNin!}
                    ninData={ninData!}
                    onChangeNin={handleChangeNin}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <SuccessScreen onReset={handleReset} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
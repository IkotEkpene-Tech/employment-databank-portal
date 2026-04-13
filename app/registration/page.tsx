/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import { RegistrationIntro } from "@/components/RegistrationIntro";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Footer } from "@/components/Footer";
import { WelcomeModal } from "@/components/WelcomeModal";
import { PageLoader } from "@/components/PageLoader";
import { useGetAllDatabaseWards } from "@/services/tanstack";
import { useRouter, useSearchParams } from "next/navigation";

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

const RegistrationPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNinVerified, setIsNinVerified] = useState(false);
  const [verifiedNin, setVerifiedNin] = useState<string | null>(null);
  const [ninData, setNinData] = useState<NinRecord | null>(null);
  const { isPending: isDataFetching } = useGetAllDatabaseWards();
  const searchParams = useSearchParams();

  const router = useRouter();


    useEffect(() => {
    const nin = searchParams.get("nin");
    const code = searchParams.get("code");
    const raw = sessionStorage.getItem("nin_verification_data");

    if (!nin || !code) {
      router.push("/nin-check");
      return;
    }

    if (!raw) {
      router.push("/nin-check");
      return;
    }

    try {
      const record = JSON.parse(raw) as NinRecord;
      setVerifiedNin(nin);
      setNinData(record);
      setIsNinVerified(true);
    } catch {
      router.push("/nin-check");
    } finally {
      // Clear immediately after reading — don't leave PII in storage
      sessionStorage.removeItem("nin_verification_data");
    }
  }, []);
  


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
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div id="registration-form">
          <RegistrationIntro />
          <RegistrationForm
            onSuccess={handleSuccess}
            nin={verifiedNin!}
            ninData={ninData!}
            onChangeNin={handleChangeNin}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegistrationPage;

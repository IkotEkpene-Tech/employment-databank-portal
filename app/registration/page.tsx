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
import { toast } from "react-toastify";
import { handleClearStorage } from "@/utilities/utils";

// Define the NinRecord type (should match the one in NinVerification component)
export interface NinRecord {
  firstName: string;
  surname: string;
  otherName?: string;
  dob: string;
  gender: string;
  phone: string;
  stateOfOrigin: string;
  accessCode: string;
}

const RegistrationPage = () => {
  const [verifiedNin, setVerifiedNin] = useState<string | null>(null);
  const [ninData, setNinData] = useState<NinRecord | null>(null);
  const { isPending: isDataFetching } = useGetAllDatabaseWards();
  const searchParams = useSearchParams();

  const router = useRouter();

  useEffect(() => {
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
    } catch {
      sessionStorage.removeItem("nin_verification_data");
      toast.error("An error occured, please try again.");
      router.push("/");
    }
  }, []);

  const handleChangeNin = () => {
    router.push("/");
  };

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

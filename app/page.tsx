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

const Index = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isPending: isDataFetching } = useGetAllDatabaseWards();

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleSuccess = () => {
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setIsSubmitted(false);
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
            <RegistrationIntro />
            <RegistrationForm onSuccess={handleSuccess} />
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

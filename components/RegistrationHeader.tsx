"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import { Button } from "./Button";
import { usePathname } from "next/navigation";
import { handleClearStorage } from "@/utilities/utils";
import { usePageLoader } from "@/contexts/useLoader";
import { UtilityModal } from "./UtilityModal";
import { useState } from "react";

export const RegistrationHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { showLoader } = usePageLoader();

  const isDisplayHomeButton = pathname === "/" || pathname === "/coming-soon";

  const handleGoHomeClick = () => {
    setShowConfirmModal(true);
  };

  const handleProceedHome = () => {
    setShowConfirmModal(false);
    showLoader(
      "Redirecting to Home...",
      "Please wait while we take you back to the homepage.",
      true,
    );
    handleClearStorage();
    router.push("/");
  };

  const handleCancelHome = () => {
    setShowConfirmModal(false);
  };

  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-linear-to-br from-[#00371e] via-[#00572f] to-[#007240] shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08)_0%,transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05)_0%,transparent_35%)]" />

      <div className="relative z-10 mx-auto flex max-w-350 flex-col gap-4 px-4 py-3 sm:gap-5 sm:px-6 sm:py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:h-16 sm:w-16 sm:rounded-2xl">
            <Image
              src="/logo/ik-logo-2.png"
              alt="Ikot Ekpene Local Government Logo"
              width={46}
              height={46}
              className="w-8 h-8 object-contain sm:w-auto sm:h-auto"
              priority
            />
          </div>

          <div>
            <h1 className="font-['Playfair_Display'] text-[clamp(14px,3.5vw,24px)] font-bold leading-tight tracking-wide text-white sm:text-[clamp(16px,2vw,24px)]">
              Ikot Ekpene Local Government Area
            </h1>

            <p className="mt-0.5 font-['DM_Sans'] text-[10px] uppercase tracking-[0.2em] text-white/65 sm:mt-1 sm:text-[12px] sm:tracking-[0.25em]">
              Job &amp; Support Registration Portal
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
          {!isDisplayHomeButton && (
            <Button
              onClick={handleGoHomeClick}
              className="group flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm font-semibold text-white shadow-md backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/20 sm:px-4 sm:py-6"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 transition-all duration-200 group-hover:bg-white/20 sm:h-8 sm:w-8">
                <Home className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>

              <div className="flex flex-col items-start leading-none">
                <span>Go Home</span>
              </div>
            </Button>
          )}

          <div className="hidden h-10 w-px bg-white/15 lg:block" />

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            <span className="mr-0 whitespace-nowrap font-['DM_Sans'] text-[10px] uppercase tracking-[0.2em] text-white/80 sm:mr-1 sm:text-[12px] sm:tracking-[0.25em]">
              In partnership with
            </span>

            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 shadow-md backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/20 sm:h-13 sm:w-13 sm:rounded-2xl"
              title="Akwa Ibom State Government"
            >
              <Image
                src="/logo/akwa-ibom-logo-main.png"
                alt="Akwa Ibom State Government Logo"
                width={52}
                height={52}
                className="w-8 h-8 object-contain sm:w-auto sm:h-auto"
                priority
              />
            </div>

            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 shadow-md backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/20 sm:h-13 sm:w-13 sm:rounded-2xl"
              title="Arise Initiative"
            >
              <Image
                src="/logo/arise-white.jpeg"
                alt="Arise Initiative Logo"
                width={52}
                height={52}
                className="w-8 h-8 rounded-full object-contain sm:w-auto sm:h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-0.75 bg-linear-to-r from-[#ec7913] via-[#f7ae59] to-[#ec7913] bg-size-[200%_100%] animate-shimmer" />

      {/* Confirmation Modal */}
      <UtilityModal
        open={showConfirmModal}
        onClose={handleCancelHome}
        title="Leave Registration Process?"
        subtitle="Warning: Unsaved progress will be lost"
        message="Are you sure you want to go back to the home page? If you have already paid and received your access code, your token and phone number have been saved. You can always return and continue your registration using the same access code and phone number."
        type="warning"
        proceedText="Yes, Go Home"
        cancelText="Stay Here"
        onProceed={handleProceedHome}
        onCancel={handleCancelHome}
        closeOnProceed={false}
        closeOnCancel={true}
        clickOutsideToClose={false}
      />
    </header>
  );
};

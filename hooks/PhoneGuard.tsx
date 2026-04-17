"use client";

import { formatPhoneNumber, handleClearStorage } from "@/utilities/utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const phoneRegex = /^0[0-9]{10}$/;

// Pages that don't need the phone guard
const EXCLUDED_PATHS = [
  "/",
  "/payment-failed",
  "/coming-soon",
  "/registration",
  "/payment-success",
  "/coming-soon",
  "/success-screen",
];

const PhoneGuard = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (EXCLUDED_PATHS.includes(pathname)) return;

    const phone = searchParams.get("phone");
    const decoded = phone ? decodeURIComponent(phone) : null;

    const formatted = decoded ? formatPhoneNumber(decoded) : null;

    if (!formatted || !phoneRegex.test(formatted)) {
      toast.error(
        "A valid phone number is required to access this page. Please try again",
      );
      handleClearStorage();
      router.replace("/");
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
};

export default PhoneGuard;

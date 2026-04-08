"use client";

import { formatPhoneNumber } from "@/utilities/utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const phoneRegex = /^0[0-9]{10}$/;

// Pages that don't need the phone guard
const EXCLUDED_PATHS = ["/", "/payment-failed", "/coming-soon"];

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
      router.replace("/");
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
};

export default PhoneGuard;

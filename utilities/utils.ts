/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";

export const formatPhoneNumber = (phone: string): string | any => {
  if (!phone) return null;

  // Remove spaces and decode if needed
  let cleaned = phone.replace(/\s+/g, "");

  // Handle +234 format
  if (cleaned.startsWith("+234")) {
    cleaned = "0" + cleaned.slice(4);
  }

  // Handle 234 without +
  if (cleaned.startsWith("234")) {
    cleaned = "0" + cleaned.slice(3);
  }

  return cleaned;
};

export const getDaysUntilExpiry = (expiresAt: string | Date): any => {
  const now = new Date();
  const expiry = new Date(expiresAt);

  const diffMs = expiry.getTime() - now.getTime();

  if (diffMs <= 0) return 0;

  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

export const handleClearStorage = () => {
  try {
    localStorage.clear();
    sessionStorage.clear();

    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name =
        eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
  } catch (error) {
    console.error("Failed to clear browser storage", error);
  }
};

export const useClearHistoryAndRedirect = () => {
  const router = useRouter();

  const redirectHomeWithNoHistory = () => {
    // Use window.location for a hard navigation that clears history
    window.location.href = "/";
  };

  const replaceHomeAndClearHistory = () => {
    // Replace current entry with home
    router.replace("/");
  };

  return { redirectHomeWithNoHistory, replaceHomeAndClearHistory };
};

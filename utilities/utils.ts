/* eslint-disable @typescript-eslint/no-explicit-any */
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
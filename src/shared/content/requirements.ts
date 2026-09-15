import type { LucideIcon } from "lucide-react";
import { Mail, Phone, Lock, IdCard, Wallet, UserRound, MapPinned, GraduationCap, FileText } from "lucide-react";

export interface RequirementItem {
  icon: LucideIcon;
  text: string;
}

// Step 1 — creating an account (email/password, no NIN or payment yet).
export const ACCOUNT_REQUIREMENTS: RequirementItem[] = [
  { icon: Mail, text: "A valid email address (used for verification codes and login)" },
  { icon: Phone, text: "A working phone number (11 digits, starting with 0)" },
  { icon: Lock, text: "A password you'll use to log in going forward" },
];

// Step 2 — applying for employment, once logged in.
export const APPLICATION_REQUIREMENTS: RequirementItem[] = [
  { icon: IdCard, text: "A valid National Identification Number (NIN)" },
  { icon: Wallet, text: "₦500 one-time fee for NIN verification & your access code" },
  { icon: UserRound, text: "Your Voter Identification Number (VIN)" },
  { icon: MapPinned, text: "Your ward, village and village head's contact details" },
  { icon: GraduationCap, text: "Educational qualification and vocational skills" },
  { icon: FileText, text: "Certificate of Origin (PDF, JPG or PNG, max 5MB)" },
];

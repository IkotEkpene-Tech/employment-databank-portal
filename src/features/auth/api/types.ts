// Progress through the EMPLOYMENT APPLICATION (separate from the account
// itself, which is just email/password + emailVerified). An account can
// exist for a long time at "not_started" before ever touching this.
export type ApplicationStatus =
  | "not_started" // no access-code payment attempted yet
  | "access_pending" // payment initiated/processing for an access code
  | "access_issued" // access code issued, not yet redeemed via NIN + code
  | "nin_verified" // NIN confirmed, name/dob/gender saved to profile
  | "in_progress" // employment registration wizard draft saved
  | "submitted"; // employment registration fully submitted

export interface User {
  id: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  applicationStatus: ApplicationStatus;
  // Populated only once NIN verification has been confirmed (see
  // features/employment-access):
  firstName?: string;
  surname?: string;
  otherName?: string;
  dob?: string;
  gender?: string;
  ninLast4?: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  phone: string;
}

export interface RegisterResponse {
  email: string;
}

export interface VerifyEmailOtpPayload {
  email: string;
  otp: string;
}

export interface ResendEmailOtpPayload {
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RequestLoginOtpPayload {
  email: string;
}

export interface VerifyLoginOtpPayload {
  email: string;
  otp: string;
}

export interface AuthSessionResponse {
  token: string;
  user: User;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

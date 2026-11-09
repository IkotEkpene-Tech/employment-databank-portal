export interface InitiateAccessPaymentResponse {
  authorizationUrl: string;
  reference: string;
}

export type AccessPaymentStatus = "pending" | "processing" | "code_issued" | "failed";

export interface AccessPaymentStatusResponse {
  status: AccessPaymentStatus;
  accessCode?: string; // only present the first time this is fetched after issuance
  accessCodeExpiresAt?: string;
  maxTrials?: number;
  reason?: string;
}

// GET /employment-access/status — a reference-free, always-available check
// for the dashboard (unlike payment-status, which needs a specific Paystack
// reference). Never returns the raw code, only whether one exists and when
// it expires.
export interface EmploymentAccessStatusResponse {
  applicationStatus: string;
  hasAccessCode: boolean;
  accessCodeExpiresAt?: string;
  accessCodeExpired: boolean;
  // NIN lookups left on the current code. Each lookup that gets an answer
  // from the NIN provider uses one (even for a wrong NIN).
  trialsRemaining: number;
  maxTrials: number;
}

export interface VerifyEmploymentAccessPayload {
  nin: string;
  accessCode: string;
}

export interface VerifyEmploymentAccessResponse {
  firstName: string;
  surname: string;
  otherName?: string;
  dob: string;
  gender: string;
  photo?: string; // data: URL of the NIN photo
  trialsRemaining: number;
  maxTrials: number;
  // true if this NIN was already confirmed & saved to the profile in a
  // previous visit — frontend skips the confirm modal and goes straight
  // into the wizard.
  alreadyConfirmed: boolean;
}

export interface ConfirmEmploymentAccessPayload {
  nin: string;
  accessCode: string;
}

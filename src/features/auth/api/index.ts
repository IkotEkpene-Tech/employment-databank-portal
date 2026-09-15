import { httpClient } from "@/shared/lib";
import type {
  RegisterPayload,
  RegisterResponse,
  VerifyEmailOtpPayload,
  ResendEmailOtpPayload,
  LoginPayload,
  RequestLoginOtpPayload,
  VerifyLoginOtpPayload,
  AuthSessionResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  User,
} from "./types";

export const registerAccount = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const { data } = await httpClient.post("/auth/register", payload);
  return data.data;
};

export const verifyEmailOtp = async (payload: VerifyEmailOtpPayload): Promise<void> => {
  await httpClient.post("/auth/verify-email-otp", payload);
};

export const resendEmailOtp = async (payload: ResendEmailOtpPayload): Promise<void> => {
  await httpClient.post("/auth/resend-email-otp", payload);
};

export const login = async (payload: LoginPayload): Promise<AuthSessionResponse> => {
  const { data } = await httpClient.post("/auth/login", payload);
  return data.data;
};

export const requestLoginOtp = async (payload: RequestLoginOtpPayload): Promise<void> => {
  await httpClient.post("/auth/login/request-otp", payload);
};

export const verifyLoginOtp = async (payload: VerifyLoginOtpPayload): Promise<AuthSessionResponse> => {
  const { data } = await httpClient.post("/auth/login/verify-otp", payload);
  return data.data;
};

export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<void> => {
  await httpClient.post("/auth/forgot-password", payload);
};

export const resetPassword = async (payload: ResetPasswordPayload): Promise<void> => {
  await httpClient.post("/auth/reset-password", payload);
};

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await httpClient.get("/auth/me");
  return data.data;
};

export const logout = async (): Promise<void> => {
  await httpClient.post("/auth/logout");
};

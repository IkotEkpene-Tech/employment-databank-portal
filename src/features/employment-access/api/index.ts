import { httpClient } from "@/shared/lib";
import type { User } from "@/features/auth/api/types";
import type {
  InitiateAccessPaymentPayload,
  InitiateAccessPaymentResponse,
  AccessPaymentStatusResponse,
  EmploymentAccessStatusResponse,
  VerifyEmploymentAccessPayload,
  VerifyEmploymentAccessResponse,
  ConfirmEmploymentAccessPayload,
} from "./types";

export const initiateAccessPayment = async (
  payload: InitiateAccessPaymentPayload,
): Promise<InitiateAccessPaymentResponse> => {
  const { data } = await httpClient.post("/employment-access/initiate-payment", payload);
  return data.data;
};

export const getAccessPaymentStatus = async (reference: string): Promise<AccessPaymentStatusResponse> => {
  const { data } = await httpClient.get("/employment-access/payment-status", { params: { reference } });
  return data.data;
};

export const getEmploymentAccessStatus = async (): Promise<EmploymentAccessStatusResponse> => {
  const { data } = await httpClient.get("/employment-access/status");
  return data.data;
};

export const verifyEmploymentAccess = async (
  payload: VerifyEmploymentAccessPayload,
): Promise<VerifyEmploymentAccessResponse> => {
  const { data } = await httpClient.post("/employment-access/verify", payload);
  return data.data;
};

export const confirmEmploymentAccess = async (payload: ConfirmEmploymentAccessPayload): Promise<User> => {
  const { data } = await httpClient.post("/employment-access/confirm", payload);
  return data.data;
};

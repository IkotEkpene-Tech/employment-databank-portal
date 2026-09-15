import { httpClient } from "@/shared/lib";
import type { User } from "@/features/auth/api/types";

export const getApplicantSummary = async (): Promise<User> => {
  const { data } = await httpClient.get("/applicants/me");
  return data.data;
};

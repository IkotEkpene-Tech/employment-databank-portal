import { httpClient } from "@/shared/lib";
import type { Ward, RegistrationDraft, SerializableFormValues, SubmittedApplication } from "../types";

export const getWardsAndVillages = async (): Promise<Ward[]> => {
  const { data } = await httpClient.get("/wards-and-villages/all-wards-villages");
  return data.data;
};

export const submitApplication = async (formData: FormData): Promise<void> => {
  await httpClient.post("/applicants/submit-application", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// The backend always responds 200 here — `data.data` is simply `null` when
// no draft exists yet, never a 404. Real failures (network/401/500) are left
// to propagate so callers can distinguish "no draft" from "couldn't check".
export const getRegistrationDraft = async (): Promise<RegistrationDraft | null> => {
  const { data } = await httpClient.get("/applicants/registration-draft");
  return data.data;
};

export const saveRegistrationDraft = async (payload: {
  values: Partial<SerializableFormValues>;
  step: number;
}): Promise<void> => {
  await httpClient.put("/applicants/registration-draft", payload);
};

export const deleteRegistrationDraft = async (): Promise<void> => {
  await httpClient.delete("/applicants/registration-draft");
};

// New endpoint — only returns data once applicationStatus is "submitted".
export const getSubmittedApplication = async (): Promise<SubmittedApplication> => {
  const { data } = await httpClient.get("/applicants/application");
  return data.data;
};

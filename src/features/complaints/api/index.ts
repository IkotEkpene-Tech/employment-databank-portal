import { httpClient } from "@/shared/lib";

export const submitComplaint = async (formData: FormData): Promise<void> => {
  await httpClient.post("/complaints/submit", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

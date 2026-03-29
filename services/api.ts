/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "./axiosInstance";

export const getAllWardsAndVillages = async () => {
  const response = await axios.get("/wards-and-villages/all-wards-villages");
  return response.data;
};

export const submitApplications = async (uploadData: any) => {
  try {
    const response = await axios.post(
      "/applicants/submit-application",
      uploadData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    throw new Error(message);
  }
};

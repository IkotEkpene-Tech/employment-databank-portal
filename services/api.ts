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

export const checkApplicant = async (
  phoneNumber: any,
  isFetchFull: boolean | any,
) => {
  try {
    const response = await axios.post(
      "/applicants/retrieve-applicant",
      { phoneNumber },
      {
        params: { isFetchFull },
      },
    );
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    throw new Error(message);
  }
};

export const initializePayment = async (phoneNumber: string | any) => {
  const response = await axios.post("/payments/initialize", { phoneNumber });
  return response.data;
};

export const verifyApplicantNin = async (
  phoneNumber: string,
  accessCode: string,
  nin: string,
) => {
  try {
    const response = await axios.post("/applicants/verify-nin", {
      phoneNumber,
      accessCode,
      nin,
    });
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    throw new Error(message);
  }
};

export const saveApplicantNinData = async (body: {
  firstname: string;
  surname: string;
  middlename: string;
  phoneNumber: string;
  birthdate: any;
  photo: string;
  nin: string;
  accessCode: string;
}) => {
  try {
    const response = await axios.post("/applicants/save-nin-details", body);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    throw new Error(message);
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "../axiosInstance";

// export const getAllWardsAndVillages = async () => {
//   const response = await axios.get("/wards-and-villages/all-wards-villages");
//   return response.data;
// };

export const submitComplaints= async (uploadData: any) => {
  try {
    const response = await axios.post(
      "/complaints/submit",
      uploadData,
    );
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    throw new Error(message);
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAccessToken = () => Cookies.get("access_token");
const setAccessToken = (token: string) =>
  Cookies.set("access_token", token, {
    expires: 30,
    secure: true,
    sameSite: "strict",
  });
const clearTokens = () => {
  Cookies.remove("access_token");
  Cookies.remove("userProfile");
};

axiosInstance.interceptors.request.use(
  async (config: any) => {
    const accessToken = getAccessToken();

    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["x-access-token"];

    if (newAccessToken) {
      setAccessToken(newAccessToken);
    }

    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;

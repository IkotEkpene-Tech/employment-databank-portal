import axios, { AxiosError } from "axios";
import { config } from "./config";
import { tokenStorage } from "./storage";
import { ApiError } from "./apiError";

/**
 * The backend replies with several different shapes depending on failure type:
 * - createError()      -> { status: "error", message, timestamp, details }
 * - Joi validate()      -> { status: "error", message }   (no timestamp/details)
 * - express-rate-limit  -> raw string body, e.g. "Too many requests, please try again later"
 * - 401 unauthorized    -> same createError envelope
 * All 204 endpoints return an empty body, which axios surfaces as "" — callers
 * that don't read `.data` on those calls are unaffected.
 */
const extractErrorMessage = (error: AxiosError): string => {
  const data = error.response?.data as unknown;
  if (typeof data === "string" && data.trim().length > 0) return data;
  if (data && typeof data === "object" && typeof (data as { message?: unknown }).message === "string") {
    return (data as { message: string }).message;
  }
  return error.message || "Something went wrong. Please try again.";
};

export const authEvents = new EventTarget();

export const httpClient = axios.create({
  baseURL: config.apiUrl,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use((request) => {
  const token = tokenStorage.get();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      tokenStorage.clear();
      authEvents.dispatchEvent(new Event("unauthorized"));
    }
    return Promise.reject(new ApiError(extractErrorMessage(error), error.response?.status));
  },
);

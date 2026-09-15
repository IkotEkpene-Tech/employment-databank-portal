export const config = {
  apiUrl: import.meta.env.VITE_API_URL ?? "http://localhost:3200/api/v1",
  paystackPublicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ?? "",
  maintenanceMode: import.meta.env.VITE_MAINTENANCE_MODE === "true",
  registrationFee: 100,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkApplicant,
  getAllWardsAndVillages,
  initializePayment,
  saveApplicantNinData,
  submitApplications,
  verifyApplicantNin,
} from "./api";

export const useGetAllDatabaseWards = () => {
  return useQuery({
    queryKey: ["allWards"],
    queryFn: () => getAllWardsAndVillages(),
    refetchOnWindowFocus: false,
    // ...options,
  });
};

export function useSubmitApplications() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updateData: FormData) => submitApplications(updateData),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["allWards"],
      });
    },
    onError: (error) => {
      console.error("Error sending request:", error);
    },
  });
}

export function useCheckApplicant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      phoneNumber,
      isFetchFull,
    }: {
      phoneNumber: string | any;
      isFetchFull?: boolean;
    }) => checkApplicant(phoneNumber, isFetchFull),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["applicantStatus"],
      });
    },
    onError: (error) => {
      console.error("Error checking applicant:", error.message);
    },
  });
}

export function useInitializePayment() {
  return useMutation({
    mutationFn: ({
      phoneNumber,
      email,
      isNotNew,
    }: {
      phoneNumber: string | null;
      email: string;
      isNotNew?: boolean;
    }) => initializePayment(phoneNumber, email, isNotNew),
  });
}

export function useVerifyApplicantNin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      phoneNumber,
      accessCode,
      nin,
    }: {
      phoneNumber: string;
      accessCode: string;
      nin: string;
    }) => verifyApplicantNin(phoneNumber, accessCode, nin),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["verifyApplicantNin"],
      });
    },
    onError: (error) => {
      console.error("Error verifying applicant NIN:", error.message);
    },
  });
}

export function useSaveApplicantNinData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      firstname: string;
      surname: string;
      middlename: string;
      phoneNumber: string;
      birthdate: any;
      email:string;
      // photo: string;
      nin: string;
      accessCode: string;
    }) => saveApplicantNinData(body),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["saveApplicantNinData"],
      });
    },
    onError: (error) => {
      console.error("Error saving applicant NIN data:", error.message);
    },
  });
}

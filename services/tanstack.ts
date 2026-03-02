/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllWardsAndVillages, submitApplications } from "./api";

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
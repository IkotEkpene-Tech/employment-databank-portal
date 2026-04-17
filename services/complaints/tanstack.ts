/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { submitComplaints } from "./api";

// export const useGetAllDatabaseWards = () => {
//   return useQuery({
//     queryKey: ["allWards"],
//     queryFn: () => getAllWardsAndVillages(),
//     refetchOnWindowFocus: false,
//     // ...options,
//   });
// };

export function useSubmitComplaints() {
//   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updateData: FormData) => submitComplaints(updateData),
    // onSuccess: async () => {
    // //   queryClient.invalidateQueries({
    // //     queryKey: ["allWards"],
    // //   });
    // },
    onError: (error) => {
      console.error("Error sending request:", error);
    },
  });
}

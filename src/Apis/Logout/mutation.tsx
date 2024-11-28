"use client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance as axios } from "../../config/axiosInstance";
import { CustomError } from "@/types/AxiosError";
import { ApiResponse } from "@/types/Response";
import { useRouter } from "next/navigation";
import { useErrorMessage } from "@/Zustand/ErrorMessage";
import { LogoutResponse } from "@/types/Logout";

// Define the API call function

const Logout = async (): Promise<LogoutResponse> => {
  const { data } = await axios.get<ApiResponse<LogoutResponse>>(
    `/users/logout`
  );
  return data;
};
export const useLogoutMutation = (): UseMutationResult<
  LogoutResponse,
  CustomError
> => {
  const router = useRouter();
  const { setData } = useErrorMessage();
  return useMutation({
    mutationFn: Logout,
    onSuccess: (data) => {
      console.log("data message ", data);
      setData({
        message: data.message,
        openSnack: true,
        severity: "success",
      });
    },
    onError: (error: CustomError) => {
      //   setData({ message: error.message, openSnack: true, severity: "error" });
      console.error("Error during logout", error);
    },
  });
};

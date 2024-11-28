"use client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance as axios } from "../../config/axiosInstance";
import { CustomError } from "@/types/AxiosError";
import { ApiResponse } from "@/types/Response";
import { useRouter } from "next/navigation";
import {
  ResetPasswordFormData,
  ResetPasswordResponse,
} from "@/types/ResetPassword";

// Define the API call function

const ResetPassword = async (
  formData: ResetPasswordFormData
): Promise<ResetPasswordResponse> => {
  const { data } = await axios.post<ApiResponse<ResetPasswordResponse>>(
    `/users/set-password`,
    formData
  );
  return data.data;
};
export const useResetPasswordMutation = (): UseMutationResult<
  ResetPasswordResponse,
  CustomError,
  ResetPasswordFormData
> => {
  const router = useRouter();

  return useMutation({
    mutationFn: ResetPassword,
    onSuccess: () => {
      router.push(`/signUp`);
    },
    onError: (error: CustomError) => {
      console.error("Error during reset password", error.message);
    },
  });
};

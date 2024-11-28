"use client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance as axios } from "../../config/axiosInstance";
import { CustomError } from "@/types/AxiosError";
import { ApiResponse } from "@/types/Response";
import { useRouter } from "next/navigation";
import {
  ForgetPasswordFormData,
  ForgetPasswordResponse,
} from "@/types/ForgetPassword";
import { useErrorMessage } from "@/Zustand/ErrorMessage";

// Define the API call function

const ForgetPassword = async (
  formData: ForgetPasswordFormData
): Promise<ForgetPasswordResponse> => {
  const { data } = await axios.post<ApiResponse<ForgetPasswordResponse>>(
    `/users/forget-password`,
    formData
  );
  return data.data;
};
export const useForgetPasswordMutation = (): UseMutationResult<
  ForgetPasswordResponse,
  CustomError,
  ForgetPasswordFormData
> => {
  const router = useRouter();
  const { setData } = useErrorMessage();

  return useMutation({
    mutationFn: ForgetPassword,
    onSuccess: (
      data: ForgetPasswordResponse,
      variables: ForgetPasswordFormData
    ) => {
      router.push(
        `/ForgetPasswordOtp?emailOrPhone=${encodeURIComponent(
          variables.emailOrPhone
        )}`
      );
    },
    onError: (error: CustomError) => {
      setData({ message: error.message, severity: "error" });
    },
  });
};

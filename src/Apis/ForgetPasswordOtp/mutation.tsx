"use client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance as axios } from "../../config/axiosInstance";
import { CustomError } from "@/types/AxiosError";
import { ApiResponse } from "@/types/Response";
import { useRouter } from "next/navigation";
import { VerifyMailFormData, VerifyMailResponse } from "@/types/VerifyMail";
import {
  ForgetPasswordOtpFormData,
  ForgetPasswordOtpResponse,
} from "@/types/ForgetPasswordOtp";
import { useErrorMessage } from "@/Zustand/ErrorMessage";

// Define the API call function

const ForgetPasswordOtp = async (
  formData: ForgetPasswordOtpFormData
): Promise<ForgetPasswordOtpResponse> => {
  const { data } = await axios.post<ApiResponse<ForgetPasswordOtpResponse>>(
    `/users/checkForgetPassword-otp`,
    formData
  );
  return data.data;
};
export const useForgetPasswordOtpMutation = (): UseMutationResult<
  ForgetPasswordOtpResponse,
  CustomError,
  ForgetPasswordOtpFormData
> => {
  const router = useRouter();
  const { setData } = useErrorMessage();
  return useMutation({
    mutationFn: ForgetPasswordOtp,
    onSuccess: (
      data: ForgetPasswordOtpResponse,
      variables: ForgetPasswordOtpFormData
    ) => {
      setData({
        message: "success",
        openSnack: true,
        severity: "success",
      });
      router.push(
        `/ResetPassword?emailOrPhone=${encodeURIComponent(
          variables.emailOrPhone
        )}&otp=${encodeURIComponent(variables.otp)}`
      );
    },
    onError: (error: CustomError) => {
      setData({ message: error.message, severity: "error" });
      console.error("Error during verify mail", error.message);
    },
  });
};

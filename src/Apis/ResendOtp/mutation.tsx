"use client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance as axios } from "../../config/axiosInstance";
import { CustomError } from "@/types/AxiosError";
import { ApiResponse } from "@/types/Response";
import { ResendOtpFormData, ResendOtpResponse } from "@/types/ResendOtp";

// Define the API call function

const ResendOtp = async (
  formData: ResendOtpFormData
): Promise<ResendOtpResponse> => {
  const { data } = await axios.post<ApiResponse<ResendOtpResponse>>(
    `/users/forget-password`,
    formData
  );
  return data.data;
};
export const useResendOtpMutation = (): UseMutationResult<
  ResendOtpResponse,
  CustomError,
  ResendOtpFormData
> => {
  return useMutation({
    mutationFn: ResendOtp,
    onSuccess: () => {
      console.log("mail sent successfully");
    },
    onError: (error: CustomError) => {
      console.error("Error during sent mail", error.message);
    },
  });
};

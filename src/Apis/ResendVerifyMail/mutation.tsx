"use client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance as axios } from "../../config/axiosInstance";
import { CustomError } from "@/types/AxiosError";
import { ApiResponse } from "@/types/Response";
import { useRouter } from "next/navigation";
import { ResendMailFormData, ResendMailResponse } from "@/types/ResendMail";

// Define the API call function

const ResendVerifyMail = async (
  formData: ResendMailFormData
): Promise<ResendMailResponse> => {
  const { data } = await axios.post<ApiResponse<ResendMailResponse>>(
    `/users/sendVerifyEmail`,
    formData
  );
  return data.data;
};
export const useResendVerifyMailMutation = (): UseMutationResult<
  ResendMailResponse,
  CustomError,
  ResendMailFormData
> => {
  const router = useRouter();

  return useMutation({
    mutationFn: ResendVerifyMail,
    onSuccess: () => {
      console.log("mail sent successfully");
    },
    onError: (error: CustomError) => {
      console.error("Error during resend mail", error.message);
    },
  });
};

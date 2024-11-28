"use client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance as axios } from "../../config/axiosInstance";
import { SignUpFormData, SignUpResponse } from "@/types/SignUp";
import { CustomError } from "@/types/AxiosError";
import { ApiResponse } from "@/types/Response";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Zustand/useAuth";
import { useErrorMessage } from "@/Zustand/ErrorMessage";

// Define the API call function

const registerUser = async (
  formData: SignUpFormData
): Promise<SignUpResponse> => {
  const { data } = await axios.post<ApiResponse<SignUpResponse>>(
    `/users/register`,
    formData
  );
  return data.data;
};
export const useSignUpMutation = (): UseMutationResult<
  SignUpResponse,
  CustomError,
  SignUpFormData
> => {
  const router = useRouter();
  const { setToken } = useAuth();
  const { setData } = useErrorMessage();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data: SignUpResponse, variables: SignUpFormData) => {
      // setData({
      //   message: "User has been created successfully",
      //   openSnack: true,
      //   severity: "success",
      // });
      // setToken(data?.accessToken);
      router.replace(`/Verify?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error: CustomError) => {
      setData({ message: error.message, severity: "error" });
      console.error("Error during signup", error.message);
    },
  });
};

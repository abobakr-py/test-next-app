"use client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance as axios } from "../../config/axiosInstance";
import { CustomError } from "@/types/AxiosError";
import { ApiResponse } from "@/types/Response";
import { useRouter } from "next/navigation";
import { VerifyMailFormData, VerifyMailResponse } from "@/types/VerifyMail";
import { useErrorMessage } from "@/Zustand/ErrorMessage";
import { useAuth } from "@/Zustand/useAuth";

// Define the API call function

const verifyMail = async (
  formData: VerifyMailFormData
): Promise<VerifyMailResponse> => {
  const { data } = await axios.post<ApiResponse<VerifyMailResponse>>(
    `/users/verify-email`,
    formData
  );
  return data.data;
};
export const useVerifyMailMutation = (): UseMutationResult<
  VerifyMailResponse,
  CustomError,
  VerifyMailFormData
> => {
  const router = useRouter();
  const { setData } = useErrorMessage();
  const { setToken, setUser } = useAuth();

  return useMutation({
    mutationFn: verifyMail,
    onSuccess: (data) => {
      // setData({
      //   message: "success",
      //   openSnack: true,
      //   severity: "success",
      // });
      setToken(data?.accessToken);
      setUser(data?.user);
      router.push("/");
    },
    onError: (error: CustomError) => {
      setData({ message: error.message, severity: "error" });
      console.error("Error during verify mail", error.message);
    },
  });
};

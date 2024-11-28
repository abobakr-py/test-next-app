"use client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance as axios } from "../../config/axiosInstance";
import { CustomError } from "@/types/AxiosError";
import { ApiResponse } from "@/types/Response";
import { useErrorMessage } from "@/Zustand/ErrorMessage";
import {
  ChangePasswordFormData,
  ChangePasswordResponse,
} from "@/types/Profile";

// Define the API call function

const ChangePassword = async (
  formData: ChangePasswordFormData
): Promise<ChangePasswordResponse> => {
  const { data } = await axios.post<ApiResponse<ChangePasswordResponse>>(
    `/users/change-password`,
    formData
  );
  return data;
};
export const useChangePasswordMutation = (): UseMutationResult<
  ChangePasswordResponse,
  CustomError,
  ChangePasswordFormData
> => {
  const { setData } = useErrorMessage();
  return useMutation({
    mutationFn: ChangePassword,
    onSuccess: (data) => {
      // console.log("data ", data);
      // setData({
      //   message: "Data Edited Successfully",
      //   severity: "success",
      //   openSnack: true,
      // });
    },
    onError: (error: CustomError) => {
      console.log("error ", error);
      setData({ message: error.message, severity: "error" });
    },
  });
};

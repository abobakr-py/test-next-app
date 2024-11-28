"use client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance as axios } from "../../config/axiosInstance";
import { CustomError } from "@/types/AxiosError";
import { ApiResponse } from "@/types/Response";
import { useErrorMessage } from "@/Zustand/ErrorMessage";
import { EditProfileFormData, EditProfileResponse } from "@/types/Profile";

// Define the API call function

const EditProfile = async (
  formData: EditProfileFormData
): Promise<EditProfileResponse> => {
  const { data } = await axios.post<ApiResponse<EditProfileResponse>>(
    `/users/edit`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.data;
};
export const useEditProfileMutation = (): UseMutationResult<
  EditProfileResponse,
  CustomError,
  EditProfileFormData
> => {
  const { setData } = useErrorMessage();
  return useMutation({
    mutationFn: EditProfile,
    onSuccess: (data) => {
      console.log("data 2 ", data);
      setData({
        message: "Data Edited Successfully",
        severity: "success",
        openSnack: true,
      });
    },
    onError: (error: CustomError) => {
      setData({ message: error.message, severity: "error" });
    },
  });
};

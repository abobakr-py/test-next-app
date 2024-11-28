"use client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance as axios } from "../../config/axiosInstance";
import { CustomError } from "@/types/AxiosError";
import { ApiResponse } from "@/types/Response";
import { useRouter } from "next/navigation";
import { LoginFormData, LoginResponse } from "@/types/login";
import { useAuth } from "@/Zustand/useAuth";
import { useErrorMessage } from "@/Zustand/ErrorMessage";

// Define the API call function

const Login = async (formData: LoginFormData): Promise<LoginResponse> => {
  const { data } = await axios.post<ApiResponse<LoginResponse>>(
    `/users/login`,
    formData
  );
  return data.data;
};
export const useLoginMutation = (): UseMutationResult<
  LoginResponse,
  CustomError,
  LoginFormData
> => {
  const { setToken, setUser } = useAuth();
  const router = useRouter();
  const { setData } = useErrorMessage();
  return useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
      // setData({
      //   message: "Logged in successfully",
      //   openSnack: true,
      //   severity: "success",
      // });
      setToken(data?.accessToken);
      setUser(data?.user);
      router.replace("/");
    },
    onError: (error: CustomError, variables: LoginFormData) => {
      console.log("error.message ...", error.message);
      if (error.message === "your_email_is_not_verified") {
        router.replace(`/Verify?email=${encodeURIComponent(variables.email)}`);

        // setData({
        //   message: "Please verify your email",
        //   severity: "error",
        // });
        console.log("error.message ", error.message);
        // router.push("/verify");
      } else {
        setData({ message: error.message, severity: "error" });
      }
      console.error("Error during login", error);
    },
  });
};

"use client";
import { BASE_URL } from "@/config/config";
import { usePhoneNumberOrEmail } from "@/zustand/usePhoneNumberOrEmail";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
// Define the login function
const registerUser = async (userData) => {
  let sentData = { ...userData };
  sentData.phone = sentData.phone.slice(1);
  const response = await axios.post(`${BASE_URL}/users/register`, sentData);
   return response.data;
};

// Define the useLogin hook
export const useRegister = () => {
  const navigate = useRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      // Success actions
      toast("Account has been successfully created", {
        position: "top-right",
        autoClose: 5000,
        type: "success",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
      navigate.push("/verify-otp/");
    },
    onError: (error) => {
      // Handle errors, e.g., showing error messages
      toast(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    },
  });
};

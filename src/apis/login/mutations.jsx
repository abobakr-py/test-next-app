"use client";
import { BASE_URL } from "@/config/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

// Define the API URL

// Define the login function
const loginUser = async (userData) => {
  let sentData = { ...userData };
  if (sentData?.credentials_type === "email") {
  } else {
    sentData.phone = sentData.phone.slice(1);
  }
  const response = await axios.post(`${BASE_URL}/users/login`, sentData);

   return response.data;
};

// Define the useLogin hook
export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Handle successful login, e.g., storing token, redirecting, etc.
      localStorage.setItem("token", data?.data?.accessToken);
      toast("Welcome Back 😄", {
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

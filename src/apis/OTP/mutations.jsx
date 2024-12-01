"use client";
import { BASE_URL } from "@/config/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

//!Verify Email OTP
const verifyEmail = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users/verify-email`, userData);

  return response.data;
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      // Handle successful login, e.g., storing token, redirecting, etc.
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

//!Verify Phone OTP
const verifyPhone = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users/verify-phone`, userData);

  return response.data;
};

export const useVerifyPhone = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: verifyPhone,
    onSuccess: (data) => {
      // Handle successful login, e.g., storing token, redirecting, etc.

      localStorage.setItem("token", data?.data?.accessToken);
      //   router.push("/home/");
    },
    onError: (error) => {
      // Handle errors, e.g., showing error messages
      if (error?.response?.data?.message !== "validation Error") {
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
      } else {
        toast(error?.response?.data?.validation?.otp, {
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
      }
    },
  });
};

//?Resend Email OTP
const resendLoginOTP = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/users/login-sendOtp`,
    userData
  );

  return response.data;
};

export const useResendLoginOTP = () => {
  return useMutation({
    mutationFn: resendLoginOTP,
    onSuccess: (data) => {
      // Handle successful login, e.g., storing token, redirecting, etc.
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
//?Resend Phone OTP
const resendPhoneOTP = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/users/sendPhone-otp`,
    userData
  );
  return response.data;
};

export const useResendPhone = () => {
  return useMutation({
    mutationFn: resendPhoneOTP,
    onSuccess: (data) => {
      // Handle successful login, e.g., storing token, redirecting, etc.
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
//Todo:
const forgetPassword = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/users/forget-password`,
    userData
  );
  if (response?.status === 200) {
    localStorage.setItem(
      "phoneOrEmailOTP",
      userData?.credentials_type === "email" ? "Email" : "Phone"
    );
    localStorage.setItem(
      "phoneOrEmail",
      userData?.credentials_type === "email" ? userData?.email : userData?.phone
    );
    toast.success(
      `OTP Sent to your ${
        userData?.credentials_type === "email" ? "Email" : "Phone"
      }`,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      }
    );
  }
  return response.data;
};

export const useForgetPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: forgetPassword,
    onSuccess: (data) => {
      router.push("/verify-password-reset");
      // Handle successful login, e.g., storing token, redirecting, etc.
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
//Todo:
const setNewPassword = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users/set-password`, userData);

  return response.data;
};

export const useSetNewPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: setNewPassword,
    onSuccess: (data) => {
      router.push("/login");

      // Handle successful login, e.g., storing token, redirecting, etc.
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
//!Send Email OTP and phone OTP
const sendEmailOrPhoneOTP = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/users/login-sendOtp`,
    userData
  );
  return response.data;
};
export const useSendEmailOrPhoneOTP = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: sendEmailOrPhoneOTP,
    onSuccess: (data) => {
      // Handle successful login, e.g., storing token, redirecting, etc.
      router.push("/verify-otp");
    },
    onError: (error) => {
      // Handle errors, e.g., showing error messages
    },
  });
};

//!Verify Phone OTP
const verifyLogin = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users/login-otp`, userData);

  return response.data;
};

export const useVerifyLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: verifyLogin,
    onSuccess: (data) => {
      // Handle successful login, e.g., storing token, redirecting, etc.

      localStorage.setItem("token", data?.data?.accessToken);
      //   router.push("/home/");
    },
    onError: (error) => {
      // Handle errors, e.g., showing error messages
      // if (error?.response?.data?.message !== "validation Error") {
      //   toast(error?.response?.data?.message, {
      //     position: "top-right",
      //     autoClose: 5000,
      //     type: "error",
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     transition: Bounce,
      //   });
      // } else {
      //   toast(error?.response?.data?.validation?.otp, {
      //     position: "top-right",
      //     autoClose: 5000,
      //     type: "error",
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     transition: Bounce,
      //   });
      // }
    },
  });
};

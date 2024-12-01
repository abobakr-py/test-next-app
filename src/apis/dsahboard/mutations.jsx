"use client";
import { BASE_URL } from "@/config/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

// Define the API URL

// Define the login function
const BuyGold = async (userData) => {
  let sentData = { ...userData };
  //  "order_type": 3,
  // "pin_code": "111111",
  // "timezone": "2024-10-09T10:03:17.907262",
  // "orderDetails": [{ "totalWeight": 3.788 }]
  const response = await axios.post(`${BASE_URL}/orders/add`, sentData, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return response.data;
};

// Define the useLogin hook
export const useBuyGold = () => {
  return useMutation({
    mutationFn: BuyGold,
    onError: (error) => {
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
// Define the login function
const SellGold = async (grams) => {
  let sentData = { type: 3, ...grams };

  const response = await axios.post(`${BASE_URL}/orders/sell`, sentData, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return response.data;
};

// Define the useLogin hook
export const useSellGold = () => {
  return useMutation({
    mutationFn: SellGold,
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
// Define the login function
const checkVoucher = async (data) => {
  const response = await axios.post(`${BASE_URL}/orders/preOrder`, data, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return response.data;
};

// Define the useLogin hook
export const useCheckVoucher = () => {
  return useMutation({
    mutationFn: checkVoucher,
  });
};
// Define the login function
const checkPinCode = async (data) => {
  const response = await axios.post(`${BASE_URL}/users/checkPinCode`, data, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return response.data;
};

// Define the useLogin hook
export const useCheckPinCode = () => {
  return useMutation({
    mutationFn: checkPinCode,
  });
};

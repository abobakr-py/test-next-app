"use client";
import { BASE_URL } from "@/config/config";
import { usePhoneNumberOrEmail } from "@/zustand/usePhoneNumberOrEmail";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

// Define the getUser function (using GET request)
const getUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data?.data?.user;
  } catch (error) {
    throw error;
  }
};

// Define the useGetUser hook using useQuery instead of useMutation
export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    onError: (error) => {
      // Handle errors by showing toast notifications
      toast(error?.response?.data?.message || "Failed to fetch user data", {
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
// Define the getUser function (using GET request)
const getUserGold = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/goldTransactions/userGolds`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data?.data;
  } catch (error) {
    throw error;
  }
};

// Define the useGetUserGold hook using useQuery instead of useMutation
export const useGetUserGold = () => {
  return useQuery({
    queryKey: ["userGold"],
    queryFn: getUserGold,
    onError: (error) => {
      // Handle errors by showing toast notifications
      toast(error?.response?.data?.message || "Failed to fetch user data", {
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

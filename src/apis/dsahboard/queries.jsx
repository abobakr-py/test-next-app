"use client";
import { BASE_URL } from "@/config/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

// Define the getUser function (using GET request)
// Define the useGetGoldPrice hook using useQuery instead of useMutation
export const useGetGoldPrice = () => {
  return useQuery({
    queryKey: ["goldPrice"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/goldprice/currentPrice`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        return response.data?.data;
      } catch (error) {
        throw error;
      }
    },
    onError: (error) => {
      // Handle errors by showing toast notifications
      toast(error?.response?.data?.message || "Failed to fetch  data", {
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
export const useGetConfiguration = () => {
  return useQuery({
    queryKey: ["configuration"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/config/mobile`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        return response.data?.data;
      } catch (error) {
        throw error;
      }
    },
    onError: (error) => {
      // Handle errors by showing toast notifications
      toast(error?.response?.data?.message || "Failed to fetch  data", {
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

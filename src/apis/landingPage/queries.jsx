"use client";
import { BASE_URL } from "@/config/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the getUser function (using GET request)
// Define the useGetGoldPrice hook using useQuery instead of useMutation
export const useGetGoldPriceForLandingPage = () => {
  return useQuery({
    queryKey: ["goldPriceLanding"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/goldprice/livePrice`);
        return response.data?.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

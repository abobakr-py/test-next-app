import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance as axios } from "../../config/axiosInstance";
import { ApiResponse } from "@/types/Response";
import { FetchProfileResponse } from "@/types/Profile";

// API call to fetch Profile Settings
const fetchProfileSettings = async (): Promise<FetchProfileResponse> => {
  const { data } = await axios.get<ApiResponse<FetchProfileResponse>>(
    `/users/me`
  );
  return data.data;
};
export const useFetchProfileSettings =
  (): UseQueryResult<FetchProfileResponse> => {
    return useQuery<FetchProfileResponse>({
      queryKey: ["fetchProfileSettings"],
      queryFn: () => fetchProfileSettings(),
    });
  };

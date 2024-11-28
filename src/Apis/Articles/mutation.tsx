"use client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance as axios } from "../../config/axiosInstance";
import { CustomError } from "@/types/AxiosError";
import { ApiResponse } from "@/types/Response";
import { useErrorMessage } from "@/Zustand/ErrorMessage";
import { LikeArticleResponse, SaveArticleResponse } from "@/types/Articles";

// Define the API call function

// API CAll to Like an Article
const likeArticle = async (id: any): Promise<LikeArticleResponse> => {
  const { data } = await axios.get<ApiResponse<LikeArticleResponse>>(
    `/articles/like/${id}`
  );
  return data.data;
};
export const useLikeArticleMutation = (): UseMutationResult<
  LikeArticleResponse,
  CustomError
> => {
  const { setData } = useErrorMessage();
  return useMutation({
    mutationFn: likeArticle,
    onSuccess: () => {
      // setData({
      //   message: "تمت الإضافة للإعجابات",
      //   openSnack: true,
      //   severity: "success",
      // });
    },
    onError: (error: CustomError) => {
      setData({ message: error.message, openSnack: true, severity: "error" });
      console.error("Failed to like article", error);
    },
  });
};
// API CAll to Save an Article
const saveArticle = async (id: any): Promise<SaveArticleResponse> => {
  const { data } = await axios.get<ApiResponse<SaveArticleResponse>>(
    `/articles/save/${id}`
  );
  return data.data;
};
export const useSaveArticleMutation = (): UseMutationResult<
  SaveArticleResponse,
  CustomError
> => {
  const { setData } = useErrorMessage();
  return useMutation({
    mutationFn: saveArticle,
    onSuccess: () => {
      // setData({
      //   message: "تم",
      //   openSnack: true,
      //   severity: "success",
      // });
    },
    onError: (error: CustomError) => {
      setData({ message: error.message, openSnack: true, severity: "error" });
      console.error("Failed to save article", error);
    },
  });
};

import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { axiosInstance as axios } from "../../config/axiosInstance";
import {
  AllArticlesResponse,
  articleById,
  FetchArticlesResponse,
  FetchRandomArticlesResponse,
  FetchTopicsResponse,
  RecommendedArticleById,
  RecommendedArticleResponse,
  SavedArticlesResponse,
} from "@/types/Articles";
import { ApiResponse } from "@/types/Response";

// API call to fetch Recommended Articles
const fetchRecommendedArticles = async (params: {
  is_home?: number;
  topic_id?: number;
  limit?: number;
  page?: number;
}): Promise<FetchArticlesResponse> => {
  const { data } = await axios.get<ApiResponse<FetchArticlesResponse>>(
    `/articles/web`,
    { params }
  );
  return data.data;
};
export const useFetchRecommendedArticles = (params: {
  is_home?: number;
  topic_id?: number;
  limit?: number;
  page?: number;
}): UseQueryResult<FetchArticlesResponse> => {
  return useQuery<FetchArticlesResponse>({
    queryKey: ["fetchRecommendedArticles", params],
    queryFn: () => fetchRecommendedArticles(params),
  });
};

// API call to fetch All topics
const fetchTopics = async (): Promise<FetchTopicsResponse> => {
  const { data } = await axios.get<ApiResponse<FetchTopicsResponse>>(
    `/topics/web`
  );
  return data.data;
};
export const useFetchTopics = (): UseQueryResult<FetchTopicsResponse> => {
  return useQuery<FetchTopicsResponse>({
    queryKey: ["fetchTopics"],
    queryFn: () => fetchTopics(),
  });
};

// API call to fetch Random Articles
const fetchRandomArticles = async (): Promise<FetchRandomArticlesResponse> => {
  const { data } = await axios.get<ApiResponse<FetchRandomArticlesResponse>>(
    `/articles/random`
  );
  return data.data;
};
export const useFetchRandomArticles =
  (): UseQueryResult<FetchRandomArticlesResponse> => {
    return useQuery<FetchRandomArticlesResponse>({
      queryKey: ["fetchRandomArticles"],
      queryFn: () => fetchRandomArticles(),
    });
  };

// API call to fetch Article Details
const fetchArticleDetails = async (id: any): Promise<articleById> => {
  const { data } = await axios.get<ApiResponse<articleById>>(
    `/articles/details/${id}`
  );
  return data.data;
};
export const useFetchArticleDetails = (
  id: any
): UseQueryResult<articleById> => {
  return useQuery<articleById>({
    queryKey: ["fetchArticleDetails", id],
    queryFn: () => fetchArticleDetails(id),
    enabled: !!id,
  });
};

// API call to fetch Recommended Articles Details
const fetchRecommendedArticlesDetails = async (
  id: any,
  limit: number
): Promise<RecommendedArticleById> => {
  const { data } = await axios.get<ApiResponse<RecommendedArticleById>>(
    `/articles/recommended/${id}`,
    {
      params: { limit },
    }
  );
  return data.data;
};
export const useFetchRecommendedArticlesDetails = (
  id: any,
  limit: number
): UseQueryResult<RecommendedArticleById> => {
  return useQuery<RecommendedArticleById>({
    queryKey: ["fetchRecommendedArticlesDetails", id],
    queryFn: () => fetchRecommendedArticlesDetails(id, limit),
    enabled: !!id,
  });
};

// API call to fetch Infinite Scroll Recommended Articles
const fetchInfiniteScrollRecommendedArticles = async (
  id: any,
  page: number,
  limit: number
): Promise<RecommendedArticleResponse> => {
  const { data } = await axios.get(`/articles/recommended/${id}`, {
    params: { limit, page },
  });
  return data.data;
};

export const useFetchInfiniteScrollRecommendedArticles = (
  id: any,
  limit: number
): UseInfiniteQueryResult<InfiniteData<RecommendedArticleResponse>, Error> => {
  return useInfiniteQuery<RecommendedArticleResponse, Error>({
    queryKey: ["fetchInfiniteScrollRecommendedArticles", id],
    queryFn: async ({ pageParam = 1 }: any) => {
      // Use pageParam instead of queryKey[2] for the page number
      return await fetchInfiniteScrollRecommendedArticles(id, pageParam, limit);
    },
    enabled: !!id,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetchedItems = allPages.flatMap((page) => page.result).length;

      // Only fetch the next page if the fetched items are less than totalItems
      return totalFetchedItems < lastPage.totalItems
        ? allPages.length
        : undefined;
    },
    initialPageParam: 1,
  });
};
// API call to fetch Infinite Scroll All Articles
const fetchAllArticles = async (
  page: number,
  topicId?: string
): Promise<AllArticlesResponse> => {
  const { data } = await axios.get(`/articles/web`, {
    params: { page, topic_id: topicId },
  });
  return data.data;
};

export const useFetchAllArticles = (
  topicId?: string
): UseInfiniteQueryResult<InfiniteData<AllArticlesResponse>, Error> => {
  return useInfiniteQuery<AllArticlesResponse, Error>({
    queryKey: ["fetchAllArticles", topicId],
    queryFn: async ({ pageParam = 0 }: any) => {
      // Use pageParam instead of queryKey[2] for the page number
      return await fetchAllArticles(pageParam, topicId);
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetchedItems = allPages.flatMap((page) => page.result).length;

      // Only fetch the next page if the fetched items are less than totalItems
      return totalFetchedItems < lastPage.totalItems
        ? allPages.length
        : undefined;
    },
    initialPageParam: 0,
  });
};
// API call to fetch Infinite Scroll Saved Articles
const fetchSavedArticles = async (
  page: number
): Promise<SavedArticlesResponse> => {
  const { data } = await axios.get(`/articles/getSaved`, {
    params: { page },
  });
  return data;
};

export const useFetchSavedArticles = (): UseInfiniteQueryResult<
  InfiniteData<SavedArticlesResponse>,
  Error
> => {
  return useInfiniteQuery<SavedArticlesResponse, Error>({
    queryKey: ["fetchSavedArticles"],
    queryFn: async ({ pageParam = 0 }: any) => {
      // Use pageParam instead of queryKey[2] for the page number
      return await fetchSavedArticles(pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetchedItems = allPages.flatMap(
        (page) => page?.data?.savedArticles?.result
      ).length;
      // Only fetch the next page if the fetched items are less than totalItems
      return totalFetchedItems < lastPage?.data?.savedArticles?.totalItems
        ? allPages.length
        : undefined;
    },
    initialPageParam: 0,
  });
};

// const fetchInfiniteScrollRecommendedArticles = async (
//   id: any,
//   page: number,
//   limit: number
// ): Promise<RecommendedArticleResponse> => {
//   const { data } = await axios.get<ApiResponse<RecommendedArticleResponse>>(
//     `/articles/recommended/${id}`,
//     { params: { limit, page } }
//   );
//   return data.data; // Ensure this is the correct path to your response data
// };

// // Custom hook to fetch data with infinite scrolling
// export const useFetchInfiniteScrollRecommendedArticles = (
//   id: any,
//   limit: number
// ): UseInfiniteQueryResult<InfiniteData<RecommendedArticleResponse>, Error> => {
//   return useInfiniteQuery<RecommendedArticleResponse, Error>({
//     queryKey: ["fetchInfiniteScrollRecommendedArticles", id],
//     queryFn: async ({ queryKey }) => {
//       const page = (queryKey[2] as number) || 1; // Default to page 1
//       return await fetchInfiniteScrollRecommendedArticles(id, page, limit);
//     },
//     enabled: !!id,
//     getNextPageParam: (lastPage) => {
//       const currentPage = lastPage.result.length > 0 ? lastPage.totalPages : 0; // Adjust as necessary
//       return currentPage < lastPage.totalPages ? currentPage + 1 : undefined;
//     },
//     initialPageParam: 1,
//   });
// };
// const fetchInfiniteScrollRecommendedArticles = async (
//   id: any,
//   params: {
//     limit: number;
//     page: number;
//   }
// ): Promise<RecommendedArticleById> => {
//   const { data } = await axios.get<ApiResponse<RecommendedArticleById>>(
//     `/articles/recommended/${id}`,
//     { params }
//   );
//   return data.data;
// };
// export const useFetchInfiniteScrollRecommendedArticles = (
//   id: any,
//   params: {
//     limit: number;
//     page: number;
//   }
// ): UseQueryResult<RecommendedArticleById> => {
//   return useQuery<RecommendedArticleById>({
//     queryKey: ["fetchInfiniteScrollRecommendedArticles", id, params],
//     queryFn: () => fetchInfiniteScrollRecommendedArticles(id, params),
//     enabled: !!id,
//   });
// };

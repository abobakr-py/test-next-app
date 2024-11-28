export interface Article {
  id: string;
  title: string;
  adminPhoto: string;
  body: any;
  created: string;
  is_saved: boolean;
  photo: string;
  adminName: string;
  tags: any;
}
export interface AllArticles {
  id: any;
  title: string;
  body: string;
  photo: string;
  created: string;
  is_saved: boolean;
  is_like: any;
  totalLikes: number;
  adminName: string;
  adminPhoto: string | null;
  tags: { id: number; name: string }[];
}
export interface FetchRandomArticlesResponse {
  id: number;
  title: string;
  body: string;
  photo: string;
  created: string;
  is_saved: number;
  adminName: string;
  adminPhoto: string | null;
  tags: { id: number; name: string }[];
}
export interface FetchArticlesResponse {
  result: Article[];
  total: number;
}
export interface FetchTopicsResponse {
  id: any;
  name: string;
}
export interface articleById {
  id: any;
  title: string;
  adminPhoto: string;
  body: any;
  is_like: any;
  is_saved: boolean;
  photo: string;
  topic_id: number;
  totalLikes: number;
  username: string;
  adminName: string;
  created: any;
  tags: any;
}
export interface RecommendedArticleById {
  adminName: string;
  adminPhoto: string;
  body: any;
  created: string;
  id: number;
  is_saved: boolean;
  is_like: any;
  photo: string;
  totalLikes: number;
  tags: any;
  title: string;
}
// Define the API response structure with metadata
export interface RecommendedArticleResponse {
  result: AllArticles[];
  totalItems: number;
  totalPages: number;
}
export interface AllArticlesResponse {
  result: AllArticles[];
  totalItems: number;
  totalPages: number;
}
export interface SavedArticlesData {
  result: AllArticles[];
  totalItems: number;
  totalPages: number;
}
// Type definition for the recommend array items
interface Recommendation {
  id: string;
  title: string;
  body: string;
  photo: string;
  created: string;
  is_saved: boolean;
  adminName: string;
  adminPhoto: any;
  is_like: boolean;
  totalLikes: number;
  tags: { id: number; name: string }[];
}

// Type definition for the overall API response
export interface SavedArticlesResponse {
  status: number;
  data: {
    savedArticles: SavedArticlesData;
    recommend: Recommendation[];
  };
}
export interface LikeArticleResponse {
  status: number;
  message: string;
}
export interface SaveArticleResponse {
  status: number;
  message: string;
}

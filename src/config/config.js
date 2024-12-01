export const BASE_URL = `https://dev.api.sabika.app/api`;

export const token =
  typeof window !== "undefined" && localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";

    
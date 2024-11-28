import { getCookie } from "cookies-next";

export const BASE_URL = `https://dev.sabika.app/api`;

export const token =
  typeof window !== "undefined" && getCookie("token") ? getCookie("token") : "";

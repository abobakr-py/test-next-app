"use client";
import axios from "axios";
import { BASE_URL } from "./config";
import { getCookie, deleteCookie } from "cookies-next";

const getToken = () => {
  return getCookie("token");
};
const getLang = () => {
  return getCookie("NEXT_LOCALE");
};

export const authToken = getToken();
export const lang = getLang();
export const dn = BASE_URL;
export const imageBaseUrl = `https://dev.sabika.app`;

export const axiosInstance = axios.create({
  baseURL: dn,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  config.headers["Content-Type"] =
    config.headers["Content-Type"] || "application/json";
  // config.headers["lang"] = lang;
  config.headers["lang"] = "ar";
  return config;
});

const redirectToLogin = () => {
  window.location.href = "/signUp";
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      deleteCookie("token");
      redirectToLogin();
    }

    return Promise.reject({
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.status,
    });
  }
);

'use client'
import axios from "axios";
import { BASE_URL } from "./config";

const getToken = () => {
  return localStorage.getItem("token");
};

export const authToken = getToken();
export const dn = BASE_URL;

export const axiosInstance = axios.create({
  baseURL: dn,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  config.headers["Content-Type"] =
    config.headers["Content-Type"] || "application/json";
  return config;
});

const redirectToLogin = () => {
  window.location.href = "/login";
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      redirectToLogin();
    }

    return Promise.reject({
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.status,
    });
  }
);

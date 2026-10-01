import axios from "axios";
import { getAccessToken } from "@/lib/authToken";
import { toApiError } from "@/lib/apiError";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(toApiError(error)),
);

import axios, { type InternalAxiosRequestConfig } from "axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { getAccessToken, setAccessToken } from "@/lib/authToken";
import { toApiError } from "@/lib/apiError";
import { refreshAccessToken } from "@/lib/refresh";

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

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
  async (error) => {
    const original: RetriableConfig | undefined = error.config;
    const shouldRefresh =
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      original.url !== ENDPOINTS.auth.googleLogin;

    if (!shouldRefresh) return Promise.reject(toApiError(error));

    original._retry = true;
    try {
      const token = await refreshAccessToken();
      original.headers.Authorization = `Bearer ${token}`;
      return api(original);
    } catch (refreshError) {
      setAccessToken(null);
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    }
  },
);

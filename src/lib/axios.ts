import axios, { type InternalAxiosRequestConfig } from "axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { getAccessToken, setAccessToken } from "@/lib/authToken";
import { toApiError } from "@/lib/apiError";
import { refreshAccessToken } from "@/lib/refresh";

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

// 401이어도 재발급을 시도하지 않는 요청 (로그인 실패, 이미 만료된 Refresh Token으로의 로그아웃)
const NO_REFRESH_URLS: string[] = [
  ENDPOINTS.auth.googleLogin,
  ENDPOINTS.auth.logout,
];

export const api =axios.create({
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
      !NO_REFRESH_URLS.includes(original.url ?? "");

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

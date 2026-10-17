import axios from "axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { toApiError, type ApiResponse } from "@/lib/apiError";
import { setAccessToken } from "@/lib/authToken";

type RefreshData = {
  accessToken: string;
  expiresIn: number;
};

const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

let pending: Promise<string> | null = null;

export function refreshAccessToken() {
  pending ??= refreshClient
    .post<ApiResponse<RefreshData>>(ENDPOINTS.auth.refresh)
    .then(({ data }) => {
      setAccessToken(data.data.accessToken);
      return data.data.accessToken;
    })
    .catch((error) => {
      throw toApiError(error);
    })
    .finally(() => {
      pending = null;
    });
  return pending;
}

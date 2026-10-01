import { api } from "@/lib/axios";
import type { ApiResponse } from "@/lib/apiError";
import { ENDPOINTS } from "@/constants/endpoints";
import type {
  GoogleLoginData,
  GoogleLoginRequest,
} from "@/features/auth/types";

export async function loginWithGoogle(body: GoogleLoginRequest) {
  const { data } = await api.post<ApiResponse<GoogleLoginData>>(
    ENDPOINTS.auth.googleLogin,
    body,
  );
  return data.data;
}

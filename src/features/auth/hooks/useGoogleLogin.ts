import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle } from "@/features/auth/api/authApi";
import { setAccessToken } from "@/lib/authToken";
import type { ApiError } from "@/lib/apiError";
import type {
  GoogleLoginData,
  GoogleLoginRequest,
} from "@/features/auth/types";

export function useGoogleLogin() {
  return useMutation<GoogleLoginData, ApiError, GoogleLoginRequest>({
    mutationFn: loginWithGoogle,
    onSuccess: (data) => setAccessToken(data.accessToken),
  });
}

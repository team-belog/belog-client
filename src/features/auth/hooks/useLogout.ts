import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout } from "@/features/auth/api/authApi";
import { setAccessToken } from "@/lib/authToken";
import { resetAmplitude, track } from "@/lib/amplitude";
import type { ApiError } from "@/lib/apiError";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError>({
    mutationFn: logout,
    onSuccess: () => track("Logout Completed"),
    onSettled: () => {
      setAccessToken(null);
      resetAmplitude();
      queryClient.clear();
      router.replace("/login");
    },
  });
}

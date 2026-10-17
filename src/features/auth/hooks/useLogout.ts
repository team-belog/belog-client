import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout } from "@/features/auth/api/authApi";
import { setAccessToken } from "@/lib/authToken";
import type { ApiError } from "@/lib/apiError";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError>({
    mutationFn: logout,
    onSettled: () => {
      setAccessToken(null);
      queryClient.clear();
      router.replace("/login");
    },
  });
}

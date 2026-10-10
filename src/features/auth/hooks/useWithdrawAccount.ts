import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { withdrawAccount } from "@/features/auth/api/userApi";
import { setAccessToken } from "@/lib/authToken";
import type { ApiError } from "@/lib/apiError";

export function useWithdrawAccount() {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<void, ApiError>({
        mutationFn: withdrawAccount,
        onSuccess: () => {
            setAccessToken(null);
            queryClient.clear();
            router.replace("/login");
        },
    });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyBankAccount } from "@/features/auth/api/userApi";
import type { UpdateBankAccountRequest } from "@/features/auth/types";

export function useUpdateMyBankAccount() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, UpdateBankAccountRequest>({
        mutationFn: updateMyBankAccount,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myBankAccount"] });
        },
    });
}

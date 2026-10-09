import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfile } from "@/features/auth/api/userApi";
import type { UpdateProfileRequest } from "@/features/auth/types";

export function useUpdateMyProfile() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, UpdateProfileRequest>({
        mutationFn: updateMyProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myProfile"] });
        },
    });
}

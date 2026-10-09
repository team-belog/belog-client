import { useMutation } from "@tanstack/react-query";
import { getProfileImageUploadUrl } from "@/features/auth/api/userApi";
import type { ProfileImageUploadUrlRequest, ProfileImageUploadUrlResponse } from "@/features/auth/types";

export function useGetProfileImageUploadUrl() {
    return useMutation<ProfileImageUploadUrlResponse, Error, ProfileImageUploadUrlRequest>({
        mutationFn: getProfileImageUploadUrl,
    });
}

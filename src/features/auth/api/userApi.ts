import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiResponse } from "@/lib/apiError";
import type { OnboardingRequest, ProfileImageUploadUrlRequest, ProfileImageUploadUrlResponse, NicknameAvailabilityResponse } from "@/features/auth/types";

export async function completeOnboarding(body: OnboardingRequest): Promise<void> {
    await api.post<ApiResponse<null>>(ENDPOINTS.user.onboarding, body);
}

export async function getProfileImageUploadUrl(body: ProfileImageUploadUrlRequest): Promise<ProfileImageUploadUrlResponse> {
    const { data } = await api.post<ApiResponse<ProfileImageUploadUrlResponse>>(ENDPOINTS.user.profileImageUploadUrl, body);
    return data.data;
}

export async function checkNicknameAvailability(nickname: string): Promise<NicknameAvailabilityResponse> {
    const { data } = await api.get<ApiResponse<NicknameAvailabilityResponse>>(ENDPOINTS.user.nicknameAvailability, {
        params: { nickname },
    });
    return data.data;
}

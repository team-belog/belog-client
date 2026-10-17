import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiResponse } from "@/lib/apiError";
import type { OnboardingRequest, ProfileImageUploadUrlRequest, ProfileImageUploadUrlResponse, NicknameAvailabilityResponse, MyProfileResponse, UpdateProfileRequest, BankAccountResponse, UpdateBankAccountRequest } from "@/features/auth/types";

export async function completeOnboarding(body: OnboardingRequest): Promise<void> {
    await api.post<ApiResponse<null>>(ENDPOINTS.user.onboarding, body);
}

export async function getProfileImageUploadUrl(body: ProfileImageUploadUrlRequest): Promise<ProfileImageUploadUrlResponse> {
    const { data } = await api.post<ApiResponse<ProfileImageUploadUrlResponse>>(ENDPOINTS.user.profileImageUploadUrl, body);
    return data.data;
}

export async function updateMyProfile(body: UpdateProfileRequest): Promise<void> {
    await api.patch<ApiResponse<null>>(ENDPOINTS.user.updateProfile, body);
}

export async function getMyProfile(): Promise<MyProfileResponse> {
    const { data } = await api.get<ApiResponse<MyProfileResponse>>(ENDPOINTS.user.myProfile);
    return data.data;
}

export async function withdrawAccount(): Promise<void> {
    await api.delete<ApiResponse<null>>(ENDPOINTS.user.withdraw);
}

export async function getMyBankAccount(): Promise<BankAccountResponse> {
    const { data } = await api.get<ApiResponse<BankAccountResponse>>(ENDPOINTS.user.bankAccount);
    return data.data;
}

export async function updateMyBankAccount(body: UpdateBankAccountRequest): Promise<void> {
    await api.put<ApiResponse<null>>(ENDPOINTS.user.bankAccount, body);
}

export async function checkNicknameAvailability(nickname: string): Promise<NicknameAvailabilityResponse> {
    const { data } = await api.get<ApiResponse<NicknameAvailabilityResponse>>(ENDPOINTS.user.nicknameAvailability, {
        params: { nickname },
    });
    return data.data;
}

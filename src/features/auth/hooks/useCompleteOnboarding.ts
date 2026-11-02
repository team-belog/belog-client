import { useMutation } from "@tanstack/react-query";
import { completeOnboarding } from "@/features/auth/api/userApi";
import type { OnboardingRequest } from "@/features/auth/types";
import { setUserProperties, track } from "@/lib/amplitude";
import { hasPendingInviteCode } from "@/features/group/utils/pendingInviteStorage";

export function useCompleteOnboarding() {
    return useMutation<void, Error, OnboardingRequest>({
        mutationFn: completeOnboarding,
        onSuccess: () => {
            track("Onboarding Completed");
            // 온보딩 완료 = 가입 완료. 로그인 수단이 Google뿐
            setUserProperties({
                signup_method: "google",
                // 초대 코드는 가입 후 참여 화면에서 꺼내 쓰므로 이 시점에 남아 있으면 초대 유입
                signup_source: hasPendingInviteCode() ? "invite" : "direct",
            });
        },
    });
}

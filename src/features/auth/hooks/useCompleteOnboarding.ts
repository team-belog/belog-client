import { useMutation } from "@tanstack/react-query";
import { completeOnboarding } from "@/features/auth/api/userApi";
import type { OnboardingRequest } from "@/features/auth/types";
import { track } from "@/lib/amplitude";

export function useCompleteOnboarding() {
    return useMutation<void, Error, OnboardingRequest>({
        mutationFn: completeOnboarding,
        onSuccess: () => track("Onboarding Completed"),
    });
}

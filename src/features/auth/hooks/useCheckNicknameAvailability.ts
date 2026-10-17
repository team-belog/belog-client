import { useMutation } from "@tanstack/react-query";
import { checkNicknameAvailability } from "@/features/auth/api/userApi";
import type { NicknameAvailabilityResponse } from "@/features/auth/types";

export function useCheckNicknameAvailability() {
    return useMutation<NicknameAvailabilityResponse, Error, string>({
        mutationFn: checkNicknameAvailability,
    });
}

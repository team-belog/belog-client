import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/features/auth/api/userApi";

export function useGetMyProfile() {
    return useQuery({
        queryKey: ["myProfile"],
        queryFn: getMyProfile,
    });
}

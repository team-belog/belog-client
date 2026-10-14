import { useQuery } from "@tanstack/react-query";
import { getBanks } from "@/features/auth/api/bankApi";

export function useGetBanks() {
    return useQuery({
        queryKey: ["banks"],
        queryFn: getBanks,
        staleTime: Infinity,
    });
}

import { useQuery } from "@tanstack/react-query";
import { getMyBankAccount } from "@/features/auth/api/userApi";

export function useGetMyBankAccount() {
    return useQuery({
        queryKey: ["myBankAccount"],
        queryFn: getMyBankAccount,
    });
}

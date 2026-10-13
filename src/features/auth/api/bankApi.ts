import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiResponse } from "@/lib/apiError";
import type { BankResponse } from "@/features/auth/types";

export async function getBanks(): Promise<BankResponse[]> {
    const { data } = await api.get<ApiResponse<BankResponse[]>>(ENDPOINTS.bank.list);
    return data.data;
}

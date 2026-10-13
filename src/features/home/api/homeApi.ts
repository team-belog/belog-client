import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiResponse } from "@/lib/apiError";
import type { HomeCalendarResponse } from "@/features/home/types";

export async function getHomeCalendar(yearMonth: string): Promise<HomeCalendarResponse> {
    const { data } = await api.get<ApiResponse<HomeCalendarResponse>>(ENDPOINTS.home.calendar, {
        params: { yearMonth },
    });
    return data.data;
}

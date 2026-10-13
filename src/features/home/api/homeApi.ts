import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiResponse } from "@/lib/apiError";
import type {
    ActiveMeetingsData,
    ActiveMeetingsParams,
    HomeCalendarResponse,
} from "@/features/home/types";

export async function getHomeCalendar(yearMonth: string): Promise<HomeCalendarResponse> {
    const { data } = await api.get<ApiResponse<HomeCalendarResponse>>(ENDPOINTS.home.calendar, {
        params: { yearMonth },
    });
    return data.data;
}

export async function getActiveMeetings(params: ActiveMeetingsParams = {}): Promise<ActiveMeetingsData> {
    const { data } = await api.get<ApiResponse<ActiveMeetingsData>>(ENDPOINTS.home.activeMeetings, {
        params,
    });
    return data.data;
}

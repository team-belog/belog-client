import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/lib/apiError";
import { PostLogCalendarResponse } from "../types";

export async function getPostLogCalendar(yearMonth: string): Promise<PostLogCalendarResponse> {
    const { data } = await api.get<ApiResponse<PostLogCalendarResponse>>(
        ENDPOINTS.user.postLogCalendar,
        { params: { yearMonth } }
    );
    return data.data;
}

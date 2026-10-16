import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/lib/apiError";
import { MapPlanListRequest, MapPlanListResponse } from "../types";

export async function getMapPlans(params: MapPlanListRequest): Promise<MapPlanListResponse> {
    const { data } = await api.get<ApiResponse<MapPlanListResponse>>(
        ENDPOINTS.preLog.getMapPlans(params.meetingId),
        { params: { category: params.category, cursor: params.cursor, size: params.size } }
    );
    return data.data;
}

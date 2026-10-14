import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/apiError";
import { ENDPOINTS } from "@/constants/endpoints";
import type {
  PreLogMainData,
  PreLogPlansData,
  PreLogPlansRequest,
} from "@/features/pre-log/types";

export async function getPreLogMain(meetingId: number) {
  const { data } = await api.get<ApiResponse<PreLogMainData>>(
    ENDPOINTS.preLog.main(meetingId),
  );
  return data.data;
}

export async function getPreLogPlans(
  meetingId: number,
  params: PreLogPlansRequest,
) {
  const { data } = await api.get<ApiResponse<PreLogPlansData>>(
    ENDPOINTS.preLog.plans(meetingId),
    { params },
  );
  return data.data;
}

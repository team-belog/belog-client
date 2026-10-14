import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/apiError";
import { ENDPOINTS } from "@/constants/endpoints";
import type { PreLogMainData } from "@/features/pre-log/types";

export async function getPreLogMain(meetingId: number) {
  const { data } = await api.get<ApiResponse<PreLogMainData>>(
    ENDPOINTS.preLog.main(meetingId),
  );
  return data.data;
}

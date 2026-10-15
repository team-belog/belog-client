import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/apiError";
import { ENDPOINTS } from "@/constants/endpoints";
import type {
  CreatePreLogPlanData,
  CreatePreLogPlanRequest,
  PreLogMainData,
  PreLogPlansData,
  PreLogPlansRequest,
  UpdatePreLogPlanData,
  UpdatePreLogPlanRequest,
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

export async function createPreLogPlan(
  meetingId: number,
  body: CreatePreLogPlanRequest,
) {
  const { data } = await api.post<ApiResponse<CreatePreLogPlanData>>(
    ENDPOINTS.preLog.createPlan(meetingId),
    body,
  );
  return data.data;
}

export async function updatePreLogPlan(
  planId: number,
  body: UpdatePreLogPlanRequest,
) {
  const { data } = await api.put<ApiResponse<UpdatePreLogPlanData>>(
    ENDPOINTS.preLog.updatePlan(planId),
    body,
  );
  return data.data;
}

export async function deletePreLogPlan(planId: number) {
  await api.delete(ENDPOINTS.preLog.deletePlan(planId));
}

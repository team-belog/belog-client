import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/apiError";
import { ENDPOINTS } from "@/constants/endpoints";
import type { MeetingDetailData } from "@/features/meetup/types";

export async function getMeetingDetail(meetingId: number) {
  const { data } = await api.get<ApiResponse<MeetingDetailData>>(
    ENDPOINTS.meeting.detail(meetingId),
  );
  return data.data;
}

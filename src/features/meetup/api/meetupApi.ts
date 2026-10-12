import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/apiError";
import { ENDPOINTS } from "@/constants/endpoints";
import type {
  CreateMeetingData,
  CreateMeetingRequest,
  MeetingDetailData,
} from "@/features/meetup/types";

export async function getMeetingDetail(meetingId: number) {
  const { data } = await api.get<ApiResponse<MeetingDetailData>>(
    ENDPOINTS.meeting.detail(meetingId),
  );
  return data.data;
}

export async function createMeeting(
  groupId: number,
  body: CreateMeetingRequest,
) {
  const { data } = await api.post<ApiResponse<CreateMeetingData>>(
    ENDPOINTS.meeting.create(groupId),
    body,
  );
  return data.data;
}

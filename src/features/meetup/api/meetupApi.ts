import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/apiError";
import { ENDPOINTS } from "@/constants/endpoints";
import type {
  CreateMeetingData,
  ConfirmMeetingDateRequest,
  CreateMeetingRequest,
  DatePollData,
  DatePollResultsData,
  SubmitDatePollResponseRequest,
  MeetingDetailData,
  MeetingMembersData,
  UpdateMeetingRequest,
} from "@/features/meetup/types";

export async function getMeetingDetail(meetingId: number) {
  const { data } = await api.get<ApiResponse<MeetingDetailData>>(
    ENDPOINTS.meeting.detail(meetingId),
  );
  return data.data;
}

export async function getDatePoll(meetingId: number) {
  const { data } = await api.get<ApiResponse<DatePollData>>(
    ENDPOINTS.meeting.datePoll(meetingId),
  );
  return data.data;
}

export async function getDatePollResults(meetingId: number) {
  const { data } = await api.get<ApiResponse<DatePollResultsData>>(
    ENDPOINTS.meeting.datePollResults(meetingId),
  );
  return data.data;
}

export async function submitDatePollResponse(
  meetingId: number,
  body: SubmitDatePollResponseRequest,
) {
  await api.put(ENDPOINTS.meeting.myDatePollResponse(meetingId), body);
}

export async function confirmMeetingDate(
  meetingId: number,
  body: ConfirmMeetingDateRequest,
) {
  await api.put(ENDPOINTS.meeting.confirmedDate(meetingId), body);
}

export async function sendDatePollReminder(meetingId: number) {
  await api.post(ENDPOINTS.meeting.datePollReminders(meetingId));
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

export async function updateMeeting(
  meetingId: number,
  body: UpdateMeetingRequest,
) {
  await api.put(ENDPOINTS.meeting.update(meetingId), body);
}

export async function deleteMeeting(meetingId: number) {
  await api.delete(ENDPOINTS.meeting.delete(meetingId));
}

export async function endMeeting(meetingId: number) {
  await api.post(ENDPOINTS.meeting.end(meetingId));
}

export async function getMeetingMembers(meetingId: number) {
  const { data } = await api.get<ApiResponse<MeetingMembersData>>(
    ENDPOINTS.meeting.members(meetingId),
  );
  return data.data;
}

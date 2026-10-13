import { useQuery } from "@tanstack/react-query";
import type { MeetingDetailData } from "@/features/meetup/types";
import { ApiError } from "@/lib/apiError";
import { meetupKeys } from "@/features/meetup/hooks/meetupKeys";
import { getMeetingDetail } from "@/features/meetup/api/meetupApi";

export function useMeetingDetail(meetingId: number) {
  return useQuery<MeetingDetailData, ApiError>({
    queryKey: meetupKeys.detail(meetingId),
    queryFn: () => getMeetingDetail(meetingId),
  });
}

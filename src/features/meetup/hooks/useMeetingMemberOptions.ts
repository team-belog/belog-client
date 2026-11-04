import { useQuery } from "@tanstack/react-query";
import type { MeetingMemberOptionsData } from "@/features/meetup/types";
import { ApiError } from "@/lib/apiError";
import { meetupKeys } from "@/features/meetup/hooks/meetupKeys";
import { getMeetingMemberOptions } from "@/features/meetup/api/meetupApi";

export function useMeetingMemberOptions(meetingId: number) {
  return useQuery<MeetingMemberOptionsData, ApiError>({
    queryKey: meetupKeys.memberOptions(meetingId),
    queryFn: () => getMeetingMemberOptions(meetingId),
  });
}

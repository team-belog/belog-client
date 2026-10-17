import { useQuery } from "@tanstack/react-query";
import type { MeetingMembersData } from "@/features/meetup/types";
import { ApiError } from "@/lib/apiError";
import { meetupKeys } from "@/features/meetup/hooks/meetupKeys";
import { getMeetingMembers } from "@/features/meetup/api/meetupApi";

export function useMeetingMembers(meetingId: number) {
  return useQuery<MeetingMembersData, ApiError>({
    queryKey: meetupKeys.members(meetingId),
    queryFn: () => getMeetingMembers(meetingId),
  });
}

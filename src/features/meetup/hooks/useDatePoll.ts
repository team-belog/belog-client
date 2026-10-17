import { useQuery } from "@tanstack/react-query";
import type { DatePollData } from "@/features/meetup/types";
import { ApiError } from "@/lib/apiError";
import { meetupKeys } from "@/features/meetup/hooks/meetupKeys";
import { getDatePoll } from "@/features/meetup/api/meetupApi";

export function useDatePoll(meetingId: number) {
  return useQuery<DatePollData, ApiError>({
    queryKey: meetupKeys.datePoll(meetingId),
    queryFn: () => getDatePoll(meetingId),
  });
}

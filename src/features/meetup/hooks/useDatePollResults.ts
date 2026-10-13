import { useQuery } from "@tanstack/react-query";
import type { DatePollResultsData } from "@/features/meetup/types";
import { ApiError } from "@/lib/apiError";
import { meetupKeys } from "@/features/meetup/hooks/meetupKeys";
import { getDatePollResults } from "@/features/meetup/api/meetupApi";

export function useDatePollResults(meetingId: number) {
  return useQuery<DatePollResultsData, ApiError>({
    queryKey: meetupKeys.datePollResults(meetingId),
    queryFn: () => getDatePollResults(meetingId),
  });
}

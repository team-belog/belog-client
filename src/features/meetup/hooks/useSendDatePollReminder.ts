import { useMutation } from "@tanstack/react-query";
import { sendDatePollReminder } from "@/features/meetup/api/meetupApi";
import type { ApiError } from "@/lib/apiError";

export function useSendDatePollReminder(meetingId: number) {
  return useMutation<void, ApiError, void>({
    mutationFn: () => sendDatePollReminder(meetingId),
  });
}

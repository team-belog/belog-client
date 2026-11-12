import { useMutation } from "@tanstack/react-query";
import { sendDatePollReminder } from "@/features/meetup/api/meetupApi";
import type { ApiError } from "@/lib/apiError";
import { track } from "@/lib/amplitude";

export function useSendDatePollReminder(meetingId: number) {
  return useMutation<void, ApiError, void>({
    mutationFn: () => sendDatePollReminder(meetingId),
    onSuccess: () =>
      track("Date Poll Reminder Sent", { meeting_id: String(meetingId) }),
  });
}

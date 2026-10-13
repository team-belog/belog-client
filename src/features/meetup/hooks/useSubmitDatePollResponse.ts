import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitDatePollResponse } from "@/features/meetup/api/meetupApi";
import { meetupKeys } from "@/features/meetup/hooks/meetupKeys";
import type { SubmitDatePollResponseRequest } from "@/features/meetup/types";
import type { ApiError } from "@/lib/apiError";

export function useSubmitDatePollResponse(meetingId: number) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, SubmitDatePollResponseRequest>({
    mutationFn: (body) => submitDatePollResponse(meetingId, body),
    onSuccess: () => {
      // 응답 인원과 날짜별 가능 멤버가 바뀌므로 조율 현황을 갱신
      queryClient.invalidateQueries({
        queryKey: meetupKeys.datePollResults(meetingId),
      });
    },
  });
}

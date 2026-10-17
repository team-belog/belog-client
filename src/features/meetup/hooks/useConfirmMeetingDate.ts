import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmMeetingDate } from "@/features/meetup/api/meetupApi";
import { meetupKeys } from "@/features/meetup/hooks/meetupKeys";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import type { ConfirmMeetingDateRequest } from "@/features/meetup/types";
import type { ApiError } from "@/lib/apiError";

export function useConfirmMeetingDate(meetingId: number) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, ConfirmMeetingDateRequest>({
    mutationFn: (body) => confirmMeetingDate(meetingId, body),
    onSuccess: () => {
      // 만남 상태·일정이 바뀌고, 그룹 홈에서 조율 중 → 진행 중 만남으로 이동
      queryClient.invalidateQueries({ queryKey: meetupKeys.all });
      queryClient.invalidateQueries({ queryKey: groupKeys.all });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeeting } from "@/features/meetup/api/meetupApi";
import { meetupKeys } from "@/features/meetup/hooks/meetupKeys";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import type { UpdateMeetingRequest } from "@/features/meetup/types";
import type { ApiError } from "@/lib/apiError";

export function useUpdateMeeting(meetingId: number) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, UpdateMeetingRequest>({
    mutationFn: (body) => updateMeeting(meetingId, body),
    onSuccess: () => {
      // 그룹 홈의 만남 카드도 만남명·일정을 보여주므로 함께 갱신
      queryClient.invalidateQueries({ queryKey: meetupKeys.detail(meetingId) });
      queryClient.invalidateQueries({ queryKey: groupKeys.all });
    },
  });
}

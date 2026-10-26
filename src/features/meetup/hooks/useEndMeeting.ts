import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endMeeting } from "@/features/meetup/api/meetupApi";
import { meetupKeys } from "@/features/meetup/hooks/meetupKeys";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import type { ApiError } from "@/lib/apiError";

export function useEndMeeting() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number>({
    mutationFn: endMeeting,
    onSuccess: (_, meetingId) => {
      // 종료된 만남은 그룹 홈의 진행 중 목록에서 지난 만남으로 옮겨감
      queryClient.invalidateQueries({ queryKey: groupKeys.all });
      queryClient.invalidateQueries({ queryKey: meetupKeys.detail(meetingId) });
    },
  });
}

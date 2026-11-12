import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeetingMembers } from "@/features/meetup/api/meetupApi";
import { meetupKeys } from "@/features/meetup/hooks/meetupKeys";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import { homeKeys } from "@/features/home/hooks/homeKeys";
import { preLogKeys } from "@/features/pre-log/hooks/preLogKeys";
import type { UpdateMeetingMembersRequest } from "@/features/meetup/types";
import type { ApiError } from "@/lib/apiError";

export function useUpdateMeetingMembers(meetingId: number) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, UpdateMeetingMembersRequest>({
    mutationFn: (body) => updateMeetingMembers(meetingId, body),
    onSuccess: () => {
      // 참여자 목록·선택 목록·일정 조율 결과(제외된 참여자의 응답 삭제)가 함께 바뀜
      queryClient.invalidateQueries({ queryKey: meetupKeys.all });
      queryClient.invalidateQueries({ queryKey: groupKeys.all });
      queryClient.invalidateQueries({ queryKey: preLogKeys.main(meetingId) });
      queryClient.invalidateQueries({ queryKey: homeKeys.all });
    },
  });
}

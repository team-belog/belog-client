import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMeeting } from "@/features/meetup/api/meetupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import { homeKeys } from "@/features/home/hooks/homeKeys";
import type {
  CreateMeetingData,
  CreateMeetingRequest,
} from "@/features/meetup/types";
import type { ApiError } from "@/lib/apiError";
import { track } from "@/lib/amplitude";

export function useCreateMeeting(groupId: number) {
  const queryClient = useQueryClient();

  return useMutation<CreateMeetingData, ApiError, CreateMeetingRequest>({
    mutationFn: (body) => createMeeting(groupId, body),
    onSuccess: (data) => {
      track("Meetup Created", {
        group_id: String(groupId),
        meeting_id: String(data.meetingId),
      });
      // 그룹 홈의 조율 중·진행 중 만남 목록에 새 만남을 반영
      queryClient.invalidateQueries({ queryKey: groupKeys.detail(groupId) });
      queryClient.invalidateQueries({ queryKey: homeKeys.all });
    },
  });
}

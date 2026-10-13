import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMeeting } from "@/features/meetup/api/meetupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import type {
  CreateMeetingData,
  CreateMeetingRequest,
} from "@/features/meetup/types";
import type { ApiError } from "@/lib/apiError";

export function useCreateMeeting(groupId: number) {
  const queryClient = useQueryClient();

  return useMutation<CreateMeetingData, ApiError, CreateMeetingRequest>({
    mutationFn: (body) => createMeeting(groupId, body),
    onSuccess: () => {
      // 그룹 홈의 조율 중·진행 중 만남 목록에 새 만남을 반영
      queryClient.invalidateQueries({ queryKey: groupKeys.detail(groupId) });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinGroup } from "@/features/group/api/groupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import type { ApiError } from "@/lib/apiError";
import { setUserProperty, track } from "@/lib/amplitude";
import type { JoinGroupData, JoinGroupRequest } from "@/features/group/types";

// 초대 링크로 자동 참여했는지, 코드를 직접 입력했는지 (Amplitude 분석용)
export type JoinMethod = "invite_link" | "invite_code";

type JoinGroupInput = JoinGroupRequest & { joinMethod: JoinMethod };

export function useJoinGroup() {
  const queryClient = useQueryClient();

  return useMutation<JoinGroupData, ApiError, JoinGroupInput>({
    mutationFn: ({ inviteCode }) => joinGroup({ inviteCode }),
    onSuccess: (data, { joinMethod }) => {
      track("Group Joined", {
        group_id: String(data.groupId),
        join_method: joinMethod,
      });
      setUserProperty({ has_joined_group: true });
      queryClient.invalidateQueries({ queryKey: groupKeys.list() });
    },
  });
}

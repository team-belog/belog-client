import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "@/features/group/api/groupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import { uploadCoverImage } from "@/features/group/utils/uploadCoverImage";
import type { ApiError } from "@/lib/apiError";
import { setUserProperty, track } from "@/lib/amplitude";
import type { CreateGroupData, CreateGroupInput } from "@/features/group/types";

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation<CreateGroupData, ApiError, CreateGroupInput>({
    mutationFn: async ({ name, coverImage }) => {
      const coverImageObjectKey = coverImage
        ? await uploadCoverImage(coverImage)
        : undefined;

      return createGroup({ name, coverImageObjectKey });
    },
    onSuccess: (data) => {
      track("Group Created", { group_id: String(data.groupId) });
      setUserProperty({ has_created_group: true });
      queryClient.invalidateQueries({ queryKey: groupKeys.list() });
    },
  });
}

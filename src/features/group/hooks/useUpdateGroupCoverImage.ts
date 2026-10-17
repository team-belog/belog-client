import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroupCoverImage } from "@/features/group/api/groupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import { uploadCoverImage } from "@/features/group/utils/uploadCoverImage";
import type { ApiError } from "@/lib/apiError";

export function useUpdateGroupCoverImage(groupId: number) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, File>({
    mutationFn: async (file) => {
      const coverImageObjectKey = await uploadCoverImage(file);
      await updateGroupCoverImage(groupId, { coverImageObjectKey });
    },
    onSuccess: () => {
      // 그룹 홈과 목록 카드 모두 커버 이미지를 보여주므로 둘 다 갱신
      queryClient.invalidateQueries({ queryKey: groupKeys.detail(groupId) });
      queryClient.invalidateQueries({ queryKey: groupKeys.list() });
    },
  });
}

import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { pinGroup, unpinGroup } from "@/features/group/api/groupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import type { ApiError } from "@/lib/apiError";
import type { GroupListData } from "@/features/group/types";

type GroupListCache = InfiniteData<GroupListData, string | undefined>;

// pinned: 변경 후 상태 (true면 고정, false면 해제)
type ToggleGroupPinInput = { groupId: number; pinned: boolean };

export function useToggleGroupPin() {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    ApiError,
    ToggleGroupPinInput,
    { previous?: GroupListCache }
  >({
    mutationFn: ({ groupId, pinned }) =>
      pinned ? pinGroup(groupId) : unpinGroup(groupId),
    // 응답을 기다리지 않고 핀 아이콘을 바로 바꾸고, 실패하면 되돌린다
    onMutate: async ({ groupId, pinned }) => {
      await queryClient.cancelQueries({ queryKey: groupKeys.list() });
      const previous = queryClient.getQueryData<GroupListCache>(
        groupKeys.list(),
      );

      queryClient.setQueryData<GroupListCache>(
        groupKeys.list(),
        (old) =>
          old && {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.map((item) =>
                item.groupId === groupId ? { ...item, pinned } : item,
              ),
            })),
          },
      );

      return { previous };
    },
    onError: (_error, _input, context) => {
      if (context?.previous) {
        queryClient.setQueryData(groupKeys.list(), context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.list() });
    },
  });
}

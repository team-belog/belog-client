import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { pinGroup } from "@/features/group/api/groupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import type { ApiError } from "@/lib/apiError";
import type { GroupListData } from "@/features/group/types";

type GroupListCache = InfiniteData<GroupListData, string | undefined>;

export function usePinGroup() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number, { previous?: GroupListCache }>({
    mutationFn: pinGroup,
    // 응답을 기다리지 않고 핀 아이콘을 바로 바꾸고, 실패하면 되돌린다
    onMutate: async (groupId) => {
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
                item.groupId === groupId ? { ...item, pinned: true } : item,
              ),
            })),
          },
      );

      return { previous };
    },
    onError: (_error, _groupId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(groupKeys.list(), context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.list() });
    },
  });
}

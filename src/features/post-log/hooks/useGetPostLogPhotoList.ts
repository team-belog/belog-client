import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostLogPhotoList } from "@/features/post-log/api/postLogApi";

export function useGetPostLogPhotoList(meetingId: number) {
    return useInfiniteQuery({
        queryKey: ["postLogPhotoList", meetingId],
        queryFn: ({ pageParam }) => getPostLogPhotoList({ meetingId, cursor: pageParam, size: 20 }),
        getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.nextCursor ?? undefined : undefined,
        initialPageParam: undefined as string | undefined,
        enabled: !!meetingId,
    });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePhoto } from "@/features/post-log/api/postLogApi";

export function useLikePhoto(meetingId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (photoId: number) => likePhoto(photoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["postLogPhotoList", meetingId] });
        },
    });
}

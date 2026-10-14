import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unlikePhoto } from "@/features/post-log/api/postLogApi";

export function useUnlikePhoto(meetingId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (photoId: number) => unlikePhoto(photoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["postLogPhotoList", meetingId] });
        },
    });
}

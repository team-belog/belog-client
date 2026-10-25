import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePhoto } from "@/features/post-log/api/postLogApi";

export function useDeletePhoto(meetingId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (photoId: number) => deletePhoto(photoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["postLogPhotoList", meetingId] });
        },
    });
}

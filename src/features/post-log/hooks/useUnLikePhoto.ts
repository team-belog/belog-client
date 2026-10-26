import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { unlikePhoto } from "@/features/post-log/api/postLogApi";
import type { LikePhotoResponse, PostLogPhotoListResponse } from "@/features/post-log/types";

export function useUnlikePhoto(meetingId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (photoId: number) => unlikePhoto(photoId),
        onSuccess: (data: LikePhotoResponse) => {
            queryClient.setQueryData<InfiniteData<PostLogPhotoListResponse>>(
                ["postLogPhotoList", meetingId],
                (old) => {
                    if (!old) return old;
                    return {
                        ...old,
                        pages: old.pages.map((page) => ({
                            ...page,
                            days: page.days.map((day) => ({
                                ...day,
                                photos: day.photos.map((photo) =>
                                    photo.photoId === data.photoId
                                        ? { ...photo, likedByMe: data.likedByMe, likeCount: data.likeCount }
                                        : photo
                                ),
                            })),
                        })),
                    };
                }
            );
        },
    });
}

import { useMutation } from "@tanstack/react-query";
import { createPostLogTicket } from "@/features/post-log/api/postLogApi";

export function useCreatePostLogTicket() {
    return useMutation({
        mutationFn: ({ meetingId, memory }: { meetingId: number; memory: string }) =>
            createPostLogTicket(meetingId, memory),
    });
}

import { useMutation } from "@tanstack/react-query";
import { createPostLogTicket } from "@/features/post-log/api/postLogApi";
import { track } from "@/lib/amplitude";

export function useCreatePostLogTicket() {
    return useMutation({
        mutationFn: ({ meetingId, memory }: { meetingId: number; memory: string }) =>
            createPostLogTicket(meetingId, memory),
        onSuccess: (_, { meetingId }) => {
            track("Postlog Ticket Created", { meetingId });
        },
    });
}

import { useMutation } from "@tanstack/react-query";
import { createPostLogTicket } from "@/features/post-log/api/postLogApi";
import { track } from "@/lib/amplitude";

export function useCreatePostLogTicket() {
    return useMutation({
        mutationFn: ({ meetingId, memory }: { meetingId: number; memory: string }) =>
            createPostLogTicket(meetingId, memory),
        onSuccess: (data, { meetingId }) => {
            track("Postlog Ticket Created", { meeting_id: String(meetingId), ticket_id: String(data.ticketId) });
        },
    });
}

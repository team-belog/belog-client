import { useMutation } from "@tanstack/react-query";
import { savePostLogDraft } from "@/features/post-log/api/postLogApi";
import { track } from "@/lib/amplitude";

export function useSavePostLogDraft() {
    return useMutation({
        mutationFn: ({ meetingId, memory }: { meetingId: number; memory: string }) =>
            savePostLogDraft(meetingId, memory),
        onSuccess: (_, { meetingId }) => {
            track("Postlog Draft Saved", { meeting_id: String(meetingId) });
        },
    });
}

import { useMutation } from "@tanstack/react-query";
import { savePostLogDraft } from "@/features/post-log/api/postLogApi";

export function useSavePostLogDraft() {
    return useMutation({
        mutationFn: ({ meetingId, memory }: { meetingId: number; memory: string }) =>
            savePostLogDraft(meetingId, memory),
    });
}

import { useQuery } from "@tanstack/react-query";
import { getPostLogMeetingInfo } from "@/features/post-log/api/postLogApi";

export function useGetPostLogMeetingInfo(meetingId: number) {
    return useQuery({
        queryKey: ["postLogMeetingInfo", meetingId],
        queryFn: () => getPostLogMeetingInfo(meetingId),
        enabled: !!meetingId,
        staleTime: 0,
    });
}

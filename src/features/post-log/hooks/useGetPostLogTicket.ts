import { useQuery } from "@tanstack/react-query";
import { getPostLogTicket } from "@/features/post-log/api/postLogApi";

export function useGetPostLogTicket(ticketId: number | null) {
    return useQuery({
        queryKey: ["postLogTicket", ticketId],
        queryFn: () => getPostLogTicket(ticketId!),
        enabled: ticketId !== null,
    });
}

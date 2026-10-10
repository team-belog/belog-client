import { useQuery } from "@tanstack/react-query";
import { getPostLogCalendar } from "@/features/my/api/myApi";

export function useGetPostLogCalendar(yearMonth: string) {
    return useQuery({
        queryKey: ["postLogCalendar", yearMonth],
        queryFn: () => getPostLogCalendar(yearMonth),
    });
}

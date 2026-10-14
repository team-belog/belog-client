import { useQuery } from "@tanstack/react-query";
import { getHomeCalendar } from "@/features/home/api/homeApi";

export function useGetHomeCalendar(yearMonth: string) {
    return useQuery({
        queryKey: ["homeCalendar", yearMonth],
        queryFn: () => getHomeCalendar(yearMonth),
    });
}

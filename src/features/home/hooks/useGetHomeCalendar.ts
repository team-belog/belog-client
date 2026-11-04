import { useQuery } from "@tanstack/react-query";
import { getHomeCalendar } from "@/features/home/api/homeApi";
import { homeKeys } from "@/features/home/hooks/homeKeys";

export function useGetHomeCalendar(yearMonth: string) {
    return useQuery({
        queryKey: homeKeys.calendar(yearMonth),
        queryFn: () => getHomeCalendar(yearMonth),
    });
}

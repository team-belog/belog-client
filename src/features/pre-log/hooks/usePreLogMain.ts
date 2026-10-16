import { useQuery } from "@tanstack/react-query";
import type { PreLogMainData } from "@/features/pre-log/types";
import { ApiError } from "@/lib/apiError";
import { preLogKeys } from "@/features/pre-log/hooks/preLogKeys";
import { getPreLogMain } from "@/features/pre-log/api/preLogApi";

export function usePreLogMain(meetingId: number) {
  return useQuery<PreLogMainData, ApiError>({
    queryKey: preLogKeys.main(meetingId),
    queryFn: () => getPreLogMain(meetingId),
  });
}

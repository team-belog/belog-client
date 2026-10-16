import { useQuery } from "@tanstack/react-query";
import type { PreLogMemoDetailData } from "@/features/pre-log/types";
import { ApiError } from "@/lib/apiError";
import { preLogKeys } from "@/features/pre-log/hooks/preLogKeys";
import { getPreLogMemoDetail } from "@/features/pre-log/api/preLogApi";

export function usePreLogMemoDetail(planId: number) {
  return useQuery<PreLogMemoDetailData, ApiError>({
    queryKey: preLogKeys.memoDetail(planId),
    queryFn: () => getPreLogMemoDetail(planId),
  });
}

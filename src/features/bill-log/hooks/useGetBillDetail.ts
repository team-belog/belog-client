import { useQuery } from "@tanstack/react-query";
import { getBillDetail } from "../api/billLogApi";
import { billLogKeys } from "./billLogKeys";

export function useGetBillDetail(billId: number) {
    return useQuery({
        queryKey: billLogKeys.detail(billId),
        queryFn: () => getBillDetail(billId),
        enabled: !!billId,
    });
}

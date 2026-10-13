import { useQuery } from "@tanstack/react-query";
import { getBillDetail } from "../api/billLogApi";

export function useGetBillDetail(billId: number) {
    return useQuery({
        queryKey: ["billDetail", billId],
        queryFn: () => getBillDetail(billId),
        enabled: !!billId,
    });
}

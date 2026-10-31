"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Toggle from "@/components/ui/Toggle";
import Receipt from "@/features/bill-log/components/Receipt";
import { useGetBillDetail } from "@/features/bill-log/hooks/useGetBillDetail";
import { BILL_SPLIT_LABEL } from "@/features/bill-log/constants/billLog";
import { track } from "@/lib/amplitude";

export default function BillDetailPage() {
  const params = useParams()
  const billId = Number(params.id)
  const { data, isLoading } = useGetBillDetail(billId);

  useEffect(() => {
    if (data) track("Receipt Viewed", { billId });
  }, [data, billId]);

  if (isLoading) return <div className="flex min-h-screen items-center justify-center">로딩 중...</div>;
  if (!data) return null;

  return (
    <main className="pt-[60px]">
      <BackHeader title="영수증" />
      <Divider />
      <div className="flex flex-col gap-6 p-4 pt-5 pb-[58px]">
        <Toggle label={`Day ${data.dayNumber} (${data.paymentDate})`} variant="outlined" />
        <Receipt
          title={data.title}
          payerNickname={data.payerNickname}
          settlementMethod={BILL_SPLIT_LABEL[data.settlementMethod]}
          items={data.items}
          totalAmount={data.totalAmount}
          shares={data.shares}
        />
      </div>
    </main>
  );
}

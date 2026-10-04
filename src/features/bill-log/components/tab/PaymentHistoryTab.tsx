"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useGetBills } from "../../hooks/useGetBills";

import DailyPaymentGroup from "../DailyPaymentGroup";

export default function PaymentHistoryTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meetingId = Number(searchParams.get("meetingId"));
  const { data, isLoading } = useGetBills({ meetingId, cursorDate: undefined, size: 10 }); 

  if (isLoading) return <div className="flex justify-center py-10">로딩 중...</div>;
  
  return (
    <div className="flex flex-col">
      {data?.days?.map((group) => (
        <DailyPaymentGroup
          key={group.dayNumber}
          date={`Day ${group.dayNumber} (${group.paymentDate})`}
          totalAmount={`${group.dailyTotalAmount}원`}
          items={group.bills.map(bill => ({
            id: bill.billId,
            thumbnailUrl: "",
            name: bill.title,
            amount: `${bill.totalAmount}원`,
            payer: bill.payerNickname,
          }))}
          onItemClick={(id) => router.push(`/bill-log/${id}`)}
        />
      ))}
    </div>
  );
}

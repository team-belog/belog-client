"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useGetBills } from "../../hooks/useGetBills";

import DailyPaymentGroup from "../DailyPaymentGroup";

export default function PaymentHistoryTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meetingId = Number(searchParams.get("meetingId"));
  const { data, isLoading, fetchNextPage, hasNextPage } = useGetBills(meetingId);

  const bottomRef = useRef<HTMLDivElement>(null);
  const allDays = data?.pages.flatMap((page) => page.days ?? []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    }) 
    if (bottomRef.current)
      observer.observe(bottomRef.current)
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage])

    if (isLoading) return <div className="flex justify-center py-10">로딩 중...</div>;
  
  return (
    <div className="flex flex-col overflow-y-auto pb-[114px]">
      {allDays?.map((group) => (
        <DailyPaymentGroup
          key={group.dayNumber}
          date={`Day ${group.dayNumber} (${group.paymentDate})`}
          totalAmount={group.dailyTotalAmounts?.map((a) => `${a.amount.toLocaleString()} ${a.currency}`).join(" / ") ?? "-"}
          items={group.bills.map(bill => ({
            id: bill.billId,
            thumbnailUrl: "",
            name: bill.title,
            amount: `${(bill.totalAmount ?? 0).toLocaleString()} ${bill.currency}`,
            payer: bill.payerNickname,
          }))}
          onItemClick={(id) => router.push(`/bill-log/${id}`)}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

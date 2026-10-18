import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import TextLayout from "@/components/ui/TextLayout";
import SettlementStatusItem from "../SettlementStatusItem";
import { useGetSettlement } from "@/features/bill-log/hooks/useGetSettlement";

interface SettlementStatusTabProps {
  pendingParticipantCount: number
  totalSpentAmount: number
}

export default function SettlementStatusTab({ pendingParticipantCount, totalSpentAmount}:SettlementStatusTabProps) {
  const searchParams = useSearchParams();
  const meetingId = Number(searchParams.get("meetingId"))
  const { data, isLoading, fetchNextPage, hasNextPage } = useGetSettlement(meetingId)

  const bottomRef = useRef<HTMLDivElement>(null);
  const allItems = data?.pages.flatMap((page) => page.items ?? []);
  
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
    <div>
      <TextLayout left={`정산 진행중인 인원 ${pendingParticipantCount}명`} />
      <div className="flex flex-col gap-4 px-4 overflow-y-auto pb-[114px]">
        {allItems?.map((item) => (
          <SettlementStatusItem
            key={item.settlementRequestId}
            settlementRequestId={item.settlementRequestId}
            meetingId={meetingId}
            sender={item.sender}
            receiver={item.receiver}
            amount={item.amount}
            action={item.action}
          />
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}

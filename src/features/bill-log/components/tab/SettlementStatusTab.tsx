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
  const { data, isLoading } = useGetSettlement({ meetingId, cursor: undefined, size: 20 }
  )
  
  if (isLoading) return <div className="flex justify-center py-10">로딩 중...</div>;

  return (
    <div>
      <TextLayout left={`정산 진행중인 인원 ${pendingParticipantCount}명`} right={`${totalSpentAmount}원`} />
      <div className="flex flex-col gap-4 px-4">
        {data?.items?.map((item) => (
          <SettlementStatusItem
            key={item.settlementRequestId}
            sender={item.sender}
            receiver={item.receiver}
            amount={item.amount}
            status={item.status}
            onSendNotification={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

import TextLayout from "@/components/ui/TextLayout";
import SettlementStatusItem from "../SettlementStatusItem";
import { DUMMY_SETTLEMENTS } from "@/features/bill-log/constants/dummy";

export default function SettlementStatusTab() {
  return (
    <div>
      <TextLayout left="정산 진행중인 인원 (3명)" right="20,000원" />
      <div className="flex flex-col gap-4 px-4">
        {DUMMY_SETTLEMENTS.map((item) => (
          <SettlementStatusItem
            key={item.id}
            fromName={item.fromName}
            toName={item.toName}
            amount={item.amount}
            status={item.status}
            onSendNotification={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

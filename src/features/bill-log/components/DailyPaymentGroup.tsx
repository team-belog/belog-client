import TextLayout from "@/components/ui/TextLayout";
import PaymentHistoryItem from "@/features/bill-log/components/PaymentHistoryItem";

interface PaymentItem {
  id: number;
  thumbnailUrl: string;
  name: string;
  amount: string;
  payer: string;
}

interface DailyPaymentGroupProps {
  date: string;
  totalAmount?: string;
  items: PaymentItem[];
  onItemClick: (id: number) => void;
}

export default function DailyPaymentGroup({
  date,
  totalAmount,
  items,
  onItemClick,
}: DailyPaymentGroupProps) {
  return (
    <div className="w-full">
      <TextLayout left={date} right={totalAmount} />
      <div className="flex flex-col">
        {items.map((item) => (
          <PaymentHistoryItem
            key={item.id}
            thumbnailUrl={item.thumbnailUrl}
            name={item.name}
            amount={item.amount}
            payer={item.payer}
            onClick={() => onItemClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

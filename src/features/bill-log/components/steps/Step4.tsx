import { DUMMY_RECEIPT } from "@/features/bill-log/constants/dummy";
import Receipt from "@/features/bill-log/components/Receipt"

interface Step4Props {
  onSubmit: () => void;
}

export default function Step4({ onSubmit }: Step4Props) {
  return (
    <div className="flex flex-col">
      <h1 className="pretendard-sb-20 ml-4 mt-[10px]">이대로 정산을 요청할까요?</h1>
      <div className="flex flex-col gap-6 p-4 pt-5">
        <Receipt
          title={DUMMY_RECEIPT.title}
          payer={DUMMY_RECEIPT.payer}
          settlementMethod={DUMMY_RECEIPT.settlementMethod}
          items={DUMMY_RECEIPT.items}
          totalAmount={DUMMY_RECEIPT.totalAmount}
          settlementPersons={DUMMY_RECEIPT.settlementPersons}
        />
      </div>
    </div>
  );
}

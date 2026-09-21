import Image from "next/image";

import BelogIcon from "@/components/ui/BelogIcon";
import BillItem from "@/features/bill-log/components/BillItem";
import BillTotal from "@/features/bill-log/components/BillTotal";

interface ReceiptItemData {
  id: number;
  name: string;
  amount: string;
}

interface SettlementPerson {
  id: number;
  name: string;
  amount: string;
  isPayer?: boolean;
  profileSrc?: string;
}

interface ReceiptProps {
  title: string;
  payer: string;
  settlementMethod: string;
  items: ReceiptItemData[];
  totalAmount: string;
  settlementPersons: SettlementPerson[];
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="pretendard-m-16 w-[124px] shrink-0 text-sub-black">{label}</p>
      <p className="pretendard-sb-16 text-main-black">{value}</p>
    </div>
  );
}

export default function Receipt({ title, payer, settlementMethod, items, totalAmount, settlementPersons }: ReceiptProps) {
  return (
    <div style={{ filter: "drop-shadow(0px 0px 2.5px rgba(0,0,0,0.15))" }}>
      {/* 카드 본문 */}
      <div className="rounded-t-[8px] bg-white">
        <div className="flex flex-col pt-6 pb-16 px-[18px]">
          <header className="flex items-center gap-[3px] mb-5">
            <BelogIcon width={12} height={11} />
            <Image src="/icons/belog-wordmark.svg" alt="BELOG" width={54} height={11} />
          </header>

          <div className="flex flex-col gap-5">
            {/* 제목 */}
            <InfoRow label="제목" value={title} />
            {/* 결제자 */}
            <InfoRow label="결제자" value={payer} />
            {/* 정산 방식 */}
            <div className="flex items-center justify-between">
              <p className="pretendard-m-16 w-[124px] shrink-0 text-sub-black">정산 방식</p>
              <span className="pretendard-m-14 inline-flex items-center rounded-full bg-main-mint px-4 py-[3px] text-white">
                {settlementMethod}
              </span>
            </div>
            {/* 결제 항목 */}
            <div className="flex flex-col gap-4">
              <p className="pretendard-m-16 text-sub-black">결제 항목 ({items.length})</p>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <BillItem key={item.id} name={item.name} amount={item.amount} />
                ))}
              </div>
            </div>
            <BillTotal amount={totalAmount} />
          </div>

          {/* 정산 요청 받을 사람 */}
          <div className="flex flex-col gap-4 mt-[60px]">
            <p className="pretendard-sb-16 text-sub-black">정산 요청 받을 사람</p>
            <div className="flex flex-col gap-2">
              {settlementPersons.map((person) => (
                <BillItem
                  key={person.id}
                  name={person.name}
                  amount={person.amount}
                  isPayer={person.isPayer}
                  profileSrc={person.profileSrc ?? ""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 스캘럽 하단 */}
      <div
        className="h-[17px] w-full"
        style={{
          background: "radial-gradient(circle at 50% 100%, transparent 17px, white 18px)",
          backgroundSize: "59px 17px",
          backgroundRepeat: "repeat-x",
        }}
      />
    </div>
  );
}

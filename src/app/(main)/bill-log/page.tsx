"use client";

import Image from "next/image";

// components
import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import ReadOnlyFieldGroup from "@/components/ui/ReadOnlyFieldGroup";
import ProgressBar from "@/features/bill-log/components/ProgressBar";
import TabBar from "@/components/ui/TabBar";
import SettlementStatusItem from "@/features/bill-log/components/SettlementStatusItem";
import TextLayout from "@/components/ui/TextLayout";
import Button from "@/components/ui/Button";

type Settlement = {
  id: number;
  fromName: string;
  toName: string;
  amount: string;
  status: "request" | "pending" | "completed";
};

const DUMMY_SETTLEMENTS: Settlement[] = [
  { id: 1, fromName: "바비", toName: "정바미", amount: "7,500원", status: "request" },
  { id: 2, fromName: "김민준", toName: "정바미", amount: "12,000원", status: "pending" },
  { id: 3, fromName: "이수아", toName: "정바미", amount: "5,000원", status: "completed" },
];

export default function BillLogPage() {
  return (
    <main>
      <BackHeader title="Bill-log" />
      <Divider />
      <div className="flex flex-col items-center justify-center px-4">
        <div className="w-full flex flex-col gap-4">
          {DUMMY_SETTLEMENTS.length === 0 ? (
            <div className="flex min-h-[calc(100vh-180px)] flex-col items-center justify-center gap-[15px]">
              <Image src="/icons/bill-log/empty-state.jpg" alt="빈 상태 이미지" width={134} height={134} />
              <div className="flex flex-col items-center gap-[15px]">
                <p className="pretendard-sb-18 text-main-black">
                  아직 등록된 결제내역이 없어요
                </p>
                <p className="pretendard-m-15 text-sub-gray-2">
                  결제내역을 등록하고 정산을 시작해보세요
                </p>
              </div>
            </div>
          ) : (
            <div>
              <ReadOnlyFieldGroup
                title="현재까지 완료된 정산"
                fields={[
                  { label: "완료 인원", value: "1명" },
                  { label: "총 정산 금액", value: "11,000원" },
                ]}
              />
              <ProgressBar current={1} total={4} />
              <TabBar tabs={["정산 현황", "결제 내역"]} activeIndex={0} onChange={() => {}} />
              <TextLayout left="정산 진행중인 인원 (3명)" right="20,000원" />
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
          )}
        </div>
        <Button variant="primary" disabled={false} onClick={() => {}} className="fixed bottom-0 left-0 right-0">
          결제 내역 등록
        </Button>
      </div>
    </main>
  );
}

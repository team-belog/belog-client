"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import ReadOnlyFieldGroup from "@/components/ui/ReadOnlyFieldGroup";
import ProgressBar from "@/features/bill-log/components/ProgressBar";
import TabBar from "@/components/ui/TabBar";
import Button from "@/components/ui/Button";
import SettlementStatusTab from "@/features/bill-log/components/tab/SettlementStatusTab";
import PaymentHistoryTab from "@/features/bill-log/components/tab/PaymentHistoryTab";

import { useGetBillLogSummary } from "@/features/bill-log/hooks/useBillLogSummary";

export default function BillLogPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const router = useRouter();

  const searchParams = useSearchParams()
  const meetingId = Number(searchParams.get("meetingId"))

  const { data, isLoading } = useGetBillLogSummary(meetingId)  
  const totalParticipantCount = (data?.completedParticipantCount ?? 0) + (data?.pendingParticipantCount ?? 0)

  if (isLoading) return <div className="flex min-h-screen items-center justify-center">로딩 중...</div>;

  return (
    <main>
      <BackHeader title="Bill-log" />
      <Divider />
      <div className="flex flex-col items-center justify-center">
        <div className="w-full flex flex-col gap-4">
          {!data ? (
            <div className="flex min-h-[calc(100vh-180px)] flex-col items-center justify-center gap-[15px]">
              <Image src="/icons/empty-state.svg" alt="빈 상태 이미지" width={134} height={134} />
              <div className="flex flex-col items-center gap-[15px]">
                <p className="pretendard-sb-18 text-main-black">아직 등록된 결제내역이 없어요</p>
                <p className="pretendard-m-15 text-sub-gray-2">결제내역을 등록하고 정산을 시작해보세요</p>
              </div>
            </div>
          ) : (
            <div>
              <ReadOnlyFieldGroup
                title="현재까지 완료된 정산"
                fields={[
                  { label: "완료 인원", value: data.completedParticipantCount + "명" },
                  { label: "총 정산 금액", value: data.totalSpentAmount + "원" },
                ]}
              />
              <ProgressBar current={data.pendingParticipantCount} total={totalParticipantCount} />
              <TabBar tabs={["정산 현황", "결제 내역"]} activeIndex={activeTab} onChange={setActiveTab} />
              {activeTab === 0 ? <SettlementStatusTab pendingParticipantCount={data.pendingParticipantCount} totalSpentAmount={data.totalSpentAmount} /> : <PaymentHistoryTab />}
            </div>
          )}
        </div>
        <Button variant="primary" disabled={false} onClick={() => router.push("/bill-log/new")} className="fixed bottom-0 left-0 right-0">
          결제 내역 등록
        </Button>
      </div>
    </main>
  );
}

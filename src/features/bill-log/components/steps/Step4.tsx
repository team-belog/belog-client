"use client";

import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import Receipt from "@/features/bill-log/components/Receipt";
import Button from "@/components/ui/Button";
import { useBillFormStore } from "@/features/bill-log/store/useBillFormStore";
import { createBill } from "@/features/bill-log/api/billLogApi";
import type { BillShare, BillSplitType } from "@/features/bill-log/types";

const SPLIT_TYPE_LABELS: Record<BillSplitType, string> = {
  EQUAL_SPLIT: "N분의 1",
  ITEM_TAG: "항목 태그",
  MANUAL: "금액 직접 입력",
};

interface Step4Props {
  onSubmit: () => void;
}

export default function Step4({ onSubmit }: Step4Props) {
  const searchParams = useSearchParams();
  const meetingId = Number(searchParams.get("meetingId"));

  const title = useBillFormStore((state) => state.title);
  const items = useBillFormStore((state) => state.items);
  const totalAmount = useBillFormStore((state) => state.totalAmount);
  const payerMemberId = useBillFormStore((state) => state.payerMemberId);
  const payerNickname = useBillFormStore((state) => state.payerNickname);
  const splitType = useBillFormStore((state) => state.splitType);
  const storeShares = useBillFormStore((state) => state.shares);
  const shareDisplays = useBillFormStore((state) => state.shareDisplays);
  const reset = useBillFormStore((state) => state.reset);

  const shares: BillShare[] = shareDisplays.map((d) => ({
    meetingParticipantId: d.participantMemberId,
    nickname: d.nickname,
    profileImageUrl: d.profileImageUrl,
    amount: d.amount,
    payer: d.payer,
  }));

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      createBill(meetingId, {
        title,
        payerMemberId: payerMemberId!,
        totalAmount,
        splitType: splitType!,
        items,
        shares: storeShares,
      }),
    onSuccess: () => {
      reset();
      onSubmit();
    },
  });

  return (
    <div className="flex flex-col pb-[160px]">
      <h1 className="pretendard-sb-20 ml-4 mt-[10px]">이대로 정산을 요청할까요?</h1>
      <div className="flex flex-col gap-6 p-4 pt-5">
        <Receipt
          title={title}
          payerNickname={payerNickname}
          settlementMethod={splitType ? SPLIT_TYPE_LABELS[splitType] : ""}
          items={items}
          totalAmount={totalAmount}
          shares={shares}
        />
      </div>
      <Button
        onClick={() => mutate()}
        variant="primary"
        disabled={isPending}
        className="fixed bottom-0 left-0 right-0"
      >
        정산 요청 보내기
      </Button>
    </div>
  );
}

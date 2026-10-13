"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import SelectableToggle from "../SelectableToggle";
import TextLayout from "@/components/ui/TextLayout";
import ReadOnlyField from "@/features/bill-log/components/ReadOnlyField";
import Button from "@/components/ui/Button";
import { useMeetingMembers } from "@/features/meetup/hooks/useMeetingMembers";
import { useBillFormStore } from "@/features/bill-log/store/useBillFormStore";
import type { BillSplitType } from "@/features/bill-log/types";
import { SETTLEMENT_METHODS } from "@/features/bill-log/constants/billLog";

interface Step3Props {
  onNext: () => void;
}

export default function Step3({ onNext }: Step3Props) {
  const meetingId = Number(useSearchParams().get("meetingId"));

  const { data: meetingMembersData } = useMeetingMembers(meetingId);

  // store
  const setStep3Data = useBillFormStore((state) => state.setStep3Data);
  const totalAmount = useBillFormStore((state) => state.totalAmount);
  const items = useBillFormStore((state) => state.items);

  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([]);
  const [settlementMethod, setSettlementMethod] = useState<BillSplitType | null>(null);
  const [memberItemSelections, setMemberItemSelections] = useState<Record<number, string[]>>({});
  const [customAmounts, setCustomAmounts] = useState<Record<number, string>>({});

  const members = meetingMembersData?.items ?? [];

  const toggleMember = (id: number) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const toggleItemForMember = (memberId: number, itemName: string) => {
    setMemberItemSelections((prev) => {
      const current = prev[memberId] ?? [];
      return {
        ...prev,
        [memberId]: current.includes(itemName)
          ? current.filter((n) => n !== itemName)
          : [...current, itemName],
      };
    });
  };

  // 항목을 선택한 멤버 수로 나눠 개별 정산 금액 계산
  const getMemberTagAmount = (memberId: number): string => {
    const selected = memberItemSelections[memberId] ?? [];
    const total = selected.reduce((sum, itemName) => {
      const item = items.find((i) => i.name === itemName);
      const count = selectedMemberIds.filter((id) =>
        (memberItemSelections[id] ?? []).includes(itemName)
      ).length;
      return sum + Math.floor((item?.amount ?? 0) / Math.max(count, 1));
    }, 0);
    return String(total);
  };

  const getMemberAmount = (memberId: number): string => {
    if (!settlementMethod) return "";
    if (!selectedMemberIds.includes(memberId)) return "0";
    if (settlementMethod === "EQUAL_SPLIT") {
      return String(Math.floor(totalAmount / selectedMemberIds.length));
    }
    if (settlementMethod === "ITEM_TAG") {
      return getMemberTagAmount(memberId);
    }
    if (settlementMethod === "MANUAL") {
      return customAmounts[memberId] ?? "";
    }
    return "";
  };

  const distributedAmount =
    settlementMethod === "ITEM_TAG" || settlementMethod === "MANUAL"
      ? selectedMemberIds.reduce((sum, id) => sum + (parseInt(getMemberAmount(id)) || 0), 0)
      : totalAmount;
  const remainingAmount = totalAmount - distributedAmount;

  const handleNext = () => {
    if (!settlementMethod) return;

    const payerMemberId = selectedMemberIds[0];
    const payerMember = members.find((m) => m.groupMemberId === payerMemberId);

    const shares = selectedMemberIds.map((id) => ({
      participantMemberId: id,
      amount: parseInt(getMemberAmount(id)) || 0,
    }));

    const shareDisplays = selectedMemberIds.map((id) => {
      const member = members.find((m) => m.groupMemberId === id);
      return {
        participantMemberId: id,
        nickname: member?.nickname ?? "",
        profileImageUrl: member?.profileImageUrl ?? null,
        amount: parseInt(getMemberAmount(id)) || 0,
        payer: id === payerMemberId,
      };
    });

    setStep3Data({
      payerMemberId,
      payerNickname: payerMember?.nickname ?? "",
      splitType: settlementMethod,
      shares,
      shareDisplays,
    });
    onNext();
  };


  return (
    <div className="flex flex-col">
      <h1 className="pretendard-sb-20 ml-4 mt-[10px]">누구랑 나눌까요?</h1>
      <div className="flex gap-3 ml-4 mt-6 flex-wrap">
        {members.map((member) => (
          <SelectableToggle
            key={member.groupMemberId}
            label={member.nickname}
            selected={selectedMemberIds.includes(member.groupMemberId)}
            onClick={() => toggleMember(member.groupMemberId)}
          />
        ))}
      </div>
      <h2 className="pretendard-sb-16 ml-4 mt-6">정산 방식</h2>
      <div className="flex gap-3 ml-4 mt-6 mb-8">
        {SETTLEMENT_METHODS.map(({ splitType, label }) => (
          <SelectableToggle
            key={splitType}
            label={label}
            selected={settlementMethod === splitType}
            onClick={() => setSettlementMethod(splitType)}
          />
        ))}
      </div>
      <TextLayout left={`개별 정산 금액 (${selectedMemberIds.length}명)`} />
      <div className="flex flex-col gap-3 overflow-y-auto h-[568px]">
        {members.map((member) => {
          const isSelected = selectedMemberIds.includes(member.groupMemberId);
          return (
            <ReadOnlyField
              key={member.groupMemberId}
              name={member.nickname}
              profileSrc={member.profileImageUrl ?? undefined}
              amount={getMemberAmount(member.groupMemberId)}
              tag={isSelected && settlementMethod === "ITEM_TAG"}
              menu={items}
              selectedItems={memberItemSelections[member.groupMemberId] ?? []}
              onToggleItem={(itemName) => toggleItemForMember(member.groupMemberId, itemName)}
              editable={settlementMethod === "MANUAL"}
              onAmountChange={(value) => setCustomAmounts((prev) => ({ ...prev, [member.groupMemberId]: value }))}
            />
          );
        })}
      </div>
      <Button
        onClick={handleNext}
        variant="primary"
        disabled={selectedMemberIds.length === 0 || !settlementMethod || remainingAmount !== 0}
        className="fixed bottom-0 left-0 right-0"
      >
        {(settlementMethod === "ITEM_TAG" || settlementMethod === "MANUAL") && remainingAmount > 0
          ? `남은 정산금 ${remainingAmount}원`
          : "다음"
        }
      </Button>
    </div>
  );
}

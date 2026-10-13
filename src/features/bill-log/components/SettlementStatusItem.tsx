"use client";

import { useQueryClient } from "@tanstack/react-query";
import Profile from "@/components/ui/Profile";
import { useCompleteSettlement } from "@/features/bill-log/hooks/useCompleteSettlement";
import { useSendReminder } from "@/features/bill-log/hooks/useSendReminder";
import { type SettlementParticipant, type SettlementRequestAction } from "../types";

interface SettlementStatusItemProps {
  settlementRequestId: number;
  meetingId: number;
  sender: SettlementParticipant;
  receiver: SettlementParticipant;
  amount: number;
  avatarUrl?: string;
  action: SettlementRequestAction;
}

const buttonStyleByAction: Record<SettlementRequestAction, { bg: string; label: string }> = {
  SEND_REMINDER: { bg: "bg-main-mint hover:bg-[#00D4A6]", label: "돈 보내주세요" },
  MARK_COMPLETE: { bg: "bg-sub-black hover:bg-[#000000]", label: "돈 보냈어요" },
  NONE: { bg: "bg-sub-gray-3", label: "정산 완료" },
};

export default function SettlementStatusItem({
  settlementRequestId,
  meetingId,
  sender,
  receiver,
  amount,
  action,
}: SettlementStatusItemProps) {
  const queryClient = useQueryClient();
  const { mutate: complete, isPending: isCompleting } = useCompleteSettlement();
  const { mutate: remind, isPending: isReminding } = useSendReminder();

  const handleClick = () => {
    if (action === "MARK_COMPLETE") {
      complete(settlementRequestId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["settlement", meetingId] });
        },
      });
    } else if (action === "SEND_REMINDER") {
      remind(settlementRequestId);
    }
  };

  return (
    <div className="flex w-full items-center justify-between rounded-[12px] bg-main-cool-gray px-6 py-[30px]">
      <div className="flex items-start gap-3">
        <Profile width={24} height={24} />
        <div className="flex flex-col gap-1">
          <p className="pretendard-m-16 text-sub-gray-1">
            {sender.nickname} → {receiver.nickname}{receiver.isMe ? "(나)" : ""}
          </p>
          <p className="pretendard-sb-18 text-sub-black">{amount}원</p>
        </div>
      </div>
      <button
        onClick={handleClick}
        disabled={action === "NONE" || isCompleting || isReminding}
        className={`flex items-center rounded-[18px] px-[14px] py-[6px] ${buttonStyleByAction[action].bg}`}
      >
        <p className="pretendard-m-15 font-semibold text-main-white">{buttonStyleByAction[action].label}</p>
      </button>
    </div>
  );
}
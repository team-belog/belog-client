"use client";

import Image from "next/image";
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
  currency: string;
  amount: number;
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
  currency,
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
        <Profile src={sender.profileImageUrl ?? undefined} width={24} height={24} />
        <div className="flex flex-col gap-1">
          <p className="pretendard-sb-18 text-main-black">{amount.toLocaleString()} {currency}</p>
          <p className="pretendard-m-16 text-sub-black-1">
            {sender.nickname}{sender.isMe ? "(나)" : ""} → {receiver.nickname}{receiver.isMe ? "(나)" : ""}
          </p>
          {receiver.bankAccount && (
            <button
              className="flex items-center gap-1 rounded p-1 hover:bg-[#F2F2F2]"
              onClick={() => navigator.clipboard.writeText(receiver.bankAccount!.accountNumber)}
            >
              <span className="pretendard-m-14 text-sub-gray-1">{receiver.bankAccount.bankName} {receiver.bankAccount.accountNumber}</span>
              <Image src="/icons/bill-log/copy_icon.svg" alt="복사" width={16} height={16} />
            </button>
          )}
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
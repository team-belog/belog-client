"use client";

import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import Profile from "@/components/ui/Profile";
import { useCompleteSettlement } from "@/features/bill-log/hooks/useCompleteSettlement";
import { useSendReminder } from "@/features/bill-log/hooks/useSendReminder";
import { toApiError } from "@/lib/apiError";
import { type SettlementParticipant, type SettlementRequestAction } from "../types";

interface SettlementStatusItemProps {
  settlementRequestId: number;
  meetingId: number;
  sender: SettlementParticipant;
  receiver: SettlementParticipant;
  currency: string;
  amount: number;
  action: SettlementRequestAction;
  onCopyAccount: () => void;
  onSendReminder: () => void;
  onSendReminderError: () => void;
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
  onCopyAccount,
  onSendReminder,
  onSendReminderError,
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
      remind(settlementRequestId, {
        onSuccess: onSendReminder,
        onError: (err) => {
          if (toApiError(err).status === 429) onSendReminderError();
        },
      });
    }
  };

  return (
    <div className="flex w-full items-center justify-between rounded-[12px] bg-main-cool-gray px-6 py-4">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-1">
          <div className="shrink-0">
            <Profile src={sender.profileImageUrl ?? undefined} width={14} height={14} />
          </div>
          <p className="pretendard-m-14 text-sub-gray-1 truncate">
            {sender.nickname}{sender.isMe ? "(나)" : ""} → {receiver.nickname}{receiver.isMe ? "(나)" : ""}
          </p>
        </div>
        <p className="pretendard-sb-18 text-main-black">{amount.toLocaleString()} {currency}</p>
          <button
            className="flex w-fit items-center gap-1 rounded p-1 hover:bg-[#F2F2F2]"
            onClick={() => { navigator.clipboard.writeText(receiver.bankAccount!.accountNumber); onCopyAccount(); }}
          >
            <Image src="/icons/bill-log/copy_icon.svg" alt="복사" width={16} height={16} />
            <span className="pretendard-m-12 text-sub-gray-2">{receiver?.bankAccount?.bankName} {receiver?.bankAccount?.accountNumber}</span>
          </button>
      </div>
      <button
        onClick={handleClick}
        disabled={action === "NONE" || isCompleting || isReminding}
        className={`flex shrink-0 items-center rounded-[18px] px-[14px] py-[6px] ${buttonStyleByAction[action].bg}`}
      >
        <p className="pretendard-m-15 font-semibold text-main-white">{buttonStyleByAction[action].label}</p>
      </button>
    </div>
  );
}
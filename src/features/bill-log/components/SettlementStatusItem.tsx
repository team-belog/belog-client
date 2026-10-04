import Profile from "@/components/ui/Profile";
import { type SettlementParticipant } from "../types";

interface SettlementStatusItemProps {
  sender: SettlementParticipant;
  receiver: SettlementParticipant;
  amount: number;
  avatarUrl?: string;
  onSendNotification: () => void;
  status: "request" | "PENDING" | "COMPLETED"
}

const buttonStyleByStatus = {
  request: { bg: "bg-main-mint", label: "알림 보내기" },
  PENDING: { bg: "bg-main-black", label: "완료로 표시" },
  COMPLETED: { bg: "bg-sub-gray-3", label: "정산 완료" },
};

export default function SettlementStatusItem({
  sender,
  receiver,
  amount,
  onSendNotification,
  status,
}: SettlementStatusItemProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-[12px] bg-main-cool-gray px-6 py-[30px]">
      <div className="flex items-start gap-3">
        <Profile width={24} height={24} />
        <div className="flex flex-col gap-1">
          <p className="pretendard-m-16 text-sub-gray-1">
            {sender} → {`${receiver}(나)`}
          </p>
          <p className="pretendard-sb-18 text-sub-black">{amount}</p>
        </div>
      </div>
      <button
        onClick={onSendNotification}
        className={`flex items-center rounded-[18px] px-[14px] py-[6px] ${buttonStyleByStatus[status].bg}`}
      >
        <p className="pretendard-m-15 font-semibold text-main-white">{buttonStyleByStatus[status].label}</p>
      </button>
    </div>
  );
}

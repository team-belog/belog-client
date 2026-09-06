import Profile from "@/components/ui/Profile";

interface SettlementStatusItemProps {
  fromName: string;
  toName: string;
  amount: string;
  avatarUrl?: string;
  onSendNotification: () => void;
  status: "request" | "pending" | "completed";
}

const buttonStyleByStatus = {
  request: { bg: "bg-main-mint", label: "알림 보내기" },
  pending: { bg: "bg-main-black", label: "완료로 표시" },
  completed: { bg: "bg-sub-gray-3", label: "정산 완료" },
};

export default function SettlementStatusItem({
  fromName,
  toName,
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
            {fromName} → {`${toName}(나)`}
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

import type { ScheduleStatus } from "@/features/home/types";

type OngoingStatus = Exclude<ScheduleStatus, "done">;

interface MeetupStatusBadgeProps {
  status: OngoingStatus;
}

const STATUS_CONFIG: Record<OngoingStatus, { label: string; className: string }> = {
  before: { label: "시작 전", className: "bg-main-mint text-main-white" },
  ongoing: { label: "진행 중", className: "bg-main-mint text-main-white" },
};

export default function MeetupStatusBadge({ status }: MeetupStatusBadgeProps) {
  const { label, className } = STATUS_CONFIG[status];

  return (
    <span
      className={`pretendard-sb-10 inline-flex items-center whitespace-nowrap rounded-[20px] px-[10px] py-[5px] ${className}`}
    >
      {label}
    </span>
  );
}

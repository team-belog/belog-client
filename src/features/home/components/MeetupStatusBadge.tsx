import type { ProgressStatus } from "@/features/home/types";

interface MeetupStatusBadgeProps {
  status: ProgressStatus;
}

const STATUS_LABEL: Record<ProgressStatus, string> = {
  SCHEDULING: "조율 중",
  UPCOMING: "시작 전",
  IN_PROGRESS: "진행 중",
};

export default function MeetupStatusBadge({ status }: MeetupStatusBadgeProps) {
  const label = STATUS_LABEL[status];
  if (!label) return null;

  return (
    <span className="pretendard-sb-10 inline-flex items-center whitespace-nowrap rounded-[20px] bg-main-mint px-[10px] py-[5px] text-main-white">
      {label}
    </span>
  );
}

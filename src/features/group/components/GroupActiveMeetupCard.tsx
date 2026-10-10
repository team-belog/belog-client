import type { ActiveMeetingDto } from "@/features/group/types";
import { formatDateRange } from "@/lib/date";

interface GroupActiveMeetupCardProps {
  meeting: ActiveMeetingDto;
  onAction?: () => void;
}

export default function GroupActiveMeetupCard({
  meeting,
  onAction,
}: GroupActiveMeetupCardProps) {
  return (
    <div className="mx-4 flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[10px] rounded-[12px] bg-main-cool-gray px-[13px] py-[21px]">
        <p className="pretendard-sb-16 text-main-black">{meeting.name}</p>
        <p className="pretendard-m-12 text-sub-gray-2">
          {formatDateRange(meeting)}
        </p>
      </div>

      <button
        type="button"
        onClick={onAction}
        className="pretendard-sb-16 flex h-[56px] items-center justify-center rounded-[12px] border border-main-mint bg-main-mint text-main-white"
      >
        만남 상세
      </button>
    </div>
  );
}

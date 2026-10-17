import Image from "next/image";

import type { PastMeetingDto } from "@/features/group/types";
import { formatDateRange } from "@/lib/date";

interface GroupPastMeetupItemProps {
  meeting: PastMeetingDto;
  onClick?: (meeting: PastMeetingDto) => void;
}

export default function GroupPastMeetupItem({ meeting, onClick }: GroupPastMeetupItemProps) {

  return (
    <button
      type="button"
      onClick={() => onClick?.(meeting)}
      className="flex h-[90px] w-full items-center justify-between rounded-[12px] bg-main-cool-gray px-[15px]"
    >
      <div className="flex items-center gap-[7px]">
        <div className="relative size-[62px] shrink-0 overflow-hidden rounded-[8px] bg-main-white">
          {/* 썸네일은 응답에 없어 기본 이미지 사용 */}
          <Image
            src="/icons/empty-state.svg"
            alt=""
            fill
            unoptimized
            className="object-contain p-1"
          />
        </div>
        <div className="flex flex-col items-start gap-[5px]">
          <p className="pretendard-m-15 text-main-black">{meeting.name}</p>
          <p className="text-[12px] text-sub-gray-2">{formatDateRange(meeting)}</p>
        </div>
      </div>

      <span className="pretendard-m-15 whitespace-nowrap rounded-[100px] bg-sub-gray-3 px-[15px] py-[6px] text-main-white">
        종료
      </span>
    </button>
  );
}

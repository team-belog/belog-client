import Image from "next/image";

import type { PastMeetup } from "@/features/group/types";

interface GroupPastMeetupItemProps {
  meetup: PastMeetup;
  onClick?: (meetup: PastMeetup) => void;
}

export default function GroupPastMeetupItem({ meetup, onClick }: GroupPastMeetupItemProps) {
  const { title, date, thumbnailUrl } = meetup;

  return (
    <button
      type="button"
      onClick={() => onClick?.(meetup)}
      className="flex h-[90px] w-full items-center justify-between rounded-[12px] bg-main-cool-gray px-[15px]"
    >
      <div className="flex items-center gap-[7px]">
        <div className="relative size-[62px] shrink-0 overflow-hidden rounded-[8px] bg-main-white">
          {thumbnailUrl && <Image src={thumbnailUrl} alt="" fill className="object-cover" />}
        </div>
        <div className="flex flex-col items-start gap-[5px]">
          <p className="pretendard-m-15 text-main-black">{title}</p>
          <p className="text-[12px] text-sub-gray-2">{date}</p>
        </div>
      </div>

      <span className="pretendard-m-15 whitespace-nowrap rounded-[100px] bg-sub-gray-3 px-[15px] py-[6px] text-main-white">
        종료
      </span>
    </button>
  );
}

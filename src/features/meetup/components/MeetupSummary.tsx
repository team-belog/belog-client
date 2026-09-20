import Image from "next/image";

import type { MeetupDetail } from "@/features/meetup/types";

interface MeetupSummaryProps {
  meetup: MeetupDetail;
  onEdit?: () => void;
}

export default function MeetupSummary({ meetup, onEdit }: MeetupSummaryProps) {
  const { title, groupName, dDay, startDate, endDate, location } = meetup;

  return (
    <div className="px-4 pb-[30px] pt-[37px]">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-[10px]">
          <p className="pretendard-sb-20 text-main-black">{title}</p>
          <p className="pretendard-m-15 text-main-black">{groupName}</p>
        </div>
        <p className="pretendard-sb-20 text-main-mint">D-{dDay}</p>
      </div>

      <div className="mt-[30px] flex items-center justify-between gap-2">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-[5px]">
            <Image src="/icons/meetup/calendar.svg" alt="" width={18} height={18} />
            <p className="pretendard-r-15 text-sub-gray-2">
              {startDate} - {endDate}
            </p>
          </div>
          <div className="flex items-center gap-[5px]">
            <Image src="/icons/meetup/location.svg" alt="" width={15} height={18} />
            <p className="pretendard-r-15 text-sub-gray-2">{location}</p>
          </div>
        </div>

        <button type="button" onClick={onEdit} aria-label="만남 정보 수정" className="shrink-0">
          <Image src="/icons/meetup/edit.svg" alt="" width={40} height={40} />
        </button>
      </div>
    </div>
  );
}

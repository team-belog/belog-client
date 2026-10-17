import Image from "next/image";

import type { MeetupSummaryInfo } from "@/features/meetup/types";

interface MeetupSummaryProps {
  meetup: MeetupSummaryInfo;
  canEdit?: boolean;
  isEditing?: boolean;
  onEdit?: () => void;
  onTitleChange?: (value: string) => void;
  onLocationChange?: (value: string) => void;
  onDateClick?: () => void;
  // 위에 다른 요소가 붙는 화면에서 상단 여백을 줄일 때 사용
  topSpacingClassName?: string;
}

export default function MeetupSummary({
  meetup,
  canEdit = true,
  isEditing = false,
  onEdit,
  onTitleChange,
  onLocationChange,
  onDateClick,
  topSpacingClassName = "pt-[37px]",
}: MeetupSummaryProps) {
  const { title, groupName, dDay, startDate, endDate, location } = meetup;
  const dateText = endDate ? `${startDate} - ${endDate}` : startDate;

  return (
    <div className={`px-4 pb-[30px] ${topSpacingClassName}`}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-[10px]">
          {isEditing ? (
            <input
              value={title}
              onChange={(e) => onTitleChange?.(e.target.value)}
              className="pretendard-sb-20 h-[40px] w-[267px] rounded-[12px] bg-[#F7F8F9] px-[10px] text-main-black outline-none"
            />
          ) : (
            <p className="pretendard-sb-20 text-main-black">{title}</p>
          )}
          <p className="pretendard-m-15 text-main-black">{groupName}</p>
        </div>
        {dDay !== null && dDay >= 0 && (
          <p className="pretendard-sb-20 text-main-mint">
            {dDay === 0 ? "D-Day" : `D-${dDay}`}
          </p>
        )}
      </div>

      <div className="mt-[30px] flex items-center justify-between gap-2">
        <div className="flex flex-col gap-3">
          {isEditing ? (
            <button
              type="button"
              onClick={onDateClick}
              className="flex h-[40px] w-[267px] items-center gap-[5px] rounded-[12px] bg-[#F7F8F9] px-[10px]"
            >
              <Image src="/icons/meetup/calendar.svg" alt="" width={18} height={18} />
              <p className="pretendard-r-15 text-sub-gray-2">
                {dateText}
              </p>
            </button>
          ) : (
            <div className="flex items-center gap-[5px]">
              <Image src="/icons/meetup/calendar.svg" alt="" width={18} height={18} />
              <p className="pretendard-r-15 text-sub-gray-2">
                {dateText}
              </p>
            </div>
          )}

          {isEditing ? (
            <div className="flex h-[40px] w-[267px] items-center gap-[5px] rounded-[12px] bg-[#F7F8F9] px-[10px]">
              <Image src="/icons/meetup/location.svg" alt="" width={15} height={18} />
              <input
                value={location}
                onChange={(e) => onLocationChange?.(e.target.value)}
                className="pretendard-r-15 min-w-0 flex-1 bg-transparent text-sub-gray-2 outline-none"
              />
            </div>
          ) : (
            <div className="flex items-center gap-[5px]">
              <Image src="/icons/meetup/location.svg" alt="" width={15} height={18} />
              <p className="pretendard-r-15 text-sub-gray-2">{location.trim() || "-"}</p>
            </div>
          )}
        </div>

        {canEdit && (
          <button type="button" onClick={onEdit} aria-label="만남 정보 수정" className="shrink-0">
            <Image src="/icons/edit.svg" alt="" width={40} height={40} />
          </button>
        )}
      </div>
    </div>
  );
}

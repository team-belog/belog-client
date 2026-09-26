import Image from "next/image";

import TrashIcon from "@/components/ui/TrashIcon";
import { PRE_LOG_CATEGORY_LABEL } from "@/features/pre-log/constants/category";
import type { PreLogPlace } from "@/features/pre-log/types";

interface PreLogPlaceItemProps {
  place: PreLogPlace;
  onClick?: (place: PreLogPlace) => void;
  onDelete?: (place: PreLogPlace) => void;
}

export default function PreLogPlaceItem({ place, onClick, onDelete }: PreLogPlaceItemProps) {
  const { title, address, category, likeCount, thumbnailUrl } = place;

  return (
    <div className="flex w-full items-center justify-between px-4 py-3">
      <div className="flex items-center gap-[10px]">
        <div className="relative size-[80px] shrink-0 overflow-hidden rounded-[10px] bg-sub-gray-3">
          {thumbnailUrl && <Image src={thumbnailUrl} alt="" fill className="object-cover" />}
          <div className="absolute left-1 top-1 flex items-center gap-px text-[10px] font-semibold text-main-mint">
            <Image src="/icons/post-log/like-filled.svg" alt="" width={14} height={14} />
            {likeCount}
          </div>
        </div>

        <div className="flex flex-col items-start gap-[5px]">
          <span className="rounded-[5px] bg-main-mint px-2 py-1 text-[10px] font-medium text-main-white">
            {PRE_LOG_CATEGORY_LABEL[category]}
          </span>
          <p className="pretendard-m-15 text-main-black">{title}</p>
          <p className="text-[12px] text-sub-gray-2">{address}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-5">
        <button type="button" onClick={() => onClick?.(place)} aria-label="장소 상세 보기">
          <Image src="/icons/bill-log/chevron-right.svg" alt="" width={18} height={18} />
        </button>
        <button
          type="button"
          onClick={() => onDelete?.(place)}
          aria-label="삭제"
          className="text-sub-gray-2"
        >
          <TrashIcon variant="header" width={18} height={18} />
        </button>
      </div>
    </div>
  );
}

import Image from "next/image";

import TrashIcon from "@/components/ui/TrashIcon";
import { PRE_LOG_CATEGORY_LABEL } from "@/features/pre-log/constants/category";
import type { PreLogPlan } from "@/features/pre-log/types";
import ChevronIcon from "@/components/ui/ChevronIcon";

interface PreLogPlaceItemProps {
  plan: PreLogPlan;
  onClick?: (plan: PreLogPlan) => void;
  onDelete?: (plan: PreLogPlan) => void;
  onTogglePin?: (plan: PreLogPlan) => void;
  onLike?: (plan: PreLogPlan) => void;
}

export default function PreLogPlaceItem({
  plan,
  onClick,
  onDelete,
  onTogglePin,
  onLike,
}: PreLogPlaceItemProps) {
  const { title, content, category, likeCount, likedByMe, thumbnailUrl, canDelete, pinned } =
    plan;

  return (
    <div className="flex w-full items-center justify-between px-4 py-3">
      <div className="flex items-center gap-[10px]">
        <div className="relative size-[80px] shrink-0 overflow-hidden rounded-[10px] bg-sub-gray-3">
          {/* 썸네일은 외부 장소 이미지일 수 있어 도메인 제한 없이 표시 */}
          {thumbnailUrl && (
            <Image src={thumbnailUrl} alt="" fill unoptimized className="object-cover" />
          )}
          <button
            type="button"
            onClick={() => onLike?.(plan)}
            aria-label={likedByMe ? "좋아요 취소" : "좋아요"}
            aria-pressed={likedByMe}
            className={`absolute left-1 top-1 flex items-center gap-px text-[10px] font-semibold ${
              likedByMe ? "text-main-mint" : "text-sub-white"
            }`}
          >
            <Image
              src={likedByMe ? "/icons/like-filled.svg" : "/icons/post-log/like-empty.svg"}
              alt=""
              width={14}
              height={14}
            />
            {likeCount}
          </button>
        </div>

        <div className="flex min-w-0 flex-col items-start gap-[5px]">
          <div className="flex items-center gap-[10px]">
            <span className="rounded-[5px] bg-main-mint px-2 py-1 text-[10px] font-medium text-main-white">
              {PRE_LOG_CATEGORY_LABEL[category]}
            </span>
            <button
              type="button"
              onClick={() => onTogglePin?.(plan)}
              aria-label={pinned ? "고정 해제" : "고정"}
              aria-pressed={pinned}
              className="flex size-[18px] items-center justify-center"
            >
              <Image
                src={pinned ? "/icons/group/pin-mint.svg" : "/icons/group/pin.svg"}
                alt=""
                width={10}
                height={15}
              />
            </button>
          </div>
          <p className="pretendard-m-15 text-main-black">{title}</p>
          {content && <p className="line-clamp-1 text-[12px] text-sub-gray-2">{content}</p>}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-5">
        <button type="button" onClick={() => onClick?.(plan)} aria-label="계획 상세 보기">
          <ChevronIcon width={18} height={18} scale={0.72} strokeWidth={2.3} className="text-sub-gray-2" />
        </button>
        {canDelete && (
          <button
            type="button"
            onClick={() => onDelete?.(plan)}
            aria-label="삭제"
            className="text-sub-gray-2"
          >
            <TrashIcon variant="header" width={18} height={18} />
          </button>
        )}
      </div>
    </div>
  );
}

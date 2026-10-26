import Image from "next/image";

import TrashIcon from "@/components/ui/TrashIcon";
import { PRE_LOG_CATEGORY_LABEL } from "@/features/pre-log/constants/category";
import type { PreLogPlan } from "@/features/pre-log/types";
import ChevronIcon from "@/components/ui/ChevronIcon";

const MEMO_PREVIEW_LENGTH = 18;

// 메모는 18자까지만 보여주고 나머지는 말줄임표로 처리 (이모지가 깨지지 않도록 문자 단위로 자름)
function toMemoPreview(content: string) {
  const chars = Array.from(content.replace(/\s+/g, " ").trim());
  return chars.length > MEMO_PREVIEW_LENGTH
    ? `${chars.slice(0, MEMO_PREVIEW_LENGTH).join("")}…`
    : chars.join("");
}

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
  const { type, title, content, category, likeCount, likedByMe, canDelete, pinned } = plan;
  // 위치는 주소, 메모는 본문 미리보기
  const description = content && (type === "MEMO" ? toMemoPreview(content) : content);

  return (
    <div className="flex min-h-[80px] w-full items-center justify-between px-[19px]">
      <div className="flex min-w-0 flex-col items-start gap-[5px]">
        <div className="flex items-center">
          <span className="rounded-[5px] bg-main-mint px-2 py-1 text-[10px] font-medium text-main-white">
            {PRE_LOG_CATEGORY_LABEL[category]}
          </span>
          <button
            type="button"
            onClick={() => onTogglePin?.(plan)}
            aria-label={pinned ? "고정 해제" : "고정"}
            aria-pressed={pinned}
            className="ml-[5px] flex size-[18px] items-center justify-center"
          >
            <Image
              src={pinned ? "/icons/group/pin-mint.svg" : "/icons/group/pin.svg"}
              alt=""
              width={10}
              height={15}
            />
          </button>
          <button
            type="button"
            onClick={() => onLike?.(plan)}
            aria-label={likedByMe ? "좋아요 취소" : "좋아요"}
            aria-pressed={likedByMe}
            className="ml-4 flex items-end gap-px text-[11.429px] font-semibold text-main-mint"
          >
            <Image
              src={likedByMe ? "/icons/like-filled.svg" : "/icons/pre-log/like-empty-gray.svg"}
              alt=""
              width={16}
              height={16}
            />
            {/* 좋아요가 없으면 숫자 없이 회색 하트만 표시 */}
            {likeCount > 0 && likeCount}
          </button>
        </div>
        <p className="pretendard-m-15 text-main-black">{title}</p>
        {description && (
          <p className="line-clamp-1 text-[12px] text-sub-gray-2">{description}</p>
        )}
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

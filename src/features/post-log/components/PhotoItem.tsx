"use client";

import Image from "next/image";

interface PhotoItemProps {
  src?: string;
  likeCount?: number;
  onLike?: () => void;
  onClick?: () => void;
}

export default function PhotoItem({ src, likeCount = 0, onLike, onClick }: PhotoItemProps) {
  const isLiked = likeCount > 0;

  return (
    <div className="relative size-[80px] shrink-0" onClick={onClick}>
      <div className="size-[80px] overflow-hidden rounded-[10px] bg-sub-gray-3">
        {src && (
          <Image src={src} alt="사진" fill className="object-cover" />
        )}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onLike?.(); }}
        className="absolute left-[6px] top-[6px] flex items-end gap-px"
      >
        <Image
          src={isLiked ? "/icons/post-log/like-filled.svg" : "/icons/post-log/like-empty.svg"}
          alt="좋아요"
          width={14}
          height={14}
        />
        {isLiked && (
          <span className="pretendard-sb-10 leading-none text-main-mint">{likeCount}</span>
        )}
      </button>
    </div>
  );
}

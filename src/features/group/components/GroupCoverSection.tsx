"use client";

import { useRef } from "react";
import Image from "next/image";

import ImageUploadIcon from "@/components/ui/ImageUploadIcon";

interface GroupCoverSectionProps {
  name: string;
  coverImageUrl?: string;
  canEditCoverImage: boolean;
  isUpdatingCoverImage?: boolean;
  onChangeCoverImage?: (file: File) => void;
}

export default function GroupCoverSection({
  name,
  coverImageUrl,
  canEditCoverImage,
  isUpdatingCoverImage = false,
  onChangeCoverImage,
}: GroupCoverSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // 같은 파일 다시 선택해도 onChange 발생하도록
    if (file) onChangeCoverImage?.(file);
  };

  return (
    <div className="relative h-[203px] w-full overflow-hidden bg-main-cool-gray">
      {coverImageUrl && <Image src={coverImageUrl} alt="" fill className="object-cover" />}
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute left-4 top-[17px] flex w-[144px] flex-col gap-2">
        <p className="pretendard-sb-20 text-main-white">{name}</p>
        <p className="pretendard-m-12 text-main-white">그룹의 약속을 확인해 보세요</p>
      </div>

      {canEditCoverImage && (
        <>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUpdatingCoverImage}
            className="absolute bottom-[14px] right-4 flex items-center gap-[5px]"
          >
            <span className="pretendard-m-12 text-sub-gray-3">
              {isUpdatingCoverImage ? "변경 중..." : "이미지 변경"}
            </span>
            <ImageUploadIcon width={25} height={25} className="text-sub-gray-3" />
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFile}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import ImageCropModal from "@/components/ui/ImageCropModal";
import ImageUploadIcon from "@/components/ui/ImageUploadIcon";
import {
  GROUP_COVER_ASPECT,
  GROUP_COVER_OUTPUT,
} from "@/features/group/constants/coverImage";

interface GroupCoverSectionProps {
  name: string;
  inviteCode: string;
  coverImageUrl?: string;
  canEditCoverImage: boolean;
  isUpdatingCoverImage?: boolean;
  onChangeCoverImage?: (file: File) => void;
}

export default function GroupCoverSection({
  name,
  inviteCode,
  coverImageUrl,
  canEditCoverImage,
  isUpdatingCoverImage = false,
  onChangeCoverImage,
}: GroupCoverSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 클립보드 접근 권한이 없는 환경에서는 무시
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // 같은 파일 다시 선택해도 onChange 발생하도록
    if (!file) return;

    // 바로 업로드하지 않고 크롭 모달에서 배너 비율로 먼저 자름
    setOriginalUrl(URL.createObjectURL(file));
  };

  const closeCropModal = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    setOriginalUrl(null);
  };

  const handleCropComplete = (file: File) => {
    onChangeCoverImage?.(file);
    closeCropModal();
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
            className="absolute right-4 top-[17px] flex items-center gap-[5px]"
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
          {originalUrl && (
            <ImageCropModal
              imageSrc={originalUrl}
              onClose={closeCropModal}
              onComplete={handleCropComplete}
              title="커버 이미지"
              aspect={GROUP_COVER_ASPECT}
              cropShape="rect"
              output={GROUP_COVER_OUTPUT}
            />
          )}
        </>
      )}

      <div className="absolute bottom-[15px] right-4 flex items-center gap-5">
        <p className="pretendard-m-12 text-sub-gray-3">초대코드 · {inviteCode}</p>
        <button
          type="button"
          onClick={handleCopy}
          className="pretendard-m-12 flex h-[29px] items-center justify-center rounded-[100px] border border-sub-gray-3 bg-sub-white px-[15px] text-sub-gray-2"
        >
          {copied ? "복사됨" : "복사"}
        </button>
      </div>
    </div>
  );
}

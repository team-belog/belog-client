"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import ImageCropModal from "@/components/ui/ImageCropModal";
import {
  GROUP_COVER_ASPECT,
  GROUP_COVER_OUTPUT,
} from "@/features/group/constants/coverImage";

interface GroupCoverImagePickerProps {
  onChange?: (file: File | null) => void;
}

export default function GroupCoverImagePicker({
  onChange,
}: GroupCoverImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);

  // objectURL 메모리 정리
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const openPicker = () => inputRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // 같은 파일 다시 선택해도 onChange 발생하도록
    if (!file) return;

    // 바로 반영하지 않고 크롭 모달에서 배너 비율로 먼저 자름
    setOriginalUrl(URL.createObjectURL(file));
  };

  const closeCropModal = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    setOriginalUrl(null);
  };

  const handleCropComplete = (file: File) => {
    // 이전 previewUrl은 위 useEffect cleanup에서 정리됨
    setPreviewUrl(URL.createObjectURL(file));
    onChange?.(file);
    closeCropModal();
  };

  return (
    <>
      <button
        type="button"
        onClick={openPicker}
        className="mx-4 flex h-[203px] flex-col items-center justify-center gap-[15px] overflow-hidden rounded-[12px] bg-[#F7F8F9]"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="커버 이미지"
            className="size-full object-cover"
          />
        ) : (
          <>
            <Image
              src="/icons/group/image-placeholder.svg"
              alt=""
              width={20}
              height={20}
            />
            <p className="pretendard-m-12 text-sub-gray-2">
              커버 이미지 추가(선택)
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </button>
      {/* 버튼 안에 두면 모달 클릭이 버튼으로 전달되어 파일 선택창이 다시 열리므로 바깥에 둠 */}
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
  );
}

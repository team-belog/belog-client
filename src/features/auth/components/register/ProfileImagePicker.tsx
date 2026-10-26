"use client";

import { useEffect, useRef, useState } from "react";

import ImageCropModal from "@/components/ui/ImageCropModal";
import Profile from "@/components/ui/Profile";

interface ProfileImagePickerProps {
  /** 선택된 파일. 회원가입 제출 시 업로드에 사용 (null이면 기본 이미지) */
  onChange?: (file: File | null) => void;
}

export default function ProfileImagePicker({ onChange }: ProfileImagePickerProps) {
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

    // 바로 반영하지 않고 크롭 모달에서 원본을 먼저 보여줌
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
    <div className="flex flex-col items-center gap-5">
      <button
        type="button"
        onClick={openPicker}
        className="rounded-full"
        aria-label="프로필 사진 바꾸기"
      >
        <Profile src={previewUrl} width={101} height={101} />
      </button>
      <button
        type="button"
        onClick={openPicker}
        className="pretendard-m-15 text-main-black"
      >
        프로필 사진 바꾸기
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
      {originalUrl && (
        <ImageCropModal
          imageSrc={originalUrl}
          onClose={closeCropModal}
          onComplete={handleCropComplete}
        />
      )}
    </div>
  );
}

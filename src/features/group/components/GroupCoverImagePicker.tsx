"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface GroupCoverImagePickerProps {
  onChange?: (file: File | null) => void;
}

export default function GroupCoverImagePicker({
  onChange,
}: GroupCoverImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>();

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

    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    onChange?.(file);
  };

  return (
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
  );
}

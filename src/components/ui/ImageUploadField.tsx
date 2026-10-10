"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import ImageUploadIcon from "@/components/ui/ImageUploadIcon";

interface ImageUploadFieldProps {
  onUpload?: (file: File) => void;
}

export default function ImageUploadField({ onUpload }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
      onUpload?.(file);
    }
  };

  return (
    <div
      className="relative mx-4 flex h-[200px] flex-col items-center justify-center gap-[16px] rounded-[12px] bg-[#F7F8F9] overflow-hidden cursor-pointer"
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {previewUrl ? (
        <div className="absolute inset-0">
          <Image src={previewUrl} alt="영수증 미리보기" fill className="object-cover" />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center gap-[8px]">
            <ImageUploadIcon width={21} height={21} className="text-sub-gray-2" />
            <div className="text-center text-sub-gray-2">
              <p className="pretendard-m-12 leading-[22px]">영수증 촬영 / 업로드</p>
              <p className="pretendard-m-12 leading-[22px]">OCR이 품목과 금액을 자동으로 채워요</p>
            </div>
          </div>
          <button
            type="button"
            className="pretendard-m-14 rounded-[12px] bg-main-mint px-[20px] py-[10px] text-main-white whitespace-nowrap"
          >
            영수증 업로드
          </button>
        </>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";

interface ImageUploadFieldProps {
  onUpload?: () => void;
}

export default function ImageUploadField({ onUpload }: ImageUploadFieldProps) {
  return (
    <div className="mx-4 flex h-[200px] flex-col items-center justify-center gap-[16px] rounded-[12px] bg-[#F7F8F9]">
      <div className="flex flex-col items-center gap-[8px]">
        <Image src="/icons/image-upload.svg" alt="이미지 업로드" width={21} height={21} />
        <div className="text-center text-sub-gray-2">
          <p className="pretendard-m-12 leading-[22px]">영수증 촬영 / 업로드</p>
          <p className="pretendard-m-12 leading-[22px]">OCR이 품목과 금액을 자동으로 채워요</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onUpload}
        className="pretendard-m-14 rounded-[12px] bg-main-mint px-[20px] py-[10px] text-main-white whitespace-nowrap"
      >
        영수증 업로드
      </button>
    </div>
  );
}

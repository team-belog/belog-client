"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface BackHeaderProps {
  title: string;
  onBack?: () => void;
}

export default function BackHeader({ title, onBack }: BackHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className="relative flex h-[60px] w-full items-center bg-white">
      <button
        onClick={handleBack}
        className="absolute left-4 flex size-6 items-center justify-center"
        aria-label="뒤로 가기"
      >
        <Image src="/icons/back-arrow.svg" alt="뒤로 가기" width={24} height={24} />
      </button>
      <p className="pretendard-sb-18 w-full text-center text-main-black">
        {title}
      </p>
    </header>
  );
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ChevronIcon from "@/components/ui/ChevronIcon";

interface BackHeaderProps {
  title: string;
  onBack?: () => void;
  onShare?: () => void;
  right?: React.ReactNode;
}

export default function BackHeader({ title, onBack, onShare, right }: BackHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className="fixed top-0 z-50 flex h-[calc(60px+env(safe-area-inset-top))] w-full items-center bg-white pt-[env(safe-area-inset-top)]">
      <button
        onClick={handleBack}
        className="absolute left-4 flex size-6 items-center justify-center"
        aria-label="뒤로 가기"
      >
        <ChevronIcon direction="left" width={24} height={24} scale={0.78} strokeWidth={2.5} className="text-main-black" />
      </button>
      <p className="pretendard-sb-18 w-full text-center text-main-black">
        {title}
      </p>
      {right ? (
        <div className="absolute right-4 flex items-center">{right}</div>
      ) : (
        onShare && (
          <button
            onClick={onShare}
            className="absolute right-4 flex size-6 items-center justify-center"
            aria-label="공유"
          >
            <Image src="/icons/share.svg" alt="공유" width={24} height={24} />
          </button>
         )
      )}
    </header>
  );
}

"use client";

import BelogIcon from "@/components/ui/BelogIcon";
import Button from "@/components/ui/Button";

interface PwaInstallSheetProps {
  isOpen: boolean;
  onStart: () => void;
  onLater: () => void;
}

export default function PwaInstallSheet({ isOpen, onStart, onLater }: PwaInstallSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/[0.65]" onClick={onLater}>
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center rounded-t-[30px] bg-white px-4 pb-[42px] pt-2 shadow-[2px_2px_10px_0px_rgba(0,0,0,0.1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[5px] w-[46px] rounded-[30px] bg-sub-gray-3" />

        <div className="mt-[37px] flex size-20 items-center justify-center rounded-[16px] border border-[#E3E7EF] bg-main-cool-gray">
          <BelogIcon width={50} height={48} />
        </div>

        <p className="pretendard-sb-20 mt-[22px] text-center leading-[30px] text-main-black">
          바탕화면에 <span className="font-bold text-main-mint">BELOG</span>를 추가하고
          <br />
          더 많은 기능을 편하게 이용해 보세요
        </p>

        <Button bare variant="primary" disabled={false} onClick={onStart} className="mt-8 w-full">
          시작하기
        </Button>

        <button type="button" onClick={onLater} className="pretendard-m-15 mt-5 text-sub-gray-2">
          나중에 시작할게요
        </button>
      </div>
    </div>
  );
}

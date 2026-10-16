"use client";

import Image from "next/image";

interface OnboardingFabStepProps {
  onNext: () => void;
  onClose: () => void;
}

export default function OnboardingFabStep({ onNext, onClose }: OnboardingFabStepProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/75">
      <button
        type="button"
        onClick={onClose}
        aria-label="튜토리얼 닫기"
        className="absolute right-4 top-[15px] flex size-[30px] items-center justify-center"
      >
        <Image src="/icons/onboarding/close.svg" alt="" width={20} height={20} />
      </button>

      <p className="pretendard-sb-20 absolute left-1/2 top-[calc(50%-64px)] -translate-x-1/2 whitespace-nowrap text-center leading-[28px] text-main-white">
        하단 플로팅 버튼을 눌러
        <br />
        만남을 시작해 보세요
      </p>

      {/* HomeFab과 같은 위치에 버튼을 띄워 강조 */}
      <div className="absolute bottom-20 right-4 size-[60px]">
        <span className="absolute left-[-76.84px] top-[-115.7px] -translate-x-1/2 font-pretendard text-[25px] font-medium tracking-[1.25px] text-sub-white-2">
          click!
        </span>
        <div className="absolute left-[-54.63px] top-[-80px] flex size-[71.943px] items-center justify-center">
          <Image
            src="/icons/onboarding/hand-pointer.svg"
            alt=""
            width={55}
            height={55}
            className="rotate-[157.34deg]"
          />
        </div>

        <button
          type="button"
          onClick={onNext}
          aria-label="빠른 실행 메뉴 열기"
          className="flex size-[60px] items-center justify-center rounded-full bg-main-white shadow-[0_0_5px_0_rgba(0,0,0,0.05)]"
        >
          <Image src="/icons/onboarding/plus.svg" alt="" width={26.4} height={26.4} />
        </button>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";

import Button from "@/components/ui/Button";

interface OnboardingSettingStepProps {
  onNext: () => void;
}

export default function OnboardingSettingStep({ onNext }: OnboardingSettingStepProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/75">
      {/* Header의 설정 버튼과 같은 위치에 아이콘을 띄워 강조 */}
      <div className="absolute right-[58px] top-[15px] size-[30px]">
        <p className="pretendard-sb-20 absolute left-[-252px] top-[49px] whitespace-nowrap leading-[28px] text-main-white">
          앱 알림은 설정에서
          <br />
          끌 수 있어요
        </p>
        <div className="absolute left-[-53.29px] top-[37.71px] flex size-[71.943px] items-center justify-center">
          <Image
            src="/icons/onboarding/hand-pointer.svg"
            alt=""
            width={55}
            height={55}
            className="-scale-y-100 rotate-[-157.34deg]"
          />
        </div>
        <span className="absolute left-[-83.5px] top-[115.65px] -translate-x-1/2 font-pretendard text-[25px] font-bold tracking-[1.25px] text-sub-white-2">
          click!
        </span>

        <div className="flex size-[30px] items-center justify-center">
          <Image src="/icons/onboarding/setting-white.svg" alt="" width={24} height={24} />
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 flex w-[211px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 text-center">
        <Image src="/icons/onboarding/bell-active-white.svg" alt="" width={60} height={60} />
        <p className="pretendard-sb-20 leading-[28px] text-main-white">
          현재 앱 알림 기능이
          <br />
          켜져 있는 상태예요
        </p>
        <p className="pretendard-m-15 text-sub-white">
          앱 알림을 끄면 그룹 생성, 참여 등의
          <br />
          각종 알림을 받을 수 없어요
        </p>
      </div>

      <Button
        variant="secondary"
        disabled={false}
        onClick={onNext}
        bare
        className="absolute bottom-[29px] left-4 right-4"
      >
        시작하기
      </Button>
    </div>
  );
}

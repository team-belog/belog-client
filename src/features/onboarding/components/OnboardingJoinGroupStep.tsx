"use client";

import Image from "next/image";

import OnboardingCloseButton from "@/features/onboarding/components/OnboardingCloseButton";
import OnboardingFabMenu from "@/features/onboarding/components/OnboardingFabMenu";

interface OnboardingJoinGroupStepProps {
  onNext: () => void;
  onClose: () => void;
}

export default function OnboardingJoinGroupStep({ onNext, onClose }: OnboardingJoinGroupStepProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/75" onClick={onNext}>
      <OnboardingCloseButton onClose={onClose} />

      <OnboardingFabMenu highlighted="join">
        <Image
          src="/icons/onboarding/dashed-arrow.svg"
          alt=""
          width={42.1115}
          height={65.3427}
          className="absolute left-[-164.33px] top-[-42.69px] max-w-none -scale-y-100"
        />
        <p className="pretendard-sb-20 absolute left-[-283.33px] top-[38.15px] whitespace-nowrap leading-[28px] text-main-white">
          만남장이 보낸 초대코드로
          <br />
          그룹에 참여해 보세요
        </p>
      </OnboardingFabMenu>
    </div>
  );
}

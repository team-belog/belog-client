"use client";

import Image from "next/image";

import OnboardingCloseButton from "@/features/onboarding/components/OnboardingCloseButton";
import OnboardingFabMenu from "@/features/onboarding/components/OnboardingFabMenu";

interface OnboardingCreateGroupStepProps {
  onNext: () => void;
  onClose: () => void;
}

export default function OnboardingCreateGroupStep({ onNext, onClose }: OnboardingCreateGroupStepProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/75" onClick={onNext}>
      <OnboardingCloseButton onClose={onClose} />

      <OnboardingFabMenu highlighted="create">
        <p className="pretendard-sb-20 absolute left-[-262.33px] top-[-239.85px] whitespace-nowrap leading-[28px] text-main-white">
          그룹 생성을 통해 직접
          <br />
          만남을 생성할 수 있어요
        </p>
        <Image
          src="/icons/onboarding/arrow-to-create.svg"
          alt=""
          width={42.1115}
          height={65.3427}
          className="absolute left-[-159.33px] top-[-167.85px] max-w-none"
        />
      </OnboardingFabMenu>
    </div>
  );
}

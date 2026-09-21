"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import StepProgressBar from "@/components/ui/StepProgressBar";
import { DUMMY_GROUP_DETAIL } from "@/features/group/constants/dummy";
import MeetupStep1 from "@/features/meetup/components/steps/MeetupStep1";
import MeetupStep2 from "@/features/meetup/components/steps/MeetupStep2";
import MeetupStep3 from "@/features/meetup/components/steps/MeetupStep3";
import MeetupStep4FixedDate from "@/features/meetup/components/steps/MeetupStep4FixedDate";
import type { MeetupStartOption } from "@/features/meetup/types";

const TOTAL_STEPS = 4;

export default function MeetupNewView() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [startOption, setStartOption] = useState<MeetupStartOption | null>(null);

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
    }
  };

  const handleSelectStartOption = (option: MeetupStartOption) => {
    setStartOption(option);
    handleNext();
  };

  const handleSubmit = () => {
    // TODO: 만남 생성 API 연결
  };

  const headerTitle =
    step === 4 && startOption === "fixedDate" ? "후보 날짜 등록" : "새 만남";

  return (
    <main>
      <BackHeader title={headerTitle} onBack={handleBack} />
      <Divider />
      <StepProgressBar current={step} total={TOTAL_STEPS} />

      {step === 1 && <MeetupStep1 onNext={handleNext} />}
      {step === 2 && (
        <MeetupStep2 members={DUMMY_GROUP_DETAIL.members} onNext={handleNext} />
      )}
      {step === 3 && <MeetupStep3 onNext={handleSelectStartOption} />}
      {step === 4 && startOption === "fixedDate" && (
        <MeetupStep4FixedDate onSubmit={handleSubmit} />
      )}
    </main>
  );
}

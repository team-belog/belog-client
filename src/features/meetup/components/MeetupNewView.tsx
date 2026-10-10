"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import StepProgressBar from "@/components/ui/StepProgressBar";
import { DUMMY_GROUP_MEMBERS } from "@/features/group/constants/dummy";
import MeetupRequestComplete from "@/features/meetup/components/MeetupRequestComplete";
import MeetupStep1 from "@/features/meetup/components/steps/MeetupStep1";
import MeetupStep2 from "@/features/meetup/components/steps/MeetupStep2";
import MeetupStep3 from "@/features/meetup/components/steps/MeetupStep3";
import MeetupStep4Coordinate from "@/features/meetup/components/steps/MeetupStep4Coordinate";
import MeetupStep4FixedDate from "@/features/meetup/components/steps/MeetupStep4FixedDate";
import type { MeetupStartOption } from "@/features/meetup/types";

const TOTAL_STEPS = 4;

export default function MeetupNewView() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [nights, setNights] = useState<number | null>(null);
  const [isRequested, setIsRequested] = useState(false);
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

  const handleRequestCoordinate = () => {
    // TODO: 멤버에게 날짜 조율 요청 API 연결
    setIsRequested(true);
  };

  const headerTitle = step === 4 ? "후보 날짜 등록" : "새 만남";

  if (isRequested) {
    return <MeetupRequestComplete onGoGroupHome={() => router.push("/group")} />;
  }

  return (
    <main>
      <BackHeader title={headerTitle} onBack={handleBack} />
      <Divider />
      <StepProgressBar current={step} total={TOTAL_STEPS} />

      {step === 1 && <MeetupStep1
          nights={nights}
          onChangeNights={setNights}
          onNext={handleNext}
        />}
      {step === 2 && (
        <MeetupStep2 members={DUMMY_GROUP_MEMBERS} onNext={handleNext} />
      )}
      {step === 3 && <MeetupStep3 onNext={handleSelectStartOption} />}
      {step === 4 && startOption === "fixedDate" && (
        <MeetupStep4FixedDate onSubmit={handleSubmit} />
      )}
      {step === 4 && startOption === "coordinate" && (
        <MeetupStep4Coordinate nights={nights} onSubmit={handleRequestCoordinate} />
      )}
    </main>
  );
}

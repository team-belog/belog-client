"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import StepProgressBar from "@/components/ui/StepProgressBar";
import { DUMMY_GROUP_DETAIL } from "@/features/group/constants/dummy";
import MeetupStep1 from "@/features/meetup/components/steps/MeetupStep1";
import MeetupStep2 from "@/features/meetup/components/steps/MeetupStep2";

const TOTAL_STEPS = 4;

export default function MeetupNewView() {
  const router = useRouter();
  const [step, setStep] = useState(1);

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

  return (
    <main>
      <BackHeader title="새 만남" onBack={handleBack} />
      <Divider />
      <StepProgressBar current={step} total={TOTAL_STEPS} />

      {step === 1 && <MeetupStep1 onNext={handleNext} />}
      {step === 2 && (
        <MeetupStep2 members={DUMMY_GROUP_DETAIL.members} onNext={handleNext} />
      )}
    </main>
  );
}

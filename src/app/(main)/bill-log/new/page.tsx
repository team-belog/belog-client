"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import StepProgressBar from "@/components/ui/StepProgressBar";
import Step1 from "@/features/bill-log/components/steps/Step1";
import Step2 from "@/features/bill-log/components/steps/Step2";
import Step3 from "@/features/bill-log/components/steps/Step3";
import Step4 from "@/features/bill-log/components/steps/Step4";
import { useBillFormStore } from "@/features/bill-log/store/useBillFormStore";

const TOTAL_STEPS = 4;

function BillNewContent() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const reset = useBillFormStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, []);
  const meetingId = searchParams.get("meetingId");
  const groupId = searchParams.get("groupId");

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

  const handleSubmit = () => {
    router.push(`/bill-log?meetingId=${meetingId}&groupId=${groupId}`);
  };

  return (
    <main className="pt-[60px]">
      <BackHeader title="결제 내역 등록" onBack={handleBack} />
      <Divider />
      <StepProgressBar current={step} total={TOTAL_STEPS} />
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} />}
      {step === 3 && <Step3 onNext={handleNext} />}
      {step === 4 && <Step4 onSubmit={handleSubmit} />}
    </main>
  );
}

export default function BillNewPage() {
  return (
    <Suspense>
      <BillNewContent />
    </Suspense>
  );
}

import { useEffect, useState } from "react";

import { clearTutorialPending, isTutorialPending } from "@/features/onboarding/utils/tutorialStorage";

const LAST_STEP = 4;

type TutorialStatus = "checking" | "active" | "done";

export function useOnboardingTutorial() {
  const [status, setStatus] = useState<TutorialStatus>("checking");
  const [step, setStep] = useState(1);

  useEffect(() => {
    setStatus(isTutorialPending() ? "active" : "done");
  }, []);

  const finish = () => {
    clearTutorialPending();
    setStatus("done");
  };

  const next = () => {
    if (step === LAST_STEP) {
      finish();
      return;
    }
    setStep((prev) => prev + 1);
  };

  return { status, step, next, close: finish };
}

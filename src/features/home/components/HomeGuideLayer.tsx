"use client";

import OnboardingCreateGroupStep from "@/features/onboarding/components/OnboardingCreateGroupStep";
import OnboardingFabStep from "@/features/onboarding/components/OnboardingFabStep";
import OnboardingJoinGroupStep from "@/features/onboarding/components/OnboardingJoinGroupStep";
import OnboardingSettingStep from "@/features/onboarding/components/OnboardingSettingStep";
import { useOnboardingTutorial } from "@/features/onboarding/hooks/useOnboardingTutorial";
import PwaInstallPrompt from "@/features/pwa/components/PwaInstallPrompt";

const TUTORIAL_STEPS = {
  1: OnboardingFabStep,
  2: OnboardingCreateGroupStep,
  3: OnboardingJoinGroupStep,
  4: OnboardingSettingStep,
} as const;

// 튜토리얼을 먼저 보여주고, 끝난 뒤에 PWA 설치 안내를 띄운다
export default function HomeGuideLayer() {
  const { status, step, next, close } = useOnboardingTutorial();

  if (status === "checking") return null;
  if (status === "done") return <PwaInstallPrompt />;

  const TutorialStep = TUTORIAL_STEPS[step as keyof typeof TUTORIAL_STEPS];
  return <TutorialStep onNext={next} onClose={close} />;
}

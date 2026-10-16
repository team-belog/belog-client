import Image from "next/image";

interface OnboardingCloseButtonProps {
  onClose: () => void;
}

export default function OnboardingCloseButton({ onClose }: OnboardingCloseButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      aria-label="튜토리얼 닫기"
      className="absolute right-4 top-[15px] flex size-[30px] items-center justify-center"
    >
      <Image src="/icons/onboarding/close.svg" alt="" width={20} height={20} />
    </button>
  );
}

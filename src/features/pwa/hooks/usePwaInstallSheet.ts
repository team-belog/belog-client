import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { usePwaInstallStore } from "@/features/pwa/store/usePwaInstallStore";
import {
  isPwaInstallSnoozed,
  snoozePwaInstall,
} from "@/features/pwa/utils/pwaInstallStorage";

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIos() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function usePwaInstallSheet() {
  const router = useRouter();
  const { installPrompt, setInstallPrompt } = usePwaInstallStore();
  const [isEligible, setIsEligible] = useState(false);
  const [isIosDevice, setIsIosDevice] = useState(false);
  const [isLaterConfirmOpen, setIsLaterConfirmOpen] = useState(false);

  // 앱으로 실행 중이 아니면 홈에 들어올 때마다 노출 (7일 뒤 다시보기 기간 제외)
  useEffect(() => {
    if (isStandalone() || isPwaInstallSnoozed()) return;
    setIsIosDevice(isIos());
    setIsEligible(true);
  }, []);

  // iOS는 설치 API가 없어 가이드로 안내하고, 그 외는 브라우저 설치 이벤트가 있을 때만 노출
  const isAvailable = isEligible && (isIosDevice || installPrompt !== null);
  // 안내 모달이 떠 있는 동안에는 시트를 숨긴다
  const isOpen = isAvailable && !isLaterConfirmOpen;

  const close = () => setIsEligible(false);

  const handleLater = () => setIsLaterConfirmOpen(true);

  const handleLaterConfirm = () => {
    snoozePwaInstall();
    setIsLaterConfirmOpen(false);
    close();
  };

  // 취소하면 다시 설치 시트로 돌아간다
  const handleLaterCancel = () => setIsLaterConfirmOpen(false);

  const handleStart = async () => {
    close();

    if (!installPrompt) {
      router.push("/pwa-guide");
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice;
    // 설치 이벤트는 한 번만 쓸 수 있다
    setInstallPrompt(null);
  };

  return {
    isOpen,
    isLaterConfirmOpen,
    handleStart,
    handleLater,
    handleLaterConfirm,
    handleLaterCancel,
  };
}

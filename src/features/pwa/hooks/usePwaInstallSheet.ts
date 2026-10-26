import { useEffect, useState } from "react";

import { isStandalone, usePwaInstall } from "@/features/pwa/hooks/usePwaInstall";

function isIos() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function usePwaInstallSheet() {
  const { installPrompt, install } = usePwaInstall();
  const [isEligible, setIsEligible] = useState(false);
  const [isIosDevice, setIsIosDevice] = useState(false);

  // 앱으로 실행 중이 아니면 홈에 들어올 때마다 노출
  useEffect(() => {
    if (isStandalone()) return;
    setIsIosDevice(isIos());
    setIsEligible(true);
  }, []);

  // iOS는 설치 API가 없어 가이드로 안내하고, 그 외는 브라우저 설치 이벤트가 있을 때만 노출
  const isOpen = isEligible && (isIosDevice || installPrompt !== null);

  const close = () => setIsEligible(false);

  const handleStart = async () => {
    close();
    await install();
  };

  return { isOpen, handleStart, handleLater: close };
}

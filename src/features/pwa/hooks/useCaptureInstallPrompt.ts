import { useEffect } from "react";

import {
  usePwaInstallStore,
  type BeforeInstallPromptEvent,
} from "@/features/pwa/store/usePwaInstallStore";

// 설치 이벤트는 페이지 진입 직후 한 번만 오므로 항상 마운트된 레이아웃에서 받아 둔다
export function useCaptureInstallPrompt() {
  const setInstallPrompt = usePwaInstallStore((state) => state.setInstallPrompt);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const handleAppInstalled = () => setInstallPrompt(null);

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [setInstallPrompt]);
}

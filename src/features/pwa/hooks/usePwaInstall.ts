import { useRouter } from "next/navigation";

import { usePwaInstallStore } from "@/features/pwa/store/usePwaInstallStore";

export function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

// 브라우저 설치 이벤트가 있으면 설치 팝업을 띄우고, 없으면(iOS 등) 추가 방법 가이드로 이동
export function usePwaInstall() {
  const router = useRouter();
  const { installPrompt, setInstallPrompt } = usePwaInstallStore();

  const install = async () => {
    if (!installPrompt) {
      router.push("/pwa-guide");
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice;
    // 설치 이벤트는 한 번만 쓸 수 있다
    setInstallPrompt(null);
  };

  return { installPrompt, install };
}

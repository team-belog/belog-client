"use client";

import Modal from "@/components/ui/Modal";
import PwaInstallSheet from "@/features/pwa/components/PwaInstallSheet";
import { usePwaInstallSheet } from "@/features/pwa/hooks/usePwaInstallSheet";

export default function PwaInstallPrompt() {
  const {
    isOpen,
    isLaterConfirmOpen,
    handleStart,
    handleLater,
    handleLaterConfirm,
    handleLaterCancel,
  } = usePwaInstallSheet();

  return (
    <>
      <PwaInstallSheet isOpen={isOpen} onStart={handleStart} onLater={handleLater} />
      <Modal
        isOpen={isLaterConfirmOpen}
        message={"홈 화면에 빌로그를 추가하는 방법은\n설정에서 다시 확인할 수 있어요"}
        confirmLabel="확인"
        onConfirm={handleLaterConfirm}
        onCancel={handleLaterCancel}
      />
    </>
  );
}

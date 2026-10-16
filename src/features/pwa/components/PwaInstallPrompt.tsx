"use client";

import PwaInstallSheet from "@/features/pwa/components/PwaInstallSheet";
import { usePwaInstallSheet } from "@/features/pwa/hooks/usePwaInstallSheet";

export default function PwaInstallPrompt() {
  const { isOpen, handleStart, handleLater } = usePwaInstallSheet();

  return <PwaInstallSheet isOpen={isOpen} onStart={handleStart} onLater={handleLater} />;
}

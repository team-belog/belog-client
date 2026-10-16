import { create } from "zustand";

// 표준 타입에 없는 크롬 계열 설치 이벤트
export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type PwaInstallState = {
  installPrompt: BeforeInstallPromptEvent | null;
  setInstallPrompt: (event: BeforeInstallPromptEvent | null) => void;
};

export const usePwaInstallStore = create<PwaInstallState>((set) => ({
  installPrompt: null,
  setInstallPrompt: (installPrompt) => set({ installPrompt }),
}));

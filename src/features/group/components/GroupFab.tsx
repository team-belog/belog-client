"use client";

import { useRouter } from "next/navigation";

export default function GroupFab() {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="그룹 생성하기"
      onClick={() => router.push("/group/new")}
      className="fixed bottom-20 right-4 z-50 flex size-[60px] items-center justify-center rounded-full bg-main-white shadow-[0_0_5px_0_rgba(0,0,0,0.05)]"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M5 12H19" stroke="#303237" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

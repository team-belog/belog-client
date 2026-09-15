"use client";

import { useRouter } from "next/navigation";

export default function LoginPrompt() {
  const router = useRouter();

  return (
    <p className="pretendard-m-15 flex items-center gap-[5px]">
      <span className="text-sub-gray-2">이미 계정이 있나요?</span>
      <button
        type="button"
        onClick={() => router.push("/login")}
        className="text-main-black"
      >
        로그인
      </button>
    </p>
  );
}

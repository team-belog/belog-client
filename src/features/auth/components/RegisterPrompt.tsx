"use client";

import { useRouter } from "next/navigation";

export default function RegisterPrompt() {
  const router = useRouter();

  return (
    <p className="pretendard-m-15 flex items-center gap-[5px]">
      <span className="text-sub-gray-2">아직 계정이 없나요?</span>
      <button
        type="button"
        onClick={() => router.push("/register")}
        className="text-main-black"
      >
        회원가입
      </button>
    </p>
  );
}

"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";

export default function LandingCta() {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center">
      <Button
        variant="primary"
        disabled={false}
        onClick={() => router.push("/register")}
        className="pb-[20px]"
      >
        시작하기
      </Button>
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
    </div>
  );
}

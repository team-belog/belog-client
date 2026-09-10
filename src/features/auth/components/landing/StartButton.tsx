"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";

export default function StartButton() {
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
    </div>
  );
}

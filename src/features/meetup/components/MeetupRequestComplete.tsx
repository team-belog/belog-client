"use client";

import Image from "next/image";

import Button from "@/components/ui/Button";

interface MeetupRequestCompleteProps {
  onGoGroupHome: () => void;
}

export default function MeetupRequestComplete({
  onGoGroupHome,
}: MeetupRequestCompleteProps) {
  return (
    <main className="flex min-h-screen flex-col pb-[114px]">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-[200px] flex-col gap-[15px] pb-[87px]">
          <div className="flex flex-col items-center gap-[15px]">
            <Image
              src="/icons/bell-active.svg"
              alt=""
              width={60}
              height={60}
            />
            <p className="pretendard-sb-18 text-center text-main-black">
              멤버들에게 알림을 보냈어요
            </p>
          </div>
          <p className="pretendard-m-15 text-center text-sub-gray-2">
            그룹 홈에서 응답 현황을
            <br />
            확인하고 확정할 수 있어요
          </p>
        </div>
      </div>

      <Button
        variant="primary"
        disabled={false}
        onClick={onGoGroupHome}
        className="fixed bottom-0 left-0 right-0"
      >
        그룹 홈으로
      </Button>
    </main>
  );
}

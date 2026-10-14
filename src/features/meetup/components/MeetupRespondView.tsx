"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import ChevronIcon from "@/components/ui/ChevronIcon";
import type { CandidateDateRange } from "@/features/meetup/types";
import { formatKoreanDateRange } from "@/lib/date";

type MeetupRespondViewProps = {
  meetingId: number;
  candidateDateRanges: CandidateDateRange[];
  totalParticipantCount: number;
  respondedParticipantCount: number;
  hasResponded: boolean;
  isSubmitting: boolean;
  submitErrorMessage?: string;
  onSubmit: (candidateDateRangeIds: number[]) => void;
};

export default function MeetupRespondView({
  meetingId,
  candidateDateRanges,
  totalParticipantCount,
  respondedParticipantCount,
  hasResponded,
  isSubmitting,
  submitErrorMessage,
  onSubmit,
}: MeetupRespondViewProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (candidateId: number) =>
    setSelected((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId],
    );

  return (
    <main className="flex min-h-screen flex-col pb-[114px]">
      <BackHeader title="가능한 날짜 선택" />
      <Divider />

      <div className="flex flex-col px-4 pt-[15px]">
        <div className="pretendard-m-14 flex h-[55px] items-center justify-center rounded-[10px] bg-main-cool-gray text-sub-gray-2">
          응답을 완료한 후엔 날짜를 변경할 수 없어요
        </div>

        <p className="pretendard-sb-20 mt-[20px] leading-[30px] text-main-black">
          현재까지 {totalParticipantCount}명 중
          <br />
          <span className="text-main-mint">{respondedParticipantCount}</span>
          명이 응답했어요
        </p>

        <button
          type="button"
          onClick={() => router.push(`/meetup/${meetingId}/status`)}
          className="pretendard-sb-14 flex items-center gap-0 self-end text-main-mint"
        >
          조율 현황 보기
          <ChevronIcon width={26} height={32} scale={0.7} />
        </button>
      </div>

      {hasResponded ? (
        <div className="flex flex-1 flex-col items-center justify-center pb-[60px]">
          <Image
            src="/icons/empty-state.svg"
            alt=""
            width={134}
            height={134}
          />
          <div className="mt-0 flex flex-col items-center gap-[15px]">
            <p className="pretendard-sb-18 text-main-black">
              이미 응답을 완료했어요
            </p>
            <p className="pretendard-m-15 text-sub-gray-2">
              현재 조율 현황을 확인해 보세요
            </p>
          </div>
        </div>
      ) : (
        <ul className="mt-[10px] flex flex-col gap-[10px] px-4">
          {candidateDateRanges.map((range) => {
            const checked = selected.includes(range.id);
            return (
              <li key={range.id}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={checked}
                  onClick={() => toggle(range.id)}
                  className="flex h-[57px] w-full items-center justify-between rounded-[12px] bg-main-cool-gray px-[22px]"
                >
                  <span className="pretendard-sb-16 text-main-black">
                    {formatKoreanDateRange(range)}
                  </span>
                  {checked ? (
                    <Image
                      src="/icons/meetup/checkbox-on.svg"
                      alt=""
                      width={26}
                      height={26}
                    />
                  ) : (
                    <span className="size-[26px] rounded-[5px] border border-sub-gray-3 bg-[#FBFCFE]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {!hasResponded && submitErrorMessage && (
        <p className="pretendard-m-12 px-4 pt-[10px] text-red-500">
          {submitErrorMessage}
        </p>
      )}

      <Button
        variant="primary"
        disabled={hasResponded || isSubmitting || selected.length === 0}
        onClick={() => onSubmit(selected)}
        className="fixed bottom-0 left-0 right-0"
      >
        응답 완료
      </Button>
    </main>
  );
}

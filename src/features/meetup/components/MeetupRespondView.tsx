"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import { DUMMY_MEETUP_RESPONSE } from "@/features/meetup/constants/dummy";
import ChevronIcon from "@/components/ui/ChevronIcon";

export default function MeetupRespondView() {
  const { totalMembers, respondedMembers, candidateDates } =
    DUMMY_MEETUP_RESPONSE;

  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [selected, setSelected] = useState<number[]>([]);
  const [hasResponded, setHasResponded] = useState(false);

  const toggle = (index: number) =>
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );

  const handleSubmit = () => {
    // TODO: 응답 제출 API 연결
    setHasResponded(true);
  };

  return (
    <main className="flex min-h-screen flex-col pb-[114px]">
      <BackHeader title="가능한 날짜 선택" />
      <Divider />

      <div className="flex flex-col px-4 pt-[15px]">
        <div className="pretendard-m-14 flex h-[55px] items-center justify-center rounded-[10px] bg-main-cool-gray text-sub-gray-2">
          응답을 완료한 후엔 날짜를 변경할 수 없어요
        </div>

        <p className="pretendard-sb-20 mt-[20px] leading-[30px] text-main-black">
          현재까지 {totalMembers}명 중
          <br />
          <span className="text-main-mint">{respondedMembers}</span>명이
          응답했어요
        </p>

        <button
          type="button"
          onClick={() => router.push(`/meetup/${id}/status`)}
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
          {candidateDates.map((date, index) => {
            const checked = selected.includes(index);
            return (
              <li key={date + index}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={checked}
                  onClick={() => toggle(index)}
                  className="flex h-[57px] w-full items-center justify-between rounded-[12px] bg-main-cool-gray px-[22px]"
                >
                  <span className="pretendard-sb-16 text-main-black">
                    {date}
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

      <Button
        variant="primary"
        disabled={hasResponded || selected.length === 0}
        onClick={handleSubmit}
        className="fixed bottom-0 left-0 right-0"
      >
        응답 완료
      </Button>
    </main>
  );
}

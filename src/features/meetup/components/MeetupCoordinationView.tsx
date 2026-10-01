"use client";

import { useState } from "react";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import { DUMMY_MEETUP_COORDINATION } from "@/features/meetup/constants/dummy";
import ChevronIcon from "@/components/ui/ChevronIcon";

interface MeetupCoordinationViewProps {
  isHost: boolean;
}

function MemberChips({
  label,
  labelClassName,
  names,
}: {
  label: string;
  labelClassName: string;
  names: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className={`pretendard-m-12 ${labelClassName}`}>{label}</p>
      <div className="flex flex-wrap gap-[5px]">
        {names.map((name, i) => (
          <span
            key={name + i}
            className="pretendard-m-12 rounded-[5px] bg-[#E9E9E9]/70 px-[10px] py-[5px] text-sub-gray-2"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MeetupCoordinationView({
  isHost,
}: MeetupCoordinationViewProps) {
  const { totalMembers, respondedMembers, unrespondedMembers, dates } =
    DUMMY_MEETUP_COORDINATION;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleRemind = () => {
    // TODO: 미응답 멤버 리마인드 API 연결
  };

  const handleConfirm = () => {
    // TODO: 날짜 확정 API 연결
  };

  return (
    <main className="flex min-h-screen flex-col pb-[114px]">
      <BackHeader title="조율 현황" />
      <Divider />

      <div className="flex flex-col px-4">
        {isHost ? (
          <div className="h-[30px]" />
        ) : (
          <div className="pretendard-m-14 mt-[15px] mb-5 flex h-[55px] items-center justify-center rounded-[10px] bg-main-cool-gray text-sub-gray-2">
            날짜의 최종 확정 권한은 만남장에게만 부여돼요
          </div>
        )}

        <div className="flex flex-col gap-[9px] px-[3px]">
          <p className="pretendard-sb-18 text-main-black">날짜별 가능 인원</p>
          <p className="pretendard-m-15 text-sub-gray-1">
            현재까지 {totalMembers}명 중{" "}
            <span className="text-main-mint">{respondedMembers}</span>명이
            응답했어요
          </p>
        </div>

        <ul className="mt-5 flex flex-col gap-[10px]">
          {dates.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li
                key={item.date + index}
                className="rounded-[12px] bg-main-cool-gray"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="relative flex h-[77px] w-full flex-col items-start gap-2 px-[22px] pt-[15px] text-left"
                >
                  <span className="pretendard-sb-16 text-main-black">
                    {item.date}
                  </span>
                  <span
                    className={`pretendard-m-14 ${index === 0 ? "text-main-mint" : "text-sub-gray-2"}`}
                  >
                    현재까지 {index + 1}위
                  </span>
                  <span className="absolute right-[19px] top-[25px] flex h-[26px] w-[32px] items-center justify-center">
                    <ChevronIcon
                      width={26}
                      height={32}
                      scale={0.7}
                      className={`max-w-none shrink-0 text-sub-gray-2 transition-transform ${isOpen ? "-rotate-90" : "rotate-90"}`}
                    />
                  </span>
                </button>

                {isOpen && (
                  <div className="flex flex-col gap-5 px-[22px] pb-[23px] pt-[9px]">
                    <MemberChips
                      label="가능한 멤버"
                      labelClassName="text-[#2B72F4]"
                      names={item.availableMembers}
                    />
                    <MemberChips
                      label="불가능한 멤버"
                      labelClassName="text-[#F42B2B]"
                      names={item.unavailableMembers}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {isHost && (
          <button
            type="button"
            onClick={handleRemind}
            className="pretendard-sb-16 mt-[10px] h-[56px] w-full rounded-[12px] bg-main-mint text-main-white"
          >
            응답하지 않은 {unrespondedMembers}명에게 리마인드 보내기
          </button>
        )}
      </div>

      <Button
        variant="primary"
        disabled={!isHost}
        onClick={handleConfirm}
        className="fixed bottom-0 left-0 right-0"
      >
        지금 확정하기
      </Button>
    </main>
  );
}

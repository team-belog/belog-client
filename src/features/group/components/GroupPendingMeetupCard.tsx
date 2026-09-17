"use client";

import { useState } from "react";

import type { PendingMeetup } from "@/features/group/types";

interface GroupPendingMeetupCardProps {
  meetup: PendingMeetup;
  onConfirmSchedule?: () => void;
}

export default function GroupPendingMeetupCard({
  meetup,
  onConfirmSchedule,
}: GroupPendingMeetupCardProps) {
  const [copied, setCopied] = useState(false);
  const { title, members, memberLimit, inviteCode } = meetup;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 클립보드 접근 권한이 없는 환경에서는 무시
    }
  };

  return (
    <div className="mx-4 flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] rounded-[12px] bg-main-cool-gray px-[13px] py-[21px]">
        <p className="pretendard-sb-16 text-main-black">{title}</p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-[5px]">
            {members.map((member) => (
              <span
                key={member.id}
                className="pretendard-m-12 whitespace-nowrap rounded-[8px] bg-[#F1F4F9] px-[10px] py-[6px] text-sub-gray-1"
              >
                {member.role === "leader" ? `${member.name} · 만남장` : member.name}
              </span>
            ))}
          </div>
          <p className="pretendard-m-12 whitespace-nowrap text-sub-gray-2">
            {members.length}/{memberLimit}명
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="pretendard-m-12 text-sub-gray-2">초대코드 · {inviteCode}</p>
          <button
            type="button"
            onClick={handleCopy}
            className="pretendard-m-12 rounded-[100px] border border-sub-gray-3 bg-sub-white px-[15px] py-[6px] text-sub-gray-2"
          >
            {copied ? "복사됨" : "복사"}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onConfirmSchedule}
        className="pretendard-sb-16 flex h-[56px] items-center justify-center rounded-[12px] border border-main-mint bg-main-mint text-main-white"
      >
        일정 확정하기
      </button>
    </div>
  );
}

"use client";

import BackHeader from "@/components/layout/BackHeader";

// TODO: 멤버 목록·멤버 추가 화면 구현
export default function MeetupMemberManageContainer({
  meetingId: _meetingId,
}: {
  meetingId: number;
}) {
  return (
    <main className="pt-[60px]">
      <BackHeader title="멤버 관리" />
      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />
    </main>
  );
}

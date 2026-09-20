"use client";

import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import MeetupLogRow from "@/features/meetup/components/MeetupLogRow";
import MeetupSummary from "@/features/meetup/components/MeetupSummary";
import type { MeetupDetail } from "@/features/meetup/types";

interface MeetupDetailViewProps {
  meetup: MeetupDetail;
}

export default function MeetupDetailView({ meetup }: MeetupDetailViewProps) {
  const router = useRouter();

  return (
    <main>
      <BackHeader title="만남 상세" />
      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />

      <MeetupSummary meetup={meetup} />

      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />

      <div className="flex flex-col">
        <MeetupLogRow
          iconSrc="/images/meetup/pre-log.png"
          title="Pre-log"
          status={meetup.preLogStatus}
          description="만남 일정과 장소를 정해요"
          onClick={() => router.push("/pre-log")}
        />
        <MeetupLogRow
          iconSrc="/images/meetup/bill-log.png"
          title="Bill-log"
          status={meetup.billLogStatus}
          description="영수증으로 정산해요"
          onClick={() => router.push("/bill-log")}
        />
        <MeetupLogRow
          iconSrc="/images/meetup/post-log.png"
          title="Post-log"
          status={meetup.postLogStatus}
          description="사진을 기록하고 티켓을 생성해요"
          onClick={() => router.push("/post-log")}
        />
      </div>
    </main>
  );
}

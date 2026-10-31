"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import TabBar from "@/components/ui/TabBar";
import MeetingPhotoTab from "@/features/post-log/components/tab/MeetingPhotoTab";
import MeetingInfoTab from "@/features/post-log/components/tab/MeetingInfoTab";
import { track } from "@/lib/amplitude";

function PostLogContent() {
  const [activeTab, setActiveTab] = useState(0);
  const searchParams = useSearchParams();
  const meetingId = searchParams.get("meetingId");

  useEffect(() => {
    track("Postlog Viewed", { meetingId: meetingId ? Number(meetingId) : undefined });
  }, [meetingId]);

  return (
    <main className="flex flex-col pt-[60px]">
      <BackHeader title="Post-log" />
      <Divider />
      <TabBar tabs={["만남 타임라인", "만남 정리"]} activeIndex={activeTab} onChange={setActiveTab} />
      {activeTab === 0 && <MeetingPhotoTab />}
      {activeTab === 1 && <MeetingInfoTab />}
    </main>
  );
}
export default function PostLogPage() {
  return (
    <Suspense>
      <PostLogContent />
    </Suspense>
  );
}

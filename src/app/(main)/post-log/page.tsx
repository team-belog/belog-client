"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import TabBar from "@/components/ui/TabBar";
import MeetingPhotoTab from "@/features/post-log/components/tab/MeetingPhotoTab";
import MeetingInfoTab from "@/features/post-log/components/tab/MeetingInfoTab";
import { useTrackView } from "@/hooks/useTrackView";
import { track, setUserProperty } from "@/lib/amplitude";

function PostLogContent() {
  const [activeTab, setActiveTab] = useState(0);
  const searchParams = useSearchParams();
  const meetingId = Number(searchParams.get("meetingId"));
  const groupId = Number(searchParams.get("groupId"));

  useTrackView("Page Viewed", {
    page_name: "postlog",
    meeting_id: String(meetingId),
    ...(groupId > 0 && { group_id: String(groupId) }),
  });

  useEffect(() => {
    if (meetingId) {
      track("Postlog Viewed", { meeting_id: String(meetingId) });
      setUserProperty({ has_used_postlog: true });
    }
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

"use client";

import { useState } from "react";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import TabBar from "@/components/ui/TabBar";
import MeetingPhotoTab from "@/features/post-log/components/tab/MeetingPhotoTab";
import MeetingInfoTab from "@/features/post-log/components/tab/MeetingInfoTab";

export default function PostLogPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="flex flex-col">
      <BackHeader title="Post-log" />
      <Divider />
      <TabBar tabs={["만남 요약", "만남 정리"]} activeIndex={activeTab} onChange={setActiveTab} />
      {activeTab === 0 && <MeetingPhotoTab />}
      {activeTab === 1 && <MeetingInfoTab />}
    </main>
  );
}
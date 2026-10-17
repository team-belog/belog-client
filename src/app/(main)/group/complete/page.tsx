"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import GroupSummaryCard from "@/features/group/components/GroupSummaryCard";
import GroupCreatedNotice from "@/features/group/components/GroupCreatedNotice";

function GroupCompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupName = searchParams.get("name") || "그룹";

  return (
    <main className="flex min-h-screen flex-col pb-[114px]">
      <BackHeader title="그룹 만들기" />
      <Divider />
      <div className="mt-[30px]">
        <GroupSummaryCard
          groupName={groupName}
          leaderName="이정원"
          memberCount={3}
        />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <GroupCreatedNotice />
      </div>
      <Button
        onClick={() => router.push("/group")}
        variant="primary"
        disabled={false}
        className="fixed bottom-0 left-0 right-0"
      >
        그룹 홈으로 이동
      </Button>
    </main>
  );
}

export default function GroupCompletePage() {
  return (
    <Suspense>
      <GroupCompleteContent />
    </Suspense>
  );
}

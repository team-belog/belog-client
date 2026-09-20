"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import BackHeader from "@/components/layout/BackHeader";
import Button from "@/components/ui/Button";
import TabBar from "@/components/ui/TabBar";
import TrashIcon from "@/components/ui/TrashIcon";
import GroupCoverSection from "@/features/group/components/GroupCoverSection";
import GroupDeleteModal from "@/features/group/components/GroupDeleteModal";
import GroupMeetupEmptyState from "@/features/group/components/GroupMeetupEmptyState";
import GroupPastMeetupEmptyState from "@/features/group/components/GroupPastMeetupEmptyState";
import GroupPastMeetupItem from "@/features/group/components/GroupPastMeetupItem";
import GroupPendingMeetupCard from "@/features/group/components/GroupPendingMeetupCard";
import type { GroupDetail } from "@/features/group/types";

const TABS = ["조율 중인 만남", "진행 중인 만남"];

interface GroupHomeViewProps {
  group: GroupDetail;
}

export default function GroupHomeView({ group }: GroupHomeViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    router.push("/group");
  };

  return (
    <main className="pb-[114px]">
      <BackHeader
        title="그룹 홈"
        right={
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            aria-label="그룹 삭제"
          >
            <TrashIcon variant="header" className="text-main-black" />
          </button>
        }
      />

      <GroupCoverSection
        name={group.name}
        description={group.description}
        coverImageUrl={group.coverImageUrl}
      />

      <TabBar tabs={TABS} activeIndex={activeTab} onChange={setActiveTab} />

      <div className="py-5">
        {activeTab === 0 ? (
          group.pendingMeetup ? (
            <GroupPendingMeetupCard meetup={group.pendingMeetup} />
          ) : (
            <GroupMeetupEmptyState
              message="아직 조율 중인 만남이 없어요"
              actionLabel="일정 확정하기"
            />
          )
        ) : group.ongoingMeetup ? (
          <GroupPendingMeetupCard
            meetup={group.ongoingMeetup}
            actionLabel="만남 상세"
            onAction={() => router.push(`/meetup/${group.ongoingMeetup!.id}`)}
          />
        ) : (
          <GroupMeetupEmptyState
            message="아직 진행 중인 만남이 없어요"
            actionLabel="만남 상세 보기"
          />
        )}
      </div>

      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />

      <div className="flex flex-col gap-[15px] px-4 py-5">
        <p className="pretendard-sb-16 text-main-black">우리의 지난 만남</p>
        {group.pastMeetups.length === 0 ? (
          <GroupPastMeetupEmptyState />
        ) : (
          <div className="flex flex-col gap-[15px]">
            {group.pastMeetups.map((meetup) => (
              <GroupPastMeetupItem key={meetup.id} meetup={meetup} />
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <Button variant="primary" onClick={() => {}} disabled={false}>
          새 만남 시작하기
        </Button>
      </div>

      {isDeleteModalOpen && (
        <GroupDeleteModal
          groupName={group.name}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </main>
  );
}

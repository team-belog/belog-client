"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import BackHeader from "@/components/layout/BackHeader";
import Button from "@/components/ui/Button";
import TabBar from "@/components/ui/TabBar";
import TrashIcon from "@/components/ui/TrashIcon";
import GroupActiveMeetupCard from "@/features/group/components/GroupActiveMeetupCard";
import GroupCoverSection from "@/features/group/components/GroupCoverSection";
import GroupDeleteModal from "@/features/group/components/GroupDeleteModal";
import GroupMeetupEmptyState from "@/features/group/components/GroupMeetupEmptyState";
import GroupPastMeetupEmptyState from "@/features/group/components/GroupPastMeetupEmptyState";
import GroupPastMeetupItem from "@/features/group/components/GroupPastMeetupItem";
import GroupPendingMeetupCard from "@/features/group/components/GroupPendingMeetupCard";
import type { GroupDetailData, PastMeetingDto } from "@/features/group/types";

const TABS = ["조율 중인 만남", "진행 중인 만남"];

interface GroupHomeViewProps {
  group: GroupDetailData;
  ownerNickname?: string;
  // undefined면 아직 불러오는 중
  pastMeetings?: PastMeetingDto[];
  hasMorePastMeetings: boolean;
  onLoadMorePastMeetings: () => void;
}

export default function GroupHomeView({
  group,
  ownerNickname,
  pastMeetings,
  hasMorePastMeetings,
  onLoadMorePastMeetings,
}: GroupHomeViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMorePastMeetings) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onLoadMorePastMeetings();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMorePastMeetings, onLoadMorePastMeetings]);

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    router.push("/group");
  };

  return (
    <main className="pb-[114px]">
      <BackHeader
        title="그룹 홈"
        right={
          group.canDeleteGroup && (
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              aria-label="그룹 삭제"
            >
              <TrashIcon variant="header" className="text-main-black" />
            </button>
          )
        }
      />

      <GroupCoverSection
        name={group.name}
        coverImageUrl={group.coverImageUrl ?? undefined}
        canEditCoverImage={group.canEditCoverImage}
      />

      <TabBar tabs={TABS} activeIndex={activeTab} onChange={setActiveTab} />

      <div className="py-5">
        {activeTab === 0 ? (
          group.schedulingMeetings.length > 0 ? (
            <div className="flex flex-col gap-[15px]">
              {group.schedulingMeetings.map((meeting) => (
                <GroupPendingMeetupCard
                  key={meeting.meetingId}
                  meeting={meeting}
                  inviteCode={group.inviteCode}
                  ownerNickname={ownerNickname}
                />
              ))}
            </div>
          ) : (
            <GroupMeetupEmptyState
              message="아직 조율 중인 만남이 없어요"
              actionLabel="일정 확정하기"
            />
          )
        ) : group.activeMeetings.length > 0 ? (
          <div className="flex flex-col gap-[15px]">
            {group.activeMeetings.map((meeting) => (
              <GroupActiveMeetupCard
                key={meeting.meetingId}
                meeting={meeting}
                onAction={() => router.push(`/meetup/${meeting.meetingId}`)}
              />
            ))}
          </div>
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
        {pastMeetings &&
          (pastMeetings.length === 0 ? (
            <GroupPastMeetupEmptyState />
          ) : (
            <div className="flex flex-col gap-[15px]">
              {pastMeetings.map((meeting) => (
                <GroupPastMeetupItem key={meeting.meetingId} meeting={meeting} />
              ))}
              <div ref={sentinelRef} />
            </div>
          ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <Button
          variant="primary"
          onClick={() => router.push("/meetup/new")}
          disabled={false}
        >
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

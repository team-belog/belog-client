"use client";

import { useEffect, useRef, useState } from "react";

import GroupDeleteModal from "@/features/group/components/GroupDeleteModal";
import GroupListCard from "@/features/group/components/GroupListCard";
import { useGroups } from "@/features/group/hooks/useGroups";
import type { GroupSummary } from "@/features/group/types";

export default function GroupList() {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGroups();
  // 고정/삭제 API 연동 전까지 화면 내 임시 상태로만 반영
  const [pinOverrides, setPinOverrides] = useState<Record<number, boolean>>({});
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<GroupSummary | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasNextPage) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetchingNextPage) fetchNextPage();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <p className="pretendard-m-15 pt-[25px] text-center text-sub-gray-2">
        불러오는 중...
      </p>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 pt-[25px]">
        <p className="pretendard-m-15 text-sub-gray-2">{error.message}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="pretendard-m-15 text-main-black underline"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const groups = data.groups
    .filter((group) => !deletedIds.includes(group.id))
    .map((group) => ({
      ...group,
      isPinned: pinOverrides[group.id] ?? group.isPinned,
    }));

  const handleTogglePin = (target: GroupSummary) => {
    setPinOverrides((prev) => ({ ...prev, [target.id]: !target.isPinned }));
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setDeletedIds((prev) => [...prev, deleteTarget.id]);
    setDeleteTarget(null);
  };

  const sortedGroups = [...groups].sort(
    (a, b) => Number(b.isPinned) - Number(a.isPinned),
  );

  if (sortedGroups.length === 0) {
    return (
      <p className="pretendard-m-15 pt-[25px] text-center text-sub-gray-2">
        참여 중인 그룹이 없어요
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-[15px] pb-4 pt-[25px]">
      {sortedGroups.map((group) => (
        <GroupListCard
          key={group.id}
          group={group}
          onTogglePin={handleTogglePin}
          onDelete={setDeleteTarget}
        />
      ))}

      <div ref={sentinelRef} />

      {deleteTarget && (
        <GroupDeleteModal
          groupName={deleteTarget.name}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

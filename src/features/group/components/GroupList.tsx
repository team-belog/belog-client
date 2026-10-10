"use client";

import { useEffect, useRef, useState } from "react";

import GroupDeleteModal from "@/features/group/components/GroupDeleteModal";
import GroupListCard from "@/features/group/components/GroupListCard";
import { useDeleteGroup } from "@/features/group/hooks/useDeleteGroup";
import { useGroups } from "@/features/group/hooks/useGroups";
import { usePinGroup } from "@/features/group/hooks/usePinGroup";
import type { GroupListItemDto } from "@/features/group/types";

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
  const deleteGroup = useDeleteGroup();
  const pinGroup = usePinGroup();
  // TODO: 고정 해제 API 연동 전까지 해제만 화면 내 임시 상태로 반영
  const [unpinnedIds, setUnpinnedIds] = useState<number[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<GroupListItemDto | null>(
    null,
  );
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

  const groups = data.map((group) => ({
    ...group,
    pinned: group.pinned && !unpinnedIds.includes(group.groupId),
  }));

  const handleTogglePin = (target: GroupListItemDto) => {
    if (target.pinned) {
      setUnpinnedIds((prev) => [...prev, target.groupId]);
      return;
    }
    setUnpinnedIds((prev) => prev.filter((id) => id !== target.groupId));
    pinGroup.mutate(target.groupId);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteGroup.mutate(deleteTarget.groupId, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
    deleteGroup.reset();
  };

  const sortedGroups = [...groups].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned),
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
          key={group.groupId}
          group={group}
          onTogglePin={handleTogglePin}
          onDelete={setDeleteTarget}
        />
      ))}

      <div ref={sentinelRef} />

      {deleteTarget && (
        <GroupDeleteModal
          groupName={deleteTarget.name}
          isDeleting={deleteGroup.isPending}
          errorMessage={deleteGroup.error?.message}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

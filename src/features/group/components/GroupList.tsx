"use client";

import { useState } from "react";

import GroupDeleteModal from "@/features/group/components/GroupDeleteModal";
import GroupListCard from "@/features/group/components/GroupListCard";
import type { GroupSummary } from "@/features/group/types";

interface GroupListProps {
  initialGroups: GroupSummary[];
}

export default function GroupList({ initialGroups }: GroupListProps) {
  const [groups, setGroups] = useState(initialGroups);
  const [deleteTarget, setDeleteTarget] = useState<GroupSummary | null>(null);

  const handleTogglePin = (target: GroupSummary) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === target.id ? { ...group, isPinned: !group.isPinned } : group,
      ),
    );
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setGroups((prev) => prev.filter((group) => group.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const sortedGroups = [...groups].sort(
    (a, b) => Number(b.isPinned) - Number(a.isPinned),
  );

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

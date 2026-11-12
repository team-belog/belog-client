"use client";

import { useMemo, useState } from "react";

import BackHeader from "@/components/layout/BackHeader";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import Toast from "@/components/ui/Toast";
import MeetupCurrentMemberRow from "@/features/meetup/components/MeetupCurrentMemberRow";
import MeetupMemberRemoveModal from "@/features/meetup/components/MeetupMemberRemoveModal";
import MeetupMemberRow from "@/features/meetup/components/MeetupMemberRow";
import type { MeetingMemberOptionDto } from "@/features/meetup/types";
import { useToast } from "@/hooks/useToast";

interface MeetupMemberManageViewProps {
  options: MeetingMemberOptionDto[];
  isSaving: boolean;
  onSave: (
    participantMemberIds: number[],
    options?: { onError?: (message: string) => void },
  ) => void;
}

export default function MeetupMemberManageView({
  options,
  isSaving,
  onSave,
}: MeetupMemberManageViewProps) {
  const { toast, showToast, hideToast } = useToast();
  const [memberIds, setMemberIds] = useState(() =>
    options
      .filter((option) => option.isParticipant)
      .map((option) => option.groupMemberId),
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [removeTarget, setRemoveTarget] = useState<MeetingMemberOptionDto | null>(
    null,
  );

  const currentMembers = options.filter((member) =>
    memberIds.includes(member.groupMemberId),
  );

  // 삭제한 멤버도 추가 목록에 다시 나타남
  const candidates = useMemo(() => {
    const query = searchQuery.trim();
    return options.filter(
      (member) =>
        !memberIds.includes(member.groupMemberId) &&
        (!query || member.nickname.includes(query)),
    );
  }, [options, memberIds, searchQuery]);

  const hasChanges =
    memberIds.length !== options.filter((option) => option.isParticipant).length ||
    selectedIds.length > 0;

  const handleConfirmRemove = () => {
    if (!removeTarget) return;
    setMemberIds((prev) =>
      prev.filter((memberId) => memberId !== removeTarget.groupMemberId),
    );
    setRemoveTarget(null);
  };

  const toggleCandidate = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((memberId) => memberId !== id)
        : [...prev, id],
    );
  };

  // 방장은 항상 참여자로 유지되므로 본인(방장)은 목록에서 제외
  const handleSave = () => {
    const myId = options.find((option) => option.isMe)?.groupMemberId;
    const participantMemberIds = [...memberIds, ...selectedIds].filter(
      (id) => id !== myId,
    );
    onSave(participantMemberIds, {
      onError: (message) => showToast(message, "error"),
    });
  };

  return (
    <main className="pb-[114px] pt-[60px]">
      <BackHeader title="멤버 관리" />
      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />

      <section className="px-4 pb-5 pt-[19px]">
        <h2 className="pretendard-sb-16 text-main-black">멤버 목록</h2>
        <div className="mt-[10px] flex flex-col">
          {currentMembers.map((member) => (
            <MeetupCurrentMemberRow
              key={member.groupMemberId}
              member={member}
              onRemove={
                member.isRemovable ? () => setRemoveTarget(member) : undefined
              }
            />
          ))}
        </div>
      </section>

      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />

      <section className="px-4 pt-[30px]">
        <div className="flex flex-col gap-[10px]">
          <h2 className="pretendard-sb-16 text-main-black">멤버 추가</h2>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="만남에 초대하고 싶은 멤버를 찾아보세요"
          />
        </div>
        <div className="mt-[10px] flex flex-col">
          {candidates.map((member) => (
            <MeetupMemberRow
              key={member.groupMemberId}
              member={member}
              selected={selectedIds.includes(member.groupMemberId)}
              onToggle={() => toggleCandidate(member.groupMemberId)}
            />
          ))}
        </div>
      </section>

      <Button
        variant="primary"
        disabled={!hasChanges || isSaving}
        onClick={handleSave}
        className="fixed bottom-0 left-0 right-0"
      >
        저장하기
      </Button>

      {removeTarget && (
        <MeetupMemberRemoveModal
          nickname={removeTarget.nickname}
          onCancel={() => setRemoveTarget(null)}
          onConfirm={handleConfirmRemove}
        />
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />

    </main>
  );
}

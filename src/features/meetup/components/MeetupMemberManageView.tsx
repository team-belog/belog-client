"use client";

import { useMemo, useState } from "react";

import BackHeader from "@/components/layout/BackHeader";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import { useGroupMembers } from "@/features/group/hooks/useGroupMembers";
import MeetupCurrentMemberRow from "@/features/meetup/components/MeetupCurrentMemberRow";
import MeetupMemberRow from "@/features/meetup/components/MeetupMemberRow";
import type { MeetingMemberDto } from "@/features/meetup/types";

interface MeetupMemberManageViewProps {
  groupId: number;
  members: MeetingMemberDto[];
}

export default function MeetupMemberManageView({
  groupId,
  members,
}: MeetupMemberManageViewProps) {
  const { data: groupMembers } = useGroupMembers(groupId);
  const [memberIds, setMemberIds] = useState(() =>
    members.map((member) => member.groupMemberId),
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const currentMembers = members.filter((member) =>
    memberIds.includes(member.groupMemberId),
  );

  // 삭제한 멤버도 그룹 멤버라 추가 목록에 다시 나타남
  const candidates = useMemo(() => {
    const query = searchQuery.trim();
    return (groupMembers?.items ?? []).filter(
      (member) =>
        !memberIds.includes(member.groupMemberId) &&
        (!query || member.nickname.includes(query)),
    );
  }, [groupMembers, memberIds, searchQuery]);

  const hasChanges =
    memberIds.length !== members.length || selectedIds.length > 0;

  const removeMember = (id: number) => {
    setMemberIds((prev) => prev.filter((memberId) => memberId !== id));
  };

  const toggleCandidate = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((memberId) => memberId !== id)
        : [...prev, id],
    );
  };

  // TODO: 멤버 추가·삭제 API가 나오면 memberIds, selectedIds로 저장
  const handleSave = () => {};

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
                member.isMe
                  ? undefined
                  : () => removeMember(member.groupMemberId)
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
        disabled={!hasChanges}
        onClick={handleSave}
        className="fixed bottom-0 left-0 right-0"
      >
        저장하기
      </Button>
    </main>
  );
}

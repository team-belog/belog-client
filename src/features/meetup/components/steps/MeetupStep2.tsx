"use client";

import { useMemo, useState } from "react";

import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import MeetupMemberRow from "@/features/meetup/components/MeetupMemberRow";
import type { GroupMemberDto } from "@/features/group/types";

interface MeetupStep2Props {
  members: GroupMemberDto[];
  selectedIds: number[];
  onChangeSelectedIds: (ids: number[]) => void;
  onNext: () => void;
}

export default function MeetupStep2({
  members,
  selectedIds,
  onChangeSelectedIds,
  onNext,
}: MeetupStep2Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim();
    return query
      ? members.filter((member) => member.nickname.includes(query))
      : members;
  }, [members, searchQuery]);

  const toggleMember = (id: number) => {
    onChangeSelectedIds(
      selectedIds.includes(id)
        ? selectedIds.filter((memberId) => memberId !== id)
        : [...selectedIds, id],
    );
  };

  return (
    <div className="flex flex-col gap-6 px-4 pb-[114px] pt-3">
      <div className="flex flex-col gap-[10px]">
        <h1 className="pretendard-sb-18 text-main-black">
          어떤 만남을 만들까요?
        </h1>
        <p className="pretendard-m-14 text-sub-gray-2">
          그룹 멤버로 초대된 사람들만 만남 멤버로 선택할 수 있어요
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <p className="pretendard-sb-16 text-main-black">멤버 선택</p>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="만남에 초대하고 싶은 멤버를 찾아보세요"
        />
      </div>

      <div className="flex flex-col">
        {filteredMembers.map((member) => (
          <MeetupMemberRow
            key={member.groupMemberId}
            member={member}
            selected={selectedIds.includes(member.groupMemberId)}
            onToggle={() => toggleMember(member.groupMemberId)}
          />
        ))}
      </div>

      <Button
        variant="primary"
        disabled={selectedIds.length === 0}
        onClick={onNext}
        className="fixed bottom-0 left-0 right-0"
      >
        다음
      </Button>
    </div>
  );
}

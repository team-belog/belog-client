interface GroupSummaryCardProps {
  groupName: string;
  leaderName: string;
  memberCount: number;
}

export default function GroupSummaryCard({
  groupName,
  leaderName,
  memberCount,
}: GroupSummaryCardProps) {
  return (
    <div className="mx-4 flex flex-col gap-[10px] rounded-[12px] bg-[#F7F8F9] px-[20px] py-[20px]">
      <p className="pretendard-m-15 text-main-black">{groupName}</p>
      <p className="pretendard-m-12 text-sub-gray-2">
        {leaderName} · {memberCount}명 참여
      </p>
    </div>
  );
}

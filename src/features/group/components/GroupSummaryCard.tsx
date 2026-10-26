interface GroupSummaryCardProps {
  groupName: string;
}

export default function GroupSummaryCard({ groupName }: GroupSummaryCardProps) {
  return (
    <div className="mx-4 rounded-[12px] bg-[#F7F8F9] px-[20px] py-[20px]">
      <p className="pretendard-m-15 text-main-black">{groupName}</p>
    </div>
  );
}

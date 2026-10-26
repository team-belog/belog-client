import Image from "next/image";

interface GroupMeetupEmptyStateProps {
  message: string;
  actionLabel: string;
}

export default function GroupMeetupEmptyState({
  message,
  actionLabel,
}: GroupMeetupEmptyStateProps) {
  return (
    <div className="mx-4 flex flex-col gap-[10px]">
      <div className="flex h-[146px] flex-col items-center justify-center rounded-[12px] bg-main-cool-gray">
        <div className="relative size-[100px]">
          <Image
            src="/icons/empty-state.svg"
            alt=""
            fill
            unoptimized
            className="object-contain"
          />
        </div>
        {/* 일러스트 하단 여백만큼 당겨 디자인 간격에 맞춤 */}
        <p className="pretendard-m-15 -mt-[3px] text-sub-gray-2">{message}</p>
      </div>

      <button
        type="button"
        disabled
        className="pretendard-m-16 flex h-[58px] items-center justify-center rounded-[12px] bg-sub-gray-3 text-main-white"
      >
        {actionLabel}
      </button>
    </div>
  );
}

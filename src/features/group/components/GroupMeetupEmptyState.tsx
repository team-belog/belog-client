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
      <div className="flex h-[146px] flex-col items-center justify-center gap-1 rounded-[12px] bg-main-cool-gray">
        <div className="relative size-[100px]">
          <Image
            src="/images/group/empty-meetup.svg"
            alt=""
            fill
            unoptimized
            className="object-contain"
          />
        </div>
        <p className="pretendard-m-15 text-sub-gray-2">{message}</p>
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

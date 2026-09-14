import Image from "next/image";

import Profile from "@/components/ui/Profile";
import type { GroupSummary } from "@/features/group/types";

interface GroupListCardProps {
  group: GroupSummary;
  onTogglePin?: (group: GroupSummary) => void;
  onDelete?: (group: GroupSummary) => void;
}

function AvatarStack({ avatarUrls }: { avatarUrls?: string[] }) {
  const avatars = avatarUrls?.length
    ? avatarUrls.slice(0, 3)
    : [undefined, undefined, undefined];

  return (
    <div className="flex shrink-0 items-center">
      {avatars.map((src, index) => (
        <div key={index} className={index === 0 ? "" : "-ml-[15px]"}>
          <Profile src={src} width={30} height={30} />
        </div>
      ))}
    </div>
  );
}

export default function GroupListCard({
  group,
  onTogglePin,
  onDelete,
}: GroupListCardProps) {
  const {
    name,
    leaderName,
    memberCount,
    isPinned,
    coverImageUrl,
    memberAvatarUrls,
  } = group;

  const textColor = coverImageUrl ? "text-main-white" : "text-main-black";

  return (
    <div
      className={`relative mx-4 h-[109px] overflow-hidden rounded-[12px] ${
        coverImageUrl ? "" : "bg-main-cool-gray"
      }`}
    >
      {coverImageUrl && (
        <>
          <Image src={coverImageUrl} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </>
      )}

      <div className="relative flex flex-col gap-[19px] px-5 pt-[19px]">
        <p className={`pretendard-m-15 ${textColor}`}>{name}</p>
        <div className="flex items-center gap-2">
          <AvatarStack avatarUrls={memberAvatarUrls} />
          <p className={`pretendard-sb-10 underline ${textColor}`}>
            {leaderName} 외 {memberCount}명
          </p>
        </div>
      </div>

      <div className="absolute right-5 top-1/2 flex -translate-y-1/2 items-center gap-[15px]">
        <button
          type="button"
          onClick={() => onTogglePin?.(group)}
          aria-label={isPinned ? "고정 해제" : "고정"}
          aria-pressed={isPinned}
          className="flex size-[22px] items-center justify-center"
        >
          <Image
            src={
              isPinned ? "/icons/group/pin-mint.svg" : "/icons/group/pin.svg"
            }
            alt=""
            width={11}
            height={17}
          />
        </button>
        <button
          type="button"
          onClick={() => onDelete?.(group)}
          aria-label="그룹 삭제"
          className="flex size-[22px] items-center justify-center"
        >
          <Image
            src={
              coverImageUrl
                ? "/icons/group/trash-white.svg"
                : "/icons/group/trash.svg"
            }
            alt=""
            width={16}
            height={17}
          />
        </button>
      </div>
    </div>
  );
}

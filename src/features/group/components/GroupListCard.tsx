import Image from "next/image";
import { useRouter } from "next/navigation";

import Profile from "@/components/ui/Profile";
import TrashIcon from "@/components/ui/TrashIcon";
import type { GroupListItemDto } from "@/features/group/types";

interface GroupListCardProps {
  group: GroupListItemDto;
  onTogglePin?: (group: GroupListItemDto) => void;
  onDelete?: (group: GroupListItemDto) => void;
}

function AvatarStack({ avatarUrls }: { avatarUrls: (string | undefined)[] }) {
  const avatars = avatarUrls.length
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
    groupId,
    name,
    memberCount,
    previewMembers,
    pinned: isPinned,
  } = group;
  const canDelete = group.canDeleteGroup;
  const coverImageUrl = group.coverImageUrl ?? undefined;
  // previewMembers는 OWNER 우선 정렬이므로 첫 번째 멤버가 리더
  const leaderName = previewMembers[0]?.nickname ?? "";
  const otherMemberCount = memberCount - 1;
  const memberAvatarUrls = previewMembers.map(
    (member) => member.profileImageUrl ?? undefined,
  );

  const router = useRouter();
  const textColor = coverImageUrl ? "text-main-white" : "text-main-black";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/group/${groupId}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter") router.push(`/group/${groupId}`);
      }}
      className={`relative mx-4 h-[109px] cursor-pointer overflow-hidden rounded-[12px] ${
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
            {otherMemberCount > 0
              ? `${leaderName} 외 ${otherMemberCount}명`
              : leaderName}
          </p>
        </div>
      </div>

      <div className="absolute right-5 top-1/2 flex -translate-y-1/2 items-center gap-[15px]">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin?.(group);
          }}
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
        {canDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(group);
            }}
            aria-label="그룹 삭제"
            className="flex size-[22px] items-center justify-center"
          >
            <TrashIcon
              width={16}
              height={17}
              className={coverImageUrl ? "text-main-white" : "text-sub-gray-2"}
            />
          </button>
        )}
      </div>
    </div>
  );
}

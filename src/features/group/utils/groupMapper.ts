import type { GroupListItemDto, GroupSummary } from "@/features/group/types";

export function toGroupSummary(dto: GroupListItemDto): GroupSummary {
  return {
    id: dto.groupId,
    name: dto.name,
    leaderName: dto.previewMembers[0]?.nickname ?? "",
    memberCount: dto.memberCount,
    isPinned: dto.pinned,
    canDelete: dto.canDeleteGroup,
    coverImageUrl: dto.coverImageUrl ?? undefined,
    memberAvatarUrls: dto.previewMembers.map(
      (member) => member.profileImageUrl ?? "",
    ),
  };
}

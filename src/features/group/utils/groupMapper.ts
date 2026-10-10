import type {
  ActiveMeetingDto,
  GroupDetail,
  GroupDetailData,
  GroupListItemDto,
  GroupSummary,
  PendingMeetup,
  SchedulingMeetingDto,
} from "@/features/group/types";

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

// TODO: 만남 응답에 정원·초대코드가 없어 임시값 사용
const MEETUP_MEMBER_LIMIT = 15;

function toSchedulingMeetup(
  dto: SchedulingMeetingDto,
  inviteCode: string,
): PendingMeetup {
  return {
    id: dto.meetingId,
    title: dto.name,
    members: dto.participantNicknames.map((nickname, index) => ({
      id: index,
      name: nickname,
      role: "member",
    })),
    memberLimit: MEETUP_MEMBER_LIMIT,
    inviteCode,
  };
}

function toActiveMeetup(
  dto: ActiveMeetingDto,
  inviteCode: string,
): PendingMeetup {
  return {
    id: dto.meetingId,
    title: dto.name,
    members: [],
    memberLimit: MEETUP_MEMBER_LIMIT,
    inviteCode,
  };
}

// TODO: 여러 만남 표시 방식 확정 전까지 첫 번째 만남만 사용
export function toGroupDetail(dto: GroupDetailData): GroupDetail {
  const [scheduling] = dto.schedulingMeetings;
  const [active] = dto.activeMeetings;

  return {
    id: dto.groupId,
    name: dto.name,
    description: "그룹의 약속을 확인해 보세요",
    coverImageUrl: dto.coverImageUrl ?? undefined,
    members: [],
    pendingMeetup: scheduling
      ? toSchedulingMeetup(scheduling, dto.inviteCode)
      : undefined,
    ongoingMeetup: active ? toActiveMeetup(active, dto.inviteCode) : undefined,
    pastMeetups: [],
  };
}

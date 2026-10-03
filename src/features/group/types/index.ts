export type GroupListParams = {
  cursor?: string;
  size?: number;
};

export type GroupListData = {
  items: GroupListItemDto[];
  nextCursor: string | null;
  hasNext: boolean;
};

export type GroupListItemDto = {
  groupId: number;
  name: string;
  coverImageUrl: string | null;
  memberCount: number;
  previewMembers: GroupPreviewMemberDto[];
  pinned: boolean;
  canDeleteGroup: boolean;
};

export type GroupPreviewMemberDto = {
  groupMemberId: number;
  nickname: string;
  profileImageUrl: string | null;
};

export type CreateGroupRequest = {
  name: string;
  coverImageObjectKey?: string;
};

export type CreateGroupData = {
  groupId: number;
  name: string;
  currentMemberCount: number;
  inviteCode: string;
  inviteLink: string;
};

export type GroupSummary = {
  id: number;
  name: string;
  leaderName: string;
  memberCount: number;
  isPinned: boolean;
  canDelete: boolean;
  coverImageUrl?: string;
  memberAvatarUrls?: string[];
};

export type GroupMemberRole = "leader" | "member";

export type GroupMember = {
  id: number;
  name: string;
  role: GroupMemberRole;
  avatarUrl?: string;
};

export type PendingMeetup = {
  id: number;
  title: string;
  members: GroupMember[];
  memberLimit: number;
  inviteCode: string;
};

export type PastMeetup = {
  id: number;
  title: string;
  date: string;
  thumbnailUrl?: string;
};

export type GroupDetail = {
  id: number;
  name: string;
  description: string;
  coverImageUrl?: string;
  members: GroupMember[];
  pendingMeetup?: PendingMeetup;
  ongoingMeetup?: PendingMeetup;
  pastMeetups: PastMeetup[];
};

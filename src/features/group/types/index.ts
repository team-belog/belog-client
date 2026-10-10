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

export type CoverImageContentType = "image/jpeg" | "image/png" | "image/webp";

export type CoverImageUploadUrlRequest = {
  contentType: CoverImageContentType;
  fileSize: number;
};

export type CoverImageUploadUrlData = {
  objectKey: string;
  uploadUrl: string;
  method: "PUT";
  requiredHeaders: Record<string, string>;
  expiresAt: string;
};

export type CreateGroupInput = {
  name: string;
  coverImage: File | null;
};

export type GroupDetailData = {
  groupId: number;
  name: string;
  coverImageUrl: string | null;
  inviteCode: string;
  memberCount: number;
  canEditCoverImage: boolean;
  canDeleteGroup: boolean;
  schedulingMeetings: SchedulingMeetingDto[];
  activeMeetings: ActiveMeetingDto[];
};

export type SchedulingMeetingDto = {
  meetingId: number;
  name: string;
  participantNicknames: string[];
  participantCount: number;
};

export type ActiveMeetingDto = {
  meetingId: number;
  name: string;
  startDate: string;
  endDate: string;
};

export type GroupMemberRole = "leader" | "member";

export type GroupMember = {
  id: number;
  name: string;
  role: GroupMemberRole;
  avatarUrl?: string;
};

export type GroupMembersParams = {
  query?: string;
};

export type GroupMembersData = {
  items: GroupMemberDto[];
};

export type GroupMemberDto = {
  groupMemberId: number;
  nickname: string;
  profileImageUrl: string | null;
  role: "OWNER" | "MEMBER";
};

export type PastMeetingsParams = {
  cursor?: number;
  size?: number;
};

export type PastMeetingsData = {
  items: PastMeetingDto[];
  nextCursor: number | null;
  hasNext: boolean;
};

export type PastMeetingDto = {
  meetingId: number;
  name: string;
  startDate: string;
  endDate: string;
};

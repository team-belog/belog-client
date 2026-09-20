export type GroupSummary = {
  id: number;
  name: string;
  leaderName: string;
  memberCount: number;
  isPinned: boolean;
  coverImageUrl?: string;
  memberAvatarUrls?: string[];
};

export type GroupMemberRole = "leader" | "member";

export type GroupMember = {
  id: number;
  name: string;
  role: GroupMemberRole;
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
  pendingMeetup?: PendingMeetup;
  ongoingMeetup?: PendingMeetup;
  pastMeetups: PastMeetup[];
};

export type GroupSummary = {
  id: number;
  name: string;
  leaderName: string;
  memberCount: number;
  isPinned: boolean;
  coverImageUrl?: string;
  memberAvatarUrls?: string[];
};

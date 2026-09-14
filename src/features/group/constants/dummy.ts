import type { GroupSummary } from "@/features/group/types";

const MEMBER_AVATAR_URLS = [
  "/images/group/sample-avatar-1.png",
  "/images/group/sample-avatar-2.png",
  "/images/group/sample-avatar-3.png",
];

export const DUMMY_GROUPS: GroupSummary[] = [
  {
    id: 1,
    name: "피블이와 기니휘기",
    leaderName: "이정원",
    memberCount: 2,
    isPinned: true,
    coverImageUrl: "/images/group/sample-cover.png",
    memberAvatarUrls: MEMBER_AVATAR_URLS,
  },
  {
    id: 2,
    name: "피블이와 기니휘기",
    leaderName: "이정원",
    memberCount: 2,
    isPinned: false,
    memberAvatarUrls: MEMBER_AVATAR_URLS,
  },
  {
    id: 3,
    name: "피블이와 기니휘기",
    leaderName: "이정원",
    memberCount: 2,
    isPinned: false,
    memberAvatarUrls: MEMBER_AVATAR_URLS,
  },
  {
    id: 4,
    name: "피블이와 기니휘기",
    leaderName: "이정원",
    memberCount: 2,
    isPinned: false,
    memberAvatarUrls: MEMBER_AVATAR_URLS,
  },
  {
    id: 5,
    name: "피블이와 기니휘기",
    leaderName: "이정원",
    memberCount: 2,
    isPinned: false,
    memberAvatarUrls: MEMBER_AVATAR_URLS,
  },
];

import type { GroupDetail, GroupSummary } from "@/features/group/types";

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

export const DUMMY_GROUP_DETAIL: GroupDetail = {
  id: 1,
  name: "피블이와 기니휘기",
  description: "그룹의 약속을 확인해 보세요",
  coverImageUrl: "/images/group/detail-cover.png",
  pendingMeetup: {
    id: 1,
    title: "1박 2일 광주 여행",
    members: [
      { id: 1, name: "이정원", role: "leader" },
      { id: 2, name: "정다빈", role: "member" },
      { id: 3, name: "김성연", role: "member" },
    ],
    memberLimit: 15,
    inviteCode: "QCRJNN",
  },
  ongoingMeetup: {
    id: 2,
    title: "1박 2일 광주 여행",
    members: [
      { id: 1, name: "이정원", role: "leader" },
      { id: 2, name: "정다빈", role: "member" },
      { id: 3, name: "김성연", role: "member" },
    ],
    memberLimit: 15,
    inviteCode: "QCRJNN",
  },
  pastMeetups: [
    {
      id: 1,
      title: "2025 연말 파티",
      date: "2025.12.30",
      thumbnailUrl: "/images/group/past-meetup-thumb.png",
    },
    {
      id: 2,
      title: "2025 연말 파티",
      date: "2025.12.30",
      thumbnailUrl: "/images/group/past-meetup-thumb.png",
    },
    {
      id: 3,
      title: "2025 연말 파티",
      date: "2025.12.30",
      thumbnailUrl: "/images/group/past-meetup-thumb.png",
    },
  ],
};

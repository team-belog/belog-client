import type { GroupDetail } from "@/features/group/types";

const MEMBER_AVATAR_URLS = [
  "/icons/group/sample-avatar-1.png",
  "/icons/group/sample-avatar-2.png",
  "/icons/group/sample-avatar-3.png",
];

export const DUMMY_GROUP_DETAIL: GroupDetail = {
  id: 1,
  name: "피블이와 기니휘기",
  description: "그룹의 약속을 확인해 보세요",
  coverImageUrl: "/icons/sample-photo.png",
  members: [
    { id: 1, name: "이정원", role: "leader", avatarUrl: MEMBER_AVATAR_URLS[2] },
    { id: 2, name: "정다빈", role: "member", avatarUrl: MEMBER_AVATAR_URLS[1] },
    { id: 3, name: "김성연", role: "member" },
  ],
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
      thumbnailUrl: "/icons/group/sample-past-meetup.png",
    },
    {
      id: 2,
      title: "2025 연말 파티",
      date: "2025.12.30",
      thumbnailUrl: "/icons/group/sample-past-meetup.png",
    },
    {
      id: 3,
      title: "2025 연말 파티",
      date: "2025.12.30",
      thumbnailUrl: "/icons/group/sample-past-meetup.png",
    },
  ],
};

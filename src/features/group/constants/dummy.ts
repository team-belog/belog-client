import type { GroupMember } from "@/features/group/types";

const MEMBER_AVATAR_URLS = [
  "/icons/group/sample-avatar-1.png",
  "/icons/group/sample-avatar-2.png",
  "/icons/group/sample-avatar-3.png",
];

// TODO: 만남 생성 화면에 그룹 멤버 목록 API 연동 후 삭제
export const DUMMY_GROUP_MEMBERS: GroupMember[] = [
  { id: 1, name: "이정원", role: "leader", avatarUrl: MEMBER_AVATAR_URLS[2] },
  { id: 2, name: "정다빈", role: "member", avatarUrl: MEMBER_AVATAR_URLS[1] },
  { id: 3, name: "김성연", role: "member" },
];

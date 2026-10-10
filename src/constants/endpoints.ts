export const ENDPOINTS = {
  auth: {
    googleLogin: "/auth/google",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
  group: {
    list: "/groups",
    create: "/groups",
    coverImageUploadUrl: "/groups/cover-image/upload-url",
    detail: (groupId: number) => `/groups/${groupId}`,
    members: (groupId: number) => `/groups/${groupId}/members`,
    pastMeetings: (groupId: number) => `/groups/${groupId}/meetings/past`,
    coverImage: (groupId: number) => `/groups/${groupId}/cover-image`,
  },
} as const;

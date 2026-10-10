export const ENDPOINTS = {
  auth: {
    googleLogin: "/auth/google",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
  user: {
    onboarding: "/users/me/onboarding",
    profileImageUploadUrl: "/users/me/profile-image/upload-url",
    nicknameAvailability: "/users/nickname/availability",
    myProfile: "/users/me/profile",
    updateProfile: "/users/me/profile",
    bankAccount: "/users/me/bank-account",
    withdraw: "/users/me",
  },
  my: {
    postLogCalendar: "/users/me/post-logs/calendar",
  },
  postLog: {
    getTicket: (ticketId: number) => `/post-log-tickets/${ticketId}`,
  },
  group: {
    list: "/groups",
    create: "/groups",
    coverImageUploadUrl: "/groups/cover-image/upload-url",
    detail: (groupId: number) => `/groups/${groupId}`,
    delete: (groupId: number) => `/groups/${groupId}`,
    pin: (groupId: number) => `/groups/${groupId}/pin`,
    members: (groupId: number) => `/groups/${groupId}/members`,
    pastMeetings: (groupId: number) => `/groups/${groupId}/meetings/past`,
    coverImage: (groupId: number) => `/groups/${groupId}/cover-image`,
  },
} as const;

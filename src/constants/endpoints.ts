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
} as const;

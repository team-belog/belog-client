export const ENDPOINTS = {
  auth: {
    googleLogin: "/auth/google",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
  billLog: {
  create: "/bill-log",
  getList: "/bill-log",
  getSummary: (meetingId: number) => `/meetings/${meetingId}/bill-log`,
}
} as const;

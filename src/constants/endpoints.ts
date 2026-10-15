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
    getSettlement: (meetingId: number) => `/meetings/${meetingId}/bill-log/settlement-requests`,
    getBills: (meetingId: number) => `/meetings/${meetingId}/bill-log/bills`,
    createBill: (meetingId: number) => `/meetings/${meetingId}/bill-log/bills`,
    getBillDetail: (billId: number) => `/bills/${billId}`,
    getUploadUrl: (meetingId: number) => `/meetings/${meetingId}/bill-log/receipt-images/upload-url`,
    analyzeReceipt: (meetingId: number) => `/meetings/${meetingId}/bill-log/receipt-analysis`,
    completeSettlement: (settlementRequestId: number) => `/settlement-requests/${settlementRequestId}/completion`,
    sendReminder: (settlementRequestId: number) => `/settlement-requests/${settlementRequestId}/reminders`,
  },
  user: {
    onboarding: "/users/me/onboarding",
    profileImageUploadUrl: "/users/me/profile-image/upload-url",
    nicknameAvailability: "/users/nickname/availability",
    myProfile: "/users/me/profile",
    updateProfile: "/users/me/profile",
    bankAccount: "/users/me/bank-account",
    withdraw: "/users/me",
    postLogCalendar: "/users/me/post-logs/calendar",
  },
  home: {
    calendar: "/home/calendar",
    activeMeetings: "/home/meetings/active",
    completedMeetings: "/home/meetings/completed",
  },
  bank: {
    list: "/banks",
  },
  preLog: {
    main: (meetingId: number) => `/meetings/${meetingId}/pre-log`,
    plans: (meetingId: number) => `/meetings/${meetingId}/pre-log/plans`,
    createPlan: (meetingId: number) => `/meetings/${meetingId}/pre-log/plans`,
    updatePlan: (planId: number) => `/plans/${planId}`,
    deletePlan: (planId: number) => `/plans/${planId}`,
    // PUT 고정, DELETE 해제
    pinPlan: (planId: number) => `/plans/${planId}/pin`,
  },
  postLog: {
    getTicket: (ticketId: number) => `/post-log-tickets/${ticketId}`,
    getPhotoList: (meetingId: number) => `/meetings/${meetingId}/post-log-photos`,
    createTicket: (meetingId: number) => `/meetings/${meetingId}/post-log/ticket`,
    getMeetingInfo: (meetingId: number) => `/meetings/${meetingId}/post-log`,
    saveDraft: (meetingId: number) => `/meetings/${meetingId}/post-log/draft`,
    getPhotoUploadUrls: (meetingId: number) => `/meetings/${meetingId}/post-log-photos/upload-urls`,
    registerPhotoMetadata: (meetingId: number) => `/meetings/${meetingId}/post-log-photos`,
    likePhoto: (photoId: number) => `/post-log-photos/${photoId}/likes/me`,
    unlikePhoto: (photoId: number) => `/post-log-photos/${photoId}/likes/me`,
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
  meeting: {
    detail: (meetingId: number) => `/meetings/${meetingId}`,
    create: (groupId: number) => `/groups/${groupId}/meetings`,
    update: (meetingId: number) => `/meetings/${meetingId}`,
    delete: (meetingId: number) => `/meetings/${meetingId}`,
    datePoll: (meetingId: number) => `/meetings/${meetingId}/date-poll`,
    datePollResults: (meetingId: number) =>
      `/meetings/${meetingId}/date-poll/results`,
    myDatePollResponse: (meetingId: number) =>
      `/meetings/${meetingId}/date-poll/responses/me`,
    confirmedDate: (meetingId: number) =>
      `/meetings/${meetingId}/confirmed-date`,
    datePollReminders: (meetingId: number) =>
      `/meetings/${meetingId}/date-poll/reminders`,
    members: (meetingId: number) => `/meetings/${meetingId}/members`,
  },
  groupMembership: {
    join: "/group-memberships",
  },
} as const;

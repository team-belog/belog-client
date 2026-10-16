const ICON = {
  group: "/icons/notification/group.svg",
  schedule: "/icons/notification/schedule.svg",
  preLog: "/icons/notification/pre-log.svg",
  billLog: "/icons/notification/bill-log.svg",
  postLog: "/icons/notification/post-log.svg",
  reminder: "/icons/notification/reminder.svg",
};

// 알림 type별 카테고리 아이콘 (매핑에 없는 type은 기본 아이콘)
export const NOTIFICATION_ICON: Record<string, string> = {
  // 그룹
  GROUP_MEMBER_JOINED: ICON.group,
  GROUP_DELETED: ICON.group,
  // 일정 조율
  MEETING_PROPOSED: ICON.schedule,
  DATE_POLL_STARTED: ICON.schedule,
  DATE_POLL_RESPONDED: ICON.schedule,
  DATE_POLL_REMINDER: ICON.schedule,
  MEETING_DATE_CONFIRMED: ICON.schedule,
  // Pre-log
  PRE_LOG_PLAN_CREATED: ICON.preLog,
  PRE_LOG_PLAN_LIKED: ICON.preLog,
  // Bill-log
  SETTLEMENT_REQUESTED: ICON.billLog,
  BILL_REGISTERED: ICON.billLog,
  SETTLEMENT_COMPLETED: ICON.billLog,
  SETTLEMENT_REMINDER: ICON.billLog,
  // Post-log
  POST_LOG_PHOTOS_REGISTERED: ICON.postLog,
  POST_LOG_REVIEW_CREATED: ICON.postLog,
  // 리마인드
  MEETING_D7_REMINDER: ICON.reminder,
  PRE_LOG_D2_REMINDER: ICON.reminder,
  POST_LOG_TODAY_REMINDER: ICON.reminder,
  GROUP_INACTIVE_60_DAYS: ICON.reminder,
};

export const DEFAULT_NOTIFICATION_ICON = ICON.reminder;

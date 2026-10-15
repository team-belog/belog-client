// 알림 type별 아이콘 (매핑에 없는 type은 기본 아이콘)
export const NOTIFICATION_ICON: Record<string, string> = {
  GROUP_MEMBER_JOINED: "/icons/notification/group-join.svg",
  PRE_LOG_PLAN_LIKED: "/icons/notification/like.svg",
  SETTLEMENT_REQUESTED: "/icons/notification/settlement-request.svg",
  SETTLEMENT_REMINDER: "/icons/notification/settlement-request.svg",
  SETTLEMENT_COMPLETED: "/icons/notification/settlement-complete.svg",
};

export const DEFAULT_NOTIFICATION_ICON = "/icons/notification/group-join.svg";

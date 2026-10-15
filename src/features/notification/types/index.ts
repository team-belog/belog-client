export type NotificationTargetType =
  | "HOME"
  | "GROUP_HOME"
  | "DATE_POLL_RESPONSE"
  | "DATE_POLL_STATUS"
  | "MEETING_DETAIL"
  | "PRE_LOG"
  | "BILL_LOG"
  | "POST_LOG";

export type NotificationTarget = {
  type: NotificationTargetType;
  // HOME은 id 없음
  id: number | null;
};

export type NotificationItem = {
  notificationId: number;
  type: string;
  message: string;
  target: NotificationTarget;
  read: boolean;
  createdAt: string;
};

export type NotificationListParams = {
  cursor?: number;
  size?: number;
};

export type NotificationSettingsData = {
  pushNotificationEnabled: boolean;
};

export type RegisterDeviceRequest = {
  fcmToken: string;
};

export type NotificationListData = {
  items: NotificationItem[];
  nextCursor: number | null;
  hasNext: boolean;
};

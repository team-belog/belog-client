import type { NotificationTarget } from "@/features/notification/types";

// 화면 이동은 알림 type이 아니라 target 기준 (목록 클릭/푸시 클릭 공용)
export function getNotificationPath({ type, id }: NotificationTarget): string {
  if (type === "HOME") return "/";
  if (id === null) return "/notification";

  switch (type) {
    case "GROUP_HOME":
      return `/group/${id}`;
    case "DATE_POLL_RESPONSE":
      return `/meetup/${id}/respond`;
    case "DATE_POLL_STATUS":
      return `/meetup/${id}/status?role=host`;
    case "MEETING_DETAIL":
      return `/meetup/${id}`;
    case "PRE_LOG":
      return `/pre-log?meetingId=${id}`;
    case "BILL_LOG":
      return `/bill-log?meetingId=${id}`;
    case "POST_LOG":
      return `/post-log?meetingId=${id}`;
    default:
      return "/notification";
  }
}

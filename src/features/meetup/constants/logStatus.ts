import type { LogStatus } from "@/features/meetup/types";

export const PRE_LOG_STATUS_LABEL: Record<LogStatus, string> = {
  NOT_STARTED: "작성 전",
  IN_PROGRESS: "작성 중",
};

export const BILL_LOG_STATUS_LABEL: Record<LogStatus, string> = {
  NOT_STARTED: "정산 전",
  IN_PROGRESS: "정산 중",
};

export const POST_LOG_STATUS_LABEL: Record<LogStatus, string> = {
  NOT_STARTED: "기록 전",
  IN_PROGRESS: "기록 중",
};

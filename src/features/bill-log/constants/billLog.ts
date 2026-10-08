import { BillSplitType } from "@/features/bill-log/types";

export const BILL_SPLIT_LABEL: Record<BillSplitType, string> = {
  EQUAL_SPLIT: "N분의 1",
  ITEM_TAG: "항목 태그",
  MANUAL: "금액 직접 입력",
}

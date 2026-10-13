import { BillSplitType } from "@/features/bill-log/types";

export const BILL_SPLIT_LABEL: Record<BillSplitType, string> = {
  ITEM_TAG: "항목 태그",
  EQUAL_SPLIT: "N분의 1",
  MANUAL: "금액 직접 입력",
};

export const SETTLEMENT_METHODS: { splitType: BillSplitType; label: string }[] =
  (Object.entries(BILL_SPLIT_LABEL) as [BillSplitType, string][]).map(([splitType, label]) => ({
    splitType,
    label,
  }));

import type { SelectOption } from "@/components/ui/SelectBox";

// TODO: 백엔드 스펙 확정 시 value를 은행 코드로 교체 (지금은 은행명 그대로)
const BANK_NAMES = [
  "카카오뱅크",
  "토스뱅크",
  "케이뱅크",
  "국민은행",
  "신한은행",
  "우리은행",
  "하나은행",
  "농협은행",
  "기업은행",
  "SC제일은행",
  "씨티은행",
  "새마을금고",
  "우체국",
  "수협은행",
  "부산은행",
  "대구은행",
  "광주은행",
  "전북은행",
  "경남은행",
  "제주은행",
  "산업은행",
];

export const BANK_OPTIONS: SelectOption[] = BANK_NAMES.map((name) => ({
  label: name,
  value: name,
}));

import type { SelectOption } from "@/components/ui/SelectBox";

const BANK_LIST = [
  { label: "한국산업은행", value: "KDB" },
  { label: "IBK기업은행", value: "IBK" },
  { label: "KB국민은행", value: "KB_KOOKMIN" },
  { label: "Sh수협은행", value: "SUHYUP" },
  { label: "NH농협은행", value: "NH_NONGHYUP_BANK" },
  { label: "지역 농·축협", value: "LOCAL_NONGHYUP" },
  { label: "우리은행", value: "WOORI" },
  { label: "SC제일은행", value: "SC_JEIL" },
  { label: "한국씨티은행", value: "CITI" },
  { label: "iM뱅크", value: "IM_BANK" },
  { label: "부산은행", value: "BUSAN" },
  { label: "광주은행", value: "GWANGJU" },
  { label: "제주은행", value: "JEJU" },
  { label: "전북은행", value: "JEONBUK" },
  { label: "경남은행", value: "GYEONGNAM" },
  { label: "새마을금고", value: "SAEMAUL" },
  { label: "신협", value: "SHINHYUP" },
  { label: "저축은행", value: "SAVINGS_BANK" },
  { label: "우체국", value: "POST_OFFICE" },
  { label: "하나은행", value: "HANA" },
  { label: "신한은행", value: "SHINHAN" },
  { label: "케이뱅크", value: "K_BANK" },
  { label: "카카오뱅크", value: "KAKAO_BANK" },
  { label: "토스뱅크", value: "TOSS_BANK" },
];

export const BANK_OPTIONS: SelectOption[] = BANK_LIST;

"use client";

import InputField from "@/components/ui/InputField";

interface AccountNumberFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AccountNumberField({
  value,
  onChange,
}: AccountNumberFieldProps) {
  return (
    <InputField
      label="계좌번호"
      labelClassName="pretendard-sb-16"
      value={value}
      onChange={onChange}
      placeholder="숫자만 입력"
    />
  );
}

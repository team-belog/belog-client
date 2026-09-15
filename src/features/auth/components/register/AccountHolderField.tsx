"use client";

import InputField from "@/components/ui/InputField";

interface AccountHolderFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AccountHolderField({
  value,
  onChange,
}: AccountHolderFieldProps) {
  return (
    <InputField
      label="예금주명"
      labelClassName="pretendard-sb-16"
      value={value}
      onChange={onChange}
      placeholder="계좌 실명"
    />
  );
}

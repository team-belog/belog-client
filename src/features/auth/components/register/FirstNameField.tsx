"use client";

import InputField from "@/components/ui/InputField";

interface FirstNameFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FirstNameField({ value, onChange }: FirstNameFieldProps) {
  return (
    <InputField
      label="이름"
      labelClassName="pretendard-sb-16"
      value={value}
      onChange={(value) => onChange(value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, ""))}
      placeholder="본명을 입력해주세요"
      required={true}
    />
  );
}
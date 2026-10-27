"use client";

import InputField from "@/components/ui/InputField";

interface LastNameFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function LastNameField({ value, onChange }: LastNameFieldProps) {
  return (
    <InputField
      label="성"
      labelClassName="pretendard-sb-16"
      value={value}
      onChange={(value) => onChange(value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, ""))}
      placeholder="본명을 입력해주세요"
      required={true}
    />
  );
}

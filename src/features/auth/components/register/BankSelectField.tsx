"use client";

import SelectBox from "@/components/ui/SelectBox";
import { BANK_OPTIONS } from "@/constants/banks";

interface BankSelectFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BankSelectField({ value, onChange }: BankSelectFieldProps) {
  return (
    <div className="mx-4 flex flex-col gap-[10px]">
      <p className="pretendard-sb-16 text-main-black">은행</p>
      <SelectBox
        value={value}
        onChange={onChange}
        options={BANK_OPTIONS}
        placeholder="은행 선택"
      />
    </div>
  );
}

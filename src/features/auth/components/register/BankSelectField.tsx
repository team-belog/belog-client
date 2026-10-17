"use client";

import SelectBox from "@/components/ui/SelectBox";
import { useGetBanks } from "@/features/auth/hooks/useGetBanks";

interface BankSelectFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BankSelectField({ value, onChange }: BankSelectFieldProps) {
  const { data: banks = [], isPending } = useGetBanks();
  const options = banks.map((bank) => ({ label: bank.displayName, value: bank.code }));

  return (
    <div className="mx-4 flex flex-col gap-[10px]">
      <p className="pretendard-sb-16 text-main-black">은행</p>
      <SelectBox
        value={value}
        onChange={onChange}
        options={options}
        placeholder="은행 선택"
        disabled={isPending}
      />
    </div>
  );
}

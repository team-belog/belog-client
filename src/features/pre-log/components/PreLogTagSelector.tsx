"use client";

import SelectableToggle from "@/features/bill-log/components/SelectableToggle";
import { PRE_LOG_TAG_OPTIONS } from "@/features/pre-log/constants/category";
import type { PreLogCategory } from "@/features/pre-log/types";

interface PreLogTagSelectorProps {
  value: PreLogCategory;
  onChange: (value: PreLogCategory) => void;
}

export default function PreLogTagSelector({ value, onChange }: PreLogTagSelectorProps) {
  return (
    <div className="mx-4 flex flex-col gap-[10px]">
      <p className="pretendard-sb-16 text-main-black">태그</p>
      <div className="flex flex-wrap gap-[14px]">
        {PRE_LOG_TAG_OPTIONS.map(({ key, label }) => (
          <SelectableToggle
            key={key}
            label={label}
            selected={value === key}
            onClick={() => onChange(key)}
          />
        ))}
      </div>
    </div>
  );
}

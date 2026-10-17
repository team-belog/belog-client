"use client";

import SelectableToggle from "@/features/bill-log/components/SelectableToggle";
import { PRE_LOG_TAG_OPTIONS } from "@/features/pre-log/constants/category";
import type { PreLogCategory } from "@/features/pre-log/types";

interface PreLogTagSelectorProps {
  value: PreLogCategory;
  onChange: (value: PreLogCategory) => void;
  // 상세보기에서는 선택된 태그만 보여줌
  readOnly?: boolean;
}

export default function PreLogTagSelector({
  value,
  onChange,
  readOnly = false,
}: PreLogTagSelectorProps) {
  const options = readOnly
    ? PRE_LOG_TAG_OPTIONS.filter(({ key }) => key === value)
    : PRE_LOG_TAG_OPTIONS;

  return (
    <div className="mx-4 flex flex-col gap-[10px]">
      <p className="pretendard-sb-16 text-main-black">태그</p>
      <div className="flex flex-wrap gap-[14px]">
        {options.map(({ key, label }) => (
          <SelectableToggle
            key={key}
            label={label}
            selected={value === key}
            onClick={() => {
              if (!readOnly) onChange(key);
            }}
          />
        ))}
      </div>
    </div>
  );
}

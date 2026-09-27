"use client";

import type { PreLogFilter } from "@/features/pre-log/types";

interface PreLogCategoryTabsProps {
  tabs: { key: PreLogFilter; label: string }[];
  activeKey: PreLogFilter;
  onChange: (key: PreLogFilter) => void;
}

export default function PreLogCategoryTabs({
  tabs,
  activeKey,
  onChange,
}: PreLogCategoryTabsProps) {
  return (
    <div className="mt-[9px] flex w-full items-center">
      {tabs.map(({ key, label }) => {
        const isActive = key === activeKey;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`pretendard-r-15 flex-1 whitespace-nowrap py-2 text-center ${
              isActive
                ? "border-b-2 border-main-black text-main-black"
                : "text-sub-gray-2"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

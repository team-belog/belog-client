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
    <div className="scrollbar-thin flex w-full items-center overflow-x-auto">
      {tabs.map(({ key, label }) => {
        const isActive = key === activeKey;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`pretendard-r-15 shrink-0 whitespace-nowrap px-5 py-2 ${
              isActive ? "border-b-2 border-main-black text-main-black" : "text-sub-gray-2"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

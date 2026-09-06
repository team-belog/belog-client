"use client";

interface TabBarProps {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export default function TabBar({ tabs, activeIndex, onChange }: TabBarProps) {
  return (
    <div className="flex w-full items-center">
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={tab}
            onClick={() => onChange(index)}
            className={`pretendard-sb-18 flex flex-1 items-center justify-center py-[18px] ${
              isActive
                ? "border-b-2 border-main-black text-main-black"
                : "border-b border-sub-gray-3 text-sub-gray-2"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

"use client";

interface SelectableToggleProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function SelectableToggle({ label, selected, onClick }: SelectableToggleProps) {
  return (
    <button
      onClick={onClick}
      className={`pretendard-r-15 inline-flex w-fit items-center justify-center rounded-[18px] px-[17px] py-[6px] whitespace-nowrap transition-colors ${
        selected
          ? "bg-main-mint text-main-white"
          : "border border-sub-gray-3 bg-sub-white text-main-black"
      }`}
    >
      {label}
    </button>
  );
}

"use client";

interface SelectableToggleProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  variant?: "main" | "sub";
}

const selectedStyles = {
  main: "bg-main-mint text-main-white",
  sub: "border border-main-mint bg-[#49D4B6]/10 text-main-mint font-semibold",
};

export default function SelectableToggle({ label, selected, onClick, variant = "main" }: SelectableToggleProps) {
  return (
    <button
      onClick={onClick}
      className={`pretendard-r-15 inline-flex w-fit items-center justify-center rounded-[18px] px-[17px] py-[6px] whitespace-nowrap transition-colors ${
        selected
          ? selectedStyles[variant]
          : "border border-sub-gray-3 bg-sub-white text-main-black"
      }`}
    >
      {label}
    </button>
  );
}

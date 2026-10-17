"use client";

interface ToggleProps {
  label: string;
  variant?: "filled" | "outlined" | "light";
  onClick?: () => void;
}

const variantStyles = {
  filled: "bg-main-mint text-main-white",
  outlined: "bg-sub-white border border-sub-gray-3 text-main-black",
  light: "bg-[#49D4B6]/10 border border-main-mint text-main-mint",
};

export default function Toggle({ label, variant = "filled", onClick }: ToggleProps) {
  return (
    <button
      onClick={onClick}
      className={`pretendard-r-15 inline-flex w-fit items-center justify-center rounded-[18px] px-[17px] py-[6px] whitespace-nowrap ${variantStyles[variant]}`}
    >
      {label}
    </button>
  );
}

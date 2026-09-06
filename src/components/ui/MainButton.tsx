"use client";

interface MainButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export default function MainButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: MainButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`pretendard-m-16 flex h-[58px] w-full items-center justify-center gap-[10px] rounded-[12px] p-[10px] text-main-white ${
        disabled ? "bg-sub-gray-3" : "bg-main-black"
      } ${className}`}
    >
      {children}
    </button>
  );
}

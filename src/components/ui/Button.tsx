"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  variant: "primary" | "secondary" | "tertiary";
  disabled: boolean;
  className?: string;
}

const variantStyles = {
  primary: "bg-main-black text-main-white pretendard-m-16",
  secondary: "bg-main-mint text-main-white pretendard-sb-16",
  tertiary:
    "bg-main-white text-main-black border border-sub-gray-3 pretendard-m-16",
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <div className={`w-full h-[114px] bg-white px-4 py-[28px] ${className}`}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`flex h-[58px] w-full items-center justify-center gap-2 rounded-[12px]  ${disabled ? "bg-sub-gray-3 text-main-white pretendard-sb-16" : variantStyles[variant]}`}
      >
        {children}
      </button>
    </div>
  );
}

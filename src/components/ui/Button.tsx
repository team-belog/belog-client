"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  variant: "primary" | "secondary";
  disabled: boolean;
  className?: string;
}

const variantStyles = {
  primary: "bg-main-black pretendard-m-16",
  secondary: "bg-main-mint pretendard-sb-16",
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
        className={`flex h-[58px] w-full items-center justify-center rounded-[12px] text-main-white ${disabled ? "bg-sub-gray-3 pretendard-sb-16" : variantStyles[variant]}`}
      >
        {children}
      </button>
    </div>
  );
}

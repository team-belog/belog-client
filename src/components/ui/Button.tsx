"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "light";
  disabled?: boolean;
  className?: string;
  bare?: boolean;
}

const variantStyles = {
  primary: "bg-main-black text-main-white pretendard-m-16",
  secondary: "bg-main-mint text-main-white pretendard-sb-16",
  light: "bg-[#F7F8F9] text-sub-gray-2 pretendard-m-16",
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  bare = false,
}: ButtonProps) {
  const baseClass = `flex h-[58px] items-center justify-center rounded-[12px] ${
    disabled ? "bg-sub-gray-3 text-main-white pretendard-sb-16" : variantStyles[variant]
  }`;

  if (bare) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClass} ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={`w-full h-[114px] bg-white px-4 py-[28px] ${className}`}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClass} w-full`}
      >
        {children}
      </button>
    </div>
  );
}

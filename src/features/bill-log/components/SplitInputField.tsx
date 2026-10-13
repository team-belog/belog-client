"use client";

interface InputItem {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
}

interface SplitInputFieldProps {
  left: InputItem;
  right: InputItem;
}

export default function SplitInputField({ left, right }: SplitInputFieldProps) {
  return (
    <div className="mx-4">
      <div className="flex h-[50px] w-full items-center rounded-[12px] bg-[#F7F8F9] px-[15px] hover:border hover:border-main-mint">
        <input
          type={left.type ?? "text"}
          value={left.value}
          onChange={(e) => left.onChange?.(e.target.value)}
          placeholder={left.placeholder}
          className="pretendard-m-15 min-w-0 flex-1 bg-transparent text-main-black placeholder:text-sub-gray-2 outline-none"
        />
        <div className="flex min-w-0 flex-1 items-center justify-end pl-[12px]">
          <input
            type={right.type ?? "text"}
            value={right.value}
            onChange={(e) => right.onChange?.(e.target.value)}
            placeholder={right.placeholder}
            className="pretendard-sb-15 min-w-0 bg-transparent text-right text-main-black placeholder:text-sub-gray-2 outline-none"
          />
          {right.value && <span className="pretendard-sb-15 text-main-black">원</span>}
        </div>
      </div>
    </div>
  );
}

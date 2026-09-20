"use client";

interface MeetupCharFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  required?: boolean;
}

export default function MeetupCharField({
  label,
  placeholder,
  value,
  onChange,
  maxLength,
  required = false,
}: MeetupCharFieldProps) {
  return (
    <div className="flex flex-col gap-[10px]">
      <p className="pretendard-sb-16 flex items-center gap-[2px] text-main-black">
        {label}
        {required && <span className="text-[#FF3B3B]">*</span>}
      </p>
      <div className="relative w-full">
        <input
          type="text"
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pretendard-m-15 h-[56px] w-full rounded-[12px] bg-main-cool-gray px-[15px] pr-[50px] text-main-black placeholder:text-sub-gray-2 outline-none focus:ring-1 focus:ring-main-mint"
        />
        <span className="pretendard-m-12 absolute bottom-[9px] right-[15px] text-sub-gray-2">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  labelClassName?: string;
  description?: string;
  errorMessage?: string;
  readOnly?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
  maxLength?: number;
}

export default function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  labelClassName = "pretendard-sb-18",
  description,
  errorMessage,
  readOnly = false,
  inputMode,
  required = false,
  maxLength,
}: InputFieldProps) {
  const hasCounter = maxLength !== undefined;
  const clearable = !hasCounter && !readOnly;

  return (
    <div className="mx-4 flex flex-col gap-[10px]">
      <p
        className={`${labelClassName} flex items-center gap-[2px] text-main-black`}
      >
        {label}
        {required && (
          <span className="text-[#FF3B3B]" aria-hidden="true">
            *
          </span>
        )}
      </p>
      {description && (
        <p className="pretendard-r-15 text-sub-gray-2">{description}</p>
      )}
      <div className="relative w-full">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          inputMode={inputMode}
          maxLength={maxLength}
          aria-required={required || undefined}
          aria-invalid={errorMessage ? true : undefined}
          className={`pretendard-m-15 h-[50px] w-full rounded-[12px] bg-[#F7F8F9] px-[15px] text-main-black placeholder:text-sub-gray-2 outline-none ${hasCounter ? "pr-[50px]" : ""} ${clearable ? "pr-[41px]" : ""} ${readOnly ? "" : "hover:border hover:border-main-mint"}`}
        />
        {hasCounter && (
          <span className="pretendard-m-12 absolute bottom-[9px] right-[15px] text-sub-gray-2">
            {value.length}/{maxLength}
          </span>
        )}
        {clearable && value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="입력 내용 지우기"
            className="absolute right-[15px] top-1/2 -translate-y-1/2"
          >
            <Image src="/icons/clear-input.svg" alt="" width={16} height={16} />
          </button>
        )}
      </div>
      {errorMessage && (
        <p className="pretendard-m-12 text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

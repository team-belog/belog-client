"use client";

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
}: InputFieldProps) {
  return (
    <div className="mx-4 flex flex-col gap-[10px]">
      <p className={`${labelClassName} text-main-black`}>{label}</p>
      {description && (
        <p className="pretendard-r-15 text-sub-gray-2">{description}</p>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        aria-invalid={errorMessage ? true : undefined}
        className={`pretendard-m-15 h-[50px] w-full rounded-[12px] bg-[#F7F8F9] px-[15px] text-main-black placeholder:text-sub-gray-2 outline-none ${readOnly ? "" : "hover:border hover:border-main-mint"}`}
      />
      {errorMessage && (
        <p className="pretendard-m-12 text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

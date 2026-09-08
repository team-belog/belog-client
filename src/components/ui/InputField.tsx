"use client";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

export default function InputField({ label, placeholder, value, onChange, type = "text" }: InputFieldProps) {
  return (
    <div className="mx-4 flex flex-col gap-[10px]">
      <p className="pretendard-sb-18 text-main-black">{label}</p>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pretendard-m-15 h-[50px] w-full rounded-[12px] bg-[#F7F8F9] px-[15px] text-sub-gray-2 placeholder:text-sub-gray-2 outline-none hover:border hover:border-main-mint"
      />
    </div>
  );
}

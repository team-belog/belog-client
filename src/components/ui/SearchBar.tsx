"use client";

import Image from "next/image";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "검색해 보세요",
}: SearchBarProps) {
  return (
    <label className="flex h-[50px] w-full items-center justify-between rounded-xl bg-main-cool-gray pl-5 pr-[18px]">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="검색"
        className="pretendard-r-15 w-full bg-transparent text-main-black placeholder:text-sub-gray-2 focus:outline-none"
      />
      <Image src="/icons/home/search.svg" alt="" width={20} height={20} />
    </label>
  );
}

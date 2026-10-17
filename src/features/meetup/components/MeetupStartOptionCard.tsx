"use client";

import Image from "next/image";
import ChevronIcon from "@/components/ui/ChevronIcon";

interface MeetupStartOptionCardProps {
  iconSrc: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export default function MeetupStartOptionCard({
  iconSrc,
  title,
  description,
  selected,
  onClick,
}: MeetupStartOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between px-4 py-[21px] ${
        selected ? "bg-main-mint/10" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-[10px]">
        <Image src={iconSrc} alt="" width={48} height={48} />
        <div className="flex flex-col items-start gap-[10px]">
          <p className="pretendard-sb-16 text-main-black">{title}</p>
          <p className="pretendard-m-14 text-sub-gray-2">{description}</p>
        </div>
      </div>
      <ChevronIcon
        width={20}
        height={20}
        className={selected ? "text-main-mint" : "text-main-black"}
      />
    </button>
  );
}

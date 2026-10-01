"use client";

import Image from "next/image";

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
      <Image
        src={
          selected
            ? "/icons/meetup/chevron-right-mint.svg"
            : "/icons/meetup/chevron-right-dark.svg"
        }
        alt=""
        width={16}
        height={20}
      />
    </button>
  );
}

"use client";

import Image from "next/image";

import BelogIcon from "@/components/ui/BelogIcon";
import type { Schedule } from "@/features/home/types";
import { formatMemoryDateRange } from "@/features/home/utils/meetup";

interface MeetupTicketCardProps {
  schedule: Schedule;
  onClick?: (schedule: Schedule) => void;
}

export default function MeetupTicketCard({ schedule, onClick }: MeetupTicketCardProps) {
  const { title, description, photoUrl, destinationCity, destinationCountry, memberHandles } = schedule;

  return (
    <button
      type="button"
      onClick={() => onClick?.(schedule)}
      className="flex w-full flex-col gap-2 rounded-2xl bg-main-white p-3 text-left shadow-[0_0_3px_rgba(0,0,0,0.2)]"
    >
      <div className="flex items-center justify-center gap-[2px]">
        <BelogIcon width={10} height={9} />
        <Image src="/icons/belog-wordmark.svg" alt="BELOG" width={42} height={9} />
      </div>

      <div className="relative aspect-[173/95] w-full overflow-hidden rounded-lg bg-main-cool-gray">
        {photoUrl && <Image src={photoUrl} alt="" fill className="object-cover" />}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-semibold text-main-black">{title}</p>
        <p className="line-clamp-2 whitespace-pre-line text-[7px] leading-[1.4] text-main-black">
          {description}
        </p>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[7px] text-sub-gray-2">Date</span>
          <span className="whitespace-nowrap text-[8px] text-main-black">
            {formatMemoryDateRange(schedule)}
          </span>
        </div>
        {(destinationCity || destinationCountry) && (
          <div className="flex flex-col gap-0.5">
            <span className="text-[7px] text-sub-gray-2">To</span>
            <span className="whitespace-nowrap text-[8px] text-main-black">
              {[destinationCity, destinationCountry].filter(Boolean).join(" | ")}
            </span>
          </div>
        )}
      </div>

      {memberHandles && memberHandles.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-[7px] text-sub-gray-2">Member</span>
          <div className="flex flex-wrap gap-[3px]">
            {memberHandles.map((handle) => (
              <span
                key={handle}
                className="whitespace-nowrap rounded-sm bg-[rgba(233,233,233,0.7)] px-[4px] py-[2px] text-[7px] text-main-black"
              >
                {handle}
              </span>
            ))}
          </div>
        </div>
      )}
    </button>
  );
}

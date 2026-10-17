"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import BelogIcon from "@/components/ui/BelogIcon";
import type { PostLogTicketDetail } from "@/features/post-log/types";

const CORNER_RADIUS = 21.5;
const NOTCH_RADIUS = 9;
const NOTCH_COUNT = 7;

function buildPath(width: number, height: number): string {
  const cr = CORNER_RADIUS;
  const nr = NOTCH_RADIUS;

  const available = width - 2 * cr;
  const totalGap = available - NOTCH_COUNT * 2 * nr;
  const gap = totalGap / (NOTCH_COUNT + 1);
  const centers = Array.from({ length: NOTCH_COUNT }, (_, i) =>
    cr + gap + nr + i * (2 * nr + gap)
  );

  const arc = (r: number, x: number, y: number) => `A ${r} ${r} 0 0 0 ${x} ${y}`;
  const parts: string[] = [`M ${cr} 0`];

  for (const cx of centers) {
    parts.push(`L ${cx - nr} 0`, arc(nr, cx + nr, 0));
  }
  parts.push(`L ${width - cr} 0`, arc(cr, width, cr));
  parts.push(`L ${width} ${height - cr}`);
  parts.push(arc(cr, width - cr, height));
  for (const cx of [...centers].reverse()) {
    parts.push(`L ${cx + nr} ${height}`, arc(nr, cx - nr, height));
  }
  parts.push(`L ${cr} ${height}`, arc(cr, 0, height - cr));
  parts.push(`L 0 ${cr}`);
  parts.push(arc(cr, cr, 0));
  parts.push("Z");
  return parts.join(" ");
}

interface PostLogTicketCardProps {
  ticket: PostLogTicketDetail;
}

export default function PostLogTicketCard({ ticket }: PostLogTicketCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[565px] drop-shadow-[0_0_5px_rgba(0,0,0,0.15)]"
    >
      {size.width > 0 && size.height > 0 && (
        <svg
          aria-hidden
          className="absolute inset-0"
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
        >
          <path d={buildPath(size.width, size.height)} fill="white" />
        </svg>
      )}
      <div className="relative flex flex-col h-full py-5">
        <div className="flex min-h-[36px] items-center justify-center gap-[3px] px-4">
          <BelogIcon width={14} height={12} />
          <Image src="/icons/belog-wordmark.svg" alt="BELOG" width={58} height={12} />
        </div>

        <div className="mt-[5px] relative w-full h-[169px] overflow-hidden bg-main-cool-gray shrink-0">
          {ticket.coverPhotoUrl && (
            <Image src={ticket.coverPhotoUrl} alt="" fill className="object-cover" />
          )}
        </div>

        <div className="mt-5 flex flex-col px-4">
          <p className="text-[18px] font-semibold text-main-black">{ticket.meetingName}</p>
          {ticket.memory && (
            <p className="mt-4 pt-sans-narrow-regular text-[12px] leading-[20px] text-main-black line-clamp-2 whitespace-pre-line">
              {ticket.memory}
            </p>
          )}
        </div>

        <div className="mt-[30px] flex items-start px-4">
          <div className="flex w-1/2 flex-col gap-[10px]">
            <span className="text-[12px] font-medium text-main-black">Date</span>
            <span className="pt-sans-narrow-regular text-[15px] leading-[22px] text-main-black">
              {ticket.startDate === ticket.endDate
                ? ticket.startDate
                : `${ticket.startDate} - ${ticket.endDate}`}
            </span>
          </div>
          {ticket.location && (
            <div className="flex w-1/2 flex-col gap-[10px]">
              <span className="text-[12px] font-medium text-main-black">Location</span>
              <span className="pt-sans-narrow-regular text-[15px] leading-[22px] text-main-black">{ticket.location}</span>
            </div>
          )}
        </div>

        {ticket.members.length > 0 && (
          <div className="mt-[30px] flex flex-col gap-[10px] px-4">
            <span className="text-[12px] font-medium text-main-black">Member</span>
            <div className="flex flex-wrap gap-[5px]">
              {ticket.members.map((m) => (
                <span
                  key={m.groupMemberId}
                  className="pt-sans-narrow-regular whitespace-nowrap rounded-[5px] bg-[#F7F8F9] px-2 py-[5px] text-[12px] text-sub-gray-2"
                >
                  @{m.nickname}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

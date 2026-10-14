"use client";

import Image from "next/image";

import BelogIcon from "@/components/ui/BelogIcon";
import PostLogTicketShape from "@/features/post-log/components/PostLogTicketShape";
import type { PostLogTicketDetail } from "@/features/post-log/types";

interface PostLogTicketCardProps {
  ticket: PostLogTicketDetail;
}

export default function PostLogTicketCard({ ticket }: PostLogTicketCardProps) {
  return (
    <PostLogTicketShape className="w-full h-[565px]">
      <div className="flex flex-col h-full py-5 gap-3">
        <div className="flex items-center justify-center gap-[3px] px-4">
          <BelogIcon width={14} height={12} />
          <Image src="/icons/belog-wordmark.svg" alt="BELOG" width={58} height={12} />
        </div>

        <div className="relative w-full h-[220px] overflow-hidden rounded-xl bg-main-cool-gray shrink-0">
          {ticket.coverPhotoUrl && (
            <Image src={ticket.coverPhotoUrl} alt="" fill className="object-cover" />
          )}
        </div>

        <div className="flex flex-col gap-1 px-4">
          <p className="text-[18px] font-semibold text-main-black">{ticket.meetingName}</p>
          {ticket.memory && (
            <p className="text-[12px] leading-[1.5] text-main-black line-clamp-2 whitespace-pre-line">
              {ticket.memory}
            </p>
          )}
        </div>

        <div className="flex items-start gap-5 px-4">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-sub-gray-2">Date</span>
            <span className="text-[12px] text-main-black">
              {ticket.startDate} - {ticket.endDate}
            </span>
          </div>
          {ticket.location && (
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-sub-gray-2">To</span>
              <span className="text-[12px] text-main-black">{ticket.location}</span>
            </div>
          )}
        </div>

        {ticket.members.length > 0 && (
          <div className="flex flex-col gap-1 px-4">
            <span className="text-[11px] text-sub-gray-2">Member</span>
            <div className="flex flex-wrap gap-[5px]">
              {ticket.members.map((m) => (
                <span
                  key={m.groupMemberId}
                  className="whitespace-nowrap rounded-sm bg-[rgba(233,233,233,0.7)] px-2 py-1 text-[11px] text-main-black"
                >
                  {m.nickname}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </PostLogTicketShape>
  );
}

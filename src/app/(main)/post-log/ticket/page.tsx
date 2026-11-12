"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import PostLogTicketCard from "@/features/post-log/components/PostLogTicketCard";

import { useGetPostLogTicket } from "@/features/post-log/hooks/useGetPostLogTicket";
import { drawTicketToCanvas } from "@/features/post-log/utils/drawTicketCanvas";
import { track } from "@/lib/amplitude";

function TicketContent() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticketId") ? Number(searchParams.get("ticketId")) : null;

  const { data: ticket, isLoading } = useGetPostLogTicket(ticketId);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (ticket) {
      track("Postlog Ticket Viewed", { ticket_id: String(ticket.ticketId) });
    }
  }, [ticket]);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: ticket?.meetingName ?? "빌로그 티켓",
        text: "빌로그 티켓을 공유합니다",
        url: window.location.href,
      });
    }
  };

  const handleSave = async () => {
    if (!ticket || isSaving) return;
    setIsSaving(true);
    try {
      const blob = await drawTicketToCanvas(ticket);
      const file = new File([blob], "ticket.png", { type: "image/png" });

      const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);
      if (isMobile && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "ticket.png";
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      const isAbort = err instanceof Error && (err.name === "AbortError" || err.message.includes("cancel"));
      if (!isAbort) console.error("[handleSave]", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-dvh">로딩 중...</div>;

  return (
    <main className="flex h-dvh flex-col">
      <BackHeader title="티켓" onShare={handleShare} />
      <Divider />
      <div className="mt-[102px] flex items-center justify-center px-[42px] pb-[80px]">
        {ticket && (
          <div className="w-full">
            <PostLogTicketCard ticket={ticket} />
          </div>
        )}
      </div>
      <Button variant="primary" onClick={handleSave} disabled={isSaving} className="fixed bottom-0">
        {isSaving ? "저장 중..." : "갤러리에 저장"}
      </Button>
    </main>
  );
}

export default function TicketPage() {
  return (
    <Suspense>
      <TicketContent />
    </Suspense>
  );
}

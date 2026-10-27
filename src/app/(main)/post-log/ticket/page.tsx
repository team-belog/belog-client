"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import PostLogTicketCard from "@/features/post-log/components/PostLogTicketCard";

import { useGetPostLogTicket } from "@/features/post-log/hooks/useGetPostLogTicket";
import domtoimage from "dom-to-image-more";

function TicketContent() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticketId") ? Number(searchParams.get("ticketId")) : null;

  const { data: ticket, isLoading } = useGetPostLogTicket(ticketId);

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
    const el = document.getElementById("ticket");
    if (!el) return;
    try {
      const dataUrl = await domtoimage.toPng(el, { scale: 2 });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], "ticket.png", { type: "image/png" });

      // iOS PWA: Web Share API로 공유 시트 열기 → "사진 저장"으로 갤러리에 저장
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
        return;
      }

      // 데스크톱 fallback
      const link = document.createElement("a");
      link.download = "ticket.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // 사용자가 공유 취소하거나 오류 발생 시 무시
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-dvh">로딩 중...</div>;

  return (
    <main className="flex h-dvh flex-col pt-[60px]">
      <BackHeader title="티켓" onShare={handleShare} />
      <Divider />
      <div className="mt-[34px] flex items-center justify-center px-[42px]">
        {ticket && (
          <div id="ticket" className="w-full">
            <PostLogTicketCard ticket={ticket} />
          </div>
        )}
      </div>
      <Button variant="primary" disabled={false} onClick={handleSave} className="fixed bottom-0">
        갤러리에 저장
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

"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import PostLogTicketCard from "@/features/post-log/components/PostLogTicketCard";

import { useGetPostLogTicket } from "@/features/post-log/hooks/useGetPostLogTicket";
import domtoimage from "dom-to-image-more";
import { track } from "@/lib/amplitude";

function TicketContent() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticketId") ? Number(searchParams.get("ticketId")) : null;

  const { data: ticket, isLoading } = useGetPostLogTicket(ticketId);

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
    const el = document.getElementById("ticket");
    if (!el) return;
    try {
      // 외부 이미지(S3 등)를 base64로 변환해서 CORS 문제 없이 캡처
      const imgs = Array.from(el.querySelectorAll("img"));
      const originalSrcs = imgs.map((img) => img.src);
      await Promise.all(
        imgs.map(async (img) => {
          try {
            const res = await fetch(img.src, { mode: "cors" });
            const blob = await res.blob();
            const base64 = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });
            img.src = base64;
          } catch {
            // CORS 실패 시 원본 유지
          }
        })
      );
      const dataUrl = await domtoimage.toPng(el, { scale: 2 });
      // 원본 src 복원
      imgs.forEach((img, i) => { img.src = originalSrcs[i]; });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], "ticket.png", { type: "image/png" });

      // iOS PWA: Web Share API로 공유 시트 열기 → "사진 저장"으로 갤러리에 저장
      const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);
      if (isMobile && navigator.canShare?.({ files: [file] })) {
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

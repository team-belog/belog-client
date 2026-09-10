"use client";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";

export default function TicketPage() {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "1박 2일 광주 여행",
        text: "빌로그 티켓을 공유합니다",
        url: window.location.href,
      });
    }
  };

  return (
    <main className="flex h-dvh flex-col">
      <BackHeader title="티켓" onShare={handleShare} />
      <Divider />
      {/* 티켓 컴포넌트 */}
      <Button variant="primary" disabled={false} className="fixed bottom-0">
        갤러리에 저장
      </Button>
    </main>
  );
}

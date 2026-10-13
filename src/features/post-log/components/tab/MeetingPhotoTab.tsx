"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/Button";
import GuideField from "@/components/ui/GuideField";
import TimePhotoGroup from "../TimePhotoGroup";
import { useGetPostLogPhotoList } from "@/features/post-log/hooks/useGetPostLogPhotoList"
import { PostLogPhoto } from "../../types";

function groupByTime(photos: PostLogPhoto[]) {
  const map: Record<string, PostLogPhoto[]> = {};
  for (const photo of photos) {
    const time = new Date(photo.capturedAt).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    if (!map[time]) map[time] = [];
    map[time].push(photo);
  }
  return Object.entries(map).map(([time, photos]) => ({ time, photos }));
}

export default function MeetingPhotoTab() {
  const searchParams = useSearchParams();
  const meetingId = Number(searchParams.get("meetingId"))
  const router = useRouter();
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetPostLogPhotoList(meetingId);
  const allPhotos = data?.pages.flatMap((page) => page.items ?? []) ?? [];
  const photoGroups = groupByTime(allPhotos);

  useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleLike = (id: number) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  if (isLoading) return <div className="flex items-center justify-center h-dvh">로딩 중...</div>;

  return (
    <>
      <GuideField message="가장 좋아요가 많은 사진이 티켓의 대표 사진으로 설정돼요" />
      <div className="mt-4 flex flex-col gap-[24px] px-4 pb-[114px]">
        {photoGroups.map((group) => (
          <TimePhotoGroup
            key={group.time}
            time={group.time}
            photos={group.photos.map((p) => ({
              id: p.photoId,
              src: p.photoUrl,
              likeCount: likedIds.includes(p.photoId) ? p.likeCount + 1 : p.likeCount,
            }))}
            onLike={handleLike}
            onClick={() => router.push(`/post-log/1`)}
          />
        ))}
        <div ref={bottomRef} className="h-1" />
        {isFetchingNextPage && (
          <div className="flex justify-center py-4 text-sm text-sub-gray-2">불러오는 중...</div>
        )}
      </div>
      <Button variant="primary" disabled={false} onClick={() => {}} className="fixed bottom-0 left-0 right-0 bg-white">
        사진 추가
      </Button>
    </>
  );
}

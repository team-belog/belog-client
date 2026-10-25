"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/Button";
import GuideField from "@/components/ui/GuideField";
import TimePhotoGroup from "../TimePhotoGroup";
import { useGetPostLogPhotoList } from "@/features/post-log/hooks/useGetPostLogPhotoList";
import { useUploadPostLogPhotos } from "@/features/post-log/hooks/useUploadPostLogPhotos";
import { PostLogPhoto } from "@/features/post-log/types/index"
import { useLikePhoto } from "@/features/post-log/hooks/useLikePhoto"
import { useUnlikePhoto } from "../../hooks/useUnLikePhoto";

function formatDayLabel(dayNumber: number, date: string) {
  const num = dayNumber >= 0 ? String(dayNumber).padStart(2, "0") : String(dayNumber);
  const [year, month, day] = date.split("-");
  return `Day${num} (${year.slice(2)}.${month}.${day})`;
}

function groupByTime(photos: PostLogPhoto[]) {
  const map: Record<string, PostLogPhoto[]> = {};
  for (const photo of photos) {
    const date = new Date(photo.capturedAt);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = date.getMinutes() < 30 ? "00" : "30";
    const time = `${hours}:${minutes}`;
    if (!map[time]) map[time] = [];
    map[time].push(photo);
  }
  return Object.entries(map).map(([time, photos]) => ({ time, photos }));
}

export default function MeetingPhotoTab() {
  const searchParams = useSearchParams();
  const meetingId = Number(searchParams.get("meetingId"))
  const router = useRouter();

  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadPhotos, isPending: isUploading } = useUploadPostLogPhotos(meetingId);
  const { mutate: like } = useLikePhoto(meetingId);
  const { mutate: unlike } = useUnlikePhoto(meetingId);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetPostLogPhotoList(meetingId);

  const mergedDays = (() => {
    const map = new Map<number, { dayNumber: number; date: string; photos: PostLogPhoto[] }>();
    data?.pages.forEach((page) => {
      page.days.forEach((day) => {
        const existing = map.get(day.dayNumber);
        if (existing) {
          existing.photos.push(...day.photos);
        } else {
          map.set(day.dayNumber, { ...day, photos: [...day.photos] });
        }
      });
    });
    return Array.from(map.values()).sort((a, b) => a.dayNumber - b.dayNumber);
  })();

  const allPhotos = mergedDays.flatMap((day) => day.photos);

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

  const handleLike = (photoId: number) => {
    const photo = allPhotos.find((p) => p.photoId === photoId);
    if (!photo) return;
    photo.likedByMe ? unlike(photoId) : like(photoId);
  };

  if (isLoading) return <div className="flex items-center justify-center h-dvh">로딩 중...</div>;

  return (
    <>
      <GuideField message="가장 좋아요가 많은 사진이 티켓의 대표 사진으로 설정돼요" />
      <div className="mt-4 flex flex-col gap-[24px] px-4 pb-[114px]">
        {mergedDays.map((day) => {
          const timeGroups = groupByTime(day.photos);
          return (
            <div key={day.dayNumber} className="flex flex-col gap-[16px]">
              <p className="pretendard-sb-16 text-main-black">{formatDayLabel(day.dayNumber, day.date)}</p>
              {timeGroups.map((group) => (
                <TimePhotoGroup
                  key={group.time}
                  time={group.time}
                  photos={group.photos.map((p) => ({
                    id: p.photoId,
                    src: p.photoUrl,
                    likeCount: p.likeCount,
                    likedByMe: p.likedByMe,
                  }))}
                  onLike={handleLike}
                  onClick={(id) => {
                    const photo = allPhotos.find((p) => p.photoId === id);
                    if (photo) router.push(`/post-log/${id}?photoUrl=${encodeURIComponent(photo.photoUrl)}`);
                  }}
                />
              ))}
            </div>
          );
        })}
        <div ref={bottomRef} className="h-1" />
        {isFetchingNextPage && (
          <div className="flex justify-center py-4 text-sm text-sub-gray-2">불러오는 중...</div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        hidden
        ref={fileInputRef}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length > 0) uploadPhotos(files);
          e.target.value = "";
        }}
      />
      <Button variant="primary" disabled={isUploading} onClick={() => fileInputRef.current?.click()} className="fixed bottom-0 left-0 right-0 bg-white">
        {isUploading ? "업로드 중..." : "사진 추가"}
      </Button>
    </>
  );
}

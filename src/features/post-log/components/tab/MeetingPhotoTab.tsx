"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import GuideField from "@/components/ui/GuideField";
import TimePhotoGroup from "../TimePhotoGroup";
import { DUMMY_PHOTO_GROUPS } from "@/features/post-log/constants/dummy";

export default function MeetingPhotoTab() {
  const router = useRouter();
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const handleLike = (id: number) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  return (
    <>
      <GuideField message="가장 좋아요가 많은 사진이 티켓의 대표 사진으로 설정돼요" />
      <div className="mt-4 flex flex-col gap-[24px] px-4 pb-[114px]">
        {DUMMY_PHOTO_GROUPS.map((group) => (
          <TimePhotoGroup
            key={group.time}
            time={group.time}
            photos={group.photos.map((p) => ({
              ...p,
              likeCount: likedIds.includes(p.id) ? (p.likeCount ?? 0) + 1 : p.likeCount,
            }))}
            onLike={handleLike}
            onClick={() => router.push(`/post-log/1`)}
          />
        ))}
      </div>
      <Button variant="primary" disabled={false} onClick={() => {}} className="fixed bottom-0 left-0 right-0 bg-white">
        사진 추가
      </Button>
    </>
  );
}

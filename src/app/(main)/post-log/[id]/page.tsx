"use client";

import Image from "next/image";
import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useDeletePhoto } from "@/features/post-log/hooks/useDeletePhoto";
import PostLogLikeButton from "@/features/post-log/components/PostLogLikeButton";
import { useLikePhoto } from "@/features/post-log/hooks/useLikePhoto";
import { useUnlikePhoto } from "@/features/post-log/hooks/useUnLikePhoto";

export default function PostLogPhotoPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const photoId = Number(id);
  const photoUrl = searchParams.get("photoUrl");
  const meetingId = Number(searchParams.get("meetingId"));

  const [likedByMe, setLikedByMe] = useState(searchParams.get("likedByMe") === "true");
  const [likeCount, setLikeCount] = useState(Number(searchParams.get("likeCount") ?? 0));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deletePhoto, isPending: isDeleting } = useDeletePhoto(meetingId);
  const { mutate: like } = useLikePhoto(meetingId);
  const { mutate: unlike } = useUnlikePhoto(meetingId);

  const handleLike = () => {
    if (likedByMe) {
      unlike(photoId, {
        onSuccess: (data) => { setLikedByMe(data.likedByMe); setLikeCount(data.likeCount); },
      });
    } else {
      like(photoId, {
        onSuccess: (data) => { setLikedByMe(data.likedByMe); setLikeCount(data.likeCount); },
      });
    }
  };

  const handleSave = async () => {
    if (!photoUrl) return;
    try {
      const response = await fetch(photoUrl);
      if (!response.ok) return;
      const blob = await response.blob();
      const ext = blob.type.includes("png") ? "png" : blob.type.includes("webp") ? "webp" : "jpg";
      const fileName = `photo.${ext}`;
      const file = new File([blob], fileName, { type: blob.type });

      const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);
      if (isMobile && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
        return;
      }

      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    } catch {
      // 사용자가 공유 취소하거나 오류 발생 시 무시
    }
  };

  const handleConfirmDelete = () => {
    deletePhoto(photoId, {
      onSuccess: () => {
        setIsModalOpen(false);
        router.back();
      },
    });
  };

  return (
    <main className="flex h-dvh flex-col pt-[60px]">
      <BackHeader title="Post-log" />
      <Divider />
      <div className="flex flex-1 items-center justify-center">
        <div className="relative aspect-square w-full">
          {photoUrl && (
            <Image src={photoUrl} alt="사진" fill className="object-cover" />
          )}
          <div className="absolute bottom-[18px] right-[16px]">
            <PostLogLikeButton likeCount={likeCount} likedByMe={likedByMe} onLike={handleLike} />
          </div>
        </div>
      </div>
      <div className="flex gap-[8px] px-4 pb-4">
        <Button bare variant="light"
          disabled={isDeleting}
          onClick={() => setIsModalOpen(true)}
          className="w-[114px] shrink-0 border border-[#CDD3DE] bg-sub-white text-main-black disabled:bg-sub-gray-3 disabled:text-main-white">
          삭제
        </Button>
        <Button bare variant="primary"
          disabled={!photoUrl}
          onClick={handleSave}
          className="flex-1">
          갤러리에 저장
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        message="사진을 삭제하시겠습니까?"
        confirmLabel="삭제"
        confirmVariant="primary"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </main>
  );
}

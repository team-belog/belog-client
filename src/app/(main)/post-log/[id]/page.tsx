"use client";

import Image from "next/image";
import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useDeletePhoto } from "@/features/post-log/hooks/useDeletePhoto";

export default function PostLogPhotoPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const photoId = Number(id);
  const photoUrl = searchParams.get("photoUrl");
  const meetingId = Number(searchParams.get("meetingId"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deletePhoto, isPending: isDeleting } = useDeletePhoto(meetingId);

  const handleSave = async () => {
    if (!photoUrl) return;
    const response = await fetch(photoUrl);
    if (!response.ok) return;
    const blob = await response.blob();
    const ext = blob.type.includes("png") ? "png" : blob.type.includes("webp") ? "webp" : "jpg";
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `photo.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
    <main className="flex h-dvh flex-col">
      <BackHeader title="Post-log" />
      <Divider />
      <div className="flex flex-1 items-center justify-center">
        <div className="relative aspect-square w-full">
          {photoUrl && (
            <Image src={photoUrl} alt="사진" fill className="object-cover" />
          )}
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

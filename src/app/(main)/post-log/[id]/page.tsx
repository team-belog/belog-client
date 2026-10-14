"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";

export default function PostLogPhotoPage() {
  const searchParams = useSearchParams();
  const photoUrl = searchParams.get("photoUrl");

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
      
      <Button variant="primary" disabled={!photoUrl} onClick={handleSave}>
        갤러리에 저장
      </Button>
    </main>
  );
}

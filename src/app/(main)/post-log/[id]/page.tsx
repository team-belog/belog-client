"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";

export default function PostLogPhotoPage() {
  const searchParams = useSearchParams();
  const photoUrl = searchParams.get("photoUrl");

  const handleSave = () => {
    if (!photoUrl) return;
    const link = document.createElement("a");
    link.href = photoUrl;
    link.download = "photo.jpg";
    link.click();
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

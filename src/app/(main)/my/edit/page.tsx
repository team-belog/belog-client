"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import NicknameField, { NicknameStatus } from "@/features/auth/components/register/NicknameField";
import { DUMMY_PROFILE } from "@/features/my/constants/dummy";

export default function ProfileEditPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState(DUMMY_PROFILE.name);
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>("idle");
  const [previewUrl, setPreviewUrl] = useState(DUMMY_PROFILE.profileImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  return (
    <main className="flex flex-col">
      <BackHeader title="프로필 수정" />
      <Divider />
      <div className="flex flex-col items-center gap-5 py-[30px]">
        <div className="relative size-[101px] overflow-hidden rounded-full">
          <Image src={previewUrl} alt="프로필 이미지" fill className="object-cover" />
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        <button onClick={() => fileInputRef.current?.click()}>
          <p className="pretendard-m-15 text-main-black">프로필 사진 바꾸기</p>
        </button>
      </div>
      <NicknameField value={nickname} onChange={setNickname} onStatusChange={setNicknameStatus} />
      <Button className="fixed bottom-0" variant="primary" disabled={nicknameStatus !== "available"} onClick={() => router.back()}>
        저장하기
      </Button>
    </main>
  );
}

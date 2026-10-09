"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import NicknameField, { NicknameStatus } from "@/features/auth/components/register/NicknameField";
import { useGetMyProfile } from "@/features/my/hooks/useGetMyProfile";
import { useUpdateMyProfile } from "@/features/my/hooks/useUpdateMyProfile";
import { useGetProfileImageUploadUrl } from "@/features/auth/hooks/useGetProfileImageUploadUrl";

export default function ProfileEditPage() {
  const router = useRouter();
  const { data: profile } = useGetMyProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateMyProfile();
  const { mutate: getUploadUrl, isPending: isUploading } = useGetProfileImageUploadUrl();

  const [nickname, setNickname] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setNickname(profile.nickname);
      setPreviewUrl(profile.profileImageUrl);
    }
  }, [profile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const isPending = isUpdating || isUploading;

  const submitUpdate = (profileImageObjectKey?: string) => {
    updateProfile(
      {
        nickname,
        ...(profileImageObjectKey
          ? { profileImageObjectKey, profileImageType: "CUSTOM" }
          : {}),
      },
      { onSuccess: () => router.back() }
    );
  };

  const handleSave = () => {
    if (selectedFile) {
      getUploadUrl(
        { contentType: selectedFile.type, fileSize: selectedFile.size },
        {
          onSuccess: async (uploadData) => {
            await fetch(uploadData.uploadUrl, {
              method: "PUT",
              headers: {
                "Content-Type": selectedFile.type,
                "Content-Length": String(selectedFile.size),
              },
              body: selectedFile,
            });
            submitUpdate(uploadData.objectKey);
          },
        }
      );
    } else {
      submitUpdate();
    }
  };

  return (
    <main className="flex flex-col">
      <BackHeader title="프로필 수정" />
      <Divider />
      <div className="flex flex-col items-center gap-5 py-[30px]">
        <div className="relative size-[101px] overflow-hidden rounded-full">
          <Image
            src={previewUrl || "/icons/default-profile.svg"}
            alt="프로필 이미지"
            fill
            className="object-cover"
          />
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        <button onClick={() => fileInputRef.current?.click()}>
          <p className="pretendard-m-15 text-main-black">프로필 사진 바꾸기</p>
        </button>
      </div>
      <NicknameField value={nickname} onChange={setNickname} onStatusChange={setNicknameStatus} />
      <Button
        className="fixed bottom-0"
        variant="primary"
        disabled={(nicknameStatus !== "available" && !selectedFile) || isPending}
        onClick={handleSave}
      >
        {isPending ? "저장 중..." : "저장하기"}
      </Button>
    </main>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import NicknameField, { NicknameStatus } from "@/features/auth/components/register/NicknameField";
import BankSelectField from "@/features/auth/components/register/BankSelectField";
import AccountNumberField from "@/features/auth/components/register/AccountNumberField";
import AccountHolderField from "@/features/auth/components/register/AccountHolderField";
import { useGetMyProfile } from "@/features/my/hooks/useGetMyProfile";
import { useUpdateMyProfile } from "@/features/my/hooks/useUpdateMyProfile";
import { useGetProfileImageUploadUrl } from "@/features/auth/hooks/useGetProfileImageUploadUrl";
import { useGetMyBankAccount } from "@/features/my/hooks/useGetMyBankAccount";
import { useUpdateMyBankAccount } from "@/features/my/hooks/useUpdateMyBankAccount";
import type { BankCode } from "@/features/auth/types";

export default function ProfileEditPage() {
  const router = useRouter();
  const { data: profile } = useGetMyProfile();
  const { data: bankAccount } = useGetMyBankAccount();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateMyProfile();
  const { mutate: updateBankAccount, isPending: isBankUpdating } = useUpdateMyBankAccount();
  const { mutate: getUploadUrl, isPending: isUploading } = useGetProfileImageUploadUrl();

  const [nickname, setNickname] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setNickname(profile.nickname);
      setPreviewUrl(profile.profileImageUrl);
    }
  }, [profile]);

  useEffect(() => {
    if (bankAccount) {
      setBank(bankAccount.bankCode);
      setAccountNumber(bankAccount.accountNumber);
      setAccountHolder(bankAccount.accountHolderName);
    }
  }, [bankAccount]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const isPending = isUpdating || isUploading || isBankUpdating;

  const bankChanged =
    bank !== (bankAccount?.bankCode ?? "") ||
    accountNumber !== (bankAccount?.accountNumber ?? "") ||
    accountHolder !== (bankAccount?.accountHolderName ?? "");

  const submitUpdate = (profileImageObjectKey?: string) => {
    updateProfile(
      {
        nickname,
        ...(profileImageObjectKey
          ? { profileImageObjectKey, profileImageType: "CUSTOM" }
          : {}),
      },
      {
        onSuccess: () => {
          updateBankAccount(
            { bankCode: bank as BankCode, accountNumber, accountHolderName: accountHolder },
            { onSuccess: () => router.back() }
          );
        },
      }
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
      <div className="mt-[30px] flex flex-col gap-[20px] pb-[114px]">
        <p className="mx-4 pretendard-sb-16 text-main-black">정산받을 계좌</p>
        <div className="flex flex-col gap-[30px]">
          <BankSelectField value={bank} onChange={setBank} />
          <AccountNumberField value={accountNumber} onChange={setAccountNumber} />
          <AccountHolderField value={accountHolder} onChange={setAccountHolder} />
        </div>
      </div>
      <Button
        className="fixed bottom-0"
        variant="primary"
        disabled={(nicknameStatus !== "available" && !selectedFile && !bankChanged) || isPending}
        onClick={handleSave}
      >
        {isPending ? "저장 중..." : "저장하기"}
      </Button>
    </main>
  );
}

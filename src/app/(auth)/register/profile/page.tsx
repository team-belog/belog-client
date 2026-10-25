"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import NicknameField, {
  type NicknameStatus,
} from "@/features/auth/components/register/NicknameField";
import FamilyNameField from "@/features/auth/components/register/FamilyNameField";
import FirstNameField from "@/features/auth/components/register/FirstNameField";
import ProfileImagePicker from "@/features/auth/components/register/ProfileImagePicker";
import BankSelectField from "@/features/auth/components/register/BankSelectField";
import AccountNumberField from "@/features/auth/components/register/AccountNumberField";
import Button from "@/components/ui/Button";
import { useCompleteOnboarding } from "@/features/auth/hooks/useCompleteOnboarding";
import { useGetProfileImageUploadUrl } from "@/features/auth/hooks/useGetProfileImageUploadUrl";
import type { BankCode } from "@/features/auth/types";
import { markTutorialPending } from "@/features/onboarding/utils/tutorialStorage";

export default function RegisterProfilePage() {
  const router = useRouter();
  const { mutate: completeOnboarding, isPending: isOnboardingPending } =
    useCompleteOnboarding();
  const { mutate: getUploadUrl, isPending: isUploadPending } =
    useGetProfileImageUploadUrl();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>("idle");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const isPending = isOnboardingPending || isUploadPending;

  const submitOnboarding = (profileImageObjectKey?: string) => {
    completeOnboarding(
      {
        nickname,
        name,
        bankCode: bank as BankCode,
        accountNumber,
        profileImageObjectKey,
      },
      {
        onSuccess: () => {
          markTutorialPending();
          router.replace("/");
        },
      },
    );
  };

  const handleSubmit = () => {
    if (profileImage) {
      getUploadUrl(
        { contentType: profileImage.type, fileSize: profileImage.size },
        {
          onSuccess: async (uploadData) => {
            await fetch(uploadData.uploadUrl, {
              method: "PUT",
              headers: {
                "Content-Type": profileImage.type,
                "Content-Length": String(profileImage.size),
              },
              body: profileImage,
            });
            submitOnboarding(uploadData.objectKey);
          },
        },
      );
    } else {
      submitOnboarding();
    }
  };

  return (
    <main className="pb-[114px]">
      <BackHeader title="회원가입" />
      <Divider />
      <div className="mt-[30px]">
        <ProfileImagePicker onChange={setProfileImage} />
      </div>
      <div className="mt-4">
        <FamilyNameField value={name} onChange={setName} />
      </div>
      <div className="mt-[14px]">
        <FirstNameField value={name} onChange={setName} />
      </div>
      <div className="mt-[50px]">
        <NicknameField
          value={nickname}
          onChange={setNickname}
          onStatusChange={setNicknameStatus}
        />
      </div>
      <div
        className={`flex flex-col gap-[20px] ${
          nicknameStatus === "idle" ? "mt-[57px]" : "mt-[29px]"
        }`}
      >
        <p className="mx-4 pretendard-sb-16 text-main-black">정산받을 계좌</p>
        <div className="flex flex-col gap-[30px]">
          <BankSelectField value={bank} onChange={setBank} />
          <AccountNumberField
            value={accountNumber}
            onChange={setAccountNumber}
          />
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        variant="primary"
        disabled={
          !name ||
          !nickname ||
          nicknameStatus !== "available" ||
          !bank ||
          !accountNumber ||
          isPending
        }
        className="fixed bottom-0 left-0 right-0 z-20"
      >
        {isPending ? "처리 중..." : "시작하기"}
      </Button>
    </main>
  );
}

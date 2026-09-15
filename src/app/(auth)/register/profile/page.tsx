"use client";

import { useState } from "react";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import NicknameField, {
  type NicknameStatus,
} from "@/features/auth/components/register/NicknameField";
import ProfileImagePicker from "@/features/auth/components/register/ProfileImagePicker";
import BankSelectField from "@/features/auth/components/register/BankSelectField";
import AccountNumberField from "@/features/auth/components/register/AccountNumberField";
import AccountHolderField from "@/features/auth/components/register/AccountHolderField";
import Button from "@/components/ui/Button";

export default function RegisterProfilePage() {
  const [nickname, setNickname] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>("idle");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  return (
    <main className="pb-[114px]">
      <BackHeader title="회원가입" />
      <Divider />
      <div className="mx-4 mb-4 mt-[30px] flex flex-col items-start gap-[6px]">
        <p className="pretendard-sb-18 text-main-black">닉네임을 정해주세요</p>
        <p className="pretendard-m-15 text-sub-gray-2">
          멤버들에게 보여질 닉네임이에요
        </p>
      </div>
      <ProfileImagePicker onChange={setProfileImage} />
      <NicknameField
        value={nickname}
        onChange={setNickname}
        onStatusChange={setNicknameStatus}
      />
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
          <AccountHolderField
            value={accountHolder}
            onChange={setAccountHolder}
          />
        </div>
      </div>
      <Button
        onClick={() => {}}
        variant="primary"
        disabled={false}
        className="fixed bottom-0 left-0 right-0 z-20"
      >
        시작하기
      </Button>
    </main>
  );
}

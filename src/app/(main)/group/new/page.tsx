"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import GroupMemberLimitNotice from "@/features/group/components/GroupMemberLimitNotice";
import GroupCoverImagePicker from "@/features/group/components/GroupCoverImagePicker";
import { useCreateGroup } from "@/features/group/hooks/useCreateGroup";

export default function GroupNewPage() {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const { mutate, isPending, error } = useCreateGroup();

  const handleSubmit = () => {
    mutate(
      { name: groupName.trim(), coverImage },
      {
        onSuccess: (group) => {
          const params = new URLSearchParams({
            name: group.name,
            inviteCode: group.inviteCode,
            inviteLink: group.inviteLink,
          });
          // 뒤로 가기로 폼에 돌아와 중복 생성하지 않도록 replace
          router.replace(`/group/invite?${params}`);
        },
      },
    );
  };

  return (
    <main className="pb-[114px]">
      <BackHeader title="그룹 만들기" />
      <Divider />
      <div className="mt-[15px] flex flex-col gap-[12px]">
        <GroupMemberLimitNotice />
        <GroupCoverImagePicker onChange={setCoverImage} />
      </div>
      <div className="mt-[40px]">
        <InputField
          label="그룹명"
          placeholder="ex. 피블이들 모여라"
          value={groupName}
          onChange={setGroupName}
          labelClassName="pretendard-sb-16"
        />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white">
        {error && (
          <p className="pretendard-m-12 mb-2 text-center text-red-500">
            {error.message}
          </p>
        )}
        <Button
          onClick={handleSubmit}
          variant="primary"
          disabled={groupName.trim().length === 0 || isPending}
        >
          {isPending ? "만드는 중..." : "시작하기"}
        </Button>
        <p className="pretendard-m-15 flex items-center justify-center gap-[5px] pb-[27px] text-center leading-[22px]">
          <span className="text-sub-gray-2">이미 초대 받았나요?</span>
          <button
            type="button"
            onClick={() => router.push("/group/join")}
            disabled={isPending}
            className="text-main-black"
          >
            코드로 참여
          </button>
        </p>
      </div>
    </main>
  );
}

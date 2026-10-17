"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import InviteCodeInput from "@/features/group/components/InviteCodeInput";
import { useJoinGroup } from "@/features/group/hooks/useJoinGroup";

const CODE_LENGTH = 6;

export default function GroupJoinPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const { mutate, isPending, error, reset } = useJoinGroup();

  const handleChangeCode = (value: string) => {
    setCode(value);
    // 코드를 고치기 시작하면 이전 에러 문구는 지운다
    if (error) reset();
  };

  const handleSubmit = () => {
    mutate(
      { inviteCode: code },
      {
        // 뒤로 가기로 코드 입력 화면에 돌아오지 않도록 replace
        onSuccess: ({ groupId }) => router.replace(`/group/${groupId}`),
      },
    );
  };

  return (
    <main className="pb-[114px]">
      <BackHeader title="초대 코드로 참여" />
      <Divider />
      <div className="mx-4 mt-[30px] flex flex-col gap-[6px]">
        <p className="pretendard-sb-18 text-main-black">
          참여 코드를 입력해주세요
        </p>
        <p className="pretendard-m-15 text-sub-gray-2">
          만남장에게 받은 6자리 코드 입력
        </p>
      </div>
      <div className="mt-[40px]">
        <InviteCodeInput
          value={code}
          onChange={handleChangeCode}
          length={CODE_LENGTH}
        />
        {error && (
          <p className="pretendard-m-12 mt-3 text-center text-red-500">
            {error.message}
          </p>
        )}
      </div>
      <Button
        onClick={handleSubmit}
        variant="primary"
        disabled={code.length < CODE_LENGTH || isPending}
        className="fixed bottom-0 left-0 right-0"
      >
        {isPending ? "참여하는 중..." : "참여하기"}
      </Button>
    </main>
  );
}

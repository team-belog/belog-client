"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import InviteLinkField from "@/features/group/components/InviteLinkField";
import InviteCodeBoxes from "@/features/group/components/InviteCodeBoxes";
import { generateInviteCode } from "@/features/group/utils/inviteCode";

function GroupInviteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupName = searchParams.get("name") || "그룹";

  // 서버/클라이언트 렌더링 간 랜덤 코드 불일치(hydration mismatch)를 피하기 위해
  // 마운트 이후에만 초대 코드를 생성한다.
  const [inviteCode, setInviteCode] = useState("");
  useEffect(() => {
    setInviteCode(generateInviteCode());
  }, []);
  const inviteLink = `https://belog.vercel.app/join/${inviteCode}`;

  return (
    <main className="pb-[114px]">
      <BackHeader title="그룹 만들기" />
      <Divider />
      <div className="mx-4 mt-[30px] flex flex-col gap-[6px]">
        <p className="pretendard-sb-18 text-main-black">{groupName}에</p>
        <p className="pretendard-m-15 text-sub-gray-2">
          함께할 친구들을 초대해 보세요
        </p>
      </div>
      <div className="mt-[40px] flex flex-col gap-[10px]">
        <p className="mx-4 pretendard-sb-16 text-main-black">초대 링크</p>
        <InviteLinkField link={inviteLink} />
      </div>
      <div className="mt-[60px] flex flex-col gap-[15px]">
        <p className="mx-4 pretendard-sb-16 text-main-black">참여 코드</p>
        <InviteCodeBoxes code={inviteCode} />
      </div>
      <Button
        onClick={() =>
          router.push(`/group/complete?name=${encodeURIComponent(groupName)}`)
        }
        variant="primary"
        disabled={false}
        className="fixed bottom-0 left-0 right-0"
      >
        다음
      </Button>
    </main>
  );
}

export default function GroupInvitePage() {
  return (
    <Suspense>
      <GroupInviteContent />
    </Suspense>
  );
}

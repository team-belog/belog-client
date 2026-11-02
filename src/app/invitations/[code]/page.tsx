"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { savePendingInviteCode } from "@/features/group/utils/pendingInviteStorage";

// 초대 링크 진입점. 로그인 여부와 상관없이 코드를 보관한 뒤 참여 화면으로 보낸다.
// 로그인 전이면 (main) 레이아웃의 인증 가드가 랜딩으로 보내고, 로그인 후 참여 화면으로 돌아온다.
export default function InvitePage() {
  const router = useRouter();
  const { code } = useParams<{ code: string }>();

  useEffect(() => {
    savePendingInviteCode(decodeURIComponent(code).toUpperCase());
    router.replace("/group/join");
  }, [code, router]);

  return null;
}

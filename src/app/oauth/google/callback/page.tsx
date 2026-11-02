"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GOOGLE_REDIRECT_URI } from "@/constants/google";
import { useGoogleLogin } from "@/features/auth/hooks/useGoogleLogin";
import { hasPendingInviteCode } from "@/features/group/utils/pendingInviteStorage";

function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate, error } = useGoogleLogin();
  const requested = useRef(false);

  const code = searchParams.get("code");

  useEffect(() => {
    if (!code || requested.current) return;
    requested.current = true;
    mutate(
      { authorizationCode: code, redirectUri: GOOGLE_REDIRECT_URI },
      {
        onSuccess: ({ onboardingRequired }) => {
          if (onboardingRequired) router.replace("/register/profile");
          // 초대 링크로 들어왔다면 로그인 후 바로 참여 화면으로
          else router.replace(hasPendingInviteCode() ? "/group/join" : "/");
        },
      },
    );
  }, [code, mutate, router]);

  if (!code || error) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-[16px]">
        <p>{error?.message ?? "로그인 정보가 올바르지 않습니다."}</p>
        <Link href="/login">로그인으로 돌아가기</Link>
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center">
      로그인 중...
    </main>
  );
}

export default function GoogleCallbackPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Suspense>
        <GoogleCallback />
      </Suspense>
    </div>
  );
}

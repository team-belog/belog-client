"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAccessToken } from "@/lib/authToken";
import { refreshAccessToken } from "@/lib/refresh";

// Access Token은 메모리에만 있으므로, 없으면 Refresh Token(쿠키)으로 재발급을 시도해 로그인 여부를 확인
// 온보딩을 마치지 않고 나갔던 사용자는 재접속 시 프로필 입력으로 보낸다
export function useAuthGuard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => getAccessToken() !== null,
  );

  useEffect(() => {
    if (isAuthenticated) return;

    let cancelled = false;
    refreshAccessToken()
      .then(({ onboardingRequired }) => {
        if (cancelled) return;
        if (onboardingRequired) router.replace("/register/profile");
        else setIsAuthenticated(true);
      })
      .catch(() => {
        if (!cancelled) router.replace("/landing");
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, router]);

  return isAuthenticated;
}

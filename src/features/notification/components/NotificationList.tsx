"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import NotificationRow from "@/features/notification/components/NotificationRow";
import { useNotifications } from "@/features/notification/hooks/useNotifications";
import { useReadNotification } from "@/features/notification/hooks/useReadNotification";
import type { NotificationItem } from "@/features/notification/types";
import { getNotificationPath } from "@/features/notification/utils/getNotificationPath";

export default function NotificationList() {
  const router = useRouter();
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useNotifications();
  const readNotification = useReadNotification();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasNextPage) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetchingNextPage) fetchNextPage();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <p className="pretendard-m-15 pt-[25px] text-center text-sub-gray-2">
        불러오는 중...
      </p>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 pt-[25px]">
        <p className="pretendard-m-15 text-sub-gray-2">{error.message}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="pretendard-m-15 text-main-black underline"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 읽은 알림을 숨기므로 뒤 페이지에 안 읽은 알림이 남아 있을 수 있음 → 다 불러온 뒤에만 빈 화면
  if (data.length === 0 && !hasNextPage) {
    return (
      <p className="pretendard-m-15 pt-[25px] text-center text-sub-gray-2">
        새로운 알림이 없어요
      </p>
    );
  }

  // 읽음 처리 응답을 기다리지 않고 바로 이동
  const handleClick = (notification: NotificationItem) => {
    if (!notification.read) {
      readNotification.mutate(notification.notificationId);
    }
    router.push(getNotificationPath(notification.target));
  };

  return (
    <div className="flex flex-col">
      {data.map((notification) => (
        <NotificationRow
          key={notification.notificationId}
          notification={notification}
          onClick={handleClick}
        />
      ))}
      {data.length === 0 && (
        <p className="pretendard-m-15 pt-[25px] text-center text-sub-gray-2">
          불러오는 중...
        </p>
      )}
      <div ref={sentinelRef} className="h-px" />
    </div>
  );
}

import Image from "next/image";

import {
  DEFAULT_NOTIFICATION_ICON,
  NOTIFICATION_ICON,
} from "@/features/notification/constants/icon";
import type { NotificationItem } from "@/features/notification/types";
import { formatRelativeTime } from "@/lib/date";

const MAX_MESSAGE_LENGTH = 20;

function truncateMessage(message: string) {
  const chars = Array.from(message);
  return chars.length > MAX_MESSAGE_LENGTH
    ? `${chars.slice(0, MAX_MESSAGE_LENGTH).join("")}...`
    : message;
}

type Props = {
  notification: NotificationItem;
  onClick: (notification: NotificationItem) => void;
};

export default function NotificationRow({ notification, onClick }: Props) {
  const icon =
    NOTIFICATION_ICON[notification.type] ?? DEFAULT_NOTIFICATION_ICON;

  return (
    <button
      type="button"
      onClick={() => onClick(notification)}
      className="flex w-full items-center gap-[10px] px-4 py-[10px] text-left"
    >
      <div className="relative size-[50px] shrink-0">
        <Image src={icon} alt="" fill className="object-contain" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="pretendard-m-15 text-main-black">
          {truncateMessage(notification.message)}
        </p>
        <p className="pretendard-m-12 text-sub-gray-2">
          {formatRelativeTime(notification.createdAt)}
        </p>
      </div>
    </button>
  );
}

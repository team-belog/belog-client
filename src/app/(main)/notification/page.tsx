import Image from "next/image";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";

interface NotificationItem {
  id: number;
  icon: string;
  message: string;
  time: string;
}

const DUMMY_NOTIFICATIONS: NotificationItem[] = [
  { id: 1, icon: "/icons/notification/settlement-request.svg", message: "피블 님이 정산을 요청했어요", time: "방금 전" },
  { id: 2, icon: "/icons/notification/group-join.svg", message: "피블 님이 그룹에 참여했어요", time: "1일 전" },
  { id: 3, icon: "/icons/notification/like.svg", message: "피블 님이 좋아요를 눌렀어요", time: "1일 전" },
  { id: 4, icon: "/icons/notification/settlement-complete.svg", message: "정산이 완료됐어요", time: "4일 전" },
];

function NotificationRow({ icon, message, time }: Omit<NotificationItem, "id">) {
  return (
    <div className="flex items-center gap-[10px] px-4 py-[10px]">
      <div className="relative size-[50px] shrink-0">
        <Image src={icon} alt="" fill className="object-contain" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="pretendard-m-15 text-main-black">{message}</p>
        <p className="pretendard-m-12 text-sub-gray-2">{time}</p>
      </div>
    </div>
  );
}

export default function NotificationPage() {
  return (
    <main className="flex flex-col">
      <BackHeader title="알림" />
      <Divider />
      <div className="flex flex-col">
        {DUMMY_NOTIFICATIONS.map((item) => (
          <NotificationRow key={item.id} icon={item.icon} message={item.message} time={item.time} />
        ))}
      </div>
    </main>
  );
}

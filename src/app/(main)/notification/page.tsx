import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import NotificationList from "@/features/notification/components/NotificationList";

export default function NotificationPage() {
  return (
    <main className="flex flex-col pt-[60px]">
      <BackHeader title="알림" />
      <Divider />
      <NotificationList />
    </main>
  );
}

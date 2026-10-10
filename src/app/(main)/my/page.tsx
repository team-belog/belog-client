"use client";

import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Divider from "@/components/layout/Divider";
import ProfileSection from "@/features/my/components/ProfileSection";
import MemoryCalendar from "@/features/my/components/MemoryCalendar";
import { DUMMY_CALENDAR } from "@/features/my/constants/dummy";
import { useGetMyProfile } from "@/features/my/hooks/useGetMyProfile";

export default function MyPage() {
  const router = useRouter();
  const { data: profile } = useGetMyProfile();

  return (
    <main>
      <Header/>
      <Divider />
      <ProfileSection
        name={profile?.nickname ?? ""}
        email={profile?.email ?? ""}
        profileImageUrl={profile?.profileImageUrl ?? undefined}
        onEdit={() => router.push("/my/edit")}
      />
      <MemoryCalendar
        initialYear={DUMMY_CALENDAR.year}
        initialMonth={DUMMY_CALENDAR.month}
        memoryCount={DUMMY_CALENDAR.memoryCount}
        daySchedules={DUMMY_CALENDAR.daySchedules}
      />
    </main>
  );
}

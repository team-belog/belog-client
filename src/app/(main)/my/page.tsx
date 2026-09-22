"use client";

import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Divider from "@/components/layout/Divider";
import ProfileSection from "@/features/my/components/ProfileSection";
import MemoryCalendar from "@/features/my/components/MemoryCalendar";
import { DUMMY_PROFILE, DUMMY_CALENDAR } from "@/features/my/constants/dummy";

export default function MyPage() {
  const router = useRouter();

  return (
    <main>
      <Header/>
      <Divider />
      <ProfileSection
        name={DUMMY_PROFILE.name}
        email={DUMMY_PROFILE.email}
        profileImageUrl={DUMMY_PROFILE.profileImageUrl}
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

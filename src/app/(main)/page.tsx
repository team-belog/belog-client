import { parseISO } from "date-fns";

import Header from "@/components/layout/Header";
import HomeCalendar from "@/features/home/components/HomeCalendar";
import HomeFab from "@/features/home/components/HomeFab";
import MeetupSection from "@/features/home/components/MeetupSection";
import { DEFAULT_SELECTED_DATE, DUMMY_SCHEDULES } from "@/features/home/constants/dummy";

export default function HomePage() {
  return (
    <main>
      <Header />
      <HomeCalendar
        schedules={DUMMY_SCHEDULES}
        initialMonth={new Date(2026, 7, 1)}
        initialSelectedDate={parseISO(DEFAULT_SELECTED_DATE)}
      />
      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />
      <MeetupSection schedules={DUMMY_SCHEDULES} />
      <HomeFab />
    </main>
  );
}

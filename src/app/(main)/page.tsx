import Header from "@/components/layout/Header";
import HomeCalendar from "@/features/home/components/HomeCalendar";
import HomeFab from "@/features/home/components/HomeFab";
import MeetupSection from "@/features/home/components/MeetupSection";

export default function HomePage() {
  return (
    <main>
      <Header />
      <HomeCalendar />
      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />
      <MeetupSection />
      <HomeFab />
    </main>
  );
}

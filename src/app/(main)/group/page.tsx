import Header from "@/components/layout/Header";
import GroupFab from "@/features/group/components/GroupFab";
import GroupList from "@/features/group/components/GroupList";

export default function GroupPage() {
  return (
    <main>
      <Header />
      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />
      <GroupList />
      <GroupFab />
    </main>
  );
}

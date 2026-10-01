import Header from "@/components/layout/Header";
import GroupFab from "@/features/group/components/GroupFab";
import GroupList from "@/features/group/components/GroupList";
import { DUMMY_GROUPS } from "@/features/group/constants/dummy";

export default function GroupPage() {
  return (
    <main>
      <Header title="그룹" />
      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />
      <GroupList initialGroups={DUMMY_GROUPS} />
      <GroupFab />
    </main>
  );
}

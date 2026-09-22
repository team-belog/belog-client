import GroupHomeView from "@/features/group/components/GroupHomeView";
import { DUMMY_GROUP_DETAIL } from "@/features/group/constants/dummy";

export default async function GroupHomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;

  return <GroupHomeView group={DUMMY_GROUP_DETAIL} />;
}

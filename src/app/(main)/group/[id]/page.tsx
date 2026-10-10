import { notFound } from "next/navigation";

import GroupHomeContainer from "@/features/group/components/GroupHomeContainer";

export default async function GroupHomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const groupId = Number(id);

  if (!Number.isInteger(groupId) || groupId <= 0) notFound();

  return <GroupHomeContainer groupId={groupId} />;
}

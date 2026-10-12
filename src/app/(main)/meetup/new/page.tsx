import { notFound } from "next/navigation";

import MeetupNewView from "@/features/meetup/components/MeetupNewView";

export default async function MeetupNewPage({
  searchParams,
}: {
  searchParams: Promise<{ groupId?: string }>;
}) {
  const { groupId: rawGroupId } = await searchParams;
  const groupId = Number(rawGroupId);

  if (!Number.isInteger(groupId) || groupId <= 0) notFound();

  return <MeetupNewView groupId={groupId} />;
}

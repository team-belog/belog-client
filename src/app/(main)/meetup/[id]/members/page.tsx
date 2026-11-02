import { notFound } from "next/navigation";

import MeetupMemberManageContainer from "@/features/meetup/components/MeetupMemberManageContainer";

export default async function MeetupMemberManagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) notFound();

  return <MeetupMemberManageContainer meetingId={meetingId} />;
}

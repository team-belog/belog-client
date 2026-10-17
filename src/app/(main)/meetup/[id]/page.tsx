import { notFound } from "next/navigation";

import MeetupDetailContainer from "@/features/meetup/components/MeetupDetailContainer";

export default async function MeetupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) notFound();

  return <MeetupDetailContainer meetingId={meetingId} />;
}

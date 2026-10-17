import { notFound } from "next/navigation";

import MeetupRespondContainer from "@/features/meetup/components/MeetupRespondContainer";

export default async function MeetupRespondPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) notFound();

  return <MeetupRespondContainer meetingId={meetingId} />;
}

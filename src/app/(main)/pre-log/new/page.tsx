import { notFound } from "next/navigation";

import PreLogAddContainer from "@/features/pre-log/components/PreLogAddContainer";

export default async function PreLogAddPage({
  searchParams,
}: {
  searchParams: Promise<{ meetingId?: string }>;
}) {
  const { meetingId: rawMeetingId } = await searchParams;
  const meetingId = Number(rawMeetingId);

  if (!Number.isInteger(meetingId) || meetingId <= 0) notFound();

  return <PreLogAddContainer meetingId={meetingId} />;
}

import { notFound } from "next/navigation";

import PreLogContainer from "@/features/pre-log/components/PreLogContainer";

export default async function PreLogPage({
  searchParams,
}: {
  searchParams: Promise<{ meetingId?: string }>;
}) {
  const { meetingId: rawMeetingId } = await searchParams;
  const meetingId = Number(rawMeetingId);

  if (!Number.isInteger(meetingId) || meetingId <= 0) notFound();

  return <PreLogContainer meetingId={meetingId} />;
}

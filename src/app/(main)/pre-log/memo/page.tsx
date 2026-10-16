import { notFound } from "next/navigation";

import PreLogMemoDetailContainer from "@/features/pre-log/components/PreLogMemoDetailContainer";

function toId(value?: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export default async function PreLogMemoDetailPage({
  searchParams,
}: {
  searchParams: Promise<{ meetingId?: string; planId?: string }>;
}) {
  const params = await searchParams;
  const meetingId = toId(params.meetingId);
  const planId = toId(params.planId);

  if (meetingId === null || planId === null) notFound();

  return <PreLogMemoDetailContainer meetingId={meetingId} planId={planId} />;
}

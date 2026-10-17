import { notFound } from "next/navigation";

import MeetupCoordinationContainer from "@/features/meetup/components/MeetupCoordinationContainer";

export default async function MeetupStatusPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ role?: string }>;
}) {
  const { id } = await params;
  const { role } = await searchParams;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) notFound();

  // TODO: 쿼리 대신 실제 방장 여부(로그인 유저 == 만남장)로 판단
  return (
    <MeetupCoordinationContainer
      meetingId={meetingId}
      isHost={role === "host"}
    />
  );
}

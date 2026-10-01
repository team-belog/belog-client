import MeetupCoordinationView from "@/features/meetup/components/MeetupCoordinationView";

export default async function MeetupStatusPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ role?: string }>;
}) {
  await params;
  const { role } = await searchParams;

  // TODO: 쿼리 대신 실제 방장 여부(로그인 유저 == 만남장)로 판단
  return <MeetupCoordinationView isHost={role === "host"} />;
}

import MeetupRespondView from "@/features/meetup/components/MeetupRespondView";

export default async function MeetupRespondPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;

  return <MeetupRespondView />;
}

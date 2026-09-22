import MeetupDetailView from "@/features/meetup/components/MeetupDetailView";
import { DUMMY_MEETUP_DETAIL } from "@/features/meetup/constants/dummy";

export default async function MeetupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;

  return <MeetupDetailView meetup={DUMMY_MEETUP_DETAIL} />;
}

import MeetupDetailView from "@/features/meetup/components/MeetupDetailView";
import { DUMMY_MEETUP_DETAIL } from "@/features/meetup/constants/dummy";

export default async function MeetupDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ groupId?: string }>;
}) {
  const { id } = await params;
  const { groupId } = await searchParams;

  return (
    <MeetupDetailView
      meetup={DUMMY_MEETUP_DETAIL}
      meetingId={Number(id)}
      groupId={Number(groupId)}
    />
  );
}

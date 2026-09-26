import { DUMMY_MEETUP_DETAIL } from "@/features/meetup/constants/dummy";
import PreLogView from "@/features/pre-log/components/PreLogView";
import { DUMMY_PRE_LOG_PLACES } from "@/features/pre-log/constants/dummy";

export default function PreLogPage() {
  return <PreLogView meetup={DUMMY_MEETUP_DETAIL} places={DUMMY_PRE_LOG_PLACES} />;
}

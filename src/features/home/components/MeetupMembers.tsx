import Profile from "@/components/ui/Profile";
import type { ActiveMeetingParticipant } from "@/features/home/types";
import { formatMemberLabel } from "@/features/home/utils/meetup";

interface MeetupMembersProps {
  participants: ActiveMeetingParticipant[];
  participantCount: number;
}

export default function MeetupMembers({ participants, participantCount }: MeetupMembersProps) {
  const avatarUrls = participants.length
    ? participants.slice(0, 3).map((participant) => participant.profileImageUrl ?? undefined)
    : [undefined, undefined, undefined];
  const leaderName = participants[0]?.nickname ?? "";

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {avatarUrls.map((src, index) => (
          <div key={index} className={index === 0 ? "" : "-ml-[15px]"}>
            <Profile src={src} width={30} height={30} />
          </div>
        ))}
      </div>
      <p className="pretendard-sb-10 whitespace-nowrap text-main-black underline">
        {formatMemberLabel(leaderName, participantCount)}
      </p>
    </div>
  );
}

import Image from "next/image";

import { formatMemberLabel } from "@/features/home/utils/meetup";

interface MeetupMembersProps {
  leaderName: string;
  memberCount: number;
}

export default function MeetupMembers({ leaderName, memberCount }: MeetupMembersProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <div className="relative size-[30px] overflow-hidden rounded-full border-2 border-main-white">
          <Image src="/icons/default-profile.svg" alt="" width={30} height={30} />
        </div>
        <div className="relative -ml-3 size-[30px] overflow-hidden rounded-full border-2 border-main-white">
          <Image src="/icons/default-profile.svg" alt="" width={30} height={30} />
        </div>
      </div>
      <p className="pretendard-sb-10 whitespace-nowrap text-main-black underline">
        {formatMemberLabel({ leaderName, memberCount })}
      </p>
    </div>
  );
}

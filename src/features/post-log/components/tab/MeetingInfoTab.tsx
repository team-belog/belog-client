"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ReadOnlyFieldGroup from "@/components/ui/ReadOnlyFieldGroup";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import { DUMMY_MEETING } from "../../constants/dummy";

const MAX_MEMO = 80;

export default function MeetingInfoTab() {
  const router = useRouter();
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState(DUMMY_MEETING.date);
  const [location, setLocation] = useState(DUMMY_MEETING.location);

  return (
    <>
      <div className="flex flex-col gap-4 pb-[130px] pt-[10px]">
        <ReadOnlyFieldGroup
          title={DUMMY_MEETING.title}
          fields={[
            { label: "완료 인원", value: `${DUMMY_MEETING.completedCount}명` },
            { label: "총 정산 금액", value: DUMMY_MEETING.totalAmount },
          ]}
        />

        <div className="relative mx-4 h-[121px] rounded-[12px] bg-[#F7F8F9] px-4 pb-4 pt-4">
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value.slice(0, MAX_MEMO))}
            placeholder="티켓에 들어갈 우리의 추억을 기록해 보세요"
            className="pretendard-m-14 h-[60px] w-full resize-none bg-transparent text-main-black outline-none placeholder:text-sub-gray-2"
          />
          <p className="pretendard-m-12 absolute bottom-4 right-4 text-sub-gray-2">
            {memo.length}/{MAX_MEMO}
          </p>
        </div>

        <InputField label="날짜" placeholder="날짜를 입력해주세요" value={date} onChange={setDate} />
        <InputField label="장소" placeholder="장소를 입력해주세요" value={location} onChange={setLocation} />

        <div className="mx-4 flex flex-col gap-[10px]">
          <div className="flex items-center gap-[5px]">
            <p className="pretendard-sb-16 text-main-black">참여 멤버</p>
            <p className="pretendard-sb-16 text-main-mint">{DUMMY_MEETING.members.length}명</p>
          </div>
          <div className="flex flex-wrap gap-[6px]">
            {DUMMY_MEETING.members.map((member) => (
              <div key={member} className="rounded-[10px] bg-[#F7F8F9] px-3 py-[7px]">
                <p className="pretendard-m-14 text-sub-gray-1">{member}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex h-[114px] gap-[9px] bg-white px-4 py-[28px]">
        <Button bare variant="light" onClick={() => {}} className="w-[114px] shrink-0 border border-[#CDD3DE] bg-sub-white text-main-black">
          저장
        </Button>
        <Button bare variant="primary" onClick={() => router.push("/post-log/ticket")} className="flex-1">
          티켓 생성
        </Button>
      </div>
    </>
  );
}

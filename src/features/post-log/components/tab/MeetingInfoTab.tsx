"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import ReadOnlyFieldGroup from "@/components/ui/ReadOnlyFieldGroup";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import { useGetPostLogMeetingInfo } from "../../hooks/useGetPostLogMeetingInfo";
import { useCreatePostLogTicket } from "../../hooks/useCreatePostLogTicket";
import { useSavePostLogDraft } from "../../hooks/useSavePostLogDraft";

const MAX_MEMO = 80;

export default function MeetingInfoTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meetingId = Number(searchParams.get("meetingId"));
  const queryClient = useQueryClient();

  const { data: meetingInfo, isLoading } = useGetPostLogMeetingInfo(meetingId);
  const { mutate: createTicket } = useCreatePostLogTicket();
  const { mutate: saveDraft } = useSavePostLogDraft();

  const [memo, setMemo] = useState("");

  useEffect(() => {
    if(meetingInfo?.memory){
      setMemo(meetingInfo.memory)
    }
  },[meetingInfo])

  if (isLoading) return <div className="flex items-center justify-center h-dvh">로딩 중...</div>;

  const dateRange = meetingInfo
    ? meetingInfo.startDate === meetingInfo.endDate
      ? meetingInfo.startDate
      : `${meetingInfo.startDate} - ${meetingInfo.endDate}`
    : "";
  const totalAmount = meetingInfo ? `${meetingInfo.settlement.totalAmount.toLocaleString()}원` : "";

  return (
    <>
      <div className="flex flex-col gap-4 pb-[130px] pt-[10px]">
        <ReadOnlyFieldGroup
          title={meetingInfo?.meetingName ?? ""}
          fields={[
            { label: "완료 인원", value: `${meetingInfo?.settlement.completedParticipantCount ?? 0}명` },
            { label: "총 정산 금액", value: totalAmount },
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

        <InputField label="날짜" placeholder="날짜를 입력해주세요" value={dateRange} onChange={() => {}} />
        <InputField label="장소" placeholder="장소를 입력해주세요" value={meetingInfo?.location ?? ""} onChange={() => {}} />

        <div className="mx-4 flex flex-col gap-[10px]">
          <div className="flex items-center gap-[5px]">
            <p className="pretendard-sb-16 text-main-black">참여 멤버</p>
            <p className="pretendard-sb-16 text-main-mint">{meetingInfo?.participantCount}명</p>
          </div>
          <div className="flex flex-wrap gap-[6px]">
            {meetingInfo?.participants.map((participant) => (
              <div key={participant.groupMemberId} className="rounded-[10px] bg-[#F7F8F9] px-3 py-[7px]">
                <p className="pretendard-m-14 text-sub-gray-1">{participant.nickname}{participant.meetingCreator && ( <span> · 모임장</span> )}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex h-[114px] gap-[9px] bg-white px-4 py-[28px]">
        {meetingInfo?.ticketCreated ? (
          <Button bare variant="primary"
            disabled={false}
            onClick={() => router.push(`/post-log/ticket?ticketId=${meetingInfo.ticketId}`)}
            className="flex-1">
            티켓 조회
          </Button>
        ) : (
          <>
            <Button bare variant="light"
              disabled={memo.trim().length === 0}
              onClick={() => saveDraft(
                { meetingId, memory: memo },
                { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["postLogMeetingInfo", meetingId] }) }
              )}
              className="w-[114px] shrink-0 border border-[#CDD3DE] bg-sub-white text-main-black disabled:bg-sub-gray-3 disabled:text-main-white">
              저장
            </Button>
            <Button bare variant="primary"
              disabled={memo.trim().length === 0}
              onClick={() => createTicket({ meetingId, memory: memo }, { onSuccess: (data) => router.push(`/post-log/ticket?ticketId=${data.ticketId}`) })}
              className="flex-1">
              티켓 생성
            </Button>
          </>
        )}
      </div>
    </>
  );
}

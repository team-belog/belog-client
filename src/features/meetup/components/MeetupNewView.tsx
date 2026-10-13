"use client";

import { addDays, compareAsc, format } from "date-fns";
import { useState } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import StepProgressBar from "@/components/ui/StepProgressBar";
import { useGroupMembers } from "@/features/group/hooks/useGroupMembers";
import { useGetMyProfile } from "@/features/my/hooks/useGetMyProfile";
import MeetupRequestComplete from "@/features/meetup/components/MeetupRequestComplete";
import MeetupStep1 from "@/features/meetup/components/steps/MeetupStep1";
import MeetupStep2 from "@/features/meetup/components/steps/MeetupStep2";
import MeetupStep3 from "@/features/meetup/components/steps/MeetupStep3";
import MeetupStep4Coordinate from "@/features/meetup/components/steps/MeetupStep4Coordinate";
import MeetupStep4FixedDate from "@/features/meetup/components/steps/MeetupStep4FixedDate";
import { useCreateMeeting } from "@/features/meetup/hooks/useCreateMeeting";
import type {
  CreateMeetingRequest,
  MeetingDateRange,
  MeetupStartOption,
} from "@/features/meetup/types";

const TOTAL_STEPS = 4;
const API_DATE_FORMAT = "yyyy-MM-dd";

function toDateRange(startDate: Date, endDate: Date): MeetingDateRange {
  return {
    startDate: format(startDate, API_DATE_FORMAT),
    endDate: format(endDate, API_DATE_FORMAT),
  };
}

export default function MeetupNewView({ groupId }: { groupId: number }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [nights, setNights] = useState<number | null>(null);
  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([]);
  const [isRequested, setIsRequested] = useState(false);
  const [startOption, setStartOption] = useState<MeetupStartOption | null>(null);

  const { data: members } = useGroupMembers(groupId);
  const { data: myProfile } = useGetMyProfile();
  const createMeeting = useCreateMeeting(groupId);

  // 생성자는 서버에서 자동으로 참여자에 포함되므로 선택 목록에서 제외
  // 멤버 응답에 본인 여부가 없어 고유한 닉네임으로 구분
  const selectableMembers =
    members?.items.filter((member) => member.nickname !== myProfile?.nickname) ??
    [];

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
    }
  };

  const handleSelectStartOption = (option: MeetupStartOption) => {
    setStartOption(option);
    handleNext();
  };

  const submit = (
    schedule: CreateMeetingRequest["schedule"],
    onSuccess: (meetingId: number) => void,
  ) => {
    createMeeting.mutate(
      {
        name: title.trim(),
        location: location.trim() || null,
        participantMemberIds: selectedMemberIds,
        schedule,
      },
      { onSuccess: ({ meetingId }) => onSuccess(meetingId) },
    );
  };

  const handleSubmitFixedDate = (range: { startDate: Date; endDate: Date }) => {
    submit(
      { type: "FIXED", dateRanges: [toDateRange(range.startDate, range.endDate)] },
      // 뒤로 가기로 생성 폼에 돌아와 중복 생성하지 않도록 replace
      (meetingId) => router.replace(`/meetup/${meetingId}`),
    );
  };

  const handleRequestCoordinate = (startDates: Date[]) => {
    const dateRanges = [...startDates]
      .sort(compareAsc)
      .map((startDate) => toDateRange(startDate, addDays(startDate, nights ?? 0)));

    submit({ type: "POLL", dateRanges }, () => setIsRequested(true));
  };

  const headerTitle = step === 4 ? "후보 날짜 등록" : "새 만남";

  if (isRequested) {
    return (
      <MeetupRequestComplete
        onGoGroupHome={() => router.replace(`/group/${groupId}`)}
      />
    );
  }

  return (
    <main>
      <BackHeader title={headerTitle} onBack={handleBack} />
      <Divider />
      <StepProgressBar current={step} total={TOTAL_STEPS} />

      {step === 1 && (
        <MeetupStep1
          title={title}
          onChangeTitle={setTitle}
          location={location}
          onChangeLocation={setLocation}
          nights={nights}
          onChangeNights={setNights}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <MeetupStep2
          members={selectableMembers}
          selectedIds={selectedMemberIds}
          onChangeSelectedIds={setSelectedMemberIds}
          onNext={handleNext}
        />
      )}
      {step === 3 && <MeetupStep3 onNext={handleSelectStartOption} />}
      {step === 4 && startOption === "fixedDate" && (
        <MeetupStep4FixedDate
          nights={nights}
          isSubmitting={createMeeting.isPending}
          errorMessage={createMeeting.error?.message}
          onSubmit={handleSubmitFixedDate}
        />
      )}
      {step === 4 && startOption === "coordinate" && (
        <MeetupStep4Coordinate
          nights={nights}
          isSubmitting={createMeeting.isPending}
          errorMessage={createMeeting.error?.message}
          onSubmit={handleRequestCoordinate}
        />
      )}
    </main>
  );
}

"use client";

import { useState } from "react";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import StepProgressBar from "@/components/ui/StepProgressBar";
import Button from "@/components/ui/Button";
import MeetupCharField from "@/features/meetup/components/MeetupCharField";

const TOTAL_STEPS = 4;
const TITLE_MAX = 15;
const LOCATION_MAX = 20;

export default function MeetupNewView() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const handleNext = () => {
    // TODO: 다음 단계(만남 일정) 연결
  };

  return (
    <main className="pb-[114px]">
      <BackHeader title="새 만남" />
      <Divider />
      <StepProgressBar current={1} total={TOTAL_STEPS} />

      <div className="flex flex-col gap-6 px-4 pt-3">
        <h1 className="pretendard-sb-18 text-main-black">
          어떤 만남을 만들까요?
        </h1>

        <div className="flex flex-col gap-10">
          <MeetupCharField
            label="만남명"
            required
            placeholder="ex. 1박 2일 광주 여행"
            value={title}
            onChange={setTitle}
            maxLength={TITLE_MAX}
          />
          <MeetupCharField
            label="만남 장소"
            placeholder="ex. 서울고속버스터미널"
            value={location}
            onChange={setLocation}
            maxLength={LOCATION_MAX}
          />
        </div>
      </div>

      <Button
        variant="primary"
        disabled={title.trim().length === 0}
        onClick={handleNext}
        className="fixed bottom-0 left-0 right-0"
      >
        다음
      </Button>
    </main>
  );
}

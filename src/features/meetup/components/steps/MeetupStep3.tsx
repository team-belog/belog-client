"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import MeetupStartOptionCard from "@/features/meetup/components/MeetupStartOptionCard";

type MeetupStartOption = "coordinate" | "fixedDate";

interface MeetupStep3Props {
  onNext: () => void;
}

const START_OPTIONS: {
  type: MeetupStartOption;
  iconSrc: string;
  title: string;
  description: string;
}[] = [
  {
    type: "coordinate",
    iconSrc: "/icons/meetup/start-option-coordinate.png",
    title: "일정 조율하기",
    description: "멤버들이 되는 날을 체크해 방장이 확정해요",
  },
  {
    type: "fixedDate",
    iconSrc: "/icons/meetup/start-option-fixed-date.png",
    title: "날짜 바로 정하기",
    description: "이미 날짜가 정해졌어요",
  },
];

export default function MeetupStep3({ onNext }: MeetupStep3Props) {
  const [selectedOption, setSelectedOption] = useState<MeetupStartOption | null>(
    null,
  );

  return (
    <div className="flex flex-col pb-[114px] pt-3">
      <h1 className="pretendard-sb-18 px-4 text-main-black">
        어떻게 시작할까요?
      </h1>

      <div className="mt-[19px] flex flex-col">
        {START_OPTIONS.map((option) => (
          <MeetupStartOptionCard
            key={option.type}
            iconSrc={option.iconSrc}
            title={option.title}
            description={option.description}
            selected={selectedOption === option.type}
            onClick={() => setSelectedOption(option.type)}
          />
        ))}
      </div>

      <Button
        variant="primary"
        disabled={selectedOption === null}
        onClick={onNext}
        className="fixed bottom-0 left-0 right-0"
      >
        다음
      </Button>
    </div>
  );
}

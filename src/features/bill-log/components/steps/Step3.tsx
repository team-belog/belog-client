"use client";

import { useState } from "react";
import SelectableToggle from "../SelectableToggle";
import { DUMMY_CONTENT } from "../../constants/dummy";
import TextLayout from "@/components/ui/TextLayout";
import ReadOnlyField from "../ReadOnlyField";
import Button from "@/components/ui/Button";

interface Step3Props {
  onNext: () => void;
}

type SettlementMethod = "tag" | "equal" | "custom";

const SETTLEMENT_METHODS: { type: SettlementMethod; label: string }[] = [
  { type: "tag", label: "항목 태그" },
  { type: "equal", label: "N분의 1" },
  { type: "custom", label: "금액 직접 입력" },
];

export default function Step3({ onNext }: Step3Props) {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [settlementMethod, setSettlementMethod] = useState<SettlementMethod | null>(null);

  const members = DUMMY_CONTENT[0].members;
  const menu = DUMMY_CONTENT[0].menu

  const toggleMember = (name: string) => {
    setSelectedMembers((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="flex flex-col">
      <h1 className="pretendard-sb-20 ml-4 mt-[10px]">누구랑 나눌까요?</h1>
      <div className="flex gap-3 ml-4 mt-6">
        {members.map((item) => (
          <SelectableToggle
            key={item.name}
            label={item.name}
            selected={selectedMembers.includes(item.name)}
            onClick={() => toggleMember(item.name)}
          />
        ))}
      </div>
      <h2 className="pretendard-sb-16 ml-4 mt-6">정산 방식</h2>
      <div className="flex gap-3 ml-4 mt-6 mb-8">
        {SETTLEMENT_METHODS.map(({ type, label }) => (
          <SelectableToggle
            key={type}
            label={label}
            selected={settlementMethod === type}
            onClick={() => setSettlementMethod(type)}
          />
        ))}
      </div>
      <TextLayout left={`개별 정산 금액 (${members.length}명)`} />
      <div className="flex flex-col gap-3 overflow-y-auto h-[568px]">
        {menu.map((item) => (
          <ReadOnlyField key={item.title} name={item.title} amount={item.amount} tag={settlementMethod === "tag"} />
        ))}
      </div>
      <Button onClick={onNext} variant="primary" className="fixed bottom-0 left-0 right-0">
        다음
      </Button>
    </div>
  );
}
